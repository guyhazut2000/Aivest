# 02 — Add core libraries

Run after [01-initial-project-setup.md](./01-initial-project-setup.md) verification passes.

## HTTP client — Axios

### Install

```bash
npm install axios
```

### File layout

```
src/lib/api/
├── client.ts
├── index.ts
└── types.ts
```

### `src/lib/api/client.ts` (boilerplate)

- `baseURL`: `process.env.NEXT_PUBLIC_API_URL ?? ""`
- `timeout`: 30_000
- Request interceptor: placeholder for `Authorization` when auth exists
- Response interceptor: normalize to `ApiError`; dev-only logging

### Environment (`.env.example`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Usage

| Context | Use |
|---------|-----|
| Server Component / Server Action | `fetch` or direct services |
| Client Component | `import { apiClient } from "@/lib/api"` |
| Route Handler | `fetch` or server services; Axios for upstream APIs |

### Health route

`src/app/api/health/route.ts` → `{ ok: true }` for smoke tests (implemented in repo).

## Optional libraries

Add `context/03-<name>.md` when introducing:

| Library | When |
|---------|------|
| `zod` | Env / form validation |
| `@tanstack/react-query` | Client server state |
| `clsx` + `tailwind-merge` | `cn()` helper |

## Verification

```bash
npm run lint
npm run build
```

## Agent instructions

- One shared Axios instance; no per-component `axios.create()`.
- Update [README.md](./README.md) when step 02 is complete.
