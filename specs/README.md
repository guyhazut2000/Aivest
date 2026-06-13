# Specifications (`specs/`)

Scoped work definitions — **what** to build, **for whom**, and **how we know it is done**.

## Purpose

Each spec describes a deliverable (feature, integration, migration). Agents and humans use specs for the **current task**; they override general chat when implementing that scope.

## Put here

| Type | Examples |
|------|----------|
| Feature specs | `portfolio-dashboard.md`, `watchlist-v1.md` |
| Integration specs | `clerk-sign-in-flow.md`, `neon-prisma-bootstrap.md` |
| API contracts (feature-scoped) | Request/response shapes for a new endpoint set |
| Acceptance criteria | Testable checklist per feature |
| Migration / rollout plans | One-off changes with steps and rollback |
| GitHub issue companions | Spec file linked from issue/PR body |

### Suggested spec template

```markdown
# Title

## Status
draft | approved | in-progress | done

## Problem
What user or system need this addresses.

## Scope
In scope / out of scope bullets.

## Acceptance criteria
- [ ] Testable item 1
- [ ] Testable item 2

## Technical notes
Pointers to context/ (stack, auth) — do not duplicate evergreen rules.

## Verification
Commands to run (e.g. npm run validate).
```

## Do **not** put here

| Wrong location | Belongs in |
|----------------|------------|
| Evergreen stack versions | `context/tech-stack.md` |
| Permanent auth architecture | `context/auth.md` |
| "How agents should open PRs" | `context/workflow.md`, `AGENTS.md` |
| General onboarding prose | `docs/` |
| Implementation code | `frontend/`, `backend/services/` |
| Stale done specs with no reference value | Archive or delete; keep `context/` updated with outcomes |

## Lifecycle

1. **Draft** spec in `specs/` (or `specs/draft/` if you prefer).
2. Link spec from GitHub issue / PR.
3. **Implement** — spec wins over chat for that scope.
4. When done: move durable decisions into `context/` or `docs/`; mark spec `done` or remove if obsolete.

## Relationship to `context/`

| `context/` | `specs/` |
|------------|----------|
| Long-lived rules and decisions | Time-boxed work items |
| "We use Clerk for auth" | "Ship sign-in page + protect `/dashboard`" |
| Read before most tasks | Read when doing **this** task |

## Index

_No active specs yet. Add files as work is planned._
