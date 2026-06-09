# Task: Local Docker + monorepo layout

> **Status:** in progress  
> **Created:** 2026-05-29  
> **GitHub:** #1  
> **Branch:** feat/1-monorepo-local-docker  
> **PR:** (pending)

## Goal

Split the repo into `frontend/` (Next.js) and `backend/services/` (API stubs) with local Docker Compose for development. AWS deployment is deferred.

## Requirements

1. [x] Move Next app to `frontend/`
2. [x] API stubs under `backend/services/` (Python, Go, Node)
3. [x] `backend/docker-compose.yml` + root `npm run docker:up`
4. [x] `.env.example` and [10-local-docker.md](../10-local-docker.md)
5. [x] Aivest home page shows backend health
6. [ ] Vercel project **Root Directory** = `frontend`
7. [ ] Copy `.env.example` → `frontend/.env.local` locally

## Verification

```bash
npm run docker:up
npm run dev
# Open http://localhost:3000 — backend cards should show online
npm run validate
```

## Agent checklist

- [x] No `services/` folder under `frontend/`
- [ ] CI green after push
- [ ] Update Vercel dashboard root directory when linking project
