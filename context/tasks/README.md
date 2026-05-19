# Tasks

One markdown file per **focused** unit of work for agents and humans.

## When to add a task file

| Situation | Action |
|-----------|--------|
| Single small fix in chat | No file needed |
| Feature, migration, or multi-file change | Add `context/tasks/<name>.md` |
| Ongoing epic | One file per milestone (e.g. `auth-login.md`, `auth-callback.md`) |

## Naming

- Lowercase, hyphenated: `add-user-settings.md`
- Prefix numbers only if order matters: `03-auth-better-auth.md`

## Authoring

Copy [_template.md](./_template.md), fill every section, and link it from the main [README](../README.md) **Active tasks** table when work is in progress.

## Agent rule

**The task file is the source of truth** for that piece of work. If chat and the file disagree, follow the file after confirming with the user.
