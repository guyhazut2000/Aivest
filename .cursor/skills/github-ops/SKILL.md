---
name: github-ops
description: >-
  Manage GitHub issues, Projects, milestones, branches, and PRs for this repo.
  Sync with specs/progress.md and numbered specs (`0-N-slug.md`). Use when creating issues, roadmap work, opening
  PRs, or summarizing GitHub state. Never merge PRs.
---

# GitHub ops (next-app)

## Repository

- **GitHub:** `guyhazut2000/Aivest`
- **Remote:** `https://github.com/guyhazut2000/Aivest.git`
- **Setup:** [context/09-github-setup.md](../../context/09-github-setup.md)

## Policy

- **Production branch:** `master`
- **Human merges** PRs (CodeRabbit review). Agents **never merge**.
- **Local spec:** `specs/<name>.md` — keep in sync with GitHub Issue `#` and roadmap step (e.g. `0-2`)
- Full conventions: [context/07-agentic-github.md](../../context/07-agentic-github.md)

## Tool choice

| Action | Tool |
|--------|------|
| `issue create`, `pr create`, `pr comment`, `issue comment` | `gh` |
| Search/list/get issue or PR | GitHub MCP **or** `gh` |
| On conflict | Prefer `gh` for writes |

Verify: `gh auth status` and `gh repo view`.

## Workflow A — Task → Issue

1. Read `specs/progress.md` for current step, then `specs/0-N-slug.md`.
2. Create issue:

```bash
gh issue create \
  --title "[0-2] <title from task>" \
  --body "$(cat <<'EOF'
## Roadmap
Step **0-2** — <title>

## Goal
<from task>

## Acceptance criteria
- [ ] ...

## Spec
`specs/0-2-entra-auth.md`

EOF
)" \
  --label "type:feature" \
  --label "agent"
```

3. Add to Project/milestone if user specified.
4. Update spec and progress:
   - In `specs/0-N-slug.md`: set status `in-progress`
   - In `specs/progress.md`: set step + **Current** to `in-progress`

## Workflow B — Branch + commits

```bash
git fetch origin
git checkout master
git pull origin master
git checkout -b feat/0-2-short-slug
```

- Commit on feature branch when implementation is ready (user allows agent commits here).
- Push: `git push -u origin HEAD`

## Workflow C — Open PR (no merge)

```bash
gh pr create \
  --base master \
  --title "[0-2] Short title" \
  --body "$(cat <<'EOF'
## Roadmap
Step **0-2** — Short title

## Summary
...

## Test plan
- [ ] `npm run validate`

Fixes #N

## Spec
specs/<file>.md
EOF
)"
```

Update spec with PR URL; update `specs/progress.md`. Do **not** run `gh pr merge`.

## Workflow D — Sync status

- Progress comment: `gh issue comment N --body "..."`
- Update spec checklists and `specs/progress.md`
- Move Project card if user uses Projects (via `gh project` or web — document what you did)

## Workflow E — Roadmap summary

```bash
gh issue list --state open --limit 30
gh pr list --state open
```

Group by milestone/labels for the user. Include CI state: `gh pr checks <number>`.

## Labels

Use from [07-agentic-github.md](../../context/07-agentic-github.md): `type:*`, `priority:*`, `area:*`, `agent`, `blocked`.

## Forbidden

- `gh pr merge`, MCP `merge_pull_request`
- Push to `master` (except when user explicitly asks for a hotfix workflow)
- Secrets in issues/PRs

## Handoff

Report: issue #, branch, PR link, CI status, remaining checklist items.
