## Context

The CI pipeline currently has two stages: Stage 1 (install-deps + audit) and Stage 2 (lint, format-check, test — all parallel). No job verifies that `wxt build` succeeds, meaning a broken build is invisible to CI. The project uses WXT 0.20.x and targets Chrome MV3 and Firefox MV2. Both builds are fast (< 30 s locally). The existing `.github/actions/job-setup` composite action sets up pnpm 10 + Node 24 with caching, so all jobs share the same setup surface.

## Goals / Non-Goals

**Goals:**
- Add a Stage 3 `build` job that runs `pnpm build` and `pnpm build:firefox` after Stage 2 passes.
- Upload `.output/chrome-mv3/` and `.output/firefox-mv2/` as GitHub Actions artifacts on every CI run.
- Fail the pipeline if either build command exits non-zero.

**Non-Goals:**
- Marketplace publishing or extension signing (Chrome Web Store API, `web-ext sign`) — deferred to a separate release workflow.
- Versioning or changelog generation.
- Separate per-browser jobs (one job is sufficient given build speed).

## Decisions

### Build both targets in a single job

Alternatives considered: two parallel jobs (one per browser). Rejected because build times are negligible and the added job overhead + cache restoration cost would dominate. One job keeps the graph simple.

### Run as Stage 3 (after all Stage 2 checks pass)

Alternative: run in parallel with Stage 2 lint/test. Rejected — building on code that hasn't passed lint or tests wastes minutes and obscures signal. Sequencing after Stage 2 ensures the build only runs on verified code.

### Use `actions/upload-artifact@v4` with 7-day retention

Alternative: publish to a release or push to a branch. Overkill for CI validation. Artifact upload gives a downloadable zip attached to each run without requiring extra secrets or branch writes. 7 days covers the typical PR review cycle.

### Reuse `.github/actions/job-setup`

No deviation from the existing pattern — every job uses it. Keeps Node and pnpm versions consistent across all jobs.

## Risks / Trade-offs

- [Build output size] `.output/` directories can be large if assets accumulate → WXT's default output is small (< 1 MB for this extension); no action needed now but monitor if assets grow.
- [Cache pollution] If `wxt prepare` modifies files at install time, the pnpm cache from job-setup may be stale → `job-setup` already runs `pnpm install --frozen-lockfile`, which invokes `postinstall`/`prepare` scripts; no extra step needed.
- [Firefox build secret] `wxt build -b firefox` doesn't require signing for artifact upload; signing is only needed for marketplace submission, which is out of scope.
