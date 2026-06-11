# Agent instructions

This repository uses `**context/**` (next to `src/`) for human- and AI-readable project guidance.

## Start here

1. [context/README.md](./context/README.md) — index and bootstrap order
2. [context/workflow.md](./context/workflow.md) — how to work in this repo
3. **[context/tech-stack.md](./context/tech-stack.md)** — **technologies we use** (versions, shipped vs planned)
4. [context/06-stack-responsibilities.md](./context/06-stack-responsibilities.md) — stack ownership, CI/CD, env
5. [context/07-agentic-github.md](./context/07-agentic-github.md) — issues, PRs, task sync (**no agent merge**)
6. [context/tasks/](./context/tasks/) — active task specs (when present)

## Layout

```
Aivest/                ← git root (repo: guyhazut2000/Aivest)
├── AGENTS.md          ← you are here
├── frontend/          ← Next.js App Router (Vercel)
├── backend/services/  ← APIs (local Docker; AWS later)
├── context/           ← specs, workflow, tasks
└── package.json       ← npm run dev | validate | docker:up
```

## Rules of thumb

- Follow the stack in [context/tech-stack.md](./context/tech-stack.md); **Next.js 16.2.6+**, App Router, TypeScript — see [context/00-security-versions.md](./context/00-security-versions.md).
- Prefer small diffs; reuse patterns under `frontend/src/`.
- Do not commit unless the user explicitly asks.
- **Previews:** Vercel plugin per [context/05-deploy.md](./context/05-deploy.md); production via `**master`** merge (you merge) or explicit `/vercel-plugin:deploy prod`.
- **GitHub:** skill `.cursor/skills/github-ops/` — issues/PRs ok; **never merge PRs**.

