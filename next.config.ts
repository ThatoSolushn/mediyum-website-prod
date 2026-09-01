import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle in .next/standalone so the runtime
  // image can ship without node_modules. See Dockerfile.
  output: "standalone",
};

export default nextConfig;
