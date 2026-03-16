# maratg2 — CI/CD (GitLab + Docker + Staging + Production Blue/Green + Let's Encrypt)

Реализован полный CI/CD контур:

- **non-main ветки** деплоятся только в **staging** (single-container);
- **main ветка** деплоится только в **production** (blue/green, без даунтайма);
- для staging и production включен **HTTPS через Let's Encrypt**;
- настроено **автопродление сертификатов** без остановки nginx (через `certbot renew` + `nginx -s reload`).

## Что есть в проекте

- Production Docker образ Next.js (standalone runtime)
  - `Dockerfile`
  - `next.config.ts` → `output: "standalone"`
- Health endpoint: `GET /api/health`
- GitLab pipeline: `.gitlab-ci.yml`
  - `lint`
  - `docker_build_push`
  - `deploy_staging` (только не-main)
  - `deploy_production` (только main)
- Compose-файлы:
  - `deploy/docker-compose.staging.yml` (single app)
  - `deploy/docker-compose.blue.yml`
  - `deploy/docker-compose.green.yml`
  - `deploy/docker-compose.proxy.yml` (nginx + certbot service profile)
- Nginx templates:
  - `deploy/nginx/http-only.conf.template` (для первого запуска и ACME)
  - `deploy/nginx/default.conf.template` (HTTPS + reverse proxy)
- Скрипты:
  - `deploy/scripts/staging_deploy.sh`
  - `deploy/scripts/blue_green_deploy.sh`
  - `deploy/scripts/certbot_renew.sh`
  - `deploy/scripts/render_nginx_config.sh`

## Поведение по веткам

- **Если branch != main**: запускается `deploy_staging`.
- **Если branch == main**: запускается `deploy_production`.

Таким образом staging и production строго разделены по правилам GitLab CI.

## Как работает HTTPS / Certbot

1. Прокси сначала запускается с HTTP-конфигом (`http-only.conf.template`) и отдачей ACME challenge.
2. Certbot получает сертификат (`certonly --webroot`) для домена.
3. Nginx-конфиг переключается на HTTPS (`default.conf.template`) и делается `nginx -s reload`.
4. На сервере автоматически регистрируется cron-задача (каждые 12 часов), которая:
   - выполняет `certbot renew`,
   - перерендеривает nginx-конфиг,
   - делает reload nginx **без остановки контейнера**.

## GitLab CI/CD Variables

### Общие

- `SSH_PRIVATE_KEY`
- `LETSENCRYPT_EMAIL`
- `CI_REGISTRY_USER` / `CI_REGISTRY_PASSWORD` (обычно встроенные)

### Staging

- `DEPLOY_HOST_STAGING`
- `DEPLOY_USER_STAGING`
- `DEPLOY_PATH_STAGING` (например `/opt/maratg2-staging`)
- `STAGING_URL` (например `https://staging.example.com`)
- `STAGING_SERVER_NAME` (обычно `staging.example.com`)
- `STAGING_CERT_DOMAIN` (обычно `staging.example.com`)

Опционально:

- `STAGING_NETWORK_NAME` (default: `maratg2_net_staging`)
- `STAGING_PROXY_CONTAINER` (default: `maratg2-staging-proxy`)
- `STAGING_APP_CONTAINER` (default: `maratg2-app-staging`)
- `STAGING_HTTP_PORT` (default: `80`)
- `STAGING_HTTPS_PORT` (default: `443`)

### Production

- `DEPLOY_HOST_PRODUCTION`
- `DEPLOY_USER_PRODUCTION`
- `DEPLOY_PATH_PRODUCTION` (например `/opt/maratg2-prod`)
- `PRODUCTION_URL` (например `https://example.com`)
- `PRODUCTION_SERVER_NAME` (например `example.com`)
- `PRODUCTION_CERT_DOMAIN` (например `example.com`)

Опционально:

- `PRODUCTION_NETWORK_NAME` (default: `maratg2_net`)
- `PRODUCTION_PROXY_CONTAINER` (default: `maratg2-proxy`)
- `PRODUCTION_BLUE_CONTAINER` (default: `maratg2-app-blue`)
- `PRODUCTION_GREEN_CONTAINER` (default: `maratg2-app-green`)
- `PRODUCTION_HTTP_PORT` (default: `80`)
- `PRODUCTION_HTTPS_PORT` (default: `443`)

## Подготовка серверов (один раз)

### Staging server

```bash
mkdir -p /opt/maratg2-staging
cd /opt/maratg2-staging
docker network create maratg2_net_staging || true
```

### Production server

```bash
mkdir -p /opt/maratg2-prod
cd /opt/maratg2-prod
docker network create maratg2_net || true
```

## Важно

- Для Let's Encrypt домены должны резолвиться на соответствующий сервер.
- Порты `80` и `443` должны быть открыты (или проксированы до контейнера nginx).
- Если staging и production находятся на одном хосте, задайте разные `*_HTTP_PORT` и `*_HTTPS_PORT`.
