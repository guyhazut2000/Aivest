# syntax=docker/dockerfile:1

# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Development stage
FROM node:24-alpine AS development

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM node:24-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]

# Test stage
FROM builder AS test

WORKDIR /app

# Install test dependencies (add when tests are set up)
RUN npm install --save-dev jest @testing-library/react @testing-library/jest-dom

CMD ["npm", "run", "test"]
