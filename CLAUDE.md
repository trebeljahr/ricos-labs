# ricos-labs

The Ricos Labs company website, https://ricoslabs.com. It is a Next.js site
with a landing page and an imprint page. This repository has no backend
service, no database and no authentication.

`AGENTS.md` points other coding agents to this file. Keep the repository
description here, not in both files.

## Tech Stack

- **Site:** Next.js 15 (App Router), React 19, TypeScript, built with `output: "standalone"`
- **Styling:** Tailwind CSS 3 with CSS variables, `next-themes` for the light and dark theme, `lucide-react` icons
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Analytics:** Plausible, loaded only in production and proxied through the site's own `/kestrel` paths
- **Workspace:** pnpm workspace with one package, `packages/client`. Its name,
  `@starter/client`, comes from the starter template. The root scripts, the
  `Dockerfile`, `lighthouserc.json`, the Lighthouse workflow and
  `.claude/launch.json` select the package by that name.
- **Toolchain:** Node 22 or newer, pnpm 11

## Commands

```bash
pnpm install        # install dependencies
pnpm dev            # Next dev server on port 3947
pnpm build          # next build of the client
pnpm typecheck      # tsc --noEmit in the client
pnpm test           # release and rollout contract tests
```

`pnpm test` runs `node --test scripts/release.test.mjs scripts/rolling-release.test.mjs`.
The drain test in `release.test.mjs` depends on timing and can fail on a
heavily loaded machine. Run it again before you treat a failure as a
regression.

There is no lint step. The repository has no ESLint dependency and no ESLint
config.

A command that needs care:

- `pnpm screenshots` opens each project's public URL in Playwright Chromium
  and overwrites `packages/client/public/images/*.png`. Limit it with
  `node scripts/capture-project-screenshots.mjs --only=tiao,raptor`. It needs
  the Playwright browser (`pnpm exec playwright install chromium`). Read the
  image diff before you commit.

### Dev server and the local-dev URL

`next.config.mjs` wraps the config in hatchkit's local-dev plugin. On a machine
with the hatchkit local-dev host setup, each `next dev` start points the
project's dev URL at the port of that dev server. See `docs/dev-setup.md`.

A second dev server takes the dev URL away from the first one. Start a
preview or a test server with the plugin off and on another port:

```bash
HATCHKIT_LOCAL_DEV=0 pnpm --filter @starter/client exec next dev --port <free port>
```

The `client` entry in `.claude/launch.json` starts the preview server this
way on port 57342.

## Every Push to `main` Is a Production Release

A push to `main` builds an image and deploys it to https://ricoslabs.com.
This includes commits that change only documentation. Commit locally, and
push only when the operator asks for a release.

`.github/workflows/deploy.yml` (Build & Release) builds an image tagged with
the full commit SHA. Its deploy job runs `scripts/rolling-release.mjs`, which
moves the `latest` tag to that image, queues the Coolify app with a signed
hook and checks that the public site serves the commit. The contract, the gate
variable `RICOS_LABS_ROLLOUT_MODE` and the recovery steps are in
`scripts/ROLLING_RELEASE.md`. Read it before you change anything it names.

- Run the contract tests (`pnpm test`) before a push that changes `scripts/`, `Dockerfile`,
  `drain.cjs` or `.github/workflows/deploy.yml`. The build job runs them too.
- Never commit a file at `.hatchkit/deploy-webhook`. The signed deploy hook
  names that path as the changed file.
- `docker-compose.yml` is the rollback file of the retired Compose app.
  Keep its image digest.
- The controller identifies a release by `/version.json` and by the
  `build-commit` meta tag on the homepage. Both come from the Docker build
  argument `DEPLOYMENT_ID`. Keep both, and keep `/version.json` uncached.
- The image listens on port 6457. `drain.cjs` holds the server open for 20
  seconds after SIGTERM so that the old container can hand over.
- `node scripts/verify-release.mjs <full-sha>` checks which commit the public
  site serves. It only sends GET requests.

`.github/workflows/lighthouse.yml` runs Lighthouse CI on pull requests and on
manual dispatch, against `/` and `/imprint`. A score below 0.95 for
accessibility, best practices or SEO fails the run. Performance below 0.95 is
a warning.

## File Organization

