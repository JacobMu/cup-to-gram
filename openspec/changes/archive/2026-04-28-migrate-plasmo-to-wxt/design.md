## Context

cup-to-gram is a content-script-only browser extension with no popup, options page, or background service worker. The entire extension logic lives in four pure-TypeScript feature modules (`conversion`, `unit-detection`, `ingredient-matching`, `dom-traversal`). Plasmo's only role is bundling the single entry point (`src/content.ts`) and generating the manifest. This thin coupling makes the migration low-risk.

Current Plasmo version: `0.90.5`. Last upstream release: ~11 months ago. Two unpatched high CVEs remain in the build toolchain.

## Goals / Non-Goals

**Goals:**
- Replace Plasmo with WXT as the build framework
- Retain Chrome MV3 support
- Add Firefox MV2 build capability
- Keep all feature modules and tests unchanged

**Non-Goals:**
- Adding a popup, options page, or background worker
- Changing extension behaviour in any way
- Setting up CI builds (CI is currently empty; out of scope)
- Migrating to a different test runner or linter

## Decisions

### 1. Entry point: `src/entrypoints/content.ts` with `defineContentScript()`

WXT requires content scripts to live in `src/entrypoints/`. The file uses `defineContentScript()` instead of Plasmo's `export const config` + `export default` convention.

```ts
// Before (Plasmo)
import type { PlasmoCSConfig } from "plasmo";
export const config: PlasmoCSConfig = { matches: ["<all_urls>"] };
export default function () { ... }

// After (WXT)
export default defineContentScript({
  matches: ["<all_urls>"],
  main() { ... },
});
```

`defineContentScript` is a global injected by WXT at build time — no import needed.

**Alternative considered:** Keep file at `src/content.ts` with a custom WXT entrypoint config. Rejected — WXT's convention is `src/entrypoints/`, deviating adds complexity for no benefit.

### 2. `wxt.config.ts` for manifest metadata

Extension name, description, and version currently come from `package.json` fields Plasmo reads automatically. WXT also reads `package.json` name/version but requires an explicit config file for anything beyond defaults.

A minimal `wxt.config.ts` at the root will declare the manifest fields and browser targets:

```ts
import { defineConfig } from "wxt";
export default defineConfig({
  manifest: {
    name: "Cup to Gram",
    description: "Browser extension that converts cup measurements to grams on recipe websites",
  },
});
```

### 3. `tsconfig.json` base: drop Plasmo, use WXT's

Plasmo ships `plasmo/templates/tsconfig.base`. WXT ships `.wxt/tsconfig.json` (auto-generated) and recommends extending it. The existing `~/*` path alias is preserved in `compilerOptions.paths`.

**Important:** WXT generates `.wxt/tsconfig.json` on first `wxt dev`/`wxt build`, so the extends path won't resolve until after the first build. For editor support from day one, `wxt prepare` must be run after install.

### 4. Build output paths

| | Plasmo | WXT |
|---|---|---|
| Generated types | `.plasmo/` | `.wxt/` |
| Build output | `build/` | `.output/` |

`.gitignore` must be updated to replace `.plasmo/` and `build/` with `.wxt/` and `.output/`.

### 5. `package.json` scripts

| Script | Before | After |
|---|---|---|
| `dev` | `plasmo dev` | `wxt dev` |
| `build` | `plasmo build` | `wxt build` |
| `build:firefox` | _(missing)_ | `wxt build -b firefox` |

`prepare` script (`wxt prepare`) ensures `.wxt/tsconfig.json` is generated after `pnpm install`, fixing editor type resolution.

## Risks / Trade-offs

**WXT global types not available before first build** → Mitigation: add `wxt prepare` as a `prepare` npm script so it runs automatically after install.

**`defineContentScript` is a build-time global (no import)** → Mitigation: `tsconfig.json` extending `.wxt/tsconfig.json` includes WXT's type definitions; TypeScript will resolve it correctly after `wxt prepare`.

**`.output/` path differs from old `build/`** → Mitigation: update `.gitignore` and any documentation references in the same PR; no external systems depend on this path yet.

**Firefox MV2 manifest differences** → WXT handles MV2/MV3 differences automatically via its browser-target flag. No manual manifest branching needed for a content-script-only extension.

## Migration Plan

1. Install WXT, uninstall Plasmo (`package.json` deps + scripts)
2. Add `wxt prepare` as `prepare` script; run it to generate `.wxt/`
3. Move entry point: `src/content.ts` → `src/entrypoints/content.ts`, replace Plasmo exports with `defineContentScript()`
4. Add `wxt.config.ts`
5. Update `tsconfig.json`: extend `.wxt/tsconfig.json`, keep `~/*` alias
6. Update `.gitignore`
7. Verify: `wxt build` (Chrome), `wxt build -b firefox` (Firefox), `pnpm test` (all green)

Rollback: revert the commit. No database migrations, no external state.

## Open Questions

None — migration scope is fully understood.
