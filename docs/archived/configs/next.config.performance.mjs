/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Essential performance features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "next-auth",
      "clsx",
      "class-variance-authority",
    ],
    esmExternals: true,
    webVitalsAttribution: ["CLS", "LCP", "FCP"],
    optimizeServerReact: true,
  },

  // Images optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  // Advanced performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
    reactRemoveProperties:
      process.env.NODE_ENV === "production" ? { properties: ["^data-testid$"] } : false,
  },

  // Advanced webpack optimization for performance
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // Enhanced code splitting
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 80000,
          cacheGroups: {
            default: false,
            vendors: false,

            // Framework chunk
            framework: {
              chunks: "all",
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 40,
              enforce: true,
            },

            // Animation libraries
            animations: {
              name: "animations",
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },

            // Icons
            icons: {
              name: "icons",
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },

            // Other vendors
            vendor: {
              name: "vendor",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Caching headers
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
