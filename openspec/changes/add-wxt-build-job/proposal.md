## Why

The CI pipeline verifies code quality (lint, format, tests) but never validates that the extension actually builds — a broken `wxt build` would only be discovered after merge. Adding a dedicated build job closes this gap and produces distributable artifacts automatically on every CI run.

## What Changes

- Add a `build` job to `.github/workflows/ci.yml` that runs `wxt build` (Chrome MV3) and `wxt build -b firefox` (Firefox MV2) after Stage 2 passes.
- Upload both build outputs (`.output/chrome-mv3/` and `.output/firefox-mv2/`) as GitHub Actions artifacts so they can be downloaded from any CI run.
- (Optional, not in initial scope) Wire up marketplace upload steps — Chrome Web Store via `topspin` / CWS API, Firefox Add-ons via `web-ext sign` — triggered only on tagged releases.

## Capabilities

### New Capabilities

- `ci-build-job`: A CI job that builds both browser targets and exposes the outputs as downloadable artifacts.

### Modified Capabilities

- `ci-pipeline`: A new Stage 3 build job is added after Stage 2; pipeline requirements expand to include a verified build gate.

## Impact

- `.github/workflows/ci.yml` — new `build` job added.
- No changes to source code, `package.json`, or existing CI jobs.
- Requires no secrets for artifact upload; marketplace upload (if added later) would require `CHROME_CLIENT_ID`, `CHROME_CLIENT_SECRET`, `CHROME_REFRESH_TOKEN`, `WEB_EXT_API_KEY`, `WEB_EXT_API_SECRET`.
