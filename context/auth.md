# Authentication

Auth uses **Microsoft Entra ID** (Azure AD) via **Auth.js** (`next-auth` v5). Sign-in UI and protected routes are implemented in `frontend/`; backends verify JWTs in a later step.

## Status

| Area | State |
|------|--------|
| User sign-in | Implemented — Microsoft via Entra ID |
| Session on frontend | Implemented — Auth.js JWT session |
| Route protection | Implemented — `/dashboard` via middleware |
| Backend API auth | Not implemented |
| Database user records | Not implemented (Prisma + Neon planned) |

## Decision

**Provider:** [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/) via Auth.js `microsoft-entra-id` provider (`next-auth@5`).

**Primary login method:** Microsoft account (work/school or personal, per app registration “supported account types”).

**Why Entra ID for Aivest**

- Free tier for development and small apps.
- Aligns with Azure SDK / Microsoft identity platform skills (Israeli enterprise + global demand).
- OIDC-standard JWTs — backends can verify via JWKS later.
- Auth lives in `frontend/`; Python/Node APIs stay separate.

**Not chosen (for now):** Clerk, Auth0, self-hosted Keycloak. Revisit only if Entra becomes a poor fit.

## Architecture

```
Browser
  │
  ▼
frontend/ (Next.js, Vercel)
  │  Auth.js session (encrypted cookie)
  │  middleware on /dashboard
  │
  ├──► api-python :8000   (verify Entra JWT on protected routes — future)
  └──► api-node   :3001   (same — future)
```

| Layer | Responsibility |
|-------|----------------|
| `frontend/` | Sign-in, session, route guards, Entra access token for API calls |
| `backend/services/*` | Validate Bearer tokens; no user-facing login |
| Postgres (future) | App data keyed by Entra `oid` / `sub` — not the session store |

## Code touchpoints

| File | Role |
|------|------|
| `frontend/src/auth.ts` | NextAuth config + Microsoft Entra ID provider |
| `frontend/src/middleware.ts` | Protect `/dashboard` |
| `frontend/src/app/api/auth/[...nextauth]/route.ts` | Auth.js handlers |
| `frontend/src/app/sign-in/page.tsx` | Sign-in page |
| `frontend/src/app/dashboard/page.tsx` | Protected placeholder |
| `frontend/src/lib/auth/session.ts` | `getEntraAccessToken()` for server API calls |
| `frontend/src/components/auth-header.tsx` | Homepage sign-in / sign-out |

## Environment variables

Add to Vercel / local `frontend/.env.local` or repo-root `.env` (for Docker compose).

| Variable | Scope | Purpose |
|----------|--------|---------|
| `AUTH_SECRET` | Server | Session encryption — `openssl rand -base64 32` |
| `AUTH_MICROSOFT_ENTRA_ID_ID` | Server | Application (client) ID |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | Server | Client secret |
| `AUTH_MICROSOFT_ENTRA_ID_ISSUER` | Server | e.g. `https://login.microsoftonline.com/<tenant-id>/v2.0` |

**Entra app registration**

1. [Entra admin center](https://entra.microsoft.com) → App registrations → New.
2. Platform: **Web** (Auth.js server-side OAuth).
3. Redirect URI: `http://localhost:3000/api/auth/callback/microsoft-entra-id`
4. Create a client secret under Certificates & secrets.
5. Copy Application (client) ID, secret, and Directory (tenant) ID for issuer URL.

Do **not** commit secrets. See `.env.example`.

## Route policy

Authoritative list: [specs/0-2-entra-auth.md](../specs/0-2-entra-auth.md).

| Route | Access |
|-------|--------|
| `/`, `/sign-in` | Public |
| `/dashboard` | Authenticated |
| `/api/health`, `/api/auth/*` | Public |
| Backend `/health` | Public |

## Local development

- **Native:** `npm run dev:native` with vars in `frontend/.env.local`.
- **Docker:** `npm run dev` — pass vars via root `.env` (compose forwards to `frontend` service).
- Entra redirect URI must include `http://localhost:3000/...` callback path.

## Security notes

- Never expose `AUTH_SECRET` or client secret to the client.
- Use middleware server-side — do not rely on hiding UI alone.
- Re-use Entra session tokens; do not invent a second session in Python/Node.

## References

- [Auth.js — Microsoft Entra ID](https://authjs.dev/getting-started/providers/microsoft-entra-id)
- Spec: [specs/0-2-entra-auth.md](../specs/0-2-entra-auth.md)
