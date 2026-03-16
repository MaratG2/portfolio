#!/usr/bin/env bash
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
NETWORK_NAME="${NETWORK_NAME:-maratg2_net}"
PROXY_CONTAINER="${PROXY_CONTAINER:-maratg2-proxy}"
SERVER_NAME="${SERVER_NAME:-_}"

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

if [[ ! -f deploy/nginx/generated/default.conf ]]; then
  cp deploy/nginx/default.conf.template deploy/nginx/generated/default.conf
fi

echo "[deploy] Ensuring proxy container is up"
docker compose -f deploy/docker-compose.proxy.yml up -d proxy

ACTIVE="blue"
if grep -q "upstream app-green" deploy/nginx/generated/default.conf; then
  ACTIVE="green"
fi

if [[ "$ACTIVE" == "blue" ]]; then
  TARGET="green"
else
  TARGET="blue"
fi

TARGET_SERVICE="app-${TARGET}"
TARGET_CONTAINER="maratg2-app-${TARGET}"

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

echo "[deploy] Switching nginx upstream to $TARGET_SERVICE"
awk -v up="${TARGET_SERVICE}" -v sn="${SERVER_NAME}" '{
  gsub(/\$\{UPSTREAM_NAME\}/, up);
  gsub(/\$\{SERVER_NAME\}/, sn);
  print;
}' deploy/nginx/default.conf.template > deploy/nginx/generated/default.conf

docker compose -f deploy/docker-compose.proxy.yml up -d proxy
docker exec "$PROXY_CONTAINER" nginx -s reload

echo "[deploy] Stopping previous color: app-${ACTIVE}"
docker compose -f "deploy/docker-compose.${ACTIVE}.yml" stop "app-${ACTIVE}" || true

echo "$TARGET" > deploy/.active_color

echo "[deploy] Deployment completed successfully"
