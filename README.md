# Aivest

Monorepo for **Aivest** — AI-assisted investing. The GitHub repo is [guyhazut2000/Aivest](https://github.com/guyhazut2000/Aivest).

## Layout

| Path | Role |
|------|------|
| [`frontend/`](./frontend/) | Next.js 16 — App Router |
| [`backend/services/`](./backend/) | Python (FastAPI) + Node (Express) APIs |
| `docker-compose.yml` | Local dev (hot reload) |
| `docker-compose.prod.yml` | Production |

## Quick start

**Prerequisites:** Docker Desktop (or Docker Engine + Compose v2).

```bash
npm run dev
```

| URL | Service |
|-----|---------|
| http://localhost:3000 | Frontend (auto-reload) |
| http://localhost:8000/health | Python API |
| http://localhost:3001/health | Node API |

## Scripts

| Script | What it does |
|--------|----------------|
| `npm run dev` | Dev stack with hot reload |
| `npm run test` | Lint + typecheck + build (no Docker) |
| `npm run docker:test` | Same checks, inside Docker (CI-friendly) |
| `npm run docker:prod` | Production stack |

Env templates: [`.env.example`](./.env.example) (dev), [`.env.prod.example`](./.env.prod.example) (prod).

## Native dev (optional)

```bash
npm run setup && npm run setup:python
npm run dev:all:native
```

## Security

Frontend pins **`next@16.2.6`**.
