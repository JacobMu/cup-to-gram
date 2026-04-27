## ADDED Requirements

### Requirement: format:check script performs read-only format verification
The `package.json` SHALL include a `format:check` script that runs `biome format --check ./src`. The script SHALL exit with a non-zero code if any file would be changed by formatting, and SHALL NOT write any changes to disk.

#### Scenario: Correctly formatted source
- **WHEN** `pnpm format:check` is run and all files match Biome's format
- **THEN** the command exits with code 0

#### Scenario: Incorrectly formatted source
- **WHEN** `pnpm format:check` is run and one or more files differ from Biome's expected format
- **THEN** the command exits with a non-zero code and reports which files have violations
