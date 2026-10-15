# ricos-labs

The Ricos Labs company website, https://ricoslabs.com. It is a Next.js site
with a landing page and an imprint page, exported as static files and served
by Cloudflare Workers. This repository has no backend service, no database
and no authentication.

`AGENTS.md` points other coding agents to this file. Keep the repository
description here, not in both files.

## Tech Stack

- **Site:** Next.js 15 (App Router), React 19, TypeScript, built with `output: "export"`
- **Hosting:** the assets-only Cloudflare Worker `ricos-labs-client`, attached
  by the route `ricoslabs.com/*`. See `docs/RELEASE.md`.
- **Styling:** Tailwind CSS 3 with CSS variables, `next-themes` for the light and dark theme, `lucide-react` icons
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Analytics:** Plausible, loaded only in production, straight from
  plausible.trebeljahr.com. No first-party proxy: a visitor who blocks it is
  not counted, on purpose.
- **Workspace:** pnpm workspace with one package, `packages/client`. Its name,
  `@starter/client`, comes from the starter template. The root scripts, the
  Lighthouse workflow and `.claude/launch.json` select the package by that
  name.
- **Toolchain:** Node 22 or newer, pnpm 11

## Commands

```bash
pnpm install        # install dependencies
pnpm dev            # Next dev server on port 3947
pnpm build          # static export to packages/client/out
pnpm preview        # serve packages/client/out with wrangler dev (port 8787)
pnpm typecheck      # tsc --noEmit in the client
pnpm test           # release script tests
```

`pnpm build` runs `next build`, then writes WebP widths of the screenshots
(`packages/client/scripts/optimize-images.mjs`, about a minute). An export has
no image optimizer, so `src/lib/image-loader.ts` points `next/image` at those
WebP files.

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
way on port 57342. The `worker` entry serves the last `pnpm build` output
with `wrangler dev` on port 51873, with the same asset rules as production
(`_headers`, the 404 page, trailing slashes).

## Every Push to `main` Is a Production Release

A push to `main` uploads a new version of the Worker and activates it on
https://ricoslabs.com. This includes commits that change only documentation.
Commit locally, and push only when the operator asks for a release.

`.github/workflows/deploy.yml` (Build & Release) builds the export, carries
the hashed chunks of the two releases before it, runs
`wrangler versions upload --tag <sha>`, then activates that version and
checks that the public site serves the commit. The routes, the gate variable
`RICOS_LABS_ROLLOUT_MODE`, the secrets and the rollback are in
`docs/RELEASE.md`. Read it before you change anything it names.

- Run `pnpm test` before a push that changes `scripts/`,
  `packages/client/public/_headers`, `packages/client/wrangler.jsonc` or
  `.github/workflows/deploy.yml`. The build job runs it too.
- `packages/client/wrangler.jsonc` stays assets-only: no `main`,
  `run_worker_first`, `cache` or `routes`.
- The workflow identifies a release by `/version.json` and by the
  `build-commit` meta tag on the homepage. Both come from
  `NEXT_PUBLIC_BUILD_COMMIT`. Keep both, and keep `/version.json` uncached
  (`public/_headers`).
- `node scripts/verify-release.mjs <full-sha>` checks which commit the public
  site serves. It only sends GET requests.

`.github/workflows/lighthouse.yml` runs Lighthouse CI on pull requests and on
manual dispatch, against `/` and `/imprint` served by `wrangler dev`. A score below 0.95 for
accessibility, best practices or SEO fails the run. Performance below 0.95 is
a warning.

## File Organization

```
packages/client/
  next.config.mjs      — static export, custom image loader, local-dev plugin
  wrangler.jsonc       — the assets-only Worker ricos-labs-client
  image-sizes.mjs      — image widths shared by Next and optimize-images.mjs
  tailwind.config.ts   — theme tokens mapped to CSS variables
  components.json      — shadcn/ui CLI config (no shadcn component is added yet)
  public/_headers      — response headers of the Worker (version.json no-store)
  public/brand/        — logo files
  public/images/       — project screenshots, written by `pnpm screenshots`
  scripts/             — build step: optimize-images.mjs
  src/
    app/               — App Router: layout, landing page, imprint/, metadata
                         routes (manifest, robots, sitemap, Open Graph and
                         Twitter image), all static
    components/
      landing/         — sections of the landing page
      three/           — react-three-fiber scenes (client components)
      logos/           — company logos as React SVG components
      brand/           — the brand mark
      providers/       — theme provider
    lib/               — site-config.ts, projects-data.ts, brand.ts,
                         structured-data.ts, image-loader.ts, hooks
                         (use-in-view, use-reduced-motion), utils.ts
    styles/globals.css — Tailwind layers and the CSS variables of both themes

scripts/
  carry-static.mjs               — carries old hashed chunks into an upload (from hatchkit)
  verify-release.mjs             — public check of the serving commit
  write-version.mjs              — writes out/version.json after the build
  release.test.mjs               — tests for the release identity and verify contract
  capture-project-screenshots.mjs

BRAND.md               — brand kit: assets, palette, type, voice
docs/RELEASE.md        — release contract, routes, rollback
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
  with dotenvx, and the public key is at the top of the file. It holds no
  value that the build needs, so the workflow does not decrypt it.
- Never commit `.env.keys`, `.env` or `.env.local`. `.gitignore` lists them.
- A variable that the browser reads needs the `NEXT_PUBLIC_` prefix. Next
  writes its value into the client bundle at build time. A build that needs
  an encrypted value must decrypt it in the workflow
  (`dotenvx run -- pnpm build` with `DOTENV_PRIVATE_KEY_PRODUCTION`).
- The site code reads one build variable, `NEXT_PUBLIC_BUILD_COMMIT`. The
  workflow sets it to the commit SHA. It is unset in local development.
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
