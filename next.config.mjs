/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable for faster dev startup
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // For development speed
  },
  experimental: {},
  // Vercel function max duration (seconds) for on-demand routes
  // Vercel reads from this key when deploying Next.js
  // Note: Also configurable via vercel.json if needed
  serverRuntimeConfig: {
    maxDuration: 60,
  },
  // Force fresh deployment - clear cache
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
