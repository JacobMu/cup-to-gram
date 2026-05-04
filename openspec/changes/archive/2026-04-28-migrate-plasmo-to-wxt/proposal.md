## Why

Plasmo is effectively unmaintained (last release 11 months ago) with two unpatched high-severity CVEs in its build toolchain: `msgpackr` DoS via infinite recursion and `content-security-policy-parser` prototype pollution with potential RCE. Replacing it with WXT eliminates the security debt, restores an active maintenance path, and adds proper Firefox MV2 support alongside Chrome MV3.

## What Changes

- Remove `plasmo` dependency; add `wxt`
- Move `src/content.ts` → `src/entrypoints/content.ts` with WXT's `defineContentScript()` API
- Add `wxt.config.ts` as the explicit extension manifest/config file
- Update `tsconfig.json` to drop `plasmo/templates/tsconfig.base` extension
- Update `package.json` scripts: `plasmo dev` → `wxt dev`, `plasmo build` → `wxt build`, add `build:firefox` target
- Remove generated `.plasmo/` directory; WXT generates `.wxt/` and outputs to `.output/`
- Update `.gitignore` for new generated paths

## Capabilities

### New Capabilities

- `extension-build`: WXT-based build pipeline replacing Plasmo — covers dev mode, Chrome MV3 build, and Firefox MV2 build

### Modified Capabilities

- `package-scripts`: Script names change (`plasmo dev/build` → `wxt dev/build`) and a new `build:firefox` script is added

## Impact

- **Dependencies**: `plasmo` removed, `wxt` added
- **Entry point**: `src/content.ts` relocated and lightly refactored (wrapper API only)
- **Build output**: `.plasmo/` and `build/` replaced by `.wxt/` and `.output/`
- **CI**: Any pipeline referencing `plasmo build` must update to `wxt build`
- **Feature modules** (`src/features/**`): **untouched** — zero framework coupling
- **Tests** (`jest`, `ts-jest`, `jest-environment-jsdom`): **untouched** — fully independent of the build framework
