# Rolling image release contract

This controller manages only the Coolify Docker Image app `bffigwu5v24tdslu1mou8txs`
(`ricos-labs-web`, https://ricoslabs.com), source `trebeljahr/ricos-labs` on
`main`, image `ghcr.io/trebeljahr/ricos-labs`. Every push to `main` builds a
full-SHA candidate tag and a `release-<sha>-<run>-<attempt>` artifact holding
its digest. Building does not move `latest`.

`RICOS_LABS_ROLLOUT_MODE` defaults to unset/off. `manual` permits an explicit
**Build & Release** dispatch with operation `deploy`, `target_sha`,
`image_digest` and `expected_current_digest`. `automatic` also releases every
push whose build succeeded. Repository and ref guards plus one workflow
concurrency group serialize the controller; it is the only writer of `latest`,
`rolling-started` and `rolling-verified`.

The controller needs the app's hook bundle: `COOLIFY_BASE_URL`,
`COOLIFY_RESOURCE_UUID`, `COOLIFY_DEPLOY_REPOSITORY`, `COOLIFY_DEPLOY_BRANCH` and
`COOLIFY_DEPLOY_SECRET`. Each value must name this app and source repository,
and the secret must be the Image app's own webhook secret. It moves tags with
the built-in GitHub package token and never receives a Coolify API token.
`hatchkit secrets isolate <checkout> --app bffigwu5v24tdslu1mou8txs` writes the
bundle from an operator terminal.

## Current state

`RICOS_LABS_ROLLOUT_MODE` is `automatic`. The manual release in run
`38178665186` (2026-10-11 UTC) created the journal. To pause releases, set the
variable to `manual`: pushes still build candidates, and nothing deploys until
a `deploy` dispatch.

## Image identity and runtime

The Docker build requires `DEPLOYMENT_ID` to be the full source commit. It embeds
that identity in `/version.json` and the homepage `build-commit` metadata. Next's
`deploymentId` uses the same commit for client/server version skew handling.
The runtime must serve `/version.json` with `Cache-Control: no-store`.

The image waits 20 seconds on SIGTERM while failing only loopback health probes.
Coolify health check: `/` on port `6457`, interval 2 seconds, timeout 5 seconds,
5 retries and a start period long enough for boot. The runtime has curl for
Coolify's in-container probe. Docker's effective stop timeout must be at least
30 seconds. Container names and host port mappings must remain unset, so the old
and new container can overlap.

## Coolify app settings

- Image `ghcr.io/trebeljahr/ricos-labs`, tag `latest`.
- `git_repository` `trebeljahr/ricos-labs`, branch `main`. The signed hook
  selects apps by this value, and the controller refuses a bundle that names
  another one. Coolify 4.0.0-beta.469 has no form field for it on Image apps;
  it is the `gitRepository` property of the General page's Livewire component.
- Watch path `.hatchkit/deploy-webhook`, auto-deploy on. Only a payload that
  names this path deploys, and no commit may ever create the file.

## Legacy rollback resource

The stopped Compose app `ica6zmwn4k122ovusx7j7l68`
(`ricos-labs-web-legacy-compose`) is the rollback resource. Its Git source is
pinned to `78f94115836ca0d1915e3c073e2a3f50278402db`, whose `docker-compose.yml`
names the pre-migration image by its literal digest, so it does not depend on
`latest`. Keep that file's digest, keep the app's auto-deploy off, and never
redeploy it while the Image app serves.

It has the same repository and branch as the Image app. Coolify therefore lists
it in every hook answer as `Invalid signature.`; that entry is expected. A
bundle signed with the legacy app's secret queues nothing.

## Verification and recovery

Before promotion, the controller hashes the target manifest bytes and config,
checks Linux amd64 and the full OCI revision, matches the full-SHA tag to the
reviewed digest, and verifies the public site against the commit of current
`latest`. It copies the reviewed manifest bytes to `latest`, reads back the
digest, and sends one signed hook. Queue acceptance must identify this app and
one deployment UUID.

Public verification requires the homepage and uncached `/version.json` to name
the same full commit for 16 consecutive samples, 2 seconds apart. This is HTTP
evidence; stage `http-verified` is not a claim that the provider job finished or
that the old container retired. Operation `verify` performs only these checks.

`rolling-started` and `rolling-verified` must both agree with current `latest`
before another run can change anything. The first release must be a manual
dispatch: it creates both markers. A crash, unknown hook outcome, external tag
writer or failed public check leaves the journal closed. The `rollout-<run>`
artifact records the previous digest and the returned deployment UUID. After any
hook attempt, a failure never triggers another hook or tag rewrite: inspect and
settle that exact deployment in Coolify before rollback or journal
reconciliation. Failures before the hook may restore the previous tag while
keeping the journal closed.

To redeploy a chosen commit, dispatch `deploy` with that commit's `target_sha`,
the `image_digest` from its build artifact and the digest `latest` holds now.

Offline checks: `node --test scripts/release.test.mjs scripts/rolling-release.test.mjs`.
Public check: `node scripts/verify-release.mjs <full-sha>`.
