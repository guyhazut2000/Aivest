# Agent roles

This repo uses **one primary Cursor agent** with **role documents** (not separate binaries). Read the role that matches the user’s request.

| Role | File | When |
|------|------|------|
| **Implementer** | [implementer.md](./implementer.md) | Default: code, tests, `context/tasks/` |
| **GitHub ops** | [github-ops.md](./github-ops.md) | Issues, Projects, PRs, task sync |
| **Verifier** | [verifier.md](./verifier.md) | `validate`, Vitest, Playwright |

## Sub-agents (delegation)

Use Cursor’s **Task** tool for parallel work:

- **explore** — find code paths before editing
- **ci-investigator** — one failing check on a PR
- **docs-researcher** — Clerk, Prisma, shadcn docs

The **parent agent** stays responsible for branch strategy, task file updates, and remembering **no merge**.

## Handoff template

End of session (any role):

1. Task checklist state
2. GitHub issue `#` and branch name
3. Commands not run
4. Updated `context/` files
