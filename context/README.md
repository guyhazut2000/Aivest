# Project context (AI instructions)

Human- and agent-readable specs live here, **sibling to `src/`** at the repo root. Use this folder to define what to build, how to work, and per-task requirements.

| Order | File | Purpose |
|-------|------|---------|
| — | [workflow.md](./workflow.md) | Day-to-day agent workflow |
| 0 | [00-project-overview.md](./00-project-overview.md) | Goals, stack, layout |
| 0b | [00-security-versions.md](./00-security-versions.md) | **Minimum Next.js version (16.2.6)** |
| 1 | [01-initial-project-setup.md](./01-initial-project-setup.md) | Scaffold & verify App Router app |
| 2 | [02-add-libraries.md](./02-add-libraries.md) | Axios, env, utilities |
| tasks | [tasks/](./tasks/) | Per-feature task specs ([template](./tasks/_template.md)) |

## How agents should use this

1. Read [workflow.md](./workflow.md), then **00** and **00b** — use **Next.js 16.2.6+**, App Router, TypeScript.
2. If the user points to a file under `tasks/`, treat it as the source of truth for that work.
3. Follow **01** if `package.json` / `src/app/` are missing.
4. Follow **02** for Axios and shared `src/lib/` patterns.
5. Run verification commands in each file before continuing.

## Active tasks

| Task | Status |
|------|--------|
| *(add rows when you create `tasks/<name>.md`)* | |

Copy [tasks/_template.md](./tasks/_template.md) for new work.

## Status

- [x] Context boilerplate
- [x] Security / version policy documented
- [x] Next.js 16 app scaffolded (see 01)
- [x] Core libraries wired (see 02)
