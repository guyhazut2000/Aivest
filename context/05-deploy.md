# 05 — Deploy: GitHub → CI → Vercel

Continuous **integration** runs on GitHub Actions. Continuous **deployment** runs on Vercel after checks pass. This split is the standard pattern for Next.js on Vercel.

**Branch previews and agent-driven deploys** use the official **[Vercel plugin](https://vercel.com/docs/agent-resources/vercel-plugin)** in Cursor (`vercel/vercel-plugin`). Use it to build and share a preview URL **before** promoting to production on **`master`**.

## Architecture

```text
Feature branch / PR
       │
       ├──► Local validate (npm run validate)
       │
       ├──► Vercel plugin (Cursor)     — preview deploy on demand (/vercel-plugin:deploy)
       │         or PR-linked preview   — automatic when repo is connected to Vercel
       │
       ▼
 GitHub (main / master)
       │
       ├──► GitHub Actions (CI)  — lint, typecheck, build, Prisma (if present)
       │
       └──► Vercel (CD)          — production on main (after CI + merge)
```

| Layer | Tool | Responsibility |
|-------|------|----------------|
| Source | GitHub | **`master`** is the production branch (CI also listens to `main`) |
| CI | `.github/workflows/ci.yml` | Block bad merges: lint, `tsc`, `next build`, Prisma checks |
| Preview | **Vercel plugin** (Cursor) + Vercel | Shareable preview URLs for branches/PRs before production |
| Staging | Vercel (optional) | Pre-production environment when configured |
| CD | Vercel | Production deploy when **`master`** is updated (after checks pass; human merges PR) |

## Vercel plugin (Cursor agents)

Install once per developer machine (user scope). Restart Cursor or agent tools after install.

```bash
npx plugins add vercel/vercel-plugin --yes
```

**Prerequisites:** Node.js 18+, [Bun](https://bun.sh/), Cursor with agent tools enabled.

### When agents should use the plugin

| Goal | What to do |
|------|------------|
| Preview a branch before production | Run local `npm run validate`, then **`/vercel-plugin:deploy`** (preview; default) |
| Check latest preview / deployment | **`/vercel-plugin:status`** |
| Sync or add env vars for preview | **`/vercel-plugin:env`** (or `env-vars` skill) |
| First-time link repo to Vercel | **`/vercel-plugin:bootstrap`** |
| Production deploy (user asked explicitly) | **`/vercel-plugin:deploy prod`** — only after CI passes and user wants production |
| Deep deploy/CI guidance | Invoke skills: `deployments-cicd`, `vercel-cli`, `nextjs` via `/vercel-plugin:…` or plugin skills |

Do **not** skip local validation before asking for a preview deploy. Do **not** deploy to production unless the user explicitly requests it.

### Slash commands (quick reference)

| Command | Purpose |
|---------|---------|
| `/vercel-plugin:deploy` | Deploy **preview** (current branch) |
| `/vercel-plugin:deploy prod` | Deploy **production** (explicit only) |
| `/vercel-plugin:status` | Project status, recent deployments |
| `/vercel-plugin:env` | List, pull, add, remove env vars |
| `/vercel-plugin:bootstrap` | Link project, env, db setup |
| `/vercel-plugin:marketplace` | Install Marketplace integrations |

### Preview vs production workflow

1. Implement on a feature branch; run `npm run validate` locally.
2. Push branch and open a PR (CI runs on GitHub).
3. For a **shareable preview URL** before merge: use **`/vercel-plugin:deploy`** or rely on Vercel’s automatic PR preview (if the GitHub integration is connected).
4. Review preview; iterate until CI is green and the user approves merge.
5. Merge to **`master`** (you merge; CodeRabbit review) → GitHub Actions CI → Vercel **production** deploy.

Agents: prefer the **plugin** for preview deploys. **Do not merge PRs.** See [07-agentic-github.md](./07-agentic-github.md).

## One-time setup

### 1. Push this repo to GitHub

If it is not on GitHub yet, create a repository and push:

```bash
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

Use `master` instead of `main` if that is your default branch — the workflow listens to both.

### 2. Connect Vercel to GitHub

1. Open [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. Framework preset: **Next.js** (auto-detected).
3. **Root directory: `frontend`** (monorepo — Next.js app is not at repo root).
4. Production branch: **`master`**.
5. Add environment variables from `.env.example` (and secrets such as `DATABASE_URL` when you add a database).

Vercel will deploy on every push to the production branch and create **preview deployments** for pull requests.

### 3. Require CI before merge (recommended)

In GitHub: **Settings → Branches → Branch protection rules** for `master`:

- Require a pull request before merging (optional but recommended for teams).
- **Require status checks to pass** before merging.
- Select: **Lint, typecheck & build** (and **Prisma validate, generate & migrate** once `prisma/schema.prisma` exists).

### 4. Wait for GitHub checks on Vercel (recommended)

In Vercel: **Project → Settings → Git → Deployment Checks** (or “Wait for GitHub Checks”):

- Enable waiting for the **CI** workflow on production deployments.

Production deploys will not promote until GitHub Actions succeeds.

## Local verification (same as CI)

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

## When you add Prisma

1. Follow [04-database.md](./04-database.md) when that doc exists, or `npx prisma init`.
2. Add to `package.json`:

   ```json
   "scripts": {
     "postinstall": "prisma generate"
   }
   ```

3. Set `DATABASE_URL` in Vercel (Production, Preview, Development as needed).
4. **Vercel build command** (Project → Settings → General):

   ```bash
   npx prisma migrate deploy && npm run build
   ```

   Or use a `vercel.json` build command — keep migrate + build in one step so the schema is applied before `next build`.

5. CI automatically runs the `prisma` job when `prisma/schema.prisma` exists:
   - `prisma validate`
   - `prisma generate`
   - `prisma migrate deploy` against a throwaway Postgres service
   - `prisma migrate status`
   - `prisma migrate diff` (fails if schema and migrations are out of sync)

### Prisma workflow for developers

| Action | Command |
|--------|---------|
| New schema change | `npx prisma migrate dev --name <descriptive_name>` |
| Review SQL | Open the new file under `prisma/migrations/` |
| Commit | `schema.prisma` + `prisma/migrations/**` |
| Production | Vercel runs `prisma migrate deploy` at build time |

Never edit applied migration SQL in production without a deliberate plan.

## Environment variables

| Variable | Where | Notes |
|----------|--------|--------|
| `NEXT_PUBLIC_APP_URL` | Vercel, CI | CI uses localhost placeholders; set real URLs in Vercel |
| `NEXT_PUBLIC_API_URL` | Vercel, CI | Same |
| `DATABASE_URL` | Vercel only (secret) | When using Prisma; not needed in GitHub Actions (CI uses ephemeral Postgres) |

Copy keys from `.env.example`; never commit `.env.local`.

## Scripts reference

| Script | CI | Vercel |
|--------|----|--------|
| `npm run lint` | Yes | Optional (CI already ran) |
| `npm run typecheck` | Yes | Optional |
| `npm run build` | Yes | Yes (default) |
| `prisma generate` | Yes (prisma job) | `postinstall` or build step |
| `prisma migrate deploy` | Yes (prisma job) | Build step before `next build` |

## Agent checklist

- After changing deploy config, run `npm run lint`, `npm run typecheck`, and `npm run build` (or `npm run validate`).
- For **branch previews**, use the Vercel plugin: `/vercel-plugin:deploy` after local validate; use `/vercel-plugin:status` to confirm the preview URL.
- For **production**, merge to **`master`** (human) and let Vercel CD run—or `/vercel-plugin:deploy prod` only when the user explicitly asks.
- If Prisma was added or migrations changed, ensure `prisma/migrations` is committed and CI’s prisma job would pass.
- Do not store Vercel or database secrets in the repo.
- Plugin not installed? Tell the user to run `npx plugins add vercel/vercel-plugin --yes` and restart agent tools.
