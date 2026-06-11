# Aivest — backend

API services for local development. **Production (later):** deploy these images to AWS.

## Layout

```text
backend/
├── docker-compose.yml   # optional — use if you have Docker
└── services/
    ├── api-python/   FastAPI — port 8000
    └── api-node/     Express — port 3001
```

## Native dev (recommended)

From the **repo root**:

```bash
npm run setup:python          # once — installs FastAPI + uvicorn
npm run dev:backends          # both APIs
# or individually:
npm run dev:api-python
npm run dev:api-node
```

**Requirements:** Python 3.12+, Node.js 18+.

## Docker (optional)

If you prefer containers:

```bash
npm run docker:up
npm run docker:down
npm run docker:logs
```

Postgres (Compose service) listens on **5432** with database `aivest`. The current APIs do not require Postgres yet.

## Health checks

| Service     | URL                          |
|-------------|------------------------------|
| api-python  | http://localhost:8000/health |
| api-node    | http://localhost:3001/health |
