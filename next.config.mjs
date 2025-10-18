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
  
  // Redirects configuration - handle non-www to www and index pages
  async redirects() {
    return [
      // Redirect non-www to www for SEO consistency
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
      // Redirect /index to root
      {
        source: '/index',
        destination: '/',
        permanent: true, // 301 permanent redirect
      },
    ]
  },

  // Security headers configuration
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com; frame-ancestors 'none';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=(), ambient-light-sensor=(), autoplay=(), encrypted-media=(), fullscreen=(self), picture-in-picture=()',
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
    config.optimization = {
      ...config.optimization,
      // Enable code splitting optimization
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Bundle React and Next.js runtime together
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            name: 'common',
          },
          // Vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 1,
            priority: -10,
            name: 'vendors',
            reuseExistingChunk: true,
            maxSize: 250000, // Combine smaller vendor chunks
          },
        },
      },
    }
    return config
  },
}

const withMDX = (await import('@next/mdx')).default({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
