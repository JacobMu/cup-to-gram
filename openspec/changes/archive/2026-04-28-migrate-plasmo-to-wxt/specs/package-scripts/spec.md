## MODIFIED Requirements

### Requirement: format:check script performs read-only format verification
The `package.json` SHALL include a `format:check` script that runs `biome format --check ./src`. The script SHALL exit with a non-zero code if any file would be changed by formatting, and SHALL NOT write any changes to disk.

#### Scenario: Correctly formatted source
- **WHEN** `pnpm format:check` is run and all files match Biome's format
- **THEN** the command exits with code 0

#### Scenario: Incorrectly formatted source
- **WHEN** `pnpm format:check` is run and one or more files differ from Biome's expected format
- **THEN** the command exits with a non-zero code and reports which files have violations

## ADDED Requirements

### Requirement: dev script starts WXT development server
The `package.json` SHALL include a `dev` script that runs `wxt dev`. The previous `plasmo dev` command SHALL be removed.

#### Scenario: Dev server starts via pnpm dev
- **WHEN** `pnpm dev` is run
- **THEN** the WXT dev server starts successfully

### Requirement: build script produces Chrome MV3 artifact via WXT
The `package.json` SHALL include a `build` script that runs `wxt build`. The previous `plasmo build` command SHALL be removed.

#### Scenario: Chrome build via pnpm build
- **WHEN** `pnpm build` is run
- **THEN** WXT builds the Chrome MV3 artifact into `.output/chrome-mv3/`

### Requirement: build:firefox script produces Firefox MV2 artifact
The `package.json` SHALL include a `build:firefox` script that runs `wxt build -b firefox`.

#### Scenario: Firefox build via pnpm build:firefox
- **WHEN** `pnpm build:firefox` is run
- **THEN** WXT builds the Firefox MV2 artifact into `.output/firefox-mv2/`

### Requirement: prepare script runs wxt prepare after install
The `package.json` SHALL include a `prepare` script that runs `wxt prepare`, ensuring `.wxt/tsconfig.json` and type stubs are generated after `pnpm install`.

#### Scenario: Types available after fresh install
- **WHEN** `pnpm install` is run in a clean checkout
- **THEN** `.wxt/tsconfig.json` exists and WXT global types are resolvable by TypeScript
