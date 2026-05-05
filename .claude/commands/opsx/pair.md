---
name: "OPSX: Pair"
description: Pair programming mode for OpenSpec changes — you write the code, the agent navigates. Use /opsx:pair or /opsx:apply --pair. Navigates task-by-task, inserts TODO(human) anchors, validates your implementation against the spec before advancing.
category: Workflow
tags: [workflow, artifacts, experimental, pair-programming]
---

Pair programming mode for an OpenSpec change. You are the **driver** — you write the code. The agent is the **navigator** — it reads the spec, briefs you on what to implement, inserts a TODO(human) anchor at the target location, then validates your contribution against the spec before advancing.

**CRITICAL NAVIGATOR CONSTRAINT**: In this mode, the agent MUST NEVER call Edit or Write on any implementation source file. The only file edits the agent may make are:
1. Inserting a `// TODO(human)` anchor comment into the target file before each contribution request
2. Removing that anchor after the contribution is validated
3. Marking `- [ ]` → `- [x]` in `tasks.md` after each task passes validation

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

3. **Navigator loop — repeat for each pending task**

   For each unchecked task (`- [ ]`) in `tasks.md`:

   **a. Parse the task**
   Read the task description and identify:
   - The target file(s) where code needs to be written (infer from task wording and codebase structure)
   - The spec requirement being satisfied (look it up in the relevant spec file from contextFiles)

   **b. Insert TODO(human) anchor — BEFORE showing the briefing**
   Read the target file. Insert the anchor at the exact location where the user should write:
   ```
   // TODO(human): <brief task description>
   ```
   If the target file does not yet exist, create it with only the anchor and any required boilerplate (imports, empty exports) but NO implementation logic.

   **c. Present the navigation briefing**
   Output the following structure — this is your navigation output, not a Learn by Doing block:

   ```
   ### Task N/M: <task description>

   **Target file:** `<path/to/file.ts>` — look for the TODO(human) comment
   **Spec requirement:** "<exact quote or close paraphrase from the spec>"
   **Acceptance criteria:**
   - <criterion 1>
   - <criterion 2>
   - <criterion 3 if applicable>
   - <criterion 4 if applicable>
   ```

   **d. Present the Learn by Doing block**
   After the briefing, present the contribution request using this exact format:

   ```
   ● **Learn by Doing**

   **Context:** <1-2 sentences on what's built so far and why this piece matters>
   **Your Task:** In `<file>`, implement <what>. Look for the `TODO(human)` comment.
   **Guidance:** <trade-offs and constraints to consider, 2-4 sentences>
   ```

   **e. STOP — wait for the user**
   Do not output anything else. Do not take any further action. Wait for the user to signal that their implementation is complete (any message works as a signal).

4. **Validate the contribution**

   When the user responds:

   a. Read the modified target file.
   b. Check whether the implementation satisfies ALL acceptance criteria stated in step 3c and the spec requirement from step 3b.
   c. Check that the `// TODO(human)` anchor is no longer present (the user should have replaced it with real code, or it will still be there if they forgot to clean it up — either way the agent removes it).

   **If all criteria are met:**
   - Remove the `// TODO(human)` anchor if it is still in the file (the user may have left it; clean it up silently)
   - Mark the task complete: change `- [ ]` to `- [x]` in `tasks.md`
   - Output a brief one-line confirmation: `✓ Task N complete — moving to next task.`
   - Continue to the next pending task (go back to step 3)

   **If one or more criteria are NOT met:**
   - Do NOT remove the anchor
   - Do NOT advance to the next task
   - Output specific, spec-referenced feedback:
     ```
     ✗ Not quite — the implementation needs adjustment before I can advance.

     **What's missing / incorrect:**
     - <specific issue 1, quoting the relevant spec requirement>
     - <specific issue 2 if applicable>

     **Next step:** <one concrete suggestion for what to fix>
     ```
   - Re-present the Learn by Doing block (step 3d) and wait again

5. **On all tasks complete**

   ```
   ## Pair Session Complete

   **Change:** <change-name>
   **Progress:** N/N tasks complete ✓

   All tasks implemented and validated against the spec. Run `/opsx:archive` to finalize.
   ```

6. **On session interrupted (user stops or error)**

   Before exiting, check whether any `// TODO(human)` anchor is still present in any source file.
   If found:
   ```
   ⚠ Session ended with a TODO(human) anchor still in place at <file>:<approx location>.
   Remove it before committing, or resume pair mode to complete that task.
   ```

---

**Guardrails**
- NEVER Edit or Write to implementation source files except for the TODO(human) anchor insertion/removal
- Always insert the TODO(human) anchor BEFORE showing the Learn by Doing block — never after
- Always read the spec file before writing acceptance criteria — do not invent criteria not grounded in the spec
- Do not advance to the next task until validation passes
- One TODO(human) anchor at a time — remove before inserting the next one
- If a task is ambiguous (can't identify target file or spec requirement), pause and ask before inserting an anchor
- If the user asks to skip validation, remind them of the pair mode contract but respect their choice and mark the task with a `[skipped validation]` note
