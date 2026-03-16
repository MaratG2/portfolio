#!/usr/bin/env bash
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
NETWORK_NAME="${NETWORK_NAME:-desire_internal}"
DESIRE_INFRA_PATH="${DESIRE_INFRA_PATH:?DESIRE_INFRA_PATH is required}"
STAGING_CONTAINER_NAME="${STAGING_CONTAINER_NAME:-marat-frontend-staging}"

IMAGE="${IMAGE:?IMAGE is required (example: registry.gitlab.com/group/project:sha)}"

cd "$DEPLOY_ROOT"

echo "[staging] Deploying image: $IMAGE"

if [[ -n "${CI_REGISTRY:-}" && -n "${CI_REGISTRY_USER:-}" && -n "${CI_REGISTRY_PASSWORD:-}" ]]; then
  echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
fi

docker network inspect "$NETWORK_NAME" >/dev/null 2>&1 || docker network create "$NETWORK_NAME"

if [[ ! -x "${DESIRE_INFRA_PATH}/scripts/nginx-reload.sh" ]]; then
  echo "[staging] ERROR: ${DESIRE_INFRA_PATH}/scripts/nginx-reload.sh not found or not executable"
  exit 1
fi

export IMAGE
docker compose -f deploy/docker-compose.staging.yml up -d app-staging

echo "[staging] Waiting for app health"
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

echo "[staging] Ensuring shared edge nginx uses marat staging upstream"
"${DESIRE_INFRA_PATH}/scripts/nginx-reload.sh"

echo "[staging] Deployment done"
