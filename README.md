# maratg2

Next.js application deployed by Coolify.

## Coolify deployment

Create separate Coolify resources for production and staging and select the matching Compose file:

- Production: `/deploy/docker-compose.prod.yml`
- Staging: `/deploy/docker-compose.staging.yml`

Both resources build the repository's root `Dockerfile`. The application service is named `app`, listens on port `3000`, and exposes `/api/health` for health checks. Domains, HTTPS, container names, and routing are managed by Coolify.

No application environment variables are currently required.
