## Context

The `opsx:apply` skill is a prompt-driven agent that reads a `tasks.md` artifact and autonomously implements each task by writing code. The user's role is passive — they review diffs after the fact. This change introduces an opt-in pair programming mode where the agent acts as a navigator: it reads the spec and task, explains what needs to be done, points the user to the right files, then waits for the user to write the code before validating and moving on.

The existing `opsx:apply` flow and all its scaffolding remain unchanged. Pair mode is a separate invocation path (`/opsx:apply --pair` or `/opsx:pair`).

## Goals / Non-Goals

**Goals:**
- User writes all implementation code; agent never edits files in pair mode
- Agent provides per-task navigation: relevant files, spec requirements, acceptance criteria
- Agent validates each user contribution against the spec before advancing to the next task
- Leverage the existing **Learn by Doing** pattern (TODO(human) anchors + structured guidance blocks) as the contribution mechanism
- Track progress through tasks.md the same way the standard apply flow does

**Non-Goals:**
- Modifying the standard (non-pair) apply flow
- Persisting pair mode state in `.openspec.yaml` (session-scoped only)
- Real-time code review or linting — validation is spec-level only
- Supporting pair mode for non-spec-driven changes

## Decisions

### Decision 1: Separate skill entry point vs. flag on existing apply

**Chosen**: Separate skill entry (`opsx:apply` gets a `--pair` argument, but the skill prompt is a distinct branch).

**Rationale**: The navigator loop logic (explain → wait → validate → advance) is fundamentally different from the autonomous loop (read → implement → verify → advance). Sharing a single prompt with a mode flag creates a branchy, hard-to-maintain prompt. A clean branch keeps both modes readable and independently evolvable.

**Alternatives considered**: A single `opsx:apply` prompt with `if pair_mode` branches — rejected because it conflates two very different agent behaviors.

### Decision 2: TODO(human) anchors as the contribution handoff mechanism

**Chosen**: Before each "Learn by Doing" request, the agent inserts a `// TODO(human)` comment in the target file at the exact location needing implementation, then presents the structured guidance block.

**Rationale**: This is already the established pattern in this codebase's learning output style. Reusing it means the pair mode feels consistent with existing educational interactions, and the anchor gives the user a precise insertion point.

**Alternatives considered**: Verbal description only (no anchor) — rejected because it's ambiguous; the user must hunt for where to write.

### Decision 3: Validation approach

**Chosen**: After the user signals completion (responds to the agent), the agent reads the modified file, checks it against the task's acceptance criteria from `tasks.md` and the relevant spec requirement, then either approves and advances or gives specific corrective feedback.

**Rationale**: Spec-level validation (does the behavior match the requirement?) is more valuable than syntactic review. The agent already has the spec in context; it just needs to read the user's implementation.

**Alternatives considered**: Run tests automatically after each contribution — good but should be a complement, not a replacement, since not all tasks have corresponding tests yet.

## Risks / Trade-offs

- **Risk**: User writes code that diverges significantly from the spec → **Mitigation**: Agent gives concrete, spec-referenced feedback and re-requests (doesn't advance until satisfied).
- **Risk**: TODO(human) anchor left in production code if session is interrupted → **Mitigation**: Agent cleans up its own anchor after the contribution is validated.
- **Risk**: Pair mode feels patronizing for experienced users → **Mitigation**: Opt-in only; standard apply remains the default.
- **Trade-off**: Slower throughput — pair mode is intentionally slower than autonomous apply because the goal is learning, not speed.

## Open Questions

- Should the agent offer to show a reference implementation if the user is stuck, or is that against the spirit of pair mode?
- Should task completion require passing tests (when they exist) before the agent advances, or is spec-level review sufficient?
