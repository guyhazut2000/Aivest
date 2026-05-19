# 00b — Security & version policy

Agents must use a **patched** Next.js release. Do not scaffold or pin vulnerable ranges.

## Current policy (May 2026)

| Item | Value |
|------|--------|
| **Latest stable major** | **16.x** (there is no Next.js 17 yet) |
| **Minimum patched version** | **`16.2.6`** |
| **LTS alternative** | `15.5.18` (only if the team explicitly stays on 15.x) |
| **Router** | **App Router only** for new features |

## Why `16.2.6`

The [May 2026 security release](https://vercel.com/changelog/next-js-may-2026-security-release) fixed **13 advisories** affecting Next.js 13.x, 14.x, 15.x (≤15.5.17), and 16.x (≤16.2.5), including:

- DoS in React Server Components
- Middleware / proxy bypasses (App Router segment-prefetch, dynamic route params)
- SSRF via WebSocket upgrades
- XSS with CSP nonces / `beforeInteractive` scripts
- Image Optimization DoS and RSC cache-poisoning issues

**Upgrade to `16.2.6` or `15.5.18` is the complete mitigation.** Staying on older minors is not acceptable for new work.

## Pinning in `package.json`

```json
"dependencies": {
  "next": "16.2.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

After install, confirm:

```bash
npm ls next
# next@16.2.6
```

## Ongoing maintenance

1. Before starting a session, check [Next.js releases](https://github.com/vercel/next.js/releases) and [security advisories](https://github.com/vercel/next.js/security/advisories).
2. If `npm audit` or GitHub reports Next.js issues, bump to the **latest patched** version in the same major (or migrate major with the upgrade guide).
3. Record the chosen version in this file when it changes.

## Agent rules

- Never scaffold with `create-next-app@14` or unpinned `latest` without verifying the resolved `next` version is ≥ `16.2.6`.
- Never add the **Pages Router** for new routes.
- Use `proxy.ts` / middleware patterns from current Next 16 docs when adding auth or edge protection.
