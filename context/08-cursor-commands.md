# 08 — Cursor commands & skills (reference)

Slash commands depend on installed plugins. Project skills live under `.cursor/skills/`.

## Project skills (repo)

| Skill | When to use |
|-------|-------------|
| `github-ops` | Issues, roadmap, task sync, PRs (no merge) |
| *(add more under `.cursor/skills/`)* | |

Say: *“Use the github-ops skill”* or describe the outcome (*“create an issue from this task”*).

## Suggested natural-language commands

Map these to chat prompts until you add custom Cursor commands:

| Intent | Example prompt |
|--------|----------------|
| Issue from task | `Sync context/tasks/foo.md to a GitHub issue` |
| Start work | `Create branch feat/N-slug from master for issue #N` |
| Open PR | `Open a PR for this branch targeting master; Fixes #N; do not merge` |
| Roadmap | `List open issues by milestone and Project status` |
| Handoff | `Comment on #N with today’s progress from the task file` |
| Preview | `Run validate then /vercel-plugin:deploy` |

## Vercel plugin (installed separately)

| Command | Purpose |
|---------|---------|
| `/vercel-plugin:deploy` | Preview deploy |
| `/vercel-plugin:deploy prod` | Production (explicit only) |
| `/vercel-plugin:status` | Deployment status |
| `/vercel-plugin:env` | Env vars |

See [05-deploy.md](./05-deploy.md).

## Sub-agents (Task tool)

| Subagent | Use when |
|----------|----------|
| `explore` | Broad codebase search |
| `ci-watcher` / `ci-investigator` | PR checks failing |
| `generalPurpose` | Multi-step research |
| `docs-researcher` | Library docs (Context7, etc.) |

Do not delegate **merge** or **production deploy** to sub-agents.

## Personal rules

Store cross-project preferences in **Cursor Settings → Rules**. Repo rules in `.cursor/rules/` win for this project’s stack and GitHub policy.
