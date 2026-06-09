# 07 — Agentic GitHub workflow

How agents and humans use **GitHub** together with **`context/`** for a solo developer workflow that feels like a small team.

| Repo | `guyhazut2000/Aivest` |
| Remote | `https://github.com/guyhazut2000/Aivest.git` |
| Setup runbook | [09-github-setup.md](./09-github-setup.md) |

## Principles

| Principle | Rule |
|-----------|------|
| Local spec | `context/tasks/<name>.md` is the **detailed** spec |
| Remote tracking | **GitHub Issue** is the durable tracker (number, comments, links) |
| Roadmap | **GitHub Project** (board) + **Milestones** + **labels** |
| Agent writes | Issues, comments, branches, commits on **feature branches** |
| Human owns | **Merge**, **PR approval**, CodeRabbit follow-up |
| No agent merge | Agents must **never** `merge_pull_request` or merge via `gh pr merge` |

## Git workflow (solo, team-shaped)

**Model:** trunk-based development with short-lived feature branches.

```text
master (production)
  │
  ├── feat/42-dashboard-charts
  ├── fix/51-clerk-redirect
  └── chore/60-prisma-migrate
```

| Step | Who | Action |
|------|-----|--------|
| 1 | Human or agent | Create/update `context/tasks/<task>.md` |
| 2 | Agent (skill) | Create GitHub Issue from task; note issue `#` in task file |
| 3 | Agent | Branch from `master`: `feat/<issue>-<short-slug>` |
| 4 | Agent | Implement; commit on feature branch (user allows this) |
| 5 | Agent | Open **draft or ready PR**; body links issue (`Fixes #42`) |
| 6 | Human | CodeRabbit review, adjust, **merge when satisfied** |
| 7 | Agent (optional) | Close issue, update task checklist, move Project card |

### Branch naming

```
feat/<issue-number>-<kebab-slug>
fix/<issue-number>-<kebab-slug>
chore/<issue-number>-<kebab-slug>
```

Example: `feat/12-shadcn-dashboard`

### PR conventions

- Title: `[#12] Short description` or conventional commit style
- Body: Summary, test plan, `Fixes #12`, link to `context/tasks/...` if useful
- Target branch: **`master`**
- Agents: create/update PRs; **do not merge**

## Labels (recommended)

| Label | Use |
|-------|-----|
| `type:feature` | New capability |
| `type:bug` | Defect |
| `type:chore` | Tooling, deps, docs |
| `type:spike` | Research / POC |
| `priority:high` | Do next |
| `priority:low` | Backlog |
| `area:auth` | Clerk / OAuth |
| `area:db` | Prisma / Neon |
| `area:ui` | shadcn / Tailwind |
| `agent` | Created or primarily driven by an agent |
| `blocked` | Waiting on human input |

Create labels in the repo settings or via `gh label create` once.

## Roadmap: Projects + Milestones

| Mechanism | Responsibility |
|-----------|----------------|
| **Milestone** | Time-boxed release (e.g. `v0.1 MVP`) |
| **GitHub Project** | Kanban: Backlog → Ready → In progress → Review → Done |
| **Issue** | Single unit of work; links to task MD |
| **context/README.md** | High-level status table for agents |

When creating an issue from a task, add it to the active Project and milestone if the user named one.

## Sync: task file ↔ issue

In every `context/tasks/<name>.md`, maintain:

```markdown
**GitHub:** #42
**Branch:** feat/42-dashboard-charts
**PR:** https://github.com/<org>/<repo>/pull/99
```

Agent workflow:

1. **New task** → create issue → write `#` and URL into task file.
2. **Status change** → update task checklist; comment on issue with short summary.
3. **PR opened** → add PR link to task file; ensure `Fixes #N` in PR body.
4. **Done (after human merge)** → mark task done; close issue if not auto-closed.

## Tooling: `gh` CLI vs GitHub MCP

| Operation | Preferred tool | Why |
|-----------|----------------|-----|
| Create issue, PR, comment | **`gh`** | Stable, scriptable, matches user rules |
| Search issues/PRs, read files | **GitHub MCP** or **`gh`** | MCP is fast for structured reads |
| List PR checks, reviews | **`gh pr checks`**, **`gh pr view`** | Rich CLI output |
| Push files / merge | **`gh`** only if allowed | **Merge: never for agents** |

If MCP and `gh` disagree, prefer **`gh`** for writes.

Prerequisites:

```bash
gh auth status
gh repo view
```

## Skill & commands

| Artifact | Path |
|----------|------|
| GitHub ops skill | [.cursor/skills/github-ops/SKILL.md](../.cursor/skills/github-ops/SKILL.md) |
| Cursor commands (reference) | [08-cursor-commands.md](./08-cursor-commands.md) |
| Agent roles | [agents/](./agents/) |

Invoke the skill when the user asks to create issues, sync tasks, open PRs, update roadmap, or summarize open work.

## What agents must not do

- Merge PRs or enable auto-merge
- Force-push `master`
- Close issues as “won’t fix” without user confirmation
- Commit secrets or real `.env` values

## What agents may do (with skill)

- Create/update issues and Project items
- Add labels, milestones, comments
- Create branches, commit, push **feature branches**
- Open and update PRs (no merge)
- Summarize open PRs, CI status, and review threads for the user

## CodeRabbit

- Treat CodeRabbit as the **review assistant**; the human decides when to merge.
- Agents may fix review findings on the same feature branch and push; re-request review only if the user asks.

## Minimal GitHub automation

Keep Actions to **CI only** ([05-deploy.md](./05-deploy.md)). No auto-merge bots, no auto-label spam, unless you add them later explicitly.
