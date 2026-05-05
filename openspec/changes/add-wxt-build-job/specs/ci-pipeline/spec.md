## ADDED Requirements

### Requirement: Stage 3 build runs only after all Stage 2 jobs complete successfully
The `build` job SHALL declare `needs: [lint, format-check, test]` and SHALL not start until all three Stage 2 jobs have passed.

#### Scenario: Stage 2 passes, Stage 3 starts
- **WHEN** all three Stage 2 jobs (`lint`, `format-check`, `test`) succeed
- **THEN** the `build` job starts

#### Scenario: Stage 2 fails, Stage 3 is skipped
- **WHEN** any Stage 2 job fails
- **THEN** the `build` job is skipped and the pipeline is marked failed

### Requirement: Stage 3 verifies the extension builds for both browser targets
The `build` job SHALL run both `pnpm build` (Chrome MV3) and `pnpm build:firefox` (Firefox MV2) and fail the pipeline if either command exits with a non-zero code.

#### Scenario: Both builds succeed
- **WHEN** `pnpm build` and `pnpm build:firefox` both exit with code 0
- **THEN** the `build` job succeeds and the pipeline passes

#### Scenario: One build fails
- **WHEN** either `pnpm build` or `pnpm build:firefox` exits with a non-zero code
- **THEN** the `build` job fails and the pipeline is marked failed
