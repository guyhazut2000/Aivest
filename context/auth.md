# Authentication

Auth is **planned, not shipped**. There is no sign-in UI, session store, or protected routes yet. This doc is the source of truth for how auth should fit Aivest.

## Status

| Area | State |
|------|--------|
| User sign-in / sign-up | Not implemented |
| Session on frontend | Not implemented |
| Route protection | Not implemented |
| Backend API auth | Not implemented |
| Database user records | Not implemented (Prisma + Neon also planned) |

The homepage lists **Clerk auth (Google OAuth)** as a next step. No auth packages are installed in `frontend/package.json` today.

## Decision

**Provider:** [Clerk](https://clerk.com) via `@clerk/nextjs` (v7 / Core 3).

**Primary login method:** Google OAuth (configure in Clerk dashboard; add others later if needed).

**Why Clerk for Aivest**

- Native [Vercel Marketplace](https://vercel.com/marketplace/clerk) integration — env vars can be auto-provisioned on deploy.
- First-class Next.js App Router support (`ClerkProvider`, `clerkMiddleware`, prebuilt `<SignIn />` / `<SignUp />`).
- Fits the current layout: auth lives in `frontend/`; backend services stay separate.

**Not chosen (for now):** self-hosted Better Auth / Auth.js, custom JWT + bcrypt, or auth inside Python/Node APIs. Revisit only if Clerk becomes a poor fit (e.g. heavy custom backend session requirements).

## Architecture

```
Browser
  │
  ▼
frontend/ (Next.js, Vercel)
  │  Clerk session (cookie + JWT)
  │  clerkMiddleware / auth.protect() on protected routes
  │
  ├──► api-python :8000   (FastAPI)  — verify Clerk JWT on protected routes (future)
  └──► api-node   :3001   (Express)  — verify Clerk JWT on protected routes (future)
```

**Ownership**

| Layer | Responsibility |
|-------|----------------|
| `frontend/` | Sign-in, sign-up, session, UI route guards, attaching credentials to API calls |
| `backend/services/api-python` | Validate Bearer tokens on protected endpoints; no user-facing login |
| `backend/services/api-node` | Same as Python API |
| Postgres (future) | App data keyed by Clerk `userId` — not the session store |

Clerk is the identity provider and session authority. Backends trust Clerk-issued JWTs; they do not issue their own login cookies.

## Current code touchpoints

These exist today and should be extended when auth ships — do not duplicate patterns elsewhere.

**API client** — placeholder for attaching credentials:

```15:18:frontend/src/lib/api/client.ts
apiClient.interceptors.request.use((config) => {
  // Attach Authorization when auth is added, e.g. from a session helper.
  return config;
});
```

**CORS** — both APIs already allow credentials and the `Authorization` header (required for cookie/session flows from the browser and for Bearer tokens):

- `backend/services/api-python/app/main.py` — `allow_credentials=True`
- `backend/services/api-node/src/index.js` — `Access-Control-Allow-Credentials`, `Authorization` in allowed headers

**Root layout** — no `ClerkProvider` yet:

```20:33:frontend/src/app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

## Environment variables

Add to Vercel (and local `.env` / `.env.local` in `frontend/`). Marketplace install can provision these automatically.

| Variable | Scope | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public | Client-side Clerk SDK |
| `CLERK_SECRET_KEY` | Server only | Server-side Clerk API |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Public | e.g. `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Public | e.g. `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Public | Post-login redirect |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Public | Post-sign-up redirect |

Optional for backend JWT verification (later phase):

| Variable | Scope | Purpose |
|----------|--------|---------|
| `CLERK_JWKS_URL` or Clerk SDK verify helper | Server | Validate JWTs in Python/Node APIs |

Do **not** commit real keys. See `.env.example` for commented placeholders at repo root.

## Implementation plan (suggested order)

1. **Clerk project** — create app in Clerk; enable Google OAuth; note publishable + secret keys.
2. **Frontend SDK** — `npm install @clerk/nextjs --prefix frontend`; wrap `RootLayout` with `ClerkProvider`.
3. **Middleware** — add `clerkMiddleware()` (Next.js 16: use `middleware.ts` or project `proxy.ts` pattern per [Next.js auth docs](https://nextjs.org/docs/app/building-your-application/authentication)).
4. **Auth routes** — `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx` with Clerk components.
5. **Protect routes** — `createRouteMatcher` + `auth.protect()` for dashboard and other private pages (define route list in a task spec before coding).
6. **API client** — in the request interceptor, attach `Authorization: Bearer <token>` from `auth().getToken()` (Server Components / Server Actions) or Clerk client hooks in Client Components.
7. **Backend verification** — on protected FastAPI/Express routes, verify Clerk JWT (official Clerk backend SDK or JWKS). Return `401` when missing/invalid.
8. **User in DB** — when Prisma + Neon land, sync or upsert user row on first authenticated request using Clerk `userId`.

Run `npm run validate --prefix frontend` after frontend auth changes. Extend backend tests when JWT verification is added.

## Route policy (draft)

Define explicitly in a `context/tasks/` spec before implementing. Starting point:

| Route pattern | Access |
|---------------|--------|
| `/`, `/sign-in`, `/sign-up` | Public |
| `/dashboard`, `/portfolio`, `/settings` (future) | Authenticated |
| `frontend/src/app/api/*` (future) | Per-route: public health vs protected |
| Backend `/health` | Public (keep for Docker/CI) |
| Backend business APIs | Authenticated when they mutate or return user data |

## Local development

- **Docker stack (`npm run dev`):** Clerk keys in `frontend` env (compose env section or `frontend/.env.local`). Callback URLs must include `http://localhost:3000`.
- **Native frontend (`npm run dev:native`):** Same keys in `frontend/.env.local`.
- Clerk dashboard → **Allowed redirect URLs** and **Allowed origins** must list `http://localhost:3000`.

Backends do not need Clerk keys until step 7 (JWT verification). Until then, they remain open except for future protected routes.

## Security notes

- Never expose `CLERK_SECRET_KEY` to the client or `NEXT_PUBLIC_*` vars.
- Prefer Clerk-managed OAuth; do not store passwords locally.
- Use `auth.protect()` (or equivalent) server-side — do not rely on hiding UI alone.
- When calling backends from the browser, keep `CORS_ORIGINS` tight (already defaults to `http://localhost:3000` in compose).
- Re-use Clerk session tokens; do not invent a second session mechanism in Python/Node.

## References

- Clerk + Vercel: `vercel integration add clerk` (Marketplace)
- In-repo Vercel plugin skill: `.claude/plugins/.../skills/auth/SKILL.md` (Clerk v7 patterns)
- Frontend API client: `frontend/src/lib/api/client.ts`
- Planned stack mention: `frontend/src/app/page.tsx` (Next steps)
