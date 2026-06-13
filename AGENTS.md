# Agent instructions

You are working in the **Aivest** monorepo ([guyhazut2000/Aivest](https://github.com/guyhazut2000/Aivest)). This file is the entry point. Read the right folder **before** coding.

## Documentation map

Three folders at the repo root serve different audiences and lifetimes. **Do not mix them.**

| Folder | Audience | Lifetime | Question it answers |
|--------|----------|----------|---------------------|
| [`context/`](./context/) | **Agents** (primary), contributors | Evergreen | *How do we build here? What did we decide?* |
| [`specs/`](./specs/) | Agents, humans planning work | Per task / feature | *What should I build right now? How do we know it is done?* |
| [`docs/`](./docs/) | Humans (primary), agents for reference | Evergreen, narrative | *What is this system? How do I understand it?* |

### `context/` — operational truth for coding

**Use for:** stack versions, conventions, architecture decisions, deploy rules, domain boundaries (auth, data), agent workflow.

**Do not use for:** feature acceptance criteria, tutorials, sprint-only notes.

→ Index: [context/README.md](./context/README.md)

### `specs/` — scoped work definitions

**Use for:** feature specs, acceptance criteria, API contracts for a deliverable, migration plans tied to one piece of work.

**Do not use for:** permanent stack choices (those live in `context/`), agent rules, long prose guides.

→ Index: [specs/progress.md](./specs/progress.md)

**Precedence:** When implementing a spec, the spec wins over chat for **scope and acceptance criteria**. `context/` still wins for **stack, layout, and conventions**.

### `docs/` — human-facing documentation

**Use for:** onboarding narratives, architecture overviews, ADRs, runbooks, product explanations.

**Do not use for:** agent bootstrap, version pins, or active task checklists.

→ Index: [docs/README.md](./docs/README.md)

### Quick decision guide

| I need to… | Go to |
|------------|--------|
| Know current dev step | `specs/progress.md` or `context/current.md` |
| Know Next.js version or auth provider | `context/` |
| Implement a GitHub issue with a linked spec | `specs/` + relevant `context/` |
| Explain the monorepo to a new teammate | `docs/` (or root `README.md` for quick start) |
| Store "done" decisions after a feature ships | Update `context/` or `docs/`; mark spec done |

## Start here (bootstrap order)

1. [context/README.md](./context/README.md) — folder map and read order
2. **[specs/progress.md](./specs/progress.md)** — project progress tracker; **current step**
3. [context/current.md](./context/current.md) — quick pointer to active spec
4. [context/workflow.md](./context/workflow.md) — how to work, verify, PR rules
5. **[context/tech-stack.md](./context/tech-stack.md)** — technologies, versions, shipped vs planned *(planned)*
6. [context/06-stack-responsibilities.md](./context/06-stack-responsibilities.md) — stack ownership, CI/CD, env *(planned)*
7. [context/07-agentic-github.md](./context/07-agentic-github.md) — issues, PRs, task sync (**never merge PRs**) *(planned)*
8. Active spec in [`specs/`](./specs/) — e.g. `0-2-entra-auth.md`
9. Topic context — e.g. [context/auth.md](./context/auth.md) for authentication work

## Repository layout

```
Aivest/                     ← git root
├── AGENTS.md               ← you are here
├── context/                ← evergreen agent truth (decisions, stack, workflow)
├── specs/                  ← feature / task specifications
├── docs/                   ← human documentation
├── frontend/               ← Next.js App Router (Vercel) — never put backend services here
├── backend/services/       ← APIs (Python FastAPI, Node Express)
├── docker-compose.yml      ← local dev
├── docker-compose.prod.yml ← production compose
└── package.json            ← npm run dev | test | docker:prod
```

| URL (local dev) | Service |
|-----------------|---------|
| http://localhost:3000 | Frontend |
| http://localhost:8000/health | Python API |
| http://localhost:3001/health | Node API |

## Rules of thumb

- Follow [context/tech-stack.md](./context/tech-stack.md); **Next.js 16.2.6+**, App Router, TypeScript — see [context/00-security-versions.md](./context/00-security-versions.md) *(planned)*.
- **Layout:** `frontend/` = Next.js only; APIs live under `backend/services/`.
- Prefer small diffs; reuse patterns under `frontend/src/`.
- **Do not commit** unless the user explicitly asks.
- **Previews:** Vercel plugin per [context/05-deploy.md](./context/05-deploy.md) *(planned)*; `npm run validate` before preview deploys.
- **GitHub:** skill `.cursor/skills/github-ops/` — issues/PRs ok; **never merge PRs**. Production branch: **`master`**.
- **Local dev:** `npm run dev` (Docker) or `npm run dev:all:native` — see [context/10-local-docker.md](./context/10-local-docker.md) *(planned)*.

## What agents should **not** do

- Put feature specs in `context/` or agent rules in `specs/`.
- Add backend services under `frontend/`.
- Merge pull requests.
- Duplicate quick start in `docs/` when root `README.md` suffices.
- Treat chat as source of truth when a `specs/` file exists for the task.
