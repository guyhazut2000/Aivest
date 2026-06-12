# syntax=docker/dockerfile:1
# Build context: repo root (required for monorepo turbopack root)

FROM node:22-alpine AS base
WORKDIR /workspace
RUN apk add --no-cache libc6-compat

# ── Dependencies ──────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /workspace/frontend
RUN npm ci

# ── Development (hot reload via volume-mounted source) ──────────────────────────
FROM base AS dev
COPY package.json package-lock.json ./
COPY --from=deps /workspace/frontend/node_modules ./frontend/node_modules
WORKDIR /workspace/frontend
COPY frontend/ ./
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ── Test (lint + typecheck + build) ───────────────────────────────────────────
FROM base AS test
COPY package.json package-lock.json ./
COPY --from=deps /workspace/frontend/node_modules ./frontend/node_modules
WORKDIR /workspace/frontend
COPY frontend/ ./
ENV NODE_ENV=test
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "validate"]

# ── Production build ──────────────────────────────────────────────────────────
FROM base AS builder
COPY package.json package-lock.json ./
COPY --from=deps /workspace/frontend/node_modules ./frontend/node_modules
WORKDIR /workspace/frontend
COPY frontend/ ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Production runtime ────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
WORKDIR /workspace/frontend
COPY --from=builder /workspace/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /workspace/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/frontend/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
