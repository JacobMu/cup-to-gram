## Phase 1 Complete: Project Scaffolding & Tooling

Bootstrapped the Plasmo + TypeScript + Biome + Jest project from an empty repository. All tooling is wired up: `pnpm test` passes the smoke test, `pnpm build` produces a Chrome MV3 artifact, and `pnpm lint` runs cleanly with zero issues.

**Files created/changed:**
- `package.json`
- `tsconfig.json`
- `biome.json`
- `jest.config.ts`
- `src/content.ts`
- `src/__tests__/smoke.test.ts`
- `assets/icon.png`
- `pnpm-lock.yaml`

**Functions created/changed:**
- `src/content.ts` — `config: PlasmoCSConfig` export (matches `<all_urls>`), empty default export

**Tests created/changed:**
- `src/__tests__/smoke.test.ts` — `smoke > test environment loads`

**Review Status:** APPROVED

**Git Commit Message:**
```
chore: bootstrap Plasmo extension project scaffolding

- Add package.json with dev/build/test/lint/format scripts
- Configure TypeScript with strict mode and ~ path alias
- Set up Biome for formatting, linting, and import sorting
- Configure Jest with ts-jest and jsdom environment
- Add Plasmo content script stub with PlasmoCSConfig
- Add smoke test verifying Jest + ts-jest pipeline works

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```
