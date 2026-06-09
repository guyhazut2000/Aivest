# 04 — Database (planned)

**Status:** not implemented — stack decision locked in [06-stack-responsibilities.md](./06-stack-responsibilities.md).

## Target stack

| Piece | Choice |
|-------|--------|
| Database | **Neon Postgres** (cloud) |
| ORM | **Prisma** |
| Connection | `DATABASE_URL` in Vercel (Production, Preview, Staging) and `.env.example` |

## Agent rules (when implementing)

1. Schema in `prisma/schema.prisma`; migrations committed.
2. Local dev: Neon branch or Postgres in `backend/docker-compose.yml` — document in `.env.example`.
3. CI already runs Prisma job when schema exists (see `.github/workflows/ci.yml`).
4. Never commit real `DATABASE_URL`.
5. Label GitHub issues `area:db`.

## Verification (future)

```bash
npx prisma validate
npx prisma migrate dev
npx prisma generate
npm run build
```
