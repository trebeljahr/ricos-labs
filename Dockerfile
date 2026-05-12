# syntax=docker/dockerfile:1
#
# Production image for ricos-labs. Next.js (App Router) builds with
# output: "standalone", so the runner stage ships a tiny Node server
# instead of nginx. Built by .github/workflows/deploy.yml, pushed to
# GHCR, pulled by Coolify via docker-compose.yml.
#
# .env.production is committed dotenvx-encrypted. The build stage
# decrypts it via the dotenvx_private_key BuildKit secret (passed by
# the GH Actions workflow from the DOTENV_PRIVATE_KEY_PRODUCTION
# secret) so `pnpm build` sees the plain NEXT_PUBLIC_* values when it
# bakes them into the client JS. The runner stage has no access to
# the secret, so non-public values never reach production.
#
# Why BuildKit secrets and not ARG: ARG values land in `docker
# history` and the image manifest. BuildKit secrets are mounted as
# tmpfs at build time and never persist.
ARG NODE_VERSION=22

# ── Stage 1: dependencies ──────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS deps
RUN corepack enable
WORKDIR /app

# Copy lockfile + workspace manifest + per-package manifests + .npmrc
# first so the install layer caches when only source changes.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json .npmrc ./
COPY packages/shared/package.json packages/shared/
COPY packages/client/package.json packages/client/

# --ignore-scripts skips postinstall hooks (sharp ships prebuilt
# binaries for the linux/amd64 runtime that Coolify uses; @sentry/cli
# and esbuild are only needed at build time and pnpm fetches the
# right platform binary regardless).
RUN pnpm install --frozen-lockfile --ignore-scripts

# ── Stage 2: build ─────────────────────────────────────────────────
FROM deps AS build
COPY tsconfig.base.json ./
COPY packages/shared packages/shared
COPY packages/client packages/client

RUN pnpm --filter @starter/shared run build

# Decrypt .env.production in memory and run `next build` with the
# plain NEXT_PUBLIC_* values exported. dotenvx is a tiny wrapper that
# reads the encrypted .env.production using the private key from the
# build secret. If the secret is missing the build still succeeds
# (dotenvx silently passes through), so this won't break local
# `docker build` runs that don't pass a key.
RUN --mount=type=secret,id=dotenvx_private_key,env=DOTENV_PRIVATE_KEY_PRODUCTION \
    NODE_ENV=production pnpm dlx @dotenvx/dotenvx --quiet run \
      -f packages/client/.env.production --ignore=MISSING_PRIVATE_KEY -- \
      pnpm --filter @starter/client run build

# ── Stage 3: runtime ───────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=6457
ENV HOSTNAME=0.0.0.0

# Next.js standalone bundle is the minimal node server + deps.
COPY --from=build /app/packages/client/.next/standalone ./
COPY --from=build /app/packages/client/.next/static ./packages/client/.next/static
COPY --from=build /app/packages/client/public ./packages/client/public

USER node
EXPOSE 6457

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||'6457')).then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "packages/client/server.js"]
