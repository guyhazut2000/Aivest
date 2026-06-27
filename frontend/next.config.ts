import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(frontendDir, "..");

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  // Monorepo: repo root also has package.json — both roots must match.
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,
  // Webpack dev in Docker: polling is required on Windows bind mounts.
  webpack: (config, { dev }) => {
    if (dev && process.env.WATCHPACK_POLLING === "true") {
      config.watchOptions = {
        poll: Number(process.env.WATCHPACK_POLLING_INTERVAL ?? 1000),
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
