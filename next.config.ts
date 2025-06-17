// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',                 // ✅ Required for static export
  basePath: '/frontend',           // ✅ Tells Next.js all routes are under /frontend
  assetPrefix: '/frontend',        // ✅ Ensures static assets like _next/... load correctly
  typescript: {
    ignoreBuildErrors: true,       // ✅ Allows build to continue even with TS errors
  },
  eslint: {
    ignoreDuringBuilds: true,      // ✅ Ignores lint issues during build
};

export default nextConfig;
