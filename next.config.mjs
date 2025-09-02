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
  experimental: {
    // Enable optimizations available in Next.js 14
    // optimizeCss: true, // Temporarily disabled due to critters dependency issue
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Enable modern features for smaller bundle size
    esmExternals: true,
  },
  
  // Target modern browsers to reduce polyfills and legacy code
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove data-testid attributes in production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  
  // External packages optimization
  serverExternalPackages: ['sharp'],
  
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https', 
        hostname: '**.amazonaws.com',
      }
    ],
  },

  // Performance optimizations
  compress: true,
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Force fresh deployment - clear cache
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  
  // Enhanced webpack config for performance
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      config.externals.push('_http_common');
    }
    
    // Aggressive bundle optimization to reduce unused JavaScript
    if (!dev) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Advanced chunk splitting for better caching and reduced initial bundle
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // Framework chunk (React, Next.js)
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'framework',
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // UI library chunk
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 30,
          },
          // Animation libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'animations',
            chunks: 'all',
            priority: 25,
          },
          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 20,
          },
          // Common modules used across pages
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
      
      // Module concatenation for smaller bundle
      config.optimization.concatenateModules = true;
      
      // Minimize module names
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }
    
    // Resolve optimization
    config.resolve.alias = {
      ...config.resolve.alias,
      // Reduce bundle size by using optimized builds - simplified for ES modules
    };
    
    return config;
  },
};

export default nextConfig;
