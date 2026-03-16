#!/usr/bin/env bash
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
NETWORK_NAME="${NETWORK_NAME:-desire_internal}"
DESIRE_INFRA_PATH="${DESIRE_INFRA_PATH:?DESIRE_INFRA_PATH is required}"
BLUE_CONTAINER_NAME="${BLUE_CONTAINER_NAME:-marat-frontend-blue}"
GREEN_CONTAINER_NAME="${GREEN_CONTAINER_NAME:-marat-frontend-green}"

IMAGE="${IMAGE:?IMAGE is required (example: registry.gitlab.com/group/project:sha)}"

cd "$DEPLOY_ROOT"

echo "[deploy] Starting blue/green deployment with image: $IMAGE"

if [[ -n "${CI_REGISTRY:-}" && -n "${CI_REGISTRY_USER:-}" && -n "${CI_REGISTRY_PASSWORD:-}" ]]; then
  echo "[deploy] Login to registry ${CI_REGISTRY}"
  echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
fi

echo "[deploy] Ensuring shared docker network: $NETWORK_NAME"
docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 || docker network create "$NETWORK_NAME"

if [[ ! -x "${DESIRE_INFRA_PATH}/scripts/nginx-reload.sh" ]]; then
  echo "[deploy] ERROR: ${DESIRE_INFRA_PATH}/scripts/nginx-reload.sh not found or not executable"
  exit 1
fi

ACTIVE="blue"
if [[ -f deploy/.active_color ]]; then
  FILE_COLOR="$(tr -d '[:space:]' < deploy/.active_color)"
  if [[ "$FILE_COLOR" == "blue" || "$FILE_COLOR" == "green" ]]; then
    ACTIVE="$FILE_COLOR"
  fi
elif grep -q "marat-frontend-green" "${DESIRE_INFRA_PATH}/nginx/upstreams/marat_prod_frontend_active.conf" 2>/dev/null; then
  ACTIVE="green"
fi

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

echo "[deploy] Switching shared edge nginx upstream to marat ${TARGET}"
cp "${DESIRE_INFRA_PATH}/nginx/upstreams/marat_prod_frontend_${TARGET}.conf" \
   "${DESIRE_INFRA_PATH}/nginx/upstreams/marat_prod_frontend_active.conf"
"${DESIRE_INFRA_PATH}/scripts/nginx-reload.sh"

echo "[deploy] Stopping previous color: app-${ACTIVE}"
docker compose -f "deploy/docker-compose.${ACTIVE}.yml" stop "app-${ACTIVE}" || true

echo "$TARGET" > deploy/.active_color

echo "[deploy] Deployment completed successfully"
