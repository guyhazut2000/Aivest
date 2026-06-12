# syntax=docker/dockerfile:1
# Build context: repo root

FROM node:22-alpine AS base
WORKDIR /app
COPY backend/services/api-node/package.json backend/services/api-node/package-lock.json* ./
RUN npm ci --omit=dev

# ── Development (node --watch) ────────────────────────────────────────────────
FROM node:22-alpine AS dev
WORKDIR /app
COPY backend/services/api-node/package.json backend/services/api-node/package-lock.json* ./
RUN npm ci
COPY backend/services/api-node/src ./src
EXPOSE 3001
CMD ["node", "--watch", "src/index.js"]

# ── Production ────────────────────────────────────────────────────────────────
FROM base AS runner
COPY backend/services/api-node/src ./src
EXPOSE 3001
CMD ["node", "src/index.js"]
