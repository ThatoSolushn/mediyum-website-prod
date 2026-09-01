# syntax=docker/dockerfile:1

# Build happens in CI (see .github/workflows/deploy.yml), not on the deploy
# host. The 4GB Coolify box cannot run `npm ci` + `next build` alongside
# everything else it hosts, so it pulls the finished image instead.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# ---- dependencies -----------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build ------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runtime ----------------------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# `output: "standalone"` in next.config.ts emits a server bundle carrying only
# the modules actually reached at runtime — 66MB rather than the full 474MB.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
