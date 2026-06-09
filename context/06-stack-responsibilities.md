# 06 — Stack & technology responsibilities

Frozen decisions from product planning (May 2026). Agents must treat this file as the **ownership and process** source of truth until the user changes it.

**For which technologies and versions to use**, read **[tech-stack.md](./tech-stack.md)** first.

## Product

| Item | Choice |
|------|--------|
| Type | **SaaS** (multi-tenant-ready patterns; start simple) |
| Package manager | **npm** (`package-lock.json`) |
| Production branch | **`master`** |
| Hosting | **Vercel** (linked); optional **staging** environment |

## Application stack

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| Framework | **Next.js 16.2.6+** (App Router) | Routing, RSC, Server Actions, API `route.ts` |
| UI runtime | **React 19** | Components, hooks, client islands |
| Language | **TypeScript** (strict) | Types across app and `src/lib/` |
| Styling | **Tailwind CSS v4** | Layout, tokens, `globals.css` |
| Components | **shadcn/ui** | Accessible primitives, forms, dialogs |
| Motion | **Motion** (Framer Motion successor) | Page transitions, micro-interactions |
| Charts | **Recharts** (+ shadcn chart patterns) | Dashboards, metrics, analytics views |
| Client data | **TanStack Query (React Query)** | Client cache, mutations, optimistic UI |
| Server data | **Server Actions** + **Route Handlers** | Mutations and HTTP APIs from the app |
| HTTP (legacy/client) | **Axios** (`src/lib/api/`) | Third-party or imperative client calls only |
| ORM | **Prisma** | Schema, migrations, type-safe DB access |
| Database | **Neon Postgres** | `DATABASE_URL` in Vercel + `.env.example` |
| Auth | **Clerk** | Sessions, middleware; **Google (Gmail) OAuth** provider |
| Testing — unit | **Vitest** | Pure logic, hooks, utilities |
| Testing — component | **React Testing Library** | Component behavior |
| Testing — E2E | **Playwright** | Critical user flows |

## Not in v1 (keep simple)

- tRPC, GraphQL gateway, separate BFF service
- Heavy microservices or event buses
- Custom auth (use Clerk only)

## Environment & secrets

| Where | What |
|-------|------|
| **Vercel** | Production, Preview, Staging env vars (`DATABASE_URL`, Clerk keys, etc.) |
| **`.env.example`** | Documented keys only — never real secrets |
| **GitHub Actions** | CI-only vars when needed (e.g. `DATABASE_URL` for Prisma job uses ephemeral Postgres) |
| **Local** | `.env.local` (gitignored) |

### Staging

- Vercel **Staging** environment (or dedicated staging project) when you need pre-production validation.
- Agents: do not create staging deploys unless the user asks; document new env keys in `.env.example`.

## Agentic layer (Cursor)

| Artifact | Location | Responsibility |
|----------|----------|----------------|
| Entry | `AGENTS.md` | First file agents open |
| Specs | `context/*.md` | What to build, policies, deploy |
| Tasks | `context/tasks/*.md` | **Local** task truth; sync to GitHub Issues |
| Rules | `.cursor/rules/*.mdc` | Always-on or scoped agent behavior |
| Skills | `.cursor/skills/*/SKILL.md` | Playbooks (GitHub ops, deploy, etc.) |
| Agent roles | `context/agents/*.md` | When to behave as implementer vs GitHub ops vs verifier |
| Personal prefs | Cursor Settings → Rules | Cross-project preferences (user-managed) |

See [07-agentic-github.md](./07-agentic-github.md) and [agents/README.md](./agents/README.md).

## Platform & CI/CD

| Layer | Tool | Responsibility |
|-------|------|----------------|
| Source | **GitHub** | `master` = production; feature branches + PRs |
| CI | **GitHub Actions** (`.github/workflows/ci.yml`) | Lint, typecheck, build; Prisma when schema exists |
| CD | **Vercel** | Production on `master`; previews per branch/PR |
| Previews (agents) | **Vercel plugin** | `/vercel-plugin:deploy` after `npm run validate` |
| Review | **CodeRabbit** (human-driven) | Automated review comments; **you merge** |
| Roadmap | **GitHub Projects** + **Milestones** + labels | Planning; mirrored from `context/tasks/` |

## Planned setup files (not all implemented yet)

| Doc | When |
|-----|------|
| [03-auth.md](./03-auth.md) | Clerk + Google OAuth wiring |
| [04-database.md](./04-database.md) | Prisma + Neon bootstrap |
| [02-add-libraries.md](./02-add-libraries.md) | Extend for React Query, shadcn, Motion, Recharts |

## Verification commands (target)

```bash
npm run lint
npm run typecheck
npm run validate          # lint + typecheck + build
# After test scripts exist:
npm run test              # vitest
npm run test:e2e          # playwright
```

Agents: run the commands listed in the active **task** file; default to `npm run validate` before preview deploy or handoff.

## Agent checklist

1. Read [00-security-versions.md](./00-security-versions.md) — never ship `next` &lt; 16.2.6.
2. Match patterns in `src/`; add libraries per step docs when tasked.
3. Update the task file and link/sync the GitHub issue when work spans sessions.
