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
    // Enable optimizations available in Next.js 14+
    // optimizeCss: true, // Temporarily disabled due to critters dependency issue
    optimizePackageImports: ['lucide-react', 'framer-motion'],
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
    
    // Bundle optimization for production
    if (!dev) {
      // Enhanced tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Better chunk splitting to reduce unused code
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 244000, // Split large vendor chunks
          },
          // Split React libraries
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 10,
          },
          // Split animation libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|@emotion)[\\/]/,
            name: 'animations',
            chunks: 'all',
            priority: 5,
          },
          // Split UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](lucide-react|@headlessui)[\\/]/,
            name: 'ui-vendor',
            chunks: 'all',
            priority: 5,
          },
        },
      };
      
      // Enable module concatenation for better tree shaking
      config.optimization.concatenateModules = true;
      
      // Better dead code elimination
      config.optimization.innerGraph = true;
      config.optimization.providedExports = true;
      
      // Remove development-only code
      config.resolve.alias = {
        ...config.resolve.alias,
        // Remove development modules in production
        'framer-motion/dev': false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
