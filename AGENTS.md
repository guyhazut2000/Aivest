# Agent instructions

This repository uses **`context/`** (next to `src/`) for human- and AI-readable project guidance.

## Start here

1. [context/README.md](./context/README.md) — index and bootstrap order  
2. [context/workflow.md](./context/workflow.md) — how to work in this repo  
3. [context/tasks/](./context/tasks/) — active task specs (when present)

## Layout

```
next-app/
├── AGENTS.md          ← you are here (entry point for agents)
├── context/           ← what to build, workflow, tasks
│   ├── 00-*.md        ← overview & policies
│   ├── 01-*.md        ← setup steps
│   └── tasks/         ← per-feature / per-task specs
└── src/               ← application code (App Router)
```

## Rules of thumb

- Follow **Next.js 16.2.6+**, App Router, TypeScript — see [context/00-security-versions.md](./context/00-security-versions.md).
- Prefer small diffs; reuse patterns under `src/`.
- Do not commit unless the user explicitly asks.
