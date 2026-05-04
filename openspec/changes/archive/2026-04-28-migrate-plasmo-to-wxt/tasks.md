## 1. Dependencies

- [x] 1.1 Remove `plasmo` from `dependencies` in `package.json`
- [x] 1.2 Add `wxt` to `devDependencies` in `package.json`
- [x] 1.3 Run `pnpm install` to update lockfile

## 2. Package Scripts

- [x] 2.1 Replace `"dev": "plasmo dev"` with `"dev": "wxt dev"` in `package.json`
- [x] 2.2 Replace `"build": "plasmo build"` with `"build": "wxt build"` in `package.json`
- [x] 2.3 Add `"build:firefox": "wxt build -b firefox"` to `package.json` scripts
- [x] 2.4 Add `"prepare": "wxt prepare"` to `package.json` scripts

## 3. WXT Configuration

- [x] 3.1 Create `wxt.config.ts` at project root with `defineConfig({ manifest: { name, description } })`
- [x] 3.2 Run `pnpm run prepare` (or `wxt prepare`) to generate `.wxt/tsconfig.json` and type stubs

## 4. Entry Point Migration

- [x] 4.1 Create `src/entrypoints/` directory
- [x] 4.2 Move `src/content.ts` to `src/entrypoints/content.ts`
- [x] 4.3 Remove `import type { PlasmoCSConfig } from "plasmo"` and the `export const config` declaration
- [x] 4.4 Wrap the entry point body with `export default defineContentScript({ matches: ["<all_urls>"], main() { ... } })`

## 5. TypeScript Configuration

- [x] 5.1 Update `tsconfig.json`: change `extends` from `"plasmo/templates/tsconfig.base"` to `"./.wxt/tsconfig.json"`
- [x] 5.2 Verify `compilerOptions.paths` still contains `"~/*": ["./src/*"]` (provided by `.wxt/tsconfig.json`)
- [x] 5.3 Update `tsconfig.json` `include` array: replace `.plasmo/index.d.ts` with `.wxt/wxt.d.ts` (or remove if WXT's tsconfig includes it)

## 6. Gitignore Cleanup

- [x] 6.1 Replace `.plasmo` entry with `.wxt` in `.gitignore`
- [x] 6.2 Replace `build/` entry with `.output/` in `.gitignore`

## 7. Verification

- [x] 7.1 Run `pnpm build` — confirm `.output/chrome-mv3/manifest.json` exists with `manifest_version: 3` and `<all_urls>` match
- [x] 7.2 Run `pnpm build:firefox` — confirm `.output/firefox-mv2/manifest.json` exists with `manifest_version: 2` and `<all_urls>` match
- [x] 7.3 Run `pnpm test` — confirm all tests pass unchanged
- [x] 7.4 Run `pnpm audit --audit-level=high` — confirm the two high CVEs are gone
- [x] 7.5 Delete leftover `.plasmo/` and `build/` directories if present
