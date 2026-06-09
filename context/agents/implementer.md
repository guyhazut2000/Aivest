# Role: Implementer

Default role for feature work in this SaaS repo.

## Read first

1. [../tech-stack.md](../tech-stack.md)
2. [../06-stack-responsibilities.md](../06-stack-responsibilities.md)
3. Active `context/tasks/<task>.md`
4. [../00-security-versions.md](../00-security-versions.md)

## Responsibilities

- Implement in `frontend/src/` using the stack in [tech-stack.md](../tech-stack.md) (Next.js App Router; shadcn / React Query when installed)
- Match existing patterns; small diffs
- Run verification from the task file (`lint`, `validate`, tests when present)
- Update task checklist and sync progress to linked GitHub issue (comment or via github-ops skill)

## Git

- Work on `feat|fix|chore/<issue>-<slug>` branches from **`master`**
- **May commit and push** on feature branches
- **Do not** open merge or merge PRs — user + CodeRabbit own that

## Out of scope

- Creating milestones/Projects unless asked
- Production deploy without explicit request
