# 0-3 — Data layer (Prisma + Postgres)

## Step

`0-3` · Phase 0 — Foundation

## Status

`done`

## Shipped

Prisma schema (`Portfolio`, `Holding`), client singleton, initial migration, `/api/db/health`, Docker `DATABASE_URL` wiring.

## Verification

```bash
docker compose up -d postgres
npm run db:migrate --prefix frontend
curl http://localhost:3000/api/db/health
npm run validate
```
