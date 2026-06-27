# Authentication

**Status: not used** — this is a learning project; auth was skipped (step 0-2). Portfolios and other features run without sign-in for now.

## Decision

No authentication provider is configured. Data is stored in Postgres without per-user isolation.

If auth is added later, candidates include Clerk or Better Auth. See the skipped spec: [specs/0-2-clerk-auth.md](../specs/0-2-clerk-auth.md).

## References

- Progress: [specs/progress.md](../specs/progress.md)
- Data layer: [specs/0-3-prisma-postgres.md](../specs/0-3-prisma-postgres.md)
