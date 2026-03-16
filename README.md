# maratg2 — CI/CD (GitLab + Docker + Blue/Green)

В проект добавлен production-ready pipeline для сборки и деплоя Next.js приложения в Docker-контейнерах с blue/green переключением для высокой доступности.

## Что реализовано

- `Dockerfile` для production-сборки Next.js (standalone runtime)
- `next.config.ts` с `output: "standalone"`
- health endpoint: `GET /api/health`
- GitLab CI/CD: `.gitlab-ci.yml`
  - `lint`
  - `docker_build_push` (build + push в GitLab Container Registry)
  - `deploy_production` (SSH деплой на сервер)
- Blue/Green деплой:
  - `deploy/docker-compose.blue.yml`
  - `deploy/docker-compose.green.yml`
  - `deploy/docker-compose.proxy.yml`
  - `deploy/nginx/default.conf.template`
  - `deploy/nginx/generated/default.conf` (текущая активная конфигурация)
  - `deploy/scripts/blue_green_deploy.sh`

## Архитектура деплоя

1. Pipeline собирает образ и пушит теги:
   - `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA`
   - `$CI_REGISTRY_IMAGE:latest`
2. На сервер по SSH доставляется репозиторий (`rsync`).
3. Скрипт `blue_green_deploy.sh`:
   - поднимает неактивный цвет (`app-blue` или `app-green`),
   - ждёт `healthy` через Docker healthcheck,
   - переключает Nginx upstream на новый цвет,
   - reload Nginx без даунтайма,
   - останавливает старый цвет.

Итог: обновление происходит без прерывания трафика (24/7 сценарий).

## Требования к production серверу

- Linux сервер с установленными:
  - Docker Engine
  - Docker Compose v2 (`docker compose`)
  - Bash
- Открыт порт `80/tcp`
- Пользователь с правами запускать Docker

## GitLab CI/CD Variables (Settings → CI/CD → Variables)

Обязательные:

- `CI_REGISTRY_USER` *(обычно есть встроенно)*
- `CI_REGISTRY_PASSWORD` *(обычно есть встроенно)*
- `SSH_PRIVATE_KEY` — приватный ключ для доступа к deploy-серверу
- `DEPLOY_HOST` — IP/домен сервера
- `DEPLOY_USER` — SSH пользователь
- `DEPLOY_PATH` — путь на сервере, куда синхронизируется проект (например `/opt/maratg2`)
- `PRODUCTION_URL` — публичный URL сайта (например `https://example.com`)

Опциональные:

- `SERVER_NAME` — server_name для Nginx (по умолчанию `_`)

## Первая инициализация сервера (один раз)

На сервере:

```bash
mkdir -p /opt/maratg2
cd /opt/maratg2
docker network create maratg2_net || true
```

Далее — просто пуш в default branch, pipeline выполнит всё автоматически.

## Локальная проверка Docker образа

```bash
docker build -t maratg2:local .
docker run --rm -p 3000:3000 maratg2:local
```

Проверка health:

```bash
curl http://localhost:3000/api/health
```

## Важно

- Текущий Nginx proxy работает по HTTP (`:80`).
- Для HTTPS (рекомендуется) добавьте TLS-терминацию:
  - либо внешним reverse proxy / LB,
  - либо расширением текущего Nginx (сертификаты + 443 + редирект с 80).
