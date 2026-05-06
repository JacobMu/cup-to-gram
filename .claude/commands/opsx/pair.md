---
name: "OPSX: Pair"
description: Pair programming mode for OpenSpec changes — you write the code, the agent navigates. Use /opsx:pair or /opsx:apply --pair. Navigates task-by-task, inserts TODO(human) anchors, validates your implementation against the spec before advancing.
category: Workflow
tags: [workflow, artifacts, experimental, pair-programming]
---

Pair programming mode for an OpenSpec change. You are the **driver** — you write the code. The agent is the **navigator** — it reads the spec, groups tasks by target file, briefs you on the whole file chunk, inserts TODO(human) anchors, then validates your contribution against the spec before advancing.

**CRITICAL NAVIGATOR CONSTRAINT**: In this mode, the agent MUST NEVER call Edit or Write on any implementation source file. The only file edits the agent may make are:
1. Inserting `// TODO(human)` anchor comments into the target file before each chunk contribution request
2. Removing those anchors after the chunk is validated
3. Marking `- [ ]` → `- [x]` in `tasks.md` after each chunk passes validation

Violating this constraint defeats the purpose of pair mode.

---

**Input**: Optionally specify a change name (e.g., `/opsx:pair add-auth`). If omitted, infer from conversation context or prompt.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` and ask the user to select

   Announce: "Pair mode active — change: <name>. You write the code; I navigate."

2. **Get apply instructions and read context files**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   Read every file path listed under `contextFiles`. Handle states:
   - `state: "blocked"`: show message, suggest `/opsx:propose` or `/opsx:explore`
   - `state: "all_done"`: congratulate, suggest `/opsx:archive`
   - Otherwise: proceed to the navigator loop

3. **Build the chunk map — BEFORE starting navigation**

   Read all pending tasks (`- [ ]`) from `tasks.md`. For each task, extract the file tag:
   - The file tag is the first backtick-wrapped token in the task description, e.g. `` `src/features/parser.ts` ``
   - If the tag is `` `manual` ``, the chunk is a manual verification chunk (no anchor insertion)
   - If no backtick tag is present, treat as a single-task chunk (fallback — per-task navigation)

   Group tasks into an **ordered chunk list**, preserving the order of first appearance of each file tag:

   ```
   chunk map (example):
   ┌─────────────────────────────┬────────────────────┐
   │ .github/workflows/ci.yml    │ tasks 1.1, 1.2,    │
   │                             │ 1.3, 1.4, 2.1, 2.2 │
   ├─────────────────────────────┼────────────────────┤
   │ manual                      │ task 3.1, 3.2, 3.3 │
   └─────────────────────────────┴────────────────────┘
   ```

   Show a brief chunk summary to orient the user:
   ```
   Chunk plan:
   - Chunk 1: `path/to/file.ts` (tasks 1.1–1.3)
   - Chunk 2: `manual` (tasks 2.1–2.2)
   ```

4. **Navigator loop — repeat for each chunk**

   For each chunk in the ordered chunk list:

   **a. Parse all tasks in the chunk**
   Read each task description and identify:
   - The spec requirement being satisfied (look it up in the relevant spec file from contextFiles)
   - The acceptance criteria for each task

   **b. For source-file chunks — insert ALL TODO(human) anchors BEFORE showing the briefing**
   Read the target file. For each task in the chunk, insert one anchor at the exact location where the user should write:
   ```
   // TODO(human): <brief task description>
   ```
   Insert anchors in dependency order (what must be written first). If the target file does not yet exist, create it with only the anchors and any required boilerplate (imports, empty exports) but NO implementation logic.

   **For `manual` chunks** — skip anchor insertion entirely.

   **c. Present the navigation briefing**
   Output the following structure:

   ```
   ### Chunk N/M: `<target-file>` — tasks <X.X–X.X>

   **Target file:** `<path/to/file.ts>` — look for the TODO(human) comments
   **Spec requirements:**
   - "<exact quote or close paraphrase from the spec for task X.X>"
   - "<spec requirement for task X.Y>"
   **Acceptance criteria:**
   - <criterion from task X.X>
   - <criterion from task X.Y>
   - <combined criterion if applicable>
   ```

   For `manual` chunks, replace "Target file" with "Verification checklist" and list the manual steps.

   **d. Present the Learn by Doing block**
   After the briefing, present the contribution request using this exact format:

   ```
   ● **Learn by Doing**

   **Context:** <1-2 sentences on what's built so far and why this chunk matters>
   **Your Task:** In `<file>`, implement <what — covering all tasks in this chunk>. Look for the `TODO(human)` comments.
   **Guidance:** <trade-offs and constraints to consider, 2-4 sentences>
   ```

   For `manual` chunks, omit the Learn by Doing block and instead write:
   ```
   ● **Manual verification required**
   Complete the checklist above, then reply when done.
   ```

   **e. STOP — wait for the user**
   Do not output anything else. Do not take any further action. Wait for the user to signal that their implementation (or manual verification) is complete.

5. **Validate the chunk**

   When the user responds:

   a. Read the modified target file (skip for `manual` chunks).
   b. Check whether the implementation satisfies ALL acceptance criteria for EVERY task in the chunk, and the spec requirements from step 4a.
   c. Check that all `// TODO(human)` anchors for this chunk are no longer blocking (the user may have replaced them with real code, or left them — either way the agent removes them after validation passes).

   **If all criteria are met:**
   - Remove ALL `// TODO(human)` anchors that belong to this chunk (silently)
   - Mark ALL tasks in the chunk complete: change `- [ ]` to `- [x]` in `tasks.md`
   - Output a brief one-line confirmation: `✓ Chunk N complete — moving to next chunk.`
   - Continue to the next pending chunk (go back to step 4)

   **If one or more criteria are NOT met:**
   - Do NOT remove any anchors
   - Do NOT advance to the next chunk
   - Do NOT mark any tasks complete
   - Output specific, spec-referenced feedback:
     ```
     ✗ Not quite — the chunk needs adjustment before I can advance.

     **What's missing / incorrect:**
     - <specific issue 1, quoting the relevant spec requirement and task>
     - <specific issue 2 if applicable>

     **Next step:** <one concrete suggestion for what to fix>
     ```
   - Re-present the Learn by Doing block (step 4d) and wait again

