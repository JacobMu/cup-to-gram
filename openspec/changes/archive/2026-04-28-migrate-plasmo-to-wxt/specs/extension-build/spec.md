## ADDED Requirements

### Requirement: Chrome MV3 build produces a loadable extension
The build system SHALL produce a Chrome Manifest V3 extension artifact when `wxt build` is run, with a valid `manifest.json`, bundled content script, and all required assets in `.output/chrome-mv3/`.

#### Scenario: Successful Chrome build
- **WHEN** `pnpm build` is run
- **THEN** `.output/chrome-mv3/manifest.json` exists with `manifest_version: 3` and the content script registered for `<all_urls>`

### Requirement: Firefox MV2 build produces a loadable extension
The build system SHALL produce a Firefox Manifest V2 extension artifact when `wxt build -b firefox` is run, with a valid `manifest.json` and bundled content script in `.output/firefox-mv2/`.

#### Scenario: Successful Firefox build
- **WHEN** `pnpm build:firefox` is run
- **THEN** `.output/firefox-mv2/manifest.json` exists with `manifest_version: 2` and the content script registered for `<all_urls>`

### Requirement: Dev mode enables hot-reload during development
The build system SHALL provide a hot-reload development server when `wxt dev` is run, watching source files and rebuilding on change.

#### Scenario: Dev server starts without error
- **WHEN** `pnpm dev` is run
- **THEN** the WXT dev server starts, outputs a ready message, and the extension is loadable in the browser

### Requirement: Content script matches all URLs
The content script SHALL be declared with `matches: ["<all_urls>"]` so it runs on every page the user visits.

#### Scenario: Manifest declares universal match
- **WHEN** either Chrome or Firefox build completes
- **THEN** the generated `manifest.json` content_scripts entry includes `"<all_urls>"` in its matches array
