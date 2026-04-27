## Why

The project has no automated quality gate — broken code, lint violations, or dependency vulnerabilities can land on `main` undetected. A CI pipeline enforces these checks consistently on every push and pull request.

## What Changes

- Add `.github/workflows/ci.yml` defining a two-stage GitHub Actions pipeline
- Add `format:check` script to `package.json` for CI-safe formatting verification (read-only, exits non-zero on violations)

## Capabilities

### New Capabilities

- `ci-pipeline`: GitHub Actions workflow that runs dependency installation, vulnerability audit, lint, format check, and tests on every push to `main` and every pull request

### Modified Capabilities

- `package-scripts`: `format:check` script added to `package.json` — new read-only variant of `format` for use in automated environments

## Impact

- New file: `.github/workflows/ci.yml`
- Modified file: `package.json` (new `format:check` script)
- No runtime or extension behaviour changes
- All contributors and PRs will be subject to CI checks
