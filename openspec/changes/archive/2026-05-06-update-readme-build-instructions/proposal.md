## Why

The extension's README lacks the build instructions required by browser extension stores (Chrome Web Store, Firefox Add-ons) for source code review. Reviewers need step-by-step build instructions, environment requirements, and a build script to reproduce the exact extension artifact from source.

## What Changes

- Expand `README.md` with a dedicated **Build Instructions** section covering OS requirements, tool versions, install steps, and per-browser build commands.
- Add a `build.sh` shell script that executes every technical step needed to reproduce the extension artifact from a clean checkout, without any manual intervention.

## Capabilities

### New Capabilities

- `build-instructions`: Step-by-step README section and a reproducible `build.sh` script covering environment requirements (OS, Node ≥ 24, pnpm), dependency installation, linting, testing, and Chrome/Firefox artifact generation.

### Modified Capabilities

<!-- None — no existing spec-level behavior is changing. -->

## Impact

- `README.md`: new **Build Instructions** section added (no existing sections removed).
- `build.sh`: new file at repo root, executable, wrapping existing `pnpm` scripts.
- No source code, tests, or CI changes.
