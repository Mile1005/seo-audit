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
  // Remove experimental features for faster startup
  experimental: {},
  // Turbopack configuration
  turbo: {
    rules: {
      '*.js': ['typescript-transform'],
    },
  }
};

export default nextConfig;