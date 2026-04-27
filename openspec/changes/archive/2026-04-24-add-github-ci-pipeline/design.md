## Context

The project currently has no CI. Quality checks (lint, format, tests, audit) are only run locally and manually. The goal is to gate every push to `main` and every pull request with an automated pipeline using GitHub Actions.

Package manager is `pnpm` (lockfile present). Node >=24.0.0 is required. Toolchain: Biome (lint + format), Jest (tests), pnpm audit (vulnerability scan).

## Goals / Non-Goals

**Goals:**
- Enforce lint, format compliance, test passage, and high-severity vulnerability absence on every push to `main` and every PR
- Structure the pipeline as two sequential stages: setup/security first, quality checks second
- Keep job count minimal and job responsibilities clear

**Non-Goals:**
- Build or artifact publishing (deferred to a later phase)
- Deployment or release automation
- Coverage reporting or test result artifacts

## Decisions

### Two-stage job graph with `needs`

GitHub Actions has no native "stage" concept; stages are modelled via `needs` dependencies between jobs. Stage 1 jobs run first; Stage 2 jobs declare `needs: [install-deps, audit]` to enforce ordering.

**Alternatives considered:**
- Single job with sequential steps: simpler YAML but loses parallel execution in Stage 2 and blurs separation of concerns.
- Matrix strategy: unnecessary complexity for this job count.

### Separate `install-deps` and `audit` jobs in Stage 1

`install-deps` sets up the pnpm store cache. `audit` runs after it (`needs: install-deps`) so the cache is warm and the install is confirmed clean before auditing.

`pnpm audit` only strictly needs `pnpm-lock.yaml` (already in the repo), but sequencing after install keeps the pipeline semantically coherent: audit a known-good install.

### `pnpm audit --audit-level=high`

Fail only on high-severity vulnerabilities. Low/moderate findings in transitive dependencies create noise without actionable signal. This threshold can be tightened later.

### `format:check` script in `package.json`

`biome format ./src` writes changes in place — unusable in CI. A dedicated `format:check` script (`biome format --check ./src`) exits non-zero on violations without modifying files. Defined in `package.json` so developers can run it locally before pushing.

### pnpm caching via `actions/setup-node`

`actions/setup-node` with `cache: 'pnpm'` handles pnpm store caching automatically. Stage 2 jobs restore the same cache, so each job does not re-download dependencies.

## Risks / Trade-offs

- **Flaky audit failures from transitive deps** → `--audit-level=high` mitigates noise; high-severity findings should always be investigated
- **Cache misses on lockfile changes** → acceptable: install simply re-runs and repopulates the cache
- **Stage 2 parallelism is limited by runner concurrency** → on free GitHub plans, concurrent jobs share a small pool; worst case they queue, not fail

## Migration Plan

1. Add `format:check` script to `package.json`
2. Create `.github/workflows/ci.yml`
3. Push to a PR — observe all jobs pass on the first run
4. No rollback risk: deleting the workflow file disables CI entirely
