## MODIFIED Requirements

### Requirement: Per-task navigation briefing
Before requesting a user contribution, the agent SHALL provide a navigation briefing that covers all tasks in the current file chunk — including the target file, all spec requirements being satisfied, and all acceptance criteria for the chunk.

#### Scenario: Navigation briefing content
- **WHEN** the agent begins a new file chunk in pair mode
- **THEN** the briefing MUST identify the target file, list all spec requirements for every task in the chunk, and list all concrete acceptance criteria the user's code must satisfy across the chunk

#### Scenario: Navigation briefing precedes TODO anchors
- **WHEN** the agent issues a navigation briefing for a source-file chunk
- **THEN** ALL TODO(human) anchors for tasks in that chunk MUST already be present in the file before the Learn by Doing block is shown to the user

#### Scenario: Manual chunk has no TODO anchor
- **WHEN** the agent begins a chunk tagged `manual`
- **THEN** the agent SHALL NOT insert any TODO(human) anchor; instead it presents the verification criteria as a checklist and waits for the user to confirm completion

### Requirement: Spec-level validation before advancing
After a user contribution, the agent SHALL validate the implementation against ALL tasks' acceptance criteria in the current chunk before marking any of them complete and moving to the next chunk.

#### Scenario: Contribution passes validation
- **WHEN** the user signals completion and the implementation satisfies the spec requirements and acceptance criteria for ALL tasks in the chunk
- **THEN** the agent removes all TODO(human) anchors in the file, marks ALL tasks in the chunk complete, and proceeds to the next chunk

#### Scenario: Contribution fails validation
- **WHEN** the user signals completion but the implementation does not satisfy one or more acceptance criteria for the chunk
- **THEN** the agent provides specific, spec-referenced feedback identifying which criteria are unmet, and re-requests the contribution without advancing or marking any task complete

#### Scenario: Untagged task falls back to per-task navigation
- **WHEN** a task in `tasks.md` has no backtick file tag
- **THEN** the agent navigates that task individually using the original per-task loop, as if it were a single-task chunk

## ADDED Requirements

### Requirement: Navigator groups pending tasks by file tag before starting
At the start of the navigator loop, the agent SHALL read all pending tasks, extract their file tags, and form an ordered list of file chunks before beginning navigation.

#### Scenario: Chunk grouping on session start
- **WHEN** pair mode begins and tasks.md contains pending tasks with file tags
- **THEN** the agent groups them by file tag (preserving order of first appearance) and navigates one chunk at a time

#### Scenario: Multiple anchors in one file
- **WHEN** a file chunk contains more than one task
- **THEN** the agent SHALL insert one `// TODO(human): <task description>` anchor per task at the appropriate location within the file before presenting the briefing
