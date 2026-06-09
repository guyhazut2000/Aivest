# Tech stack (agent reference)

> **Purpose:** Canonical list of technologies used in this project. Read this when choosing libraries, versions, file locations, or patterns. For **who owns what** (CI, GitHub, deploy), see [06-stack-responsibilities.md](./06-stack-responsibilities.md). For **minimum Next.js version policy**, see [00-security-versions.md](./00-security-versions.md).

**Status key:** ✅ shipped in repo · 📋 planned (documented, not installed) · 🚫 avoid unless the user explicitly asks

---

## Repository shape

| Path | Role |
|------|------|
| `frontend/` | Next.js app (Vercel root directory) |
| `backend/services/` | API services (local Docker; AWS later) |
| `backend/docker-compose.yml` | Local Postgres + APIs |
| `context/` | Specs, workflow, tasks (you are here) |
| `package.json` (root) | `dev`, `validate`, `docker:*` — delegates to `frontend/` |

---

## Frontend (✅)

| Technology | Version / notes | Where |
|------------|-----------------|--------|
| **Next.js** | **16.2.6+** (App Router only) | `frontend/` |
| **React** | 19.x | `frontend/package.json` |
| **TypeScript** | 5.x, strict | `frontend/tsconfig.json` |
| **Tailwind CSS** | v4 (`@tailwindcss/postcss`) | `frontend/src/app/globals.css` |
| **ESLint** | 9 + `eslint-config-next` | `frontend/eslint.config.mjs` |
| **React Compiler** | babel plugin (dev) | `frontend/package.json` |
| **Axios** | 1.x | `frontend/src/lib/api/` — third-party / imperative client HTTP only |
| **Route Handlers** | Next `route.ts` | e.g. `frontend/src/app/api/health/route.ts` |

### Frontend — planned (📋)

| Technology | Use when added |
|------------|----------------|
| **shadcn/ui** | Accessible UI primitives |
| **Motion** | Animations (Framer Motion successor) |
| **Recharts** | Charts / dashboards |
| **TanStack Query** | Client-side server-state cache |
| **Server Actions** | Server mutations from the app |
| **Vitest** + **React Testing Library** | Unit / component tests |
| **Playwright** | E2E tests |
| **Clerk** | Auth + Google OAuth — [03-auth.md](./03-auth.md) |
| **Prisma** + **Neon Postgres** | ORM + hosted DB — [04-database.md](./04-database.md) |

Default data fetching in Server Components: **`fetch`**. Do not add tRPC, GraphQL, or a separate BFF in v1.

---

## Backend — local dev (✅)

| Service | Stack | Port | Health |
|---------|--------|------|--------|
| **api-python** | FastAPI + Uvicorn | 8000 | `GET /health` |
| **api-go** | Go 1.23, stdlib HTTP | 8080 | `GET /health` |
| **api-node** | Express 4.x (ESM) | 3001 | `GET /health` |
| **postgres** | Postgres 16 (Compose) | 5432 | — |

Production target for APIs: **AWS** (ECS / App Runner / etc.) — not wired yet. See [10-local-docker.md](./10-local-docker.md).

**Rule:** Never add backend services under `frontend/`. All API code lives under `backend/services/`.

---

## Platform & tooling (✅)

| Layer | Technology |
|-------|------------|
| Package manager | **npm** (`package-lock.json`) |
| Git hooks | **Husky** + **lint-staged** (frontend ESLint on commit) |
| CI | **GitHub Actions** — `.github/workflows/ci.yml` |
| CD / hosting | **Vercel** (`frontend/`); production branch **`master`** |
| Source control | **GitHub** — PRs; agents **never merge** |
| Agent entry | `AGENTS.md` → this file + `context/` |

---

## Environment variables

| File | Purpose |
|------|---------|
| `.env.example` (root) | Documented keys only |
| `frontend/.env.local` | Local secrets (gitignored) |
| Vercel project env | Preview / production |

Never commit real secrets. See [06-stack-responsibilities.md](./06-stack-responsibilities.md) for staging policy.

---

## Explicitly out of scope (🚫)

- **Pages Router** for new routes
- **Next.js &lt; 16.2.6** (see [00-security-versions.md](./00-security-versions.md))
- Custom auth (use **Clerk** when added)
- tRPC, GraphQL gateway, event buses, heavy microservices in v1
- Duplicating backend code under `frontend/`

---

## Verification (from repo root)

```bash
npm run lint          # ESLint (frontend)
npm run typecheck     # tsc --noEmit (frontend)
npm run validate      # lint + typecheck + build
npm run docker:up     # local Postgres + APIs
npm run dev           # Next.js → http://localhost:3000
```

When test scripts exist: `npm run test` (Vitest), `npm run test:e2e` (Playwright).

---

## Related docs

| Topic | File |
|-------|------|
| Overview & conventions | [00-project-overview.md](./00-project-overview.md) |
| Security / Next version floor | [00-security-versions.md](./00-security-versions.md) |
| Tool ownership & CI/CD | [06-stack-responsibilities.md](./06-stack-responsibilities.md) |
| Local Docker | [10-local-docker.md](./10-local-docker.md) |
| Auth setup | [03-auth.md](./03-auth.md) |
| Database setup | [04-database.md](./04-database.md) |
| Deploy & previews | [05-deploy.md](./05-deploy.md) |
| Per-task work | [tasks/](./tasks/) |

When a task file conflicts with this doc on **scope**, the **task file wins**. When unsure which **library or version** to use, this file wins unless the user overrides in chat.
