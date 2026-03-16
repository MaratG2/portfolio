# maratg2 — deployment behind shared DesireInfra nginx

Этот проект теперь **не поднимает собственный публичный nginx/certbot**.

Ingress и TLS обслуживаются централизованно в `DesireInfra` (контейнер `desire-nginx`).

## Как работает сейчас

- `main` -> production (blue/green):
  - контейнеры: `marat-frontend-blue` / `marat-frontend-green`
  - переключение через upstream-файл в `DesireInfra/nginx/upstreams/marat_prod_frontend_active.conf`
- `non-main` -> staging (single container):
  - контейнер: `marat-frontend-staging`
  - nginx всегда проксирует staging на `marat-frontend-staging:3000`

Сеть по умолчанию: `desire_internal`.

## Ключевые переменные GitLab CI

### Staging
- `DEPLOY_HOST_STAGING`
- `DEPLOY_USER_STAGING`
- `DEPLOY_PATH_STAGING` (путь с checkout `maratg2` на VPS)
- `STAGING_DESIRE_INFRA_PATH` (например `/opt/DesireInfra`)

### Production
- `DEPLOY_HOST_PRODUCTION`
- `DEPLOY_USER_PRODUCTION`
- `DEPLOY_PATH_PRODUCTION`
- `PRODUCTION_DESIRE_INFRA_PATH` (например `/opt/DesireInfra`)

### Optional
- `STAGING_NETWORK_NAME` / `PRODUCTION_NETWORK_NAME` (default `desire_internal`)
- `STAGING_APP_CONTAINER` (default `marat-frontend-staging`)
- `PRODUCTION_BLUE_CONTAINER` (default `marat-frontend-blue`)
- `PRODUCTION_GREEN_CONTAINER` (default `marat-frontend-green`)

## Важно

Сертификаты для `maratg2.ru` и `staging.maratg2.ru` выпускаются в `DesireInfra/scripts/renew-certs.sh`
как единый SAN-сертификат с `cert-name = maratg2.ru`.
