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
  
  // Performance optimizations
  compress: true, // Enable gzip compression
  swcMinify: true, // Use SWC for faster minification
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'], // Use modern image formats
    minimumCacheTTL: 60, // Cache images for 60 seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Thumbnail sizes
  },
  
  // Redirects configuration - handle non-www to www and index pages
  async redirects() {
    const locales = ['en', 'fr', 'it', 'es', 'id', 'de'];
    
    return [
      // Redirect non-www to www for SEO consistency (locale-aware)
      {
        source: '/:path((?!_next).*)',
        has: [
          {
            type: 'host',
            value: 'aiseoturbo.com',
          },
        ],
        destination: 'https://www.aiseoturbo.com/:path',
        permanent: true, // 301 permanent redirect
      },
      // Redirect old /help/category/* URLs to new structure
      {
        source: '/help/category/getting-started',
        destination: '/help/getting-started',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/category/troubleshooting',
        destination: '/help/troubleshooting',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/category/account-billing',
        destination: '/help/account-billing',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/category/api-integrations',
        destination: '/help/api-integrations',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/category/seo-tools-features',
        destination: '/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/category/security-privacy',
        destination: '/help/security-privacy',
        permanent: true, // 301 permanent redirect
      },
      // Redirect /index.html to root
      {
        source: '/index.html',
        destination: '/',
        permanent: true, // 301 permanent redirect
      },
      // Redirect /index.php to root
      {
        source: '/index.php',
        destination: '/',
        permanent: true, // 301 permanent redirect
      },
      // Redirect old help URLs to new structure
      {
        source: '/help/features',
        destination: '/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/features',
        destination: '/:locale/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/competitor-analysis',
        destination: '/help/features/competitor-analysis',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/competitor-analysis',
        destination: '/:locale/help/features/competitor-analysis',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/seo-audit-guide',
        destination: '/help/features/seo-audit',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/seo-audit-guide',
        destination: '/:locale/help/features/seo-audit',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/site-crawling',
        destination: '/help/features/site-crawler',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/site-crawling',
        destination: '/:locale/help/features/site-crawler',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/content-optimization',
        destination: '/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/content-optimization',
        destination: '/:locale/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/enterprise-reporting',
        destination: '/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/enterprise-reporting',
        destination: '/:locale/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/keyword-research',
        destination: '/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/keyword-research',
        destination: '/:locale/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/help/seo-tools-features/performance-monitoring',
        destination: '/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/:locale/help/seo-tools-features/performance-monitoring',
        destination: '/:locale/help/seo-tools-features',
        permanent: true, // 301 permanent redirect
      },
      // Redirect /en/* to /* for English paths (as-needed locale prefix)
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true, // 301 permanent redirect
        locale: false, // Apply to all locales
      },
    ]
  },

  // Security and caching headers configuration
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://*.googletagmanager.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com; frame-ancestors 'none';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=(), autoplay=(), encrypted-media=(), fullscreen=(self), picture-in-picture=()',
          },
        ],
      },
      {
        // Image cache headers - gif files
        source: '/:path*\\.gif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Image cache headers - jpg/jpeg files
        source: '/:path*\\.(jpg|jpeg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Image cache headers - png files
        source: '/:path*\\.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Image cache headers - webp files
        source: '/:path*\\.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Image cache headers - svg files
        source: '/:path*\\.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Image cache headers - ico files
        source: '/:path*\\.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Image cache headers - avif files
        source: '/:path*\\.avif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Font cache headers - woff files
        source: '/:path*\\.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Font cache headers - woff2 files
        source: '/:path*\\.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Font cache headers - ttf files
        source: '/:path*\\.ttf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // CSS files - ensure proper MIME type for deferred stylesheets
        source: '/:path*\\.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font cache headers - otf files
        source: '/:path*\\.otf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Wed, 18 Oct 2026 00:00:00 GMT',
          },
        ],
      },
      {
        // Remove HTTP Link headers to prevent hreflang multiple implementations
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '',
          },
        ],
      },
    ]
  },
  
  // Minimal experimental config for Next.js 14.x
  experimental: {},
  
  // Basic images optimization only
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Webpack optimization for reducing HTTP requests
  webpack: (config, { isServer }) => {
    // Temporarily disable splitChunks to diagnose framer-motion SSR issue
    // config.optimization = {
    //   ...config.optimization,
    //   splitChunks: {
    //     chunks: 'all',
    //     cacheGroups: {
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true,
    //         name: 'common',
    //       },
    //       framerMotion: {
    //         test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
    //         name: 'framer-motion',
    //         priority: 10,
    //         reuseExistingChunk: true,
    //       },
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]((?!framer-motion).*)[\\/]/,
    //         minChunks: 1,
    //         priority: -10,
    //         name: 'vendors',
    //         reuseExistingChunk: true,
    //         maxSize: 250000,
    //       },
    //     },
    //   },
    // }
    return config
  },
}

const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = (await import('@next/mdx')).default({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

// Import next-intl plugin for i18n support
const withNextIntl = (await import('next-intl/plugin')).default(
  // Specify the path to your i18n config
  './i18n.ts'
);

export default withBundleAnalyzer(withMDX(withNextIntl(nextConfig)))
