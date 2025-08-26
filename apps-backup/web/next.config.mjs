/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/prisma'],
  serverExternalPackages: ['@repo/shared'],
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-only packages from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
}

export default nextConfig
