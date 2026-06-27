# 0-3 — Data layer (Prisma + Postgres)

## Step

`0-3` · Phase 0 — Foundation

## Status

`in-progress`

## Problem

Portfolio and other app features need persisted data. The monorepo already runs Postgres in Docker; the frontend owns the ORM via Prisma.

## Scope

### In scope

- Prisma in `frontend/` with PostgreSQL
- `DATABASE_URL` for Docker and native dev
- Initial schema: `Portfolio` + `Holding` (no auth — single shared portfolio model for learning)
- Prisma client singleton (`lib/db.ts`)
- `/api/db/health` route to verify connectivity
- npm scripts: `db:generate`, `db:migrate`, `db:push`, `db:studio`

### Out of scope (later specs)

- Neon cloud hosting (local Postgres is enough for learning)
- User accounts / multi-tenant portfolios
- Portfolio UI (next feature)

## Environment

| Variable | Example (native) | Example (Docker frontend) |
|----------|------------------|---------------------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/aivest` | `postgresql://postgres:postgres@postgres:5432/aivest` |

## Deliverables

| File | Status |
|------|--------|
| `frontend/prisma/schema.prisma` | Done |
| `frontend/src/lib/db.ts` | Done |
| `frontend/src/lib/services/db-health.ts` | Done |
| `frontend/src/app/api/db/health/route.ts` | Done |
| `docker-compose.yml` — `DATABASE_URL` on frontend | Done |
| `.env.example` | Done |

## Acceptance criteria

- [x] `@prisma/client` + `prisma` in `frontend/package.json`
- [x] Schema with `Portfolio` and `Holding` models
- [x] Prisma client singleton
- [x] `/api/db/health` returns `{ ok: true }` when Postgres is up
- [x] `.env.example` documents `DATABASE_URL`
- [x] Initial migration created (`prisma/migrations/20250627120000_init`)
- [x] `npm run validate` passes

## Verification

```bash
docker compose up -d postgres
npm run db:migrate --prefix frontend
npm run validate
curl http://localhost:3000/api/db/health
```

## On completion

1. Spec → `done`; [progress.md](./progress.md) step `0-3` → `done`.
2. Advance **Current** to next step (portfolio UI or AI features).