6. **On all chunks complete**

   ```
   ## Pair Session Complete

   **Change:** <change-name>
   **Progress:** N/N tasks complete ✓

   All tasks implemented and validated against the spec. Run `/opsx:archive` to finalize.
   ```

7. **On session interrupted (user stops or error)**

   Before exiting, check whether any `// TODO(human)` anchor is still present in any source file.
   If found:
   ```
   ⚠ Session ended with TODO(human) anchors still in place at <file>.
   Remove them before committing, or resume pair mode to complete that chunk.
   ```

---

**Guardrails**
- NEVER Edit or Write to implementation source files except for TODO(human) anchor insertion/removal
- Always build the full chunk map BEFORE inserting any anchors or showing any briefing
- Always insert ALL anchors for a chunk BEFORE showing the Learn by Doing block — never after
- Always read the spec file before writing acceptance criteria — do not invent criteria not grounded in the spec
- Do not advance to the next chunk until validation passes for ALL tasks in the current chunk
- Multiple TODO(human) anchors in one file are allowed when a chunk has multiple tasks
- Remove ALL chunk anchors together after validation passes — never leave partial anchors
- If a task has no backtick file tag, navigate it individually as a single-task chunk
- If a task is ambiguous (can't identify target file or spec requirement), pause and ask before inserting anchors
- If the user asks to skip validation, remind them of the pair mode contract but respect their choice and mark the tasks with a `[skipped validation]` note
