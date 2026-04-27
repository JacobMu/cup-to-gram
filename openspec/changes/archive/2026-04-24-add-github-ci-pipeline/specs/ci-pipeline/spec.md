## ADDED Requirements

### Requirement: Pipeline triggers on push to main and all pull requests
The CI pipeline SHALL run automatically on every push to the `main` branch and on every pull request targeting any branch.

#### Scenario: Push to main triggers pipeline
- **WHEN** a commit is pushed to `main`
- **THEN** the CI workflow is triggered and all jobs run

#### Scenario: Pull request triggers pipeline
- **WHEN** a pull request is opened, reopened, or updated with a new commit
- **THEN** the CI workflow is triggered and all jobs run

---

### Requirement: Stage 1 installs dependencies and caches the pnpm store
The `install-deps` job SHALL install all project dependencies using `pnpm install` and persist the pnpm store to the GitHub Actions cache so subsequent jobs do not re-download packages.

#### Scenario: Dependencies are installed and cached
- **WHEN** the `install-deps` job runs
- **THEN** `pnpm install` completes successfully and the pnpm store is saved to cache

#### Scenario: Cache is restored on subsequent jobs
- **WHEN** a Stage 2 job runs after `install-deps`
- **THEN** the pnpm store cache is restored, avoiding redundant downloads

---

### Requirement: Stage 1 audits dependencies for high-severity vulnerabilities
The `audit` job SHALL run `pnpm audit --audit-level=high` after `install-deps` completes and SHALL fail the pipeline if any high-severity vulnerability is found.

#### Scenario: No high-severity vulnerabilities
- **WHEN** `pnpm audit --audit-level=high` finds no high-severity issues
- **THEN** the `audit` job exits successfully

#### Scenario: High-severity vulnerability detected
- **WHEN** `pnpm audit --audit-level=high` finds at least one high-severity vulnerability
- **THEN** the `audit` job exits with a non-zero code and the pipeline fails

---

### Requirement: Stage 2 runs only after Stage 1 completes successfully
All Stage 2 jobs SHALL declare `needs: [install-deps, audit]` and SHALL not start until both Stage 1 jobs have passed.

#### Scenario: Stage 1 passes, Stage 2 starts
- **WHEN** both `install-deps` and `audit` jobs succeed
- **THEN** all three Stage 2 jobs start (in parallel)

#### Scenario: Stage 1 fails, Stage 2 is skipped
- **WHEN** either `install-deps` or `audit` fails
- **THEN** all Stage 2 jobs are skipped and the pipeline is marked failed

---

### Requirement: Stage 2 lints the codebase
The `lint` job SHALL run `pnpm lint` and fail if Biome reports any lint violations in `./src`.

#### Scenario: No lint violations
- **WHEN** `pnpm lint` finds no issues
- **THEN** the `lint` job exits successfully

#### Scenario: Lint violations present
- **WHEN** `pnpm lint` finds one or more violations
- **THEN** the `lint` job exits with a non-zero code and the pipeline fails

---

### Requirement: Stage 2 checks code formatting without modifying files
The `format-check` job SHALL run `pnpm format:check` and fail if any file in `./src` does not match Biome's expected formatting. The job SHALL NOT write any changes to the working directory.

#### Scenario: All files are correctly formatted
- **WHEN** `pnpm format:check` finds no formatting differences
- **THEN** the `format-check` job exits successfully

#### Scenario: Formatting violations present
- **WHEN** `pnpm format:check` finds files that differ from expected formatting
- **THEN** the `format-check` job exits with a non-zero code and the pipeline fails

---

### Requirement: Stage 2 runs the full test suite
The `test` job SHALL run `pnpm test` and fail if any Jest test fails.

#### Scenario: All tests pass
- **WHEN** `pnpm test` completes with no failures
- **THEN** the `test` job exits successfully

#### Scenario: One or more tests fail
- **WHEN** `pnpm test` reports at least one test failure
- **THEN** the `test` job exits with a non-zero code and the pipeline fails
