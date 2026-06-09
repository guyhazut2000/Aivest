# Task: Agentic foundation (stack bootstrap)

> **Status:** in progress  
> **Created:** 2026-05-23  
> **GitHub:** (sync after labels exist)  
> **Branch:** (pending)  
> **PR:** (pending)

## Goal

Install core SaaS stack pieces and wire verification so feature work can run through the GitHub + agent workflow.

## Out of scope

- Production merge (human)
- Full product features

## Requirements

1. shadcn/ui init + base components
2. TanStack Query provider
3. Motion + Recharts dependencies
4. Prisma + Neon (`04-database.md`)
5. Clerk + Google OAuth (`03-auth.md`)
6. Vitest + RTL + Playwright scripts

## Acceptance criteria

- [ ] `npm run validate` passes
- [ ] `npm run test` exists and passes (minimal smoke)
- [ ] `.env.example` documents Clerk, Neon, Vercel keys
- [ ] GitHub labels + milestone created (`npm run github:setup`)
- [ ] This task linked to a GitHub issue

## Verification

```bash
npm run github:setup
npm run validate
```

## Agent checklist

- [ ] Read [06-stack-responsibilities.md](../06-stack-responsibilities.md)
- [ ] Run github setup after `gh auth login`
- [ ] Create issue with labels `type:chore`, `agent`, milestone `v0.1 MVP`
- [ ] Branch `chore/N-agentic-foundation`
