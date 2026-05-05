## Why

The current `opsx:apply` agent drives implementation autonomously — it reads specs and writes code with minimal human involvement. This creates a passive experience where the user reviews rather than learns. A pair programming mode flips the dynamic: the user writes the code (driver) while the agent provides navigation, context, and guidance (navigator), making the process educational and building genuine understanding of the codebase.

## What Changes

- Add a `pair-programming` mode flag/option to the `opsx:apply` skill invocation
- When pair mode is active, the agent reads the current task spec and explains what needs to be implemented (the "what" and "why"), then waits
- The agent reviews the user's code contribution, gives targeted feedback, and advances to the next task only after the user's implementation satisfies the spec
- The agent never writes implementation code in pair mode — it only navigates: providing context, pointing to relevant files/lines, flagging spec violations, and suggesting next steps
- The agent uses the existing **Learn by Doing** pattern (TODO(human) anchors, structured guidance blocks) as the mechanism for requesting contributions

## Capabilities

### New Capabilities
- `pair-programming-apply`: A variant of the apply flow where the agent navigates task-by-task and the user implements each task, with the agent validating against specs before advancing

### Modified Capabilities
- (none — existing apply flow is unchanged; pair mode is opt-in)

## Impact

- `opsx:apply` skill prompt / instructions
- OpenSpec change schema (optional mode parameter or separate skill entry point)
- Potentially `.openspec.yaml` if mode needs to be persisted per-change
