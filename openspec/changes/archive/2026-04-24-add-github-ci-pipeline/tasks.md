## 1. package.json

- [x] 1.1 Add `format:check` script (`biome format --check ./src`) to `package.json`

## 2. GitHub Actions workflow

- [x] 2.1 Create `.github/workflows/ci.yml` with `on` triggers for push to `main` and `pull_request`
- [x] 2.2 Add `install-deps` job: checkout, setup Node 24 with pnpm cache, run `pnpm install`
- [x] 2.3 Add `audit` job: checkout, restore cache, run `pnpm audit --audit-level=high`; set `needs: [install-deps]`
- [x] 2.4 Add `lint` job: checkout, restore cache, run `pnpm lint`; set `needs: [install-deps, audit]`
- [x] 2.5 Add `format-check` job: checkout, restore cache, run `pnpm format:check`; set `needs: [install-deps, audit]`
- [x] 2.6 Add `test` job: checkout, restore cache, run `pnpm test`; set `needs: [install-deps, audit]`

## 3. Verification

- [x] 3.1 Push branch to GitHub and confirm all six jobs appear and pass in the Actions tab
