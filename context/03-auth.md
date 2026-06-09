# 03 — Authentication (planned)

**Status:** not implemented — stack decision locked in [06-stack-responsibilities.md](./06-stack-responsibilities.md).

## Target stack

| Piece | Choice |
|-------|--------|
| Provider | **Clerk** |
| Social login | **Google** (Gmail OAuth) |
| Integration | `@clerk/nextjs`, middleware / `proxy.ts` per Next 16 docs |

## Agent rules (when implementing)

1. Keys only in Vercel + `.env.example` (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, etc.).
2. Protect routes via Clerk middleware; default to Server Components.
3. Label GitHub issues `area:auth`.
4. Follow [07-agentic-github.md](./07-agentic-github.md) for task/issue sync.

## Verification (future)

- Sign-in / sign-out flow
- Protected route redirects
- OAuth callback on preview URL (Vercel env)
