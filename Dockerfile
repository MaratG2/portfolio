FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install --global corepack@latest \
    && corepack enable pnpm \
    && corepack install --global pnpm@10.32.1

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "const http=require('http');const req=http.get('http://127.0.0.1:3000/api/health',res=>process.exit(res.statusCode===200?0:1));req.on('error',()=>process.exit(1));"

CMD ["node", "server.js"]
