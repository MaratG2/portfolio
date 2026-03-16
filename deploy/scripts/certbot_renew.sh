#!/usr/bin/env bash
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
NETWORK_NAME="${NETWORK_NAME:-maratg2_net}"
PROXY_CONTAINER="${PROXY_CONTAINER:-maratg2-proxy}"
CERT_DOMAIN="${CERT_DOMAIN:?CERT_DOMAIN is required}"
SERVER_NAME="${SERVER_NAME:-_}"
HTTP_PORT="${HTTP_PORT:-80}"
HTTPS_PORT="${HTTPS_PORT:-443}"

cd "$DEPLOY_ROOT"

mkdir -p deploy/certbot/conf deploy/certbot/www deploy/nginx/generated
chmod +x deploy/scripts/render_nginx_config.sh

export NETWORK_NAME PROXY_CONTAINER_NAME="$PROXY_CONTAINER" HTTP_PORT HTTPS_PORT
docker compose -f deploy/docker-compose.proxy.yml up -d proxy

docker compose -f deploy/docker-compose.proxy.yml run --rm certbot renew --webroot -w /var/www/certbot --quiet

if grep -q "upstream app-green" deploy/nginx/generated/default.conf; then
  UPSTREAM_NAME="app-green"
elif grep -q "upstream app-staging" deploy/nginx/generated/default.conf; then
  UPSTREAM_NAME="app-staging"
else
  UPSTREAM_NAME="app-blue"
fi

export UPSTREAM_NAME CERT_DOMAIN SERVER_NAME
./deploy/scripts/render_nginx_config.sh \
  deploy/nginx/default.conf.template \
  deploy/nginx/generated/default.conf

docker exec "$PROXY_CONTAINER" nginx -s reload
