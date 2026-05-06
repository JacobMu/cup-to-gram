## ADDED Requirements

### Requirement: Tasks must declare their target file via an explicit tag
Each task entry in `tasks.md` SHALL begin its description with a backtick-wrapped file path (`` `path/to/file.ts` ``) or the literal tag `` `manual` `` for verification tasks that have no source file target.

#### Scenario: Source file task format
- **WHEN** a task targets a source or config file
- **THEN** the task description MUST start with the relative file path in backtick format, e.g. `` - [ ] 1.1 `src/features/conversion/conversionTable.ts` Add alias map entries ``

#### Scenario: Manual task format
- **WHEN** a task requires manual verification (e.g., confirming CI output, checking a deployed artifact)
- **THEN** the task description MUST start with `` `manual` ``, e.g. `` - [ ] 3.1 `manual` Confirm build artifact is downloadable ``

#### Scenario: Multi-file changes are split into separate tasks
- **WHEN** implementing a change requires edits to two or more distinct files
- **THEN** each file MUST be represented as a separate task with its own file tag; a single task SHALL NOT declare multiple file targets

### Requirement: Task authoring follows file-scoped grouping
When generating `tasks.md`, the authoring agent SHALL group all edits to the same file into a single task. Individual line-level or field-level edits within the same file SHALL NOT each become a separate task.

#### Scenario: Same-file edits collapsed into one task
- **WHEN** a spec requires adding three fields to `config.ts`
- **THEN** `tasks.md` MUST contain one task tagged `` `config.ts` `` that describes all three field additions, not three separate tasks each tagged to the same file

#### Scenario: Different-file edits become separate tasks
- **WHEN** a spec requires changes to `parser.ts` and `formatter.ts`
- **THEN** `tasks.md` MUST contain one task for `` `parser.ts` `` and a separate task for `` `formatter.ts` ``
