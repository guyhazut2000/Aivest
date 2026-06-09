# 09 — GitHub setup (Aivest)

One-time and occasional setup for **`guyhazut2000/Aivest`** on GitHub.

| Item | Value |
|------|--------|
| Remote | `https://github.com/guyhazut2000/Aivest.git` |
| Production branch | **`master`** |
| Local folder | `next-app` (package name; repo is **Aivest**) |

## 1. Install & authenticate GitHub CLI

`gh` was added via `winget install GitHub.cli`. In a **new terminal**:

```bash
gh auth login
# GitHub.com → HTTPS → Login with browser (or token)
gh auth status
```

## 2. Create labels (idempotent)

```bash
cd /path/to/next-app
npm run github:setup-labels
```

Or manually:

```bash
bash .github/scripts/setup-github-labels.sh
```

## 3. Create milestone

```bash
npm run github:setup-milestone
```

## 4. GitHub Project (manual, ~2 min)

1. Open https://github.com/guyhazut2000/Aivest/projects
2. **New project** → Board → name: **Aivest Roadmap**
3. Columns: **Backlog** | **Ready** | **In progress** | **Review** | **Done**
4. Link issues from the repo; add open issues to **Backlog**

## 5. Branch protection on `master`

Requires GitHub **Pro** or public repo for some rules. Recommended for solo “team” discipline:

```bash
gh api repos/guyhazut2000/Aivest/branches/master/protection -X PUT \
  -f required_status_checks[strict]=true \
  -f 'required_status_checks[contexts][]=Lint, typecheck & build' \
  -f enforce_admins=true \
  -f required_pull_request_reviews[dismiss_stale_reviews]=true \
  -f required_pull_request_reviews[required_approving_review_count]=0 \
  -f restrictions=
```

If the CI job name differs, list checks on a recent PR:

```bash
gh pr checks <pr-number> --repo guyhazut2000/Aivest
```

**Simpler (UI):** Settings → Branches → Add rule for `master`:

- Require a pull request before merging
- Require status checks to pass (select **Lint, typecheck & build**)
- Do not allow bypassing (optional)
- **Do not** enable auto-merge (you merge after CodeRabbit)

## 6. CodeRabbit

1. Install https://github.com/apps/coderabbitai on **guyhazut2000/Aivest**
2. Default: review on PR open/update
3. You remain the merge authority (agents never merge)

## 7. Recommended local Git settings

Run once in this clone (does not change global config):

```bash
git config branch.master.merge refs/heads/master
git config branch.master.remote origin
git config push.default current
git config pull.rebase false
git config fetch.prune true
```

## 8. Bootstrap issues (after `gh auth login`)

```bash
gh issue create --repo guyhazut2000/Aivest \
  --title "[Chore] Agentic foundation — shadcn, auth, DB, tests" \
  --body-file context/tasks/00-agentic-foundation.md \
  --label "type:chore" --label "agent"

gh issue create --repo guyhazut2000/Aivest \
  --title "[Chore] GitHub setup — labels, milestone, Project" \
  --body "See context/09-github-setup.md" \
  --label "type:chore"
```

Then add the issue number to `context/tasks/00-agentic-foundation.md` (**GitHub:** #N).

## 9. Verify

```bash
gh label list --repo guyhazut2000/Aivest
gh api repos/guyhazut2000/Aivest/milestones --jq '.[].title'
git fetch origin && git status
```

## npm scripts

| Script | Action |
|--------|--------|
| `npm run github:setup-labels` | All workflow labels |
| `npm run github:setup-milestone` | `v0.1 MVP` milestone |
| `npm run github:setup` | Labels + milestone |

## After setup

- Use [07-agentic-github.md](./07-agentic-github.md) + `github-ops` skill for day-to-day work
- Track work in `context/tasks/*.md` with **GitHub:** `#N` in the header
