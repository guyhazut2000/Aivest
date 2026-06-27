# Project progress

**Agents: read this first** to see where development is. Details live in each numbered spec file.

## Current

| | |
|---|---|
| **Step** | `0-4` |
| **Spec** | [0-4-portfolio.md](./0-4-portfolio.md) |
| **Status** | `done` |

## Steps

| Step | Title | Status | Spec |
|------|-------|--------|------|
| 0-0 | Project setup | `done` | [0-0-project-setup.md](./0-0-project-setup.md) |
| 0-1 | Homepage | `done` | [0-1-homepage.md](./0-1-homepage.md) |
| 0-2 | Authentication (Clerk) | `skipped` | [0-2-clerk-auth.md](./0-2-clerk-auth.md) |
| 0-3 | Data layer (Prisma + Postgres) | `done` | [0-3-prisma-postgres.md](./0-3-prisma-postgres.md) |
| 0-4 | Portfolio management | `done` | [0-4-portfolio.md](./0-4-portfolio.md) |
| 0-5 | AI features (Python API) | — | *(not written)* |

**Status values:** `done` · `in-progress` · `draft` · `skipped` · `—` (no spec yet)

## Naming

Spec files: `specs/<step>-<slug>.md` (e.g. `0-2-entra-auth.md`). Step IDs are permanent — never renumber after shipping.

## When a step changes

| Event | Update |
|-------|--------|
| Start work | Spec → `in-progress`; **Current** status → `in-progress` |
| Ship to `master` | Spec → `done`; step row → `done`; **Current** → next step |
| New work | Add row + create `0-N-slug.md` spec before coding |

## Context

Evergreen rules only: [`context/`](../context/) (e.g. [auth.md](../context/auth.md)). Not the task list — that stays here and in specs.
