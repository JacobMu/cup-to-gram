## ADDED Requirements

### Requirement: README documents operating system and environment requirements
The README SHALL include a Build Instructions section that specifies the supported operating systems (macOS, Linux) and the required versions of Node.js (≥ 24.0.0) and pnpm (≥ 10.0.0), with links to their respective installation pages.

#### Scenario: Reviewer reads OS requirements
- **WHEN** a reviewer opens `README.md` and navigates to the Build Instructions section
- **THEN** they SHALL find the supported operating systems listed and the minimum Node.js and pnpm versions stated explicitly

#### Scenario: Reviewer finds installation links
- **WHEN** a reviewer needs to install Node.js or pnpm
- **THEN** the README SHALL provide direct links to `https://nodejs.org` and `https://pnpm.io/installation`

---

### Requirement: README provides step-by-step build instructions
The README SHALL contain numbered steps that guide a reviewer from a clean checkout to a fully built extension artifact for both Chrome and Firefox without requiring prior knowledge of the project.

#### Scenario: Chrome artifact produced by following README steps
- **WHEN** a reviewer follows every step in the Build Instructions section on a clean checkout
- **THEN** a Chrome MV3 artifact SHALL exist at `build/chrome-mv3/` after step completion

#### Scenario: Firefox artifact produced by following README steps
- **WHEN** a reviewer follows every step in the Build Instructions section on a clean checkout
- **THEN** a Firefox MV2 artifact SHALL exist at `build/firefox-mv2/` after step completion

---

### Requirement: A `build.sh` script executes all technical build steps non-interactively
A `build.sh` file SHALL exist at the repository root and SHALL install dependencies, run the linter, run the test suite, and produce both browser artifacts when executed from a clean checkout with no additional arguments.

#### Scenario: Script succeeds on clean checkout
- **WHEN** a reviewer runs `bash build.sh` from the repository root on a machine with Node ≥ 24 and pnpm ≥ 10 installed
- **THEN** the script SHALL exit with code 0 and both `build/chrome-mv3/` and `build/firefox-mv2/` SHALL exist

#### Scenario: Script fails fast on missing prerequisite
- **WHEN** `node` or `pnpm` is not found on PATH when `build.sh` is invoked
- **THEN** the script SHALL print a human-readable error message identifying the missing tool and exit with a non-zero code before attempting any build step

#### Scenario: Script fails fast on test failure
- **WHEN** one or more Vitest tests fail during the script run
- **THEN** the script SHALL exit with a non-zero code and SHALL NOT proceed to the build step
