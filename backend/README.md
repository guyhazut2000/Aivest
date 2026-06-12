# Aivest — backend

**api-python** (FastAPI, :8000) and **api-node** (Express, :3001).

Run from the **repo root** via Docker (`npm run dev`) or natively:

```bash
npm run setup:python
npm run dev:backends
```

Each service has a `Dockerfile` with `dev` and `runner` targets. Postgres is on **5432**; APIs do not use it yet.

| Service | Health |
|---------|--------|
| api-python | http://localhost:8000/health |
| api-node | http://localhost:3001/health |
