## 1. Build Script

- [x] 1.1 `build.sh` Create repo-root build script that checks for node/pnpm prerequisites, installs dependencies, runs lint, runs tests, and builds Chrome and Firefox artifacts

## 2. README Updates

- [x] 2.1 `README.md` Add Build Instructions section with OS requirements, tool version requirements and installation links, and numbered step-by-step commands referencing build.sh and individual pnpm scripts

## 3. Verification

- [x] 3.1 `manual` Run `bash build.sh` from a clean state and confirm both `build/chrome-mv3/` and `build/firefox-mv2/` are produced with exit code 0
