# Agent workflow

## Quick start

```
1. specs/progress.md       → Current step + status table
2. specs/0-N-slug.md      → Active spec (scope + acceptance criteria)
3. context/<topic>.md     → Evergreen rules (auth, stack, …)
4. Implement on feature branch
5. npm run validate
6. Update progress.md + spec when done
```

## Progress tracking

| File | Role |
|------|------|
| [specs/progress.md](../specs/progress.md) | **Main tracker** — history table + current step |
| `specs/0-N-slug.md` | Task detail per step |
| [context/current.md](./current.md) | One-line pointer for agents |

## When a step completes

1. Spec → `done`
2. [progress.md](../specs/progress.md) — row `done`, advance **Current**
3. [current.md](./current.md) — update step + spec link
4. Topic `context/` docs if needed (e.g. [auth.md](./auth.md))

## Git and GitHub

- **Branch:** `feat/0-N-slug` (e.g. `feat/0-2-entra-auth`)
- **PR title:** `[0-2] Short title`
- **Agents never merge PRs**
- GitHub ops: `.cursor/skills/github-ops/SKILL.md`

## Verification

`npm run validate` before every frontend PR.
