## Context

The extension is built with the `wxt` framework targeting Chrome MV3 and Firefox MV2. The package manager is `pnpm` (v10+), Node ≥ 24 is required (declared in `package.json` `engines`). All build steps are already exposed as `pnpm` scripts; the gap is that none of this is documented in a way a reviewer or new contributor can follow without inspecting `package.json` and CI configs.

## Goals / Non-Goals

**Goals:**
- Add a self-contained **Build Instructions** section to `README.md` covering OS, tool versions, install, test, lint, and per-browser build commands.
- Provide a `build.sh` script at the repo root that a reviewer can run from a clean checkout to reproduce both browser artifacts deterministically.

**Non-Goals:**
- Changes to the actual build pipeline, CI, or source code.
- Docker-based or fully hermetic build environments (overkill for a browser extension).
- Windows batch / PowerShell equivalents (POSIX shell is sufficient for store reviewers).

## Decisions

**`build.sh` wraps existing `pnpm` scripts — no new build logic.**
Rationale: the source of truth for build commands is `package.json`. Duplicating logic in a shell script risks drift. The script's job is orchestration (check prerequisites, install, lint, test, build) not re-implementing build steps.

**Pin tool versions in README prose, not in tooling config.**
Rationale: `engines.node` in `package.json` already enforces the Node constraint at install time. Repeating it in README is documentation, not enforcement — keeps the README usable without changing any config.

**One `build.sh` produces both Chrome and Firefox artifacts sequentially.**
Rationale: store reviewers typically want to verify a single artifact. Running both keeps the script complete and avoids reviewer confusion about which command to use.

## Risks / Trade-offs

- **Tool version drift**: README documents versions at time of writing; if Node or pnpm requirements change the README must be updated manually. → Mitigation: `engines` field in `package.json` acts as a machine-readable source of truth; README references it explicitly.
- **`build.sh` is POSIX-only**: Windows users cannot run it directly. → Acceptable — browser extension store reviewers work on Linux/macOS; Windows contributors can read the README prose.

## Migration Plan

No migration needed — purely additive documentation and script changes.
