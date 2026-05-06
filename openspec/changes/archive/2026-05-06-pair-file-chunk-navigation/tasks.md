## 1. Task Authoring

- [x] 1.1 `.claude/commands/opsx/propose.md` Add file-scoped task grouping rule and mandatory backtick file tag to task authoring guidance — all edits to the same file collapse into one task; multi-file changes split into one task per file; `manual` tag for verification tasks

## 2. Pair Navigator

- [x] 2.1 `.claude/commands/opsx/pair.md` Replace per-task navigator loop with file-chunk loop: on session start group all pending tasks by file tag (preserving order of first appearance), then for each chunk insert one TODO(human) anchor per task, present a combined briefing with all spec requirements and acceptance criteria, wait, validate the whole chunk together, mark all tasks complete; for `manual` chunks skip anchor insertion and show criteria as checklist; fall back to per-task navigation for untagged tasks

## 3. Verification

- [ ] 3.1 `manual` Invoke `/opsx:pair` on the active `add-wxt-build-job` change — confirm the navigator groups tasks 1.1–1.4 (all `.github/workflows/ci.yml`) into one chunk and runs a single briefing-wait-validate cycle for them
- [ ] 3.2 `manual` Invoke `/opsx:propose` for a small hypothetical change — confirm the generated tasks.md has backtick file tags on every task and collapses same-file edits into single tasks
