# 0-0 — Project setup

## Step

`0-0` · Phase 0 — Foundation

## Status

`done`

## Shipped

PRs [#2](https://github.com/guyhazut2000/Aivest/pull/2), [#3](https://github.com/guyhazut2000/Aivest/pull/3), [#4](https://github.com/guyhazut2000/Aivest/pull/4)

## Summary

Monorepo scaffold: Next.js 16 frontend, Python FastAPI + Node Express APIs, Axios client, Docker dev/test/prod compose, Postgres service, native dev scripts.

## Key paths

- `frontend/`, `backend/services/api-python/`, `backend/services/api-node/`
- `docker-compose.yml`, root `package.json`

## Verification

`npm run dev` or `npm run dev:all:native` — APIs respond at `:8000/health` and `:3001/health`.
