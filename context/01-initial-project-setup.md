# 01 — Initial Next.js project setup

Use this when creating or verifying the base Next.js application.

## Goals

- Next.js **`16.2.6`** (or newer patched 16.x) with **App Router**
- **TypeScript**, **Tailwind CSS**, **ESLint**
- **`src/` directory** with `src/app/`
- Import alias: `@/*` → `src/*`

See [00-security-versions.md](./00-security-versions.md) for CVE context.

## Prerequisites

- **Node.js 20 LTS** (recommended) or 18.18+
- **npm** 9+

## Scaffold command (greenfield)

From an **empty** directory:

```bash
npx create-next-app@16.2.6 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

### Non-empty directory (e.g. `context/` already exists)

```bash
# From parent folder
npx create-next-app@16.2.6 next-app-tmp \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --yes

# Copy scaffold into project root (preserve context/)
cp -r next-app-tmp/* next-app-tmp/.[!.]* ./next-app/
rm -rf next-app-tmp
```

## Pin security version after scaffold

Verify `package.json`:

```json
"next": "16.2.6"
```

If `create-next-app` resolved an older 16.x, run:

```bash
npm install next@16.2.6
```

## Expected structure

```
.
├── context/
├── public/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Conventions agents must follow

### App Router

- Default to **Server Components** in `src/app/**`.
- `"use client"` only for hooks, browser APIs, events, or client-only libraries.
- API routes: `src/app/api/<name>/route.ts`.

### Environment

- `.env.example` at repo root; `.env.local` gitignored.
- `NEXT_PUBLIC_*` for browser-visible values only.

## Verification

```bash
npm install
npm ls next          # must show 16.2.6 or newer patched 16.x
npm run dev          # http://localhost:3000
npm run lint
npm run build
```

## Done when

- [ ] `npm ls next` ≥ `16.2.6`
- [ ] `npm run build` and `npm run lint` pass
- [ ] `.env.example` present
- [ ] [README.md](./README.md) step 01 checked off

## Agent instructions

- Do **not** use Next.js 14/15 or the Pages Router for new code unless the user explicitly requests a downgrade.
- Do **not** pin `next` below `16.2.6` on a new project.
- Commit only when the user asks.
