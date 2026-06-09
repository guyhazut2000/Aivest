# 00 — Project overview

## Purpose

Greenfield Next.js application with a documented bootstrap path so AI assistants and humans follow the same steps.

## Stack (defaults)

**Technology catalog (agents):** **[tech-stack.md](./tech-stack.md)** — versions, what is installed vs planned.

Full responsibility matrix: **[06-stack-responsibilities.md](./06-stack-responsibilities.md)**.

| Layer | Choice | Notes |
|-------|--------|--------|
| Product | **SaaS** | Solo workflow; team-shaped GitHub process |
| Framework | **Next.js 16.2.6+** | App Router only; see [00-security-versions.md](./00-security-versions.md) |
| Runtime | **React 19** | Bundled with Next 16 |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS** + **shadcn/ui** | Motion + Recharts when added |
| Data (client) | **TanStack Query** | Server Actions / route handlers for server mutations |
| HTTP | **Axios** | Third-party / legacy client calls in `src/lib/api/` |
| Database | **Prisma** + **Neon** | See [04-database.md](./04-database.md) (planned) |
| Auth | **Clerk** + Google OAuth | See [03-auth.md](./03-auth.md) (planned) |
| Testing | **Vitest**, **RTL**, **Playwright** | Add scripts when bootstrapped |
| Package manager | **npm** | `package-lock.json` |
| Production branch | **`master`** | PRs target `master` |

There is **no Next.js 17** as of May 2026; use **16.2.6** (latest patched 16.x).

## Repository layout

```
Aivest/                      # git root
├── frontend/                # Next.js 16 — deploy to Vercel (root: frontend)
│   ├── src/app/
│   ├── src/lib/
│   └── package.json
├── backend/
│   ├── docker-compose.yml   # local dev only
│   └── services/            # Python, Go, Node APIs
├── context/                 # AI & onboarding instructions
├── .env.example
└── package.json             # dev, validate, docker:* scripts
```

See [10-local-docker.md](./10-local-docker.md).

## Conventions

- **App Router**: `src/app/**/page.tsx`, `layout.tsx`, `route.ts` for APIs.
- **Server vs client**: Default to Server Components; `"use client"` only when required.
- **Data fetching**: `fetch` in Server Components; Axios in Client Components / imperative flows.
- **Imports**: `@/*` → `src/*`.
- **Env**: Document in `.env.example`; never commit secrets.

## Agentic workflow

- Stack & tools: [06-stack-responsibilities.md](./06-stack-responsibilities.md)
- GitHub + tasks: [07-agentic-github.md](./07-agentic-github.md)
- Commands: [08-cursor-commands.md](./08-cursor-commands.md)
- Roles: [agents/](./agents/)

## Planned (docs ready, code pending)

- Auth — [03-auth.md](./03-auth.md) (Clerk + Google)
- Database — [04-database.md](./04-database.md) (Prisma + Neon)

## Deployment

- CI/CD: [05-deploy.md](./05-deploy.md) — GitHub Actions on **`master`**, Vercel for production (+ optional staging)
- **Branch previews:** Vercel plugin — `/vercel-plugin:deploy` after `npm run validate`
- **Review:** CodeRabbit on PRs; **you merge** (agents do not)

## Agent checklist

1. Read [00-security-versions.md](./00-security-versions.md) and the task-specific `context/*.md` file.
2. Confirm `next` version ≥ `16.2.6` before shipping.
3. Extend existing patterns; keep diffs small.
4. Run `npm run lint` and `npm run build` after non-trivial changes.
