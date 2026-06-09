# 10 — Local Docker (backend)

**Status:** implemented for local dev only. **AWS production** for APIs is out of scope until you connect accounts.

## Monorepo layout

```text
Aivest/                    # git root (repo: guyhazut2000/Aivest)
├── frontend/              # Next.js → Vercel (set Root Directory = frontend)
├── backend/
│   ├── docker-compose.yml
│   └── services/          # api-python, api-go, api-node
├── context/
└── package.json           # npm run dev, docker:up
```

Do **not** add API services under `frontend/`. All backend code lives under `backend/services/`.

## Daily workflow

```bash
npm run docker:up    # Postgres + APIs
npm run dev          # Next.js at http://localhost:3000
```

Copy [.env.example](../.env.example) → `frontend/.env.local`.

## Ports

| Service    | Port | Health |
|------------|------|--------|
| frontend   | 3000 | GET /api/health |
| api-python | 8000 | GET /health |
| api-go     | 8080 | GET /health |
| api-node   | 3001 | GET /health |
| postgres   | 5432 | — |

## Production (later)

| Component | Target |
|-----------|--------|
| `frontend/` | **Vercel** (project root: `frontend`) |
| `backend/services/*` | **AWS** (ECS / App Runner / etc.) — one image per service |
| Database | **Neon** (preferred) or RDS |

## Agent rules

1. Backend changes only under `backend/`.
2. Frontend changes only under `frontend/`.
3. Update this file when Compose services or ports change.
4. Do not commit `.env.local` or real `DATABASE_URL`.
