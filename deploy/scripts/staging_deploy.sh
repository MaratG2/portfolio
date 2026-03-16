#!/usr/bin/env bash
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
NETWORK_NAME="${NETWORK_NAME:-maratg2_net_staging}"
PROXY_CONTAINER="${PROXY_CONTAINER:-maratg2-staging-proxy}"
SERVER_NAME="${SERVER_NAME:?SERVER_NAME is required}"
CERT_DOMAIN="${CERT_DOMAIN:?CERT_DOMAIN is required}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:?LETSENCRYPT_EMAIL is required}"
HTTP_PORT="${HTTP_PORT:-8080}"
HTTPS_PORT="${HTTPS_PORT:-8443}"

IMAGE="${IMAGE:?IMAGE is required (example: registry.gitlab.com/group/project:sha)}"

cd "$DEPLOY_ROOT"

echo "[staging] Deploying image: $IMAGE"

if [[ -n "${CI_REGISTRY:-}" && -n "${CI_REGISTRY_USER:-}" && -n "${CI_REGISTRY_PASSWORD:-}" ]]; then
  echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
fi

docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 || docker network create "$NETWORK_NAME"

mkdir -p deploy/nginx/generated deploy/certbot/conf deploy/certbot/www deploy/logs
chmod +x deploy/scripts/render_nginx_config.sh deploy/scripts/certbot_renew.sh

export UPSTREAM_NAME="app-staging"
export SERVER_NAME
export CERT_DOMAIN
./deploy/scripts/render_nginx_config.sh \
  deploy/nginx/http-only.conf.template \
  deploy/nginx/generated/default.conf

export NETWORK_NAME PROXY_CONTAINER_NAME="$PROXY_CONTAINER" HTTP_PORT HTTPS_PORT
docker compose -f deploy/docker-compose.proxy.yml up -d proxy

export IMAGE
docker compose -f deploy/docker-compose.staging.yml up -d app-staging

echo "[staging] Waiting for app health"
STAGING_CONTAINER_NAME="${STAGING_CONTAINER_NAME:-maratg2-app-staging}"
for i in $(seq 1 40); do
  STATUS="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$STAGING_CONTAINER_NAME" 2>/dev/null || echo "missing")"
  if [[ "$STATUS" == "healthy" ]]; then
    break
  fi
  if [[ "$STATUS" == "unhealthy" || "$i" == "40" ]]; then
    echo "[staging] ERROR: app-staging not healthy"
    exit 1
  fi
  sleep 3
done

if [[ ! -f "deploy/certbot/conf/live/${CERT_DOMAIN}/fullchain.pem" ]]; then
  docker compose -f deploy/docker-compose.proxy.yml run --rm certbot certonly \
    --webroot -w /var/www/certbot \
    -d "$CERT_DOMAIN" \
    --email "$LETSENCRYPT_EMAIL" \
    --agree-tos --no-eff-email --non-interactive
fi

docker compose -f deploy/docker-compose.proxy.yml run --rm certbot renew --webroot -w /var/www/certbot --quiet || true

./deploy/scripts/render_nginx_config.sh \
  deploy/nginx/default.conf.template \
  deploy/nginx/generated/default.conf

docker compose -f deploy/docker-compose.proxy.yml up -d proxy
docker exec "$PROXY_CONTAINER" nginx -s reload

# set up automatic cert renewal every 12 hours (idempotent)
CRON_LINE="17 */12 * * * cd '$DEPLOY_ROOT' && NETWORK_NAME='$NETWORK_NAME' PROXY_CONTAINER='$PROXY_CONTAINER' CERT_DOMAIN='$CERT_DOMAIN' SERVER_NAME='$SERVER_NAME' HTTP_PORT='$HTTP_PORT' HTTPS_PORT='$HTTPS_PORT' ./deploy/scripts/certbot_renew.sh >> '$DEPLOY_ROOT/deploy/logs/certbot-renew.log' 2>&1"
(crontab -l 2>/dev/null | grep -Fv "deploy/scripts/certbot_renew.sh"; echo "$CRON_LINE") | crontab -

echo "[staging] Deployment done"
