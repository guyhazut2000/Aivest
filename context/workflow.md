# Agent workflow

How to work in this repo when using Cursor, Copilot, or other coding agents.

## Before you write code

1. Read [README.md](./README.md) for the ordered bootstrap files.
2. Read [tech-stack.md](./tech-stack.md), [00-project-overview.md](./00-project-overview.md), [06-stack-responsibilities.md](./06-stack-responsibilities.md), and [00-security-versions.md](./00-security-versions.md).
3. If the user named a task file, read `context/tasks/<task>.md` first.
4. For GitHub/issues/PRs, read [07-agentic-github.md](./07-agentic-github.md) and use the `github-ops` skill.
5. Skim related step files (`01-*`, `02-*`, `03-*`, `04-*`, …) only when the task requires them.

## During implementation

| Step | Action |
|------|--------|
| Scope | Change only what the task asks for; match patterns under `frontend/src/`. APIs live in `backend/services/`. |
| Stack | Next.js **16.2.6+**, App Router, TypeScript, Tailwind. No Pages Router. |
| Components | Server Components by default; `"use client"` only when needed. |
| Verify | Run commands listed in the task or step file (`lint`, `build`, manual checks). |
| Docs | Update the task file checklist and [README.md](./README.md) status when done. |

## Preview and deploy (Vercel plugin)

This repo uses the official **Vercel plugin** for Cursor agents. Full setup: [05-deploy.md](./05-deploy.md).

| When | Agent action |
|------|----------------|
| User wants a **preview** of the current branch | Run `npm run validate`, then use **`/vercel-plugin:deploy`** (preview). Share the URL from `/vercel-plugin:status` if needed. |
| User wants **production** | Merge to **`master`** after CI passes (human merges PR), or **`/vercel-plugin:deploy prod`** only if they explicitly ask. |
| Env vars for preview/prod | **`/vercel-plugin:env`** — never commit secrets; use `.env.example` for documented keys. |
| Deploy/CI questions | Use plugin skills `deployments-cicd`, `vercel-cli`, `nextjs` (see [05-deploy.md](./05-deploy.md)). |

Install (once per machine): `npx plugins add vercel/vercel-plugin --yes` — restart agent tools after install.

## When the user gives a new request

1. If it is a **one-off** in chat → follow overview + security docs; no new file required.
2. If it is **multi-step or will span sessions** → add `context/tasks/<short-name>.md` from [_template.md](./tasks/_template.md).
3. If it changes **global conventions** → update the relevant `00-*` / `0N-*` file, not only the task.

## Git & GitHub

| Action | Allowed |
|--------|---------|
| Commit + push on **feature branch** | Yes (when doing task work) |
| Open/update PR | Yes (target **`master`**; link `Fixes #N`) |
| **Merge PR** | **No** — human + CodeRabbit |
| Create/sync issues & Project | Yes (github-ops skill) |

See [07-agentic-github.md](./07-agentic-github.md).

## What not to do

- Do not pin `next` below **16.2.6** without explicit user approval.
- Do not merge PRs or push directly to **`master`** unless the user explicitly asks.
- Do not add secrets to the repo; use `.env.example` for documented keys only.

## Handoff (end of session)

In your final message, briefly state:

- What was completed vs remaining (from the task checklist).
- Commands the user should run if you could not run them.
- Which `context/` files you updated.
