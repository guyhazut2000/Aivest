# Aivest — backend

API services for local development. **Production (later):** deploy these images to AWS; do not run this Compose file in production.

## Layout

```text
backend/
├── docker-compose.yml
└── services/
    ├── api-python/   FastAPI — port 8000
    ├── api-go/       Go HTTP — port 8080
    └── api-node/     Express — port 3001
```

Postgres (Compose service) listens on **5432** with database `aivest`.

## Commands (from repo root)

```bash
npm run docker:up      # build & start all backend services
npm run docker:down
npm run docker:logs
```

## Health checks

| Service     | URL                        |
|-------------|----------------------------|
| api-python  | http://localhost:8000/health |
| api-go      | http://localhost:8080/health |
| api-node    | http://localhost:3001/health |

See [context/10-local-docker.md](../context/10-local-docker.md).
