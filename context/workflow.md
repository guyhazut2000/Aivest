# Agent workflow

How to work in this repo when using Cursor, Copilot, or other coding agents.

## Before you write code

1. Read [README.md](./README.md) for the ordered bootstrap files.
2. Read [00-project-overview.md](./00-project-overview.md) and [00-security-versions.md](./00-security-versions.md).
3. If the user named a task file, read `context/tasks/<task>.md` first.
4. Skim related step files (`01-*`, `02-*`, …) only when the task requires them.

## During implementation

| Step | Action |
|------|--------|
| Scope | Change only what the task asks for; match existing patterns under `src/`. |
| Stack | Next.js **16.2.6+**, App Router, TypeScript, Tailwind. No Pages Router. |
| Components | Server Components by default; `"use client"` only when needed. |
| Verify | Run commands listed in the task or step file (`lint`, `build`, manual checks). |
| Docs | Update the task file checklist and [README.md](./README.md) status when done. |

## When the user gives a new request

1. If it is a **one-off** in chat → follow overview + security docs; no new file required.
2. If it is **multi-step or will span sessions** → add `context/tasks/<short-name>.md` from [_template.md](./tasks/_template.md).
3. If it changes **global conventions** → update the relevant `00-*` / `0N-*` file, not only the task.

## What not to do

- Do not pin `next` below **16.2.6** without explicit user approval.
- Do not commit, push, or open PRs unless the user asks.
- Do not add secrets to the repo; use `.env.example` for documented keys only.

## Handoff (end of session)

In your final message, briefly state:

- What was completed vs remaining (from the task checklist).
- Commands the user should run if you could not run them.
- Which `context/` files you updated.
