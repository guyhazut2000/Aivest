# 0-4 — Portfolio management

## Step

`0-4` · Phase 0 — Foundation

## Status

`done`

## Problem

Users need to track crypto holdings and see portfolio value using live CoinGecko prices. No auth — single default portfolio stored in Postgres.

## Scope

### In scope

- `/portfolio` page with total value and holdings table
- Add holding form (coin picker from top 100 markets + amount)
- Remove holding
- Live price lookup for held coins via CoinGecko
- Site nav between Markets and Portfolio
- API routes: `GET /api/portfolio`, `POST /api/portfolio/holdings`, `DELETE /api/portfolio/holdings/[id]`

### Out of scope

- Multiple portfolios or user accounts
- Edit amount inline (re-add same coin to overwrite amount)
- Historical performance charts

## Deliverables

| File | Status |
|------|--------|
| `frontend/src/app/portfolio/page.tsx` | Done |
| `frontend/src/lib/services/portfolio.ts` | Done |
| `frontend/src/components/add-holding-form.tsx` | Done |
| `frontend/src/components/portfolio-holdings.tsx` | Done |
| `frontend/src/components/site-nav.tsx` | Done |
| `frontend/src/app/api/portfolio/**` | Done |

## Acceptance criteria

- [x] `/portfolio` shows total USD value
- [x] User can add a holding from top-100 coins
- [x] User can remove a holding
- [x] Holdings show live price, 24h change, and line value
- [x] Nav links between `/` and `/portfolio`
- [x] `npm run validate` passes

## Verification

```bash
npm run dev
# 1. Open /portfolio
# 2. Add BTC or ETH with an amount
# 3. Confirm total value and row appear
# 4. Remove holding
```

## On completion

1. Spec → `done`; [progress.md](./progress.md) step `0-4` → `done`.
2. Advance **Current** to next step (AI features or enhancements).
