## 1. Skill Entry Point

- [x] 1.1 Create a new `opsx:pair` skill file (or add `--pair` argument handling to `opsx:apply`) that branches into pair mode
- [x] 1.2 Add argument parsing so `/opsx:apply --pair` routes to the pair mode loop instead of the autonomous loop

## 2. Navigator Loop Core

- [x] 2.1 Implement the task-read step: agent reads the current unchecked task from `tasks.md` and identifies the target file and spec requirement
- [x] 2.2 Implement the navigation briefing output: relevant file(s), spec requirement quote, and 2-4 acceptance criteria
- [x] 2.3 Implement TODO(human) anchor insertion at the identified target location before issuing the Learn by Doing block
- [x] 2.4 Implement the wait-for-user step: agent halts and waits for the user to signal completion

## 3. Validation and Advance

- [x] 3.1 Implement post-contribution file read and spec-level validation against task acceptance criteria
- [x] 3.2 Implement the approval path: remove TODO(human) anchor, mark task checkbox complete in `tasks.md`, advance to next task
- [x] 3.3 Implement the rejection path: provide specific spec-referenced feedback and re-issue the contribution request without advancing

## 4. Guardrails

- [x] 4.1 Add a check that prevents the agent from calling Edit/Write on implementation files during pair mode (navigator-only enforcement)
- [x] 4.2 Add cleanup: if the session ends with a TODO(human) still present, surface a warning to the user

## 5. Skill Documentation

- [x] 5.1 Update the skill's trigger description and usage examples to document the `--pair` flag and pair mode behavior
- [x] 5.2 Add a brief "pair mode" section to CLAUDE.md or the relevant skill README describing the driver/navigator roles
