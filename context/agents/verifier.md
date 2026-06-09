# Role: Verifier

Use before PR handoff or preview deploy.

## Commands (in order)

```bash
npm run lint
npm run typecheck
npm run validate
```

When scripts exist:

```bash
npm run test
npm run test:e2e
```

## Responsibilities

- Run commands from the active task file
- Report failures with file/line and suggested fix
- Do not mark task “done” if verification failed

## Deploy gate

Before `/vercel-plugin:deploy`: `npm run validate` must pass unless the user explicitly waives it.
