# Project context (AI instructions)

Human- and agent-readable specs live here at the repo root. Use this folder to define what to build, how to work, and per-task requirements.

| Order | File | Purpose |
|-------|------|---------|
| — | [workflow.md](./workflow.md) | Day-to-day agent workflow |
| — | **[tech-stack.md](./tech-stack.md)** | **Canonical tech stack** (versions, shipped vs planned) |
| — | [tech-stack.template.md](./tech-stack.template.md) | Blank template for new projects |
| 0 | [00-project-overview.md](./00-project-overview.md) | Goals, stack, layout |
| 0b | [00-security-versions.md](./00-security-versions.md) | **Minimum Next.js version (16.2.6)** |
| 1 | [01-initial-project-setup.md](./01-initial-project-setup.md) | Scaffold & verify App Router app |
| 2 | [02-add-libraries.md](./02-add-libraries.md) | Axios, env, utilities |
| 3 | [03-auth.md](./03-auth.md) | Clerk + Google OAuth (planned) |
| 4 | [04-database.md](./04-database.md) | Prisma + Neon (planned) |
| 5 | [05-deploy.md](./05-deploy.md) | GitHub Actions CI, Vercel CD, **Vercel plugin** |
| 6 | [06-stack-responsibilities.md](./06-stack-responsibilities.md) | **Stack & tool responsibilities** |
| 7 | [07-agentic-github.md](./07-agentic-github.md) | Issues, Projects, PRs, task sync |
| 8 | [08-cursor-commands.md](./08-cursor-commands.md) | Skills & slash commands reference |
| 9 | [09-github-setup.md](./09-github-setup.md) | **One-time** labels, milestone, `gh` auth |
| 10 | [10-local-docker.md](./10-local-docker.md) | **Monorepo** — `frontend/` + `backend/services/` |
| agents | [agents/](./agents/) | Implementer, GitHub ops, verifier roles |
| tasks | [tasks/](./tasks/) | Per-feature task specs ([template](./tasks/_template.md)) |

## How agents should use this

1. Read [workflow.md](./workflow.md), then **[tech-stack.md](./tech-stack.md)**, **00**, and **00b** — use **Next.js 16.2.6+**, App Router, TypeScript.
2. If the user points to a file under `tasks/`, treat it as the source of truth for that work.
3. Follow **01** if `package.json` / `frontend/src/app/` are missing.
4. Follow **02** for Axios and shared `frontend/src/lib/` patterns.
5. Run verification commands in each file before continuing.

## Active tasks

| Task | Status |
|------|--------|
| [00-agentic-foundation.md](./tasks/00-agentic-foundation.md) | in progress |
| [01-local-docker-dev.md](./tasks/01-local-docker-dev.md) | in progress |

Copy [tasks/_template.md](./tasks/_template.md) for new work.

## Status

- [x] Context boilerplate
- [x] Security / version policy documented
- [x] Next.js 16 app scaffolded (see 01)
- [x] Core libraries wired (see 02)
- [x] Agentic stack & GitHub workflow documented (06–08, agents/, github-ops skill)
- [ ] shadcn, Motion, Recharts, React Query installed
- [ ] Prisma + Neon (04)
- [ ] Clerk + Google OAuth (03)
- [ ] Vitest + Playwright scripts