```
packages/client/
  next.config.mjs      — standalone output, deployment id, /version.json header,
                         Plausible script rewrite, local-dev plugin
  tailwind.config.ts   — theme tokens mapped to CSS variables
  components.json      — shadcn/ui CLI config (no shadcn component is added yet)
  public/brand/        — logo files
  public/images/       — project screenshots, written by `pnpm screenshots`
  src/
    app/               — App Router: layout, landing page, imprint/, metadata
                         routes (manifest, robots, sitemap, Open Graph and
                         Twitter image), kestrel/k/ (Plausible event proxy)
    components/
      landing/         — sections of the landing page
      three/           — react-three-fiber scenes (client components)
      logos/           — company logos as React SVG components
      brand/           — the brand mark
      providers/       — theme provider
    lib/               — site-config.ts, projects-data.ts, brand.ts,
                         structured-data.ts, hooks (use-in-view,
                         use-reduced-motion), utils.ts
    styles/globals.css — Tailwind layers and the CSS variables of both themes

scripts/
  ROLLING_RELEASE.md             — release contract
  rolling-release.mjs            — rollout controller entry, logic in lib/rolling-release.mjs
  verify-release.mjs             — public check of the serving commit
  write-version.mjs              — writes public/version.json during the Docker build
  release.test.mjs               — tests for the image identity, drain and verify contract
  rolling-release.test.mjs       — tests for the rollout controller
  capture-project-screenshots.mjs

Dockerfile, drain.cjs  — production image and its shutdown drain
docker-compose.yml     — rollback file of the retired Compose app
BRAND.md               — brand kit: assets, palette, type, voice
docs/dev-setup.md      — host setup for the local-dev URL
```

Where site content lives:

- Company name, contact addresses, legal entity and SEO text: `src/lib/site-config.ts`.
  The imprint page, the metadata routes and the JSON-LD read from it.
- Projects on the landing page: `featuredProjects` and `otherProjects` in
  `src/lib/projects-data.ts`. Each entry names an image in `public/images/`.
- Colors and type: `BRAND.md`, `src/styles/globals.css` and `tailwind.config.ts`.

## Environment

- `packages/client/.env.production` is committed. Its values are encrypted
  with dotenvx, and the public key is at the top of the file.
- The Docker build decrypts the file with the BuildKit secret
  `dotenvx_private_key`, which the workflow fills from the GitHub secret
  `DOTENV_PRIVATE_KEY_PRODUCTION`. The runtime stage never receives the key.
- Never commit `.env.keys`, `.env` or `.env.local`. `.gitignore` lists them.
- A variable that the browser reads needs the `NEXT_PUBLIC_` prefix. Next
  writes its value into the client bundle at build time.
- The site code reads two build variables: `NEXT_DEPLOYMENT_ID` and
  `NEXT_PUBLIC_BUILD_COMMIT`. The Dockerfile sets both from `DEPLOYMENT_ID`.
  Both are unset in local development.
- `packages/client/.env.example` lists the variables that the code reads.
  Nothing loads the file, and local development needs no variable.

Add an encrypted value (this needs only the public key in the file):

```bash
pnpm dlx @dotenvx/dotenvx set KEY value -f packages/client/.env.production
```

## Code Style

- TypeScript strict mode everywhere. No `any`. Use `unknown` and narrow it.
- Prefer `const` over `let`. Never use `var`.
- Named exports only. Exceptions: files where Next.js requires a default
  export (pages, layouts, metadata routes) and tool config files.
- Explicit return types on exported functions in new code.
- Use the `@/` path alias for imports inside `packages/client/src`.

## Testing Conventions

- **Release scripts:** `node:test` with `node:assert/strict`. Files are
  `scripts/*.test.mjs`. `pnpm test` runs them.
- **Client:** no tests yet. Vitest, Testing Library and jsdom are installed,
  and there is no Vitest config. The client's `test` script (`vitest run`)
  exits with code 1 until a test file exists, and the root `pnpm test` does
  not call it. The first client test needs a config with the jsdom environment
  and the `@/` alias, and a root `test` script that also runs the client's
  script. Put test files next to the source as `*.test.tsx`.

## Commit Messages

Use conventional style: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
Keep the first line under 72 characters. Add a blank line before any body text.

## Branch Naming

`feat/description`, `fix/description`, `refactor/description`.
