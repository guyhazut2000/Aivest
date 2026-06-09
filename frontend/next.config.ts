import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Monorepo: repo root also has package.json; keep Turbopack scoped to frontend/
  turbopack: {
    root: rootDir,
  },
  outputFileTracingRoot: path.join(rootDir, ".."),
};

export default nextConfig;
