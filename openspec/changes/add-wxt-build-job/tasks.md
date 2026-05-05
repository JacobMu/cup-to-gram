## 1. CI Workflow — Build Job

- [ ] 1.1 Add a `build` job to `.github/workflows/ci.yml` with `needs: [lint, format-check, test]`
- [ ] 1.2 Add `uses: actions/checkout@v6` and `uses: ./.github/actions/job-setup` steps to the `build` job
- [ ] 1.3 Add a `run: pnpm build` step to build the Chrome MV3 target
- [ ] 1.4 Add a `run: pnpm build:firefox` step to build the Firefox MV2 target

## 2. Artifact Upload

- [ ] 2.1 Add an `actions/upload-artifact@v4` step to upload `.output/chrome-mv3/` as `extension-chrome-mv3` with `retention-days: 7`
- [ ] 2.2 Add an `actions/upload-artifact@v4` step to upload `.output/firefox-mv2/` as `extension-firefox-mv2` with `retention-days: 7`

## 3. Verification

- [ ] 3.1 Push the workflow change to a branch and confirm the `build` job appears in GitHub Actions after Stage 2 completes
- [ ] 3.2 Verify that both `extension-chrome-mv3` and `extension-firefox-mv2` artifacts are downloadable from the completed run
- [ ] 3.3 Verify the pipeline fails if the build step is broken (e.g., temporarily introduce a syntax error and confirm `build` job fails)
