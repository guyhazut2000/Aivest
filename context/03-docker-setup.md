# 03 — Docker setup

This guide explains the Docker configuration for dev, test, and production environments.

## Files

- **`Dockerfile`** — Multi-stage build with three targets: `development`, `test`, `production`
- **`docker-compose.yml`** — Local orchestration for dev/test/prod environments
- **`.dockerignore`** — Excludes unnecessary files from the build context

## Quick start

### Development (hot-reload)
```bash
docker-compose up app-dev
```

Access the app at `http://localhost:3000`. Changes to the code trigger hot-reload thanks to the volume mount and `npm run dev`.

### Production (optimized build)
```bash
docker-compose up app-prod
```

Access the app at `http://localhost:3001`. This runs the production-built app on port 3001 so it doesn't conflict with dev.

### Testing
```bash
docker-compose up app-test
```

Runs the test stage (currently a placeholder; update `package.json` scripts once tests are added).

## Dockerfile stages

### 1. Builder
- Installs all dependencies
- Runs `npm run build`
- Creates `.next` output

### 2. Development
- Installs all dependencies (including devDependencies)
- Mounts source code as a volume
- Runs `npm run dev` for hot-reload
- **Used by:** `docker-compose up app-dev`

### 3. Production
- Installs only production dependencies
- Copies pre-built `.next` and `public` from builder
- Sets `NODE_ENV=production`
- Runs `npm start`
- **Used by:** `docker-compose up app-prod` or Vercel deployment

### 4. Test
- Based on builder (includes devDependencies)
- Placeholder for test framework setup
- **Used by:** `docker-compose up app-test`

## Building directly without compose

```bash
# Development image
docker build --target development -t aivest:dev .

# Production image
docker build --target production -t aivest:prod .

# Run development
docker run -p 3000:3000 -v $(pwd):/app aivest:dev

# Run production
docker run -p 3000:3000 aivest:prod
```

## Vercel deployment

When deploying to Vercel with Docker:

1. **Ensure `public/` directory exists** (or copy from builder)
2. **Check `next.config.ts` is present** in the production stage
3. **Update vercel.ts** to specify Docker if needed:

```typescript
export const config: VercelConfig = {
  // Vercel auto-detects Dockerfile if present
  // No explicit config needed unless you want custom build args
};
```

Vercel will:
- Detect the `Dockerfile` automatically
- Build using the `production` stage
- Deploy the resulting image

## Environment variables

Each stage can receive environment variables via:

### docker-compose.yml
```yaml
environment:
  NODE_ENV: development
  NEXT_PUBLIC_API_URL: http://localhost:3000
```

### Command line
```bash
docker run -e NODE_ENV=production aivest:prod
```

### .env / .env.local
Place in the project root (excluded from Docker via `.dockerignore`) and mount for dev:
```bash
docker run -v $(pwd)/.env:/app/.env aivest:dev
```

## Notes for later (Vercel integration)

- Vercel uses the `production` stage by default
- You can configure `vercel.ts` with `buildArgs` if custom args are needed
- The app auto-deploys when you push to `master` (once linked to Vercel)
- Container logs available via `vercel logs`

## Common commands

```bash
# Build all images
docker-compose build

# Run dev with logs
docker-compose up app-dev

# Run prod in the background
docker-compose up -d app-prod

# View logs
docker-compose logs app-dev

# Stop all containers
docker-compose down

# Rebuild after dependency changes
docker-compose up --build app-dev
```
