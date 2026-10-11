# Agent Instructions

If the operator maintains a machine-level agent file (e.g.
`~/.agents/AGENTS.md` or `~/.claude/CLAUDE.md`), read and follow it
first. The rules below are specific to this repository.

## What this repository is

The Ricos Labs company website, https://ricoslabs.com. A Next.js 15
(App Router) site in `packages/client`, with shared types in
`packages/shared`. pnpm workspace, Node 22.

`CLAUDE.md` comes from the starter template this repository was created
from. Its code style, commit message and branch naming rules apply here.
Its sections on the Express server, MongoDB, tRPC, authentication, Stripe,
WebSocket, desktop and mobile describe packages this repository does not
have.

## Commands

```bash
pnpm install        # install dependencies
pnpm dev            # Next dev server on port 3947
pnpm build          # build shared, then the client
pnpm typecheck      # TypeScript in every package
node --test scripts/release.test.mjs scripts/rolling-release.test.mjs
```

The last command runs the release and rollout contract tests. The client
has no unit tests yet.

On a machine with the hatchkit local-dev host setup, `pnpm dev` also
serves `https://ricos-labs.local.ricoslabs.com/`. See `docs/dev-setup.md`.

## Every push to `main` is a production release

A push to `main` builds an image and deploys it to https://ricoslabs.com.
The contract, the gate variable and the recovery steps are in
`scripts/ROLLING_RELEASE.md`.

- Run the contract tests before a push that changes `scripts/`,
  `Dockerfile`, `drain.cjs` or `.github/workflows/deploy.yml`.
- Never commit a file at `.hatchkit/deploy-webhook`. The signed deploy hook
  names that path as the changed file.
- `docker-compose.yml` is the rollback file of the retired Compose app.
  Keep its image digest.

## Environment

`packages/client/.env.production` is committed with dotenvx-encrypted
values. The Docker build decrypts it with a BuildKit secret. Never commit
`.env.keys`, `.env` or `.env.local`.
