# Context (`context/`)

Evergreen, agent-oriented project truth — read **before** non-trivial implementation work.

## Purpose

Short, authoritative answers to: *What stack do we use? What did we decide? What are the boundaries? How do we work in this repo?*

Optimized for AI agents and experienced contributors who need constraints, not tutorials.

## Put here

| Type | Examples |
|------|----------|
| Tech stack | `tech-stack.md`, `00-security-versions.md` |
| Workflow | `workflow.md`, GitHub/PR rules |
| Domain decisions | `auth.md` (Clerk, token flow) |
| Stack ownership | `06-stack-responsibilities.md` (frontend vs backend vs infra) |
| Deploy / env | `05-deploy.md`, `10-local-docker.md` |
| Cross-cutting conventions | Naming, folder layout, verification commands |

Keep files **focused** and **current**. When a decision changes, update context — do not leave specs or docs stale as the source of truth.

## Do **not** put here

| Wrong location | Belongs in |
|----------------|------------|
| Feature PRD with acceptance criteria | `specs/` |
| Long onboarding tutorials | `docs/` |
| User-facing product marketing | `docs/` or external site |
| One-off task notes for a single PR | PR description or `specs/` |
| Source code, configs, secrets | `frontend/`, `backend/`, env files |
| Generated reference | CI output or code comments |

## Bootstrap order (agents)

Read in this order when starting work:

| # | File | When |
|---|------|------|
| 1 | This README | Folder map and boundaries |
| 2 | `workflow.md` | How to work, verify, PR rules |
| 3 | `tech-stack.md` | Versions, shipped vs planned |
| 4 | `06-stack-responsibilities.md` | Who owns what, CI/CD, env |
| 5 | `07-agentic-github.md` | Issues, PRs (**never merge PRs**) |
| 6 | Matching file in `specs/` | If the user or issue points at a spec |
| 7 | Topic docs below | When the task touches that domain |

### Topic docs

| File | When to read |
|------|--------------|
| [auth.md](./auth.md) | Authentication, sessions, protected routes, API credentials |
| `05-deploy.md` | Vercel previews, production deploy |
| `10-local-docker.md` | `docker compose`, ports, native vs Docker |
| `00-security-versions.md` | Security version floors (e.g. Next.js 16.2.6+) |

_Files marked above without a link are planned — add them as the project matures._

## Relationship to other folders

```
AGENTS.md   →  Entry point; points here
context/    →  Permanent "how we build" (agents)
specs/      →  Temporary "what to build now" (tasks)
docs/       →  Human-readable explanations
```

**Rule:** A spec (`specs/`) overrides chat for its scope. Context overrides specs on **stack and conventions** (e.g. you cannot choose a different framework in a feature spec without updating `tech-stack.md`).

## Index

| File | Status |
|------|--------|
| [auth.md](./auth.md) | Written — Clerk planned, not shipped |
| `tech-stack.md` | Planned |
| `workflow.md` | Planned |
| `00-security-versions.md` | Planned |
| `05-deploy.md` | Planned |
| `06-stack-responsibilities.md` | Planned |
| `07-agentic-github.md` | Planned |
| `10-local-docker.md` | Planned |
