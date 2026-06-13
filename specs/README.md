# Specifications (`specs/`)

Numbered task specs + [progress tracker](./progress.md). **Agents start at [progress.md](./progress.md).**

## Files

| File | Role |
|------|------|
| [progress.md](./progress.md) | Where we are — current step + status table |
| `0-N-slug.md` | One deliverable per step — scope, acceptance criteria, verification |

## Spec template

```markdown
# 0-N — Title

## Step
`0-N` · Phase 0 — Foundation

## Status
draft | in-progress | done

## Problem
…

## Scope
…

## Acceptance criteria
- [ ] …

## Verification
npm run validate
```

## Lifecycle

1. Add row to [progress.md](./progress.md).
2. Create `0-N-slug.md`.
3. Implement — spec wins over chat for scope.
4. On ship: spec `done`, update progress **Current**, update `context/` topic docs if needed.

## Do not put here

Evergreen stack/auth rules → `context/`. Onboarding prose → `docs/`.
