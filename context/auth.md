# Authentication

Auth uses **Clerk** via `@clerk/nextjs`. Sign-in UI and protected routes live in `frontend/`; backends verify JWTs in a later step.

## Status

| Area | State |
|------|--------|
| User sign-in | Implemented — Clerk hosted UI |
| Session on frontend | Implemented — Clerk session |
| Route protection | Implemented — `/dashboard` via middleware |
| Backend API auth | Not implemented |
| Database user records | Not implemented (Prisma + Neon planned) |

## Decision

**Provider:** [Clerk](https://clerk.com/docs/quickstarts/nextjs) (`@clerk/nextjs`).

**Primary login method:** Email/password, social, or passkeys — configured in the Clerk Dashboard (no Azure app registration required).

**Why Clerk for Aivest (pivot from Entra ID)**

- Fastest path to working sign-in during early development.
- Drop-in `<SignIn />` / `<UserButton />` components.
- Native [Vercel Marketplace](https://clerk.com/docs/deployments/vercel) integration auto-provisions env vars on deploy.
- OIDC-standard session tokens — backends can verify later.

**Previously considered:** Microsoft Entra ID via Auth.js — deferred due to Active Directory setup friction during local dev.

**Not chosen (for now):** Auth0, self-hosted Keycloak.

## Architecture

```
Browser
  │
  ▼
frontend/ (Next.js, Vercel)
  │  Clerk session (cookie)
  │  clerkMiddleware on /dashboard
  │
  ├──► api-python :8000   (verify Clerk JWT on protected routes — future)
  └──► api-node   :3001   (same — future)
```

| Layer | Responsibility |
|-------|----------------|
| `frontend/` | Sign-in, session, route guards, Clerk token for API calls |
| `backend/services/*` | Validate Bearer tokens; no user-facing login |
| Postgres (future) | App data keyed by Clerk `userId` — not the session store |

## Code touchpoints

| File | Role |
|------|------|
| `frontend/src/middleware.ts` | `clerkMiddleware` — protect `/dashboard` |
| `frontend/src/app/layout.tsx` | `ClerkProvider` |
| `frontend/src/app/sign-in/[[...sign-in]]/page.tsx` | Clerk sign-in page |
| `frontend/src/app/sign-up/[[...sign-up]]/page.tsx` | Clerk sign-up page |
| `frontend/src/app/dashboard/page.tsx` | Protected placeholder |
| `frontend/src/lib/auth/session.ts` | `getClerkAccessToken()` for server API calls |
| `frontend/src/components/auth-header.tsx` | Homepage sign-in / user menu |

## Environment variables

Add to Vercel / local `frontend/.env.local` or repo-root `.env` (for Docker compose).

| Variable | Scope | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Client | Clerk publishable key (`pk_test_...` or `pk_live_...`) |
| `CLERK_SECRET_KEY` | Server | Clerk secret key (`sk_test_...` or `sk_live_...`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Client | Default `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Client | Default `/sign-up` |

**Clerk setup**

1. [dashboard.clerk.com](https://dashboard.clerk.com) → create application.
2. Copy **Publishable key** and **Secret key** from API Keys.
3. Optional: enable Google, Microsoft, etc. under **User & authentication → Social connections**.

Do **not** commit secrets. See `.env.example`.

## Route policy

Authoritative list: [specs/0-2-clerk-auth.md](../specs/0-2-clerk-auth.md).

| Route | Access |
|-------|--------|
| `/`, `/sign-in`, `/sign-up` | Public |
| `/dashboard` | Authenticated |
| `/api/health` | Public |
| Backend `/health` | Public |

## Local development

- **Native:** `npm run dev:native` with vars in `frontend/.env.local`.
- **Docker:** `npm run dev` — pass vars via root `.env` (compose forwards to `frontend` service).
- After adding Clerk, rebuild Docker if `node_modules` volume is stale: `docker compose down && docker volume rm aivest_frontend_node_modules && docker compose up --build -d`.

## Security notes

- Never expose `CLERK_SECRET_KEY` to the client.
- Use `clerkMiddleware` server-side — do not rely on hiding UI alone.
- Re-use Clerk session tokens; do not invent a second session in Python/Node.

## References

- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk + Vercel](https://clerk.com/docs/deployments/vercel)
- Spec: [specs/0-2-clerk-auth.md](../specs/0-2-clerk-auth.md)
