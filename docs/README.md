# Documentation (`docs/`)

Human-facing documentation for Aivest — written for contributors, reviewers, and future teammates.

## Purpose

Explain **what the system is** and **how to work with it** in narrative form. Optimized for reading top-to-bottom, not for agent bootstrap.

## Put here

| Type | Examples |
|------|----------|
| Onboarding | "New contributor setup", local dev walkthroughs beyond quick start |
| Architecture overviews | System diagrams, data flow, service boundaries (narrative) |
| ADRs | Architecture Decision Records with context and alternatives |
| Runbooks | Deploy rollback, incident response, operational procedures |
| Product overview | What Aivest is for end users (non-spec, non-marketing site) |
| API / integration guides | Human-readable reference when OpenAPI or code is not enough |

## Do **not** put here

| Wrong location | Belongs in |
|----------------|------------|
| "Use Next.js 16.2.6" version pins | `context/tech-stack.md` |
| Agent workflow ("never merge PRs") | `AGENTS.md`, `context/workflow.md` |
| Feature acceptance criteria for a sprint | `specs/` |
| Entra ID env vars and auth architecture for implementers | `context/auth.md` |
| Auto-generated API docs | Generate in CI or from code; link from here if needed |
| Duplicate of root `README.md` quick start | Keep quick start in root `README.md`; link out for depth |

## Relationship to other folders

```
docs/     →  "Explain it to a person"
context/  →  "Tell the agent how we build here"
specs/    →  "Define what to build next"
code/     →  "The implementation"
```

When a doc becomes operational truth for agents (versions, conventions, boundaries), **move or summarize** the relevant parts into `context/` and link from here.

## Index

_Add pages as the project grows. Suggested first additions:_

- `architecture.md` — monorepo layout, frontend vs backend ownership
- `local-development.md` — Docker vs native dev, port map, troubleshooting
