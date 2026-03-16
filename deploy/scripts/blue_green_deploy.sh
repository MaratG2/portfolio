#!/usr/bin/env bash
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
NETWORK_NAME="${NETWORK_NAME:-maratg2_net}"
PROXY_CONTAINER="${PROXY_CONTAINER:-maratg2-proxy}"
SERVER_NAME="${SERVER_NAME:-_}"
CERT_DOMAIN="${CERT_DOMAIN:?CERT_DOMAIN is required}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:?LETSENCRYPT_EMAIL is required}"
HTTP_PORT="${HTTP_PORT:-80}"
HTTPS_PORT="${HTTPS_PORT:-443}"
BLUE_CONTAINER_NAME="${BLUE_CONTAINER_NAME:-maratg2-app-blue}"
GREEN_CONTAINER_NAME="${GREEN_CONTAINER_NAME:-maratg2-app-green}"

IMAGE="${IMAGE:?IMAGE is required (example: registry.gitlab.com/group/project:sha)}"

cd "$DEPLOY_ROOT"

echo "[deploy] Starting blue/green deployment with image: $IMAGE"

if [[ -n "${CI_REGISTRY:-}" && -n "${CI_REGISTRY_USER:-}" && -n "${CI_REGISTRY_PASSWORD:-}" ]]; then
  echo "[deploy] Login to registry ${CI_REGISTRY}"
  echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
fi

echo "[deploy] Ensuring shared docker network: $NETWORK_NAME"
docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 || docker network create "$NETWORK_NAME"

mkdir -p deploy/nginx/generated
mkdir -p deploy/certbot/conf deploy/certbot/www deploy/logs

chmod +x deploy/scripts/render_nginx_config.sh

ACTIVE="blue"
if [[ -f deploy/.active_color ]]; then
  FILE_COLOR="$(tr -d '[:space:]' < deploy/.active_color)"
  if [[ "$FILE_COLOR" == "blue" || "$FILE_COLOR" == "green" ]]; then
    ACTIVE="$FILE_COLOR"
  fi
elif grep -q "upstream app-green" deploy/nginx/generated/default.conf 2>/dev/null; then
  ACTIVE="green"
fi

ACTIVE_SERVICE="app-${ACTIVE}"

export UPSTREAM_NAME="$ACTIVE_SERVICE"
export SERVER_NAME
export CERT_DOMAIN
./deploy/scripts/render_nginx_config.sh \
  deploy/nginx/http-only.conf.template \
  deploy/nginx/generated/default.conf

echo "[deploy] Ensuring proxy container is up"
export NETWORK_NAME PROXY_CONTAINER_NAME="$PROXY_CONTAINER" HTTP_PORT HTTPS_PORT
docker compose -f deploy/docker-compose.proxy.yml up -d proxy

if [[ "$ACTIVE" == "blue" ]]; then
  TARGET="green"
else
  TARGET="blue"
fi

TARGET_SERVICE="app-${TARGET}"
TARGET_CONTAINER="$BLUE_CONTAINER_NAME"
if [[ "$TARGET" == "green" ]]; then
  TARGET_CONTAINER="$GREEN_CONTAINER_NAME"
fi

echo "[deploy] Active color: $ACTIVE. Target color: $TARGET"

export IMAGE
docker compose -f "deploy/docker-compose.${TARGET}.yml" up -d "$TARGET_SERVICE"

echo "[deploy] Waiting for healthy state: $TARGET_CONTAINER"
ATTEMPTS=40
for i in $(seq 1 "$ATTEMPTS"); do
  STATUS="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$TARGET_CONTAINER" 2>/dev/null || echo "missing")"
  if [[ "$STATUS" == "healthy" ]]; then
    echo "[deploy] $TARGET_CONTAINER is healthy"
    break
  fi

  if [[ "$STATUS" == "unhealthy" ]]; then
    echo "[deploy] ERROR: $TARGET_CONTAINER is unhealthy"
    exit 1
  fi

  if [[ "$i" == "$ATTEMPTS" ]]; then
    echo "[deploy] ERROR: timeout waiting for healthy status"
    exit 1
  fi

  sleep 3
done

if [[ ! -f "deploy/certbot/conf/live/${CERT_DOMAIN}/fullchain.pem" ]]; then
  echo "[deploy] Issuing initial Let's Encrypt certificate for ${CERT_DOMAIN}"
  docker compose -f deploy/docker-compose.proxy.yml run --rm certbot certonly \
    --webroot -w /var/www/certbot \
    -d "$CERT_DOMAIN" \
    --email "$LETSENCRYPT_EMAIL" \
    --agree-tos --no-eff-email --non-interactive
else
  echo "[deploy] Certificate already exists for ${CERT_DOMAIN}"
fi

echo "[deploy] Trying certificate renewal (safe no-op if not due)"
docker compose -f deploy/docker-compose.proxy.yml run --rm certbot renew \
  --webroot -w /var/www/certbot --quiet || true

echo "[deploy] Switching nginx upstream to $TARGET_SERVICE"
export UPSTREAM_NAME="$TARGET_SERVICE"
./deploy/scripts/render_nginx_config.sh \
  deploy/nginx/default.conf.template \
  deploy/nginx/generated/default.conf

docker compose -f deploy/docker-compose.proxy.yml up -d proxy
docker exec "$PROXY_CONTAINER" nginx -s reload

echo "[deploy] Stopping previous color: app-${ACTIVE}"
docker compose -f "deploy/docker-compose.${ACTIVE}.yml" stop "app-${ACTIVE}" || true

echo "$TARGET" > deploy/.active_color

# set up automatic cert renewal every 12 hours (idempotent)
CRON_LINE="17 */12 * * * cd '$DEPLOY_ROOT' && NETWORK_NAME='$NETWORK_NAME' PROXY_CONTAINER='$PROXY_CONTAINER' CERT_DOMAIN='$CERT_DOMAIN' SERVER_NAME='$SERVER_NAME' HTTP_PORT='$HTTP_PORT' HTTPS_PORT='$HTTPS_PORT' ./deploy/scripts/certbot_renew.sh >> '$DEPLOY_ROOT/deploy/logs/certbot-renew.log' 2>&1"
(crontab -l 2>/dev/null | grep -Fv "deploy/scripts/certbot_renew.sh"; echo "$CRON_LINE") | crontab -

echo "[deploy] Deployment completed successfully"
