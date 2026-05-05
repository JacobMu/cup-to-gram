### Requirement: Agent acts as navigator only
In pair programming mode, the agent SHALL never write, edit, or overwrite implementation code in the project. It MAY only insert TODO(human) anchor comments and remove them after validation.

#### Scenario: Agent refrains from implementation
- **WHEN** pair mode is active and a task requires new code
- **THEN** the agent inserts a TODO(human) anchor at the target location and presents a Learn by Doing guidance block, then stops and waits for the user

#### Scenario: Agent removes anchor after validation
- **WHEN** the user signals their implementation is complete and the agent validates it
- **THEN** the agent removes the TODO(human) comment from the file before advancing to the next task

### Requirement: Per-task navigation briefing
Before requesting a user contribution, the agent SHALL provide a navigation briefing that includes the relevant file(s) and location, the spec requirement being satisfied, and the acceptance criteria.

#### Scenario: Navigation briefing content
- **WHEN** the agent begins a new task in pair mode
- **THEN** the briefing MUST identify the target file and approximate location, quote or paraphrase the relevant spec requirement, and list 2-4 concrete acceptance criteria the user's code must satisfy

#### Scenario: Navigation briefing precedes TODO anchor
- **WHEN** the agent issues a navigation briefing
- **THEN** the TODO(human) anchor MUST already be present in the file before the Learn by Doing block is shown to the user

### Requirement: Spec-level validation before advancing
After a user contribution, the agent SHALL validate the implementation against the task's acceptance criteria and the relevant spec requirement before marking the task complete and moving to the next one.

#### Scenario: Contribution passes validation
- **WHEN** the user signals completion and the implementation satisfies the spec requirement and acceptance criteria
- **THEN** the agent removes the TODO(human) anchor, marks the task complete, and proceeds to the next task

#### Scenario: Contribution fails validation
- **WHEN** the user signals completion but the implementation does not satisfy one or more acceptance criteria
- **THEN** the agent provides specific, spec-referenced feedback identifying what is missing or incorrect, and re-requests the contribution without advancing

### Requirement: Pair mode is opt-in and session-scoped
Pair programming mode SHALL only activate when explicitly invoked (e.g., `/opsx:apply --pair`) and SHALL NOT persist across sessions or affect the standard apply flow.

#### Scenario: Standard apply unaffected
- **WHEN** the user invokes `/opsx:apply` without a pair flag
- **THEN** the agent runs the standard autonomous implementation flow with no pair-mode behavior

#### Scenario: Pair mode activation
- **WHEN** the user invokes `/opsx:apply --pair` or the designated pair skill
- **THEN** the agent enters pair mode for the duration of that session only
