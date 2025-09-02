/** @type   experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'next-auth'],
    esmExternals: true,
    // Aggressive bundle splitting for better performance
    bundlePagesExternals: true,
    // Mobile-specific optimizations
    optimizeServerReact: true,
  },
  
  // Performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  
  // External packages optimization  
  serverExternalPackages: ['sharp', '@prisma/client'],).NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', 'next-auth'],
    esmExternals: true,
    // Mobile-specific performance optimizations  
    webVitalsAttribution: ['CLS', 'LCP', 'FCP'],
  },
  
  // Performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  
  // External packages optimization
  serverExternalPackages: ['sharp', '@prisma/client'],
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance
  compress: true,
  
  // Security and caching headers
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
      // Cache static assets aggressively
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Build optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Aggressive bundle splitting for mobile performance
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 150000, // Even smaller chunks for mobile
        minSize: 20000,
        cacheGroups: {
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Separate heavy libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'animations',
            priority: 35,
            enforce: true,
          },
          icons: {
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            name: 'icons',
            priority: 33,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
            maxSize: 100000, // Smaller lib chunks
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            maxSize: 80000,
          },
        },
      }
      
      // Mobile-specific optimizations
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
    }

    return config
  },
}

export default nextConfig
