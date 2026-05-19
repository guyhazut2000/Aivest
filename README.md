# next-app

Next.js **16.2.6** (App Router) with TypeScript, Tailwind CSS v4, and Axios boilerplate.

## Security

This project pins **`next@16.2.6`**, the May 2026 security release. See [context/00-security-versions.md](./context/00-security-versions.md) before changing versions.

There is no Next.js 17 yet; stay on latest patched **16.x** (or **15.5.18** only if you intentionally remain on 15).

## AI / team instructions

Bootstrap and library steps live in **[context/](./context/)** — read `context/README.md` first.

## Scripts

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## API

- Health check: `GET /api/health` → `{ "ok": true }`
- HTTP client: `src/lib/api/` (`apiClient` for Client Components)

## Environment

Copy `.env.example` to `.env.local` and adjust values.
