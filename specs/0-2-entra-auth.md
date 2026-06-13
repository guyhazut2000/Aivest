# 0-2 — Authentication (Microsoft Entra ID)

## Step

`0-2` · Phase 0 — Foundation

## Status

`in-progress`

## Problem

Aivest needs user sign-in before user-specific features. We chose **Microsoft Entra ID** (Azure AD) for Azure ecosystem alignment and industry demand (Israel + US enterprise).

## Scope

### In scope

- Entra app registration + env vars (Docker + native dev)
- Auth.js (`next-auth@5`) with `microsoft-entra-id` provider
- Middleware protection for `/dashboard`
- `/sign-in` page (Microsoft sign-in button)
- Homepage auth header (sign-in / sign-out)
- `getEntraAccessToken()` server helper for future backend calls

### Out of scope (later specs)

- Backend Entra JWT verification (Python / Node)
- Prisma user sync keyed by Entra `oid`
- MSAL client-side SDK (Auth.js covers Next.js session; MSAL optional later)

## Entra app registration

1. [Entra admin center](https://entra.microsoft.com) → **App registrations** → **New registration**.
2. **Supported account types:** per your need (single tenant or multi-tenant + personal).
3. **Platform:** Web → Redirect URI:
   `http://localhost:3000/api/auth/callback/microsoft-entra-id`
4. **Certificates & secrets** → New client secret.
5. Copy **Application (client) ID**, **secret**, **Directory (tenant) ID**.

## Environment

| Variable | Example |
|----------|---------|
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_MICROSOFT_ENTRA_ID_ID` | Application (client) ID |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | Client secret value |
| `AUTH_MICROSOFT_ENTRA_ID_ISSUER` | `https://login.microsoftonline.com/<tenant-id>/v2.0` |

## Route policy

| Route | Access |
|-------|--------|
| `/`, `/sign-in` | Public |
| `/dashboard` | Authenticated |
| `/api/health`, `/api/auth/*` | Public |
| Backend `/health` | Public |

## Deliverables

| File | Status |
|------|--------|
| `frontend/src/auth.ts` | Done |
| `frontend/src/middleware.ts` | Done |
| `frontend/src/app/api/auth/[...nextauth]/route.ts` | Done |
| `frontend/src/app/sign-in/page.tsx` | Done |
| `frontend/src/app/dashboard/page.tsx` | Done |
| `frontend/src/components/auth-header.tsx` | Done |
| `frontend/src/lib/auth/session.ts` | Done |
| `.env.example` + `docker-compose.yml` env | Done |

## Acceptance criteria

- [x] `next-auth` in `frontend/package.json`
- [x] Auth.js handlers at `/api/auth/*`
- [x] Middleware protects `/dashboard`
- [x] `/sign-in` triggers Microsoft Entra sign-in
- [x] Homepage shows sign-in / sign-out
- [x] `getEntraAccessToken()` helper exists
- [x] `.env.example` documents Entra variables
- [ ] Manual smoke: sign in → land on `/dashboard` (requires your Entra app + env)
- [ ] `npm run validate` passes

## Verification

```bash
# Set AUTH_* vars in frontend/.env.local or repo .env
npm run validate
npm run dev:native
# 1. /dashboard → redirects to /sign-in
# 2. Sign in with Microsoft → /dashboard shows user
```

## On completion

1. Spec → `done`; [progress.md](./progress.md) step `0-2` → `done`.
2. [context/auth.md](../context/auth.md) status → shipped.
