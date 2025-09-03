// Advanced Bundle Analyzer and Optimization
const bundleAnalyzer = require('@next/bundle-analyzer')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

// Tree-shaking configuration for maximum optimization
const treeShakingConfig = {
  // Aggressive tree-shaking
  sideEffects: false,
  
  // Webpack optimization
  optimization: {
    usedExports: true,
    providedExports: true,
    
    // Advanced code splitting
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 100000,
      cacheGroups: {
        // Vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        
        // Heavy animation libraries
        animations: {
          test: /[\\/]node_modules[\\/](framer-motion|lottie-web|gsap)[\\/]/,
          name: 'animations',
          priority: 15,
          reuseExistingChunk: true,
        },
        
        // UI libraries
        ui: {
          test: /[\\/]node_modules[\\/](@radix-ui|@headlessui|react-select)[\\/]/,
          name: 'ui-libs',
          priority: 12,
          reuseExistingChunk: true,
        },
        
        // Icons
        icons: {
          test: /[\\/]node_modules[\\/](lucide-react|heroicons|react-icons)[\\/]/,
          name: 'icons',
          priority: 11,
          reuseExistingChunk: true,
        },
        
        // Common chunk for small shared modules
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    
    // Minimize configuration
    minimize: true,
    minimizer: [
      // Terser for JS
      {
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info'],
          },
          mangle: {
            safari10: true,
          },
        },
      },
    ],
  },
}

// Module Federation for micro-frontends (future enhancement)
const moduleFederationConfig = {
  name: 'seo_audit_host',
  remotes: {
    // Future: Split features into micro-frontends
    // features: 'features@http://localhost:3001/remoteEntry.js',
  },
}

module.exports = {
  treeShakingConfig,
  moduleFederationConfig,
  withBundleAnalyzer,
}
