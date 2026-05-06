## Context

The pair navigator (`pair.md`) runs one full briefing-wait-validate cycle per task item in `tasks.md`. The task authoring skill (`propose.md`) follows CLI instructions that encourage small, atomic tasks — routinely producing 3–5 subtasks all targeting the same file. Each subtask gets its own cycle, multiplying token cost and feedback latency with no gain in spec coverage.

The fix operates at two levels: task format (explicit file tags) and navigator strategy (chunk-based loop).

## Goals / Non-Goals

**Goals:**
- Reduce pair-mode cycles by grouping same-file tasks into a single briefing-wait-validate round
- Make target files machine-readable via explicit tags in `tasks.md`
- Handle verification tasks (no source file) without breaking the chunk loop
- Keep the change backward-compatible with existing tasks.md files that lack file tags (graceful fallback)

**Non-Goals:**
- Changing the `openspec` CLI or its instructions endpoint
- Altering non-pair apply flow (`apply.md`)
- Auto-merging tasks across different files into one task

## Decisions

### Decision 1: Explicit file tag format

**Chosen**: Each task description starts with a backtick-wrapped file path: `` `path/to/file.ts` Task description ``.

**Alternatives considered:**
- *Implicit inference*: Navigator parses file name from task prose. Rejected — fragile; file paths aren't always mentioned, and LLM inference varies.
- *Subheading grouping*: Group tasks under `### path/to/file.ts` headers. Rejected — breaks the existing numbered section structure and is harder to parse without restructuring tasks.md.

**Rationale**: Backtick prefix is unambiguous, visually distinct, and easy to parse with a simple regex. It doesn't break existing checkbox format that `apply.md` uses for progress tracking.

### Decision 2: `manual` tag for verification tasks

**Chosen**: Tasks with no source file use `` `manual` `` as their tag. Navigator shows them as a checklist with no TODO anchor, waits for user confirmation, then marks complete.

**Rationale**: Verification tasks (e.g., "push branch and confirm CI runs") are real tasks that need to be tracked, but they have no code target. A dedicated tag keeps the chunk loop uniform while signaling the navigator to skip anchor insertion.

### Decision 3: Chunk = all tasks sharing the same file tag

**Chosen**: After reading `tasks.md`, the navigator groups all pending tasks by their file tag. Each unique file tag = one chunk. Navigation proceeds chunk by chunk, not task by task.

**Chunk loop shape:**
1. Group remaining `- [ ]` tasks by file tag
2. For each chunk (ordered by first appearance in tasks.md):
   - Insert one `// TODO(human): <task N.N>` anchor per task in the file (multiple anchors OK, same file)
   - Present a combined briefing: list all spec requirements and acceptance criteria for the chunk
   - Wait for user
   - Validate the whole file against all criteria
   - Mark all chunk tasks `[x]`, remove all anchors
3. For `manual` chunks: skip anchor insertion, show criteria as checklist, wait for explicit "done" signal

### Decision 4: Fallback for untagged tasks

If a task has no backtick file tag (legacy tasks.md or manual omission), treat it as its own single-task chunk and navigate it individually — same behavior as before. This keeps the change non-breaking for existing changes in flight.

### Decision 5: propose.md task authoring rule

Add an explicit rule to `propose.md` that overrides the CLI's "small" nudge: **group all edits to the same file into a single task**. The file tag is mandatory. The task description enumerates what needs to happen within that file.

This shifts granularity from per-edit to per-file, which aligns with how a human driver naturally works (they open one file, implement everything there, then move on).

## Risks / Trade-offs

- **Chunked validation is coarser** → If a user implements task 1.1 correctly but 1.2 incorrectly, the navigator flags the whole chunk. Mitigated by per-criterion feedback in the validation output.
- **File tag discipline requires authoring care** → If propose.md generates tasks without tags, the fallback kicks in and pair mode reverts to per-task behavior. Mitigated by making the tag rule prominent in propose.md.
- **Multi-file tasks** → Some tasks may touch two files (e.g., "add function to util.ts and export from index.ts"). The tag format supports only one file. These should be split into two tasks with separate tags at authoring time. Document this in the propose.md rule.
