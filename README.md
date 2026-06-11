# Aivest

Monorepo for **Aivest** — AI-assisted investing. The GitHub repo is [guyhazut2000/Aivest](https://github.com/guyhazut2000/Aivest).

## Layout

| Path | Role |
|------|------|
| [`frontend/`](./frontend/) | Next.js 16 — deploy to **Vercel** (set **Root Directory** = `frontend`) |
| [`backend/`](./backend/) | API services — **Docker** locally; **AWS** later |
| [`context/`](./context/) | Agent & team specs |

## Quick start

```bash
# From repo root
cp .env.example frontend/.env.local

npm install                 # root (husky + scripts)
cd frontend && npm ci && cd ..

npm run docker:up           # Postgres + Python / Go / Node APIs
npm run dev                 # http://localhost:3000
```

## Scripts (repo root)

| Script | Action |
|--------|--------|
| `npm run dev` | Next.js dev server |
| `npm run validate` | lint + typecheck + build |
| `npm run docker:up` | Start `backend/docker-compose.yml` |
| `npm run docker:down` | Stop backend stack |

See [context/10-local-docker.md](./context/10-local-docker.md) and [context/README.md](./context/README.md).

## Security

Frontend pins **`next@16.2.6`**. See [context/00-security-versions.md](./context/00-security-versions.md).
