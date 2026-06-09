# Task: <title>

> **Status:** draft | in progress | blocked | done  
> **Created:** YYYY-MM-DD  
> **Owner:** (optional)  
> **GitHub:** # (issue number)  
> **Branch:** feat/N-slug  
> **PR:** (URL when open)

## Goal

One paragraph: what we are building and why.

## Stack touchpoints

> Full catalog: [tech-stack.md](../tech-stack.md). Check only layers this task touches.

| Layer | Use in this task? | Notes |
|-------|-------------------|--------|
| `frontend/` (Next 16, React 19, TS, Tailwind v4) | yes / no | |
| `frontend/src/lib/api/` (Axios) | yes / no | |
| shadcn / Motion / Recharts / React Query | yes / no | 📋 if not installed yet |
| Server Actions / `route.ts` | yes / no | |
| Clerk auth | yes / no | 📋 see [03-auth.md](../03-auth.md) |
| Prisma + Neon | yes / no | 📋 see [04-database.md](../04-database.md) |
| `backend/services/*` (Python / Go / Node) | yes / no | see [10-local-docker.md](../10-local-docker.md) |
| Docker Compose | yes / no | `npm run docker:up` |

## Out of scope

- Item agents should not touch in this task

## Prerequisites

- [ ] [tech-stack.md](../tech-stack.md) reviewed for versions and boundaries
- [ ] e.g. [01-initial-project-setup.md](../01-initial-project-setup.md) complete
- [ ] e.g. env vars documented in `.env.example`

## Requirements

1. Concrete, testable requirement
2. …

## Implementation notes

- Paths, patterns, or libraries from [tech-stack.md](../tech-stack.md) — do not introduce 🚫 items without user approval
- Link to `context/0N-*.md` step files if relevant

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Verification

```bash
# From repo root — adjust if task is backend-only
npm run lint
npm run typecheck
npm run validate
# npm run docker:up   # if task touches backend/services
```

## Agent checklist

- [ ] Read [tech-stack.md](../tech-stack.md), [00-project-overview.md](../00-project-overview.md), and [00-security-versions.md](../00-security-versions.md)
- [ ] Requirements met
- [ ] Verification commands pass
- [ ] Update [README.md](../README.md) if bootstrap status changed
