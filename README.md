# Aivest

Monorepo for **Aivest** — AI-assisted investing. The GitHub repo is [guyhazut2000/Aivest](https://github.com/guyhazut2000/Aivest).

## Layout

| Path | Role |
|------|------|
| [`frontend/`](./frontend/) | Next.js 16 — deploy to **Vercel** (set **Root Directory** = `frontend`) |
| [`backend/`](./backend/) | API services — run **natively** locally; Docker optional; **AWS** later |

## Quick start (no Docker)

**Prerequisites:** Node.js 18+, Python 3.12+ (for Python API).

```bash
# From repo root
npm run setup
npm run setup:python          # pip install FastAPI + uvicorn

cp .env.example frontend/.env.local   # optional — defaults work locally

npm run dev                   # frontend only → http://localhost:3000
```

To run **everything** (frontend + both APIs) in one terminal:

```bash
npm run dev:all
```

Or start backends in a second terminal:

```bash
npm run dev:backends          # Python :8000, Node :3001
```

## Scripts (repo root)

| Script | Action |
|--------|--------|
| `npm run setup` | Install root + frontend + Node API dependencies |
| `npm run setup:python` | `pip install` Python API requirements |
| `npm run dev` | Next.js dev server (frontend only) |
| `npm run dev:all` | Frontend + Python + Node APIs |
| `npm run dev:backends` | Python + Node APIs only |
| `npm run validate` | lint + typecheck + build |
| `npm run docker:up` | *(optional)* Start Docker stack |

## Health checks

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Python API | http://localhost:8000/health |
| Node API | http://localhost:3001/health |

## Security

Frontend pins **`next@16.2.6`**.
