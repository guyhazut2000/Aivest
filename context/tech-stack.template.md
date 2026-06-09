# Tech stack (template)

> Copy to `tech-stack.md` in a new project and fill in versions. Delete sections that do not apply. Keep **Status key** and **Explicitly out of scope** so agents do not invent parallel stacks.

**Status key:** ✅ shipped · 📋 planned · 🚫 avoid unless user approves

---

## Repository shape

| Path | Role |
|------|------|
| `frontend/` | |
| `backend/services/` | |
| `context/` | AI + human specs |

---

## Frontend

| Technology | Version / notes | Where |
|------------|-----------------|--------|
| **Next.js** | e.g. 16.2.6+ App Router | `frontend/` |
| **React** | | |
| **TypeScript** | strict | |
| **Tailwind CSS** | | |
| **UI kit** | e.g. shadcn/ui | |
| **Client HTTP** | e.g. Axios | `src/lib/api/` |
| **Client data** | e.g. TanStack Query | |
| **Auth** | e.g. Clerk | |
| **ORM / DB** | e.g. Prisma + Neon | |
| **Testing** | Vitest, RTL, Playwright | |

### Frontend — planned (📋)

| Technology | Notes |
|------------|--------|
| | |

---

## Backend

| Service | Stack | Port | Health path |
|---------|--------|------|-------------|
| | | | |

---

## Platform

| Layer | Choice |
|-------|--------|
| Package manager | npm / pnpm / yarn |
| CI | |
| CD / hosting | |
| Production branch | `master` / `main` |

---

## Out of scope (🚫)

- 
- 

---

## Verification

```bash
# From repo root
npm run validate
```

---

## Related docs

| Topic | File |
|-------|------|
| | `00-project-overview.md` |
| | `06-stack-responsibilities.md` |
