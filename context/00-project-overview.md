# 00 — Project overview

## Purpose

Greenfield Next.js application with a documented bootstrap path so AI assistants and humans follow the same steps.

## Stack (defaults)

| Layer | Choice | Notes |
|-------|--------|--------|
| Framework | **Next.js 16.2.6+** | App Router only; see [00-security-versions.md](./00-security-versions.md) |
| Runtime | **React 19** | Bundled with Next 16 |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS** | Use `src/app/globals.css` |
| HTTP | **Axios** | Single instance in `src/lib/api/` |
| Package manager | **npm** | `package-lock.json` only unless the team changes |

There is **no Next.js 17** as of May 2026; use **16.2.6** (latest patched 16.x).

## Repository layout (target)

```
next-app/
├── context/                 # AI & onboarding instructions
├── public/
├── src/
│   ├── app/                 # App Router (layouts, pages, route handlers)
│   ├── components/
│   ├── lib/                 # api client, utils
│   └── types/
├── .env.example
├── next.config.ts
└── package.json
```

## Conventions

- **App Router**: `src/app/**/page.tsx`, `layout.tsx`, `route.ts` for APIs.
- **Server vs client**: Default to Server Components; `"use client"` only when required.
- **Data fetching**: `fetch` in Server Components; Axios in Client Components / imperative flows.
- **Imports**: `@/*` → `src/*`.
- **Env**: Document in `.env.example`; never commit secrets.

## Out of scope (for now)

- Auth — `context/03-auth.md` when requested
- Database — `context/04-database.md` when requested
- Deployment — `context/05-deploy.md` when requested

## Agent checklist

1. Read [00-security-versions.md](./00-security-versions.md) and the task-specific `context/*.md` file.
2. Confirm `next` version ≥ `16.2.6` before shipping.
3. Extend existing patterns; keep diffs small.
4. Run `npm run lint` and `npm run build` after non-trivial changes.
