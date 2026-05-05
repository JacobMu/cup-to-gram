## ADDED Requirements

### Requirement: CI build job produces a Chrome MV3 extension artifact
The `build` job SHALL run `pnpm build` and produce a valid Chrome MV3 extension in `.output/chrome-mv3/`, then upload the directory as a GitHub Actions artifact named `extension-chrome-mv3`.

#### Scenario: Chrome build succeeds and artifact is uploaded
- **WHEN** the `build` job runs and `pnpm build` exits with code 0
- **THEN** `.output/chrome-mv3/manifest.json` exists and a GitHub Actions artifact named `extension-chrome-mv3` is uploaded containing the directory contents

#### Scenario: Chrome build fails
- **WHEN** `pnpm build` exits with a non-zero code
- **THEN** the `build` job fails and no artifact is uploaded

### Requirement: CI build job produces a Firefox MV2 extension artifact
The `build` job SHALL run `pnpm build:firefox` and produce a valid Firefox MV2 extension in `.output/firefox-mv2/`, then upload the directory as a GitHub Actions artifact named `extension-firefox-mv2`.

#### Scenario: Firefox build succeeds and artifact is uploaded
- **WHEN** the `build` job runs and `pnpm build:firefox` exits with code 0
- **THEN** `.output/firefox-mv2/manifest.json` exists and a GitHub Actions artifact named `extension-firefox-mv2` is uploaded containing the directory contents

#### Scenario: Firefox build fails
- **WHEN** `pnpm build:firefox` exits with a non-zero code
- **THEN** the `build` job fails and no Firefox artifact is uploaded

### Requirement: Build artifacts are retained for 7 days
Uploaded GitHub Actions artifacts SHALL have a retention period of 7 days.

#### Scenario: Artifact retention is set
- **WHEN** either extension artifact is uploaded
- **THEN** the artifact expires automatically after 7 days
