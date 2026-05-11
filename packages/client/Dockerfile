# ── Stage 1: Install dependencies ────────────────────────────────────
FROM node:22-bookworm-slim AS deps
RUN corepack enable
WORKDIR /app

# Copy lockfile + workspace manifest, then per-package manifests, so the
# install layer caches as long as deps don't change.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json .npmrc ./
COPY packages/shared/package.json packages/shared/
COPY packages/client/package.json packages/client/

RUN pnpm install --frozen-lockfile --ignore-scripts

# ── Stage 2: Build ───────────────────────────────────────────────────
FROM deps AS build
COPY tsconfig.base.json ./
COPY packages/shared packages/shared
COPY packages/client packages/client

RUN pnpm --filter @starter/shared run build
RUN pnpm --filter @starter/client run build

# ── Stage 3: Production runtime ─────────────────────────────────────
FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=6457
ENV HOSTNAME=0.0.0.0

# Next.js standalone output ships the minimal node server + deps.
COPY --from=build /app/packages/client/.next/standalone ./
COPY --from=build /app/packages/client/.next/static ./packages/client/.next/static
COPY --from=build /app/packages/client/public ./packages/client/public

USER node
EXPOSE 6457

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||'6457')).then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "packages/client/server.js"]
