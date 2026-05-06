## Why

The pair navigator currently runs one full briefing-wait-validate cycle per task, and `opsx:propose` generates sub-file-level tasks (individual edits within a file). Since tasks targeting the same file are logically coupled, splitting them into separate cycles creates unnecessary round-trips, slows the feedback loop, and burns tokens on repeated file reads and validations.

## What Changes

- **Task format**: Each task in `tasks.md` must begin with an explicit file tag in backtick format (`` `path/to/file.ts` ``), or `` `manual` `` for verification tasks with no source file target.
- **Task authoring (`propose.md`)**: Add a file-scoped task rule — all edits to the same file collapse into a single task; the file tag is mandatory.
- **Pair navigator (`pair.md`)**: Replace the per-task loop with a file-chunk loop — group all pending tasks by their file tag, navigate one chunk (one file) at a time, validate the whole chunk together.
- `` `manual` `` chunks: navigator shows criteria as a checklist, skips TODO anchor insertion, waits for user to confirm manually.

## Capabilities

### New Capabilities

- `task-file-annotation`: Explicit file tag format for tasks.md entries — enables machine grouping and human orientation without ambiguity.

### Modified Capabilities

- `pair-programming-apply`: Per-task navigation loop replaced by file-chunk loop. Validation now covers all tasks in a chunk simultaneously rather than individually.

## Impact

- `.claude/commands/opsx/pair.md` — navigator loop logic
- `.claude/commands/opsx/propose.md` — task authoring guidance
- `openspec/specs/pair-programming-apply/spec.md` — existing spec updated to reflect chunk-level navigation
