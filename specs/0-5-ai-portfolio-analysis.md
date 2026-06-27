# 0-5 — AI portfolio analysis (Python API)

## Step

`0-5` · Phase 0 — Foundation

## Status

`done`

## Problem

Users want plain-language commentary on their crypto portfolio. The Python API provides analysis; the frontend displays insights on the portfolio page.

## Scope

### In scope

- `POST /ai/portfolio/analyze` on Python API
- Rule-based insights (allocation, concentration, 24h movers) — always available
- Optional OpenAI narrative when `OPENAI_API_KEY` is set
- Next.js proxy `POST /api/ai/portfolio` (loads snapshot from Prisma, calls Python)
- `PortfolioInsights` component on `/portfolio`

### Out of scope

- Chat UI / multi-turn agents
- Auth-gated AI usage
- Storing analysis history in DB

## Environment

| Variable | Service | Purpose |
|----------|---------|---------|
| `OPENAI_API_KEY` | api-python | Optional LLM narrative |
| `OPENAI_MODEL` | api-python | Default `gpt-4o-mini` |
| `NEXT_PUBLIC_API_URL` | frontend | Python API base URL |

## Acceptance criteria

- [x] Python endpoint returns insights for portfolio payload
- [x] Works without OpenAI key (rules-only mode)
- [x] Portfolio page has Analyze button and displays results
- [x] Frontend validate passes

## Verification

```bash
npm run dev   # or dev:all:native with Postgres + Python
# Add holdings at /portfolio, click Analyze portfolio
curl -X POST http://localhost:8000/ai/portfolio/analyze \
  -H "Content-Type: application/json" \
  -d '{"totalValueUsd":1000,"holdings":[{"name":"Bitcoin","symbol":"btc","amount":0.01,"valueUsd":1000,"priceChangePercent24h":2.5}]}'
```

## On completion

1. Spec → `done`; [progress.md](./progress.md) step `0-5` → `done`.
