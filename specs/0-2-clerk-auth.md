# 0-2 — Authentication (Clerk)

## Step

`0-2` · Phase 0 — Foundation

## Status

`in-progress`

## Problem

Aivest needs user sign-in before user-specific features. **Clerk** replaces the earlier Entra ID plan for faster local setup and hosted sign-in UI.

## Scope

### In scope

- Clerk application + env vars (Docker + native dev)
- `@clerk/nextjs` with `ClerkProvider` and `clerkMiddleware`
- Middleware protection for `/dashboard`
- `/sign-in` and `/sign-up` pages (Clerk components)
- Homepage auth header (sign-in link / user menu)
- `getClerkAccessToken()` server helper for future backend calls

### Out of scope (later specs)

- Backend Clerk JWT verification (Python / Node)
- Prisma user sync keyed by Clerk `userId`
- Custom auth UI beyond Clerk defaults

## Clerk setup

1. [Clerk Dashboard](https://dashboard.clerk.com) → **Create application**.
2. Copy **Publishable key** and **Secret key** (API Keys).
3. Optional: enable social providers (Google, Microsoft, etc.) under **User & authentication**.

## Environment

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |

## Route policy

| Route | Access |
|-------|--------|
| `/`, `/sign-in`, `/sign-up` | Public |
| `/dashboard` | Authenticated |
| `/api/health` | Public |
| Backend `/health` | Public |

## Deliverables

| File | Status |
|------|--------|
| `frontend/src/middleware.ts` | Done |
| `frontend/src/app/layout.tsx` | Done |
| `frontend/src/app/sign-in/[[...sign-in]]/page.tsx` | Done |
| `frontend/src/app/sign-up/[[...sign-up]]/page.tsx` | Done |
| `frontend/src/app/dashboard/page.tsx` | Done |
| `frontend/src/components/auth-header.tsx` | Done |
| `frontend/src/lib/auth/session.ts` | Done |
| `.env.example` + `docker-compose.yml` env | Done |

## Acceptance criteria

- [x] `@clerk/nextjs` in `frontend/package.json`
- [x] `ClerkProvider` in root layout
- [x] Middleware protects `/dashboard`
- [x] `/sign-in` shows Clerk sign-in UI
- [x] Homepage shows sign-in / user menu
- [x] `getClerkAccessToken()` helper exists
- [x] `.env.example` documents Clerk variables
- [ ] Manual smoke: sign in → land on `/dashboard` (requires Clerk keys in env)
- [ ] `npm run validate` passes

## Verification

```bash
# Set Clerk vars in frontend/.env.local or repo .env
npm run validate
npm run dev:native
# 1. /dashboard → redirects to /sign-in
# 2. Sign in → /dashboard shows user
```

## On completion

1. Spec → `done`; [progress.md](./progress.md) step `0-2` → `done`.
2. [context/auth.md](../context/auth.md) status → shipped.
