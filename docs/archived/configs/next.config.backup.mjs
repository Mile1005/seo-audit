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
  
  // Minimal config to avoid Vercel lambda routing issues
  experimental: {
    // Only keep essential optimizations for Next.js 14.x
    optimizeCss: false,
  },
  
  // Images optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  
  // Advanced performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  
  // Advanced webpack optimization for performance
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // Enhanced code splitting for maximum performance
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          minSize: 15000, // Smaller minimum size
          maxSize: 40000, // Much smaller max size for better caching
          maxInitialRequests: 10, // Allow more initial chunks
          maxAsyncRequests: 15, // Allow more async chunks
          cacheGroups: {
            default: false,
            vendors: false,
            
            // React framework - keep minimal
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 50,
              enforce: true,
              chunks: 'all',
              maxSize: 35000,
            },
            
            // Next.js framework
            nextjs: {
              name: 'nextjs',
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 45,
              chunks: 'all',
              maxSize: 30000,
            },
            
            // Split framer-motion aggressively - it's heavy
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
              chunks: 'async', // Only load when needed
              maxSize: 25000,
            },
            
            // Icons in separate tiny chunk
            icons: {
              name: 'icons',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              priority: 35,
              reuseExistingChunk: true,
              chunks: 'async',
              maxSize: 15000,
            },
            
            // Auth libraries - separate chunk
            auth: {
              name: 'auth',
              test: /[\\/]node_modules[\\/](next-auth|@auth)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              chunks: 'async',
              maxSize: 20000,
            },
            
            // Radix UI components
            radix: {
              name: 'radix',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 25,
              chunks: 'async',
              maxSize: 15000,
            },
            
            // Utility libraries - minimal initial (fix size conflict)
            utils: {
              name: 'utils',
              test: /[\\/]node_modules[\\/](clsx|class-variance-authority|tailwind-merge)[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
              chunks: 'initial',
              maxSize: 15000, // Increased to avoid conflict
              minSize: 8000,  // Reduced to avoid conflict
            },
            
            // Split other vendors more aggressively
            vendor1: {
              name: 'vendor1',
              test: /[\\/]node_modules[\\/]/,
              priority: 15,
              reuseExistingChunk: true,
              chunks: 'initial',
              maxSize: 25000,
              minSize: 10000,
            },
            
            vendor2: {
              name: 'vendor2',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
              chunks: 'async',
              maxSize: 25000,
              minSize: 10000,
            },
          },
        },
        
        // Additional optimizations for bundle size
        minimize: true,
        concatenateModules: true,
        
        // Tree shaking improvements
        providedExports: true,
        usedExports: true,
        sideEffects: false,
      }
    }
    
    return config
  },
  
  // Caching headers
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
