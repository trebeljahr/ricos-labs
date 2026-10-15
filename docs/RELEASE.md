# Release contract

https://ricoslabs.com is a static export served by Cloudflare Workers. There
is no server and no container. Every push to `main` is a production release
while `RICOS_LABS_ROLLOUT_MODE` is `automatic`.

## What serves which path

One Workers route on the zone `ricoslabs.com`, `ricoslabs.com/*`, attaches
the Worker `ricos-labs-client`. It serves the export in
`packages/client/out`. The Worker has assets only and no script, so no
request counts toward the Workers Free daily limit. There is no Custom Domain
and no DNS change: the apex A and AAAA records stay proxied and point at the
old Coolify server, which no longer receives requests while the route exists.

The route was made with the Cloudflare API. `wrangler.jsonc` has no `routes`
key, so a deploy never changes it, and the CI token cannot.

The zone setting Always Use HTTPS is on, because a Worker answers plain HTTP
itself. It also redirects Let's Encrypt's HTTP-01 requests, so Traefik can no
longer renew its certificate for ricoslabs.com, and an ACME route to the
origin would not help. That certificate is valid until 2026-12-09, and with
SSL mode Full Cloudflare accepts an expired origin certificate, so the
rollback below works either way.

## Release

`.github/workflows/deploy.yml` (Build & Release):

1. `build`: tests, typecheck, `pnpm build` with `NEXT_PUBLIC_BUILD_COMMIT`
   set, `scripts/write-version.mjs` writes `out/version.json`, then
   `scripts/carry-static.mjs` adds old chunks (below), then
   `wrangler versions upload --tag <sha>`. The upload is not live.
2. `deploy` (on push only when `RICOS_LABS_ROLLOUT_MODE` is `automatic`):
   `wrangler versions deploy <version>@100%`, then
   `scripts/verify-release.mjs <sha>`, which needs 16 samples in a row where
   `/version.json` and the homepage's `build-commit` meta tag name the commit.

Upload first, activate later: a one-step `wrangler deploy` left new chunks
answering 404 for several seconds on the canary.

Secrets: `CLOUDFLARE_API_TOKEN` (the account token
`hatchkit-ricos-labs-client-worker`, role "Individual Workers Editor" on
`ricos-labs-client` only) and `CLOUDFLARE_ACCOUNT_ID`. The token can upload
and deploy that Worker. It cannot touch routes, zone settings or DNS.

`node scripts/verify-release.mjs <full-sha>` checks the public site at any
time. It only sends GET requests.

## Old chunks

A Worker version serves only the files it was uploaded with. A tab opened
before a release still asks for its own hashed chunks. So every upload
carries the `/_next/static/**` files of the two releases before it:
`/release-assets.json` lists each release's files with their sha256, and the
build downloads the ones it lacks from the live site. The script is a copy of
hatchkit's `cli/src/templates/client-host/scripts/carry-static.mjs` at hatchkit
commit 2006ddb; its tests live there.

`public/_headers` has no long cache rule for `/_next/static/*`: such a rule
also applies to 404 responses, so a browser would keep a missing chunk for a
year.

## Rollback

- A release: run the workflow with `operation: deploy` and the `target_sha`
  of an earlier commit. It activates the newest version uploaded with that
  tag among the newest 10 uploads. For an older commit, also pass
  `version_id` (each build's summary names it). Cloudflare activates only the
  newest 100 uploads. Or `pnpm exec wrangler rollback --config
  packages/client/wrangler.jsonc` from a signed-in machine. A version keeps
  its own files, so this is complete.
- The move to Workers (until the Coolify app is deleted): delete the route
  `ricoslabs.com/*`. The Coolify app answers again within about 8 seconds,
  with the last image it pulled.

## Plausible

`src/app/layout.tsx` loads the script from `plausible.trebeljahr.com`, and
events go to the same host. A visitor whose content blocker blocks that host
is not counted, on purpose: there is no first-party proxy. Plausible sits
behind Cloudflare and reads the visitor's IP from `CF-Connecting-IP`, so
countries are right without help from this site.

## Do not

- Add `main`, `run_worker_first` or `cache` to `packages/client/wrangler.jsonc`.
  Each one turns page or asset requests into counted Worker requests.
- Add a `routes` key to `wrangler.jsonc`.
- Use `wrangler deploy` for the site in CI. Upload, then activate.
- Proxy Plausible through this site to get past content blockers. Rico
  decided on 2026-10-18 that a visitor who blocks tracking stays untracked.
- Commit a file at `.hatchkit/deploy-webhook`. It was the Coolify hook's watch
  path.
