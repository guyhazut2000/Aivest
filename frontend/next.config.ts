import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(frontendDir, "..");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Monorepo: repo root also has package.json — both roots must match.
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
