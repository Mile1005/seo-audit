/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config, { isServer }) => {
    // Handle transformers library
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Handle WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    // Handle ONNX files
    config.module.rules.push({
      test: /\.onnx$/,
      type: "asset/resource",
    });

    // Exclude transformers from server-side rendering
    if (isServer) {
      config.externals.push({
        "@xenova/transformers": "commonjs @xenova/transformers",
      });
    }

    return config;
  },
  // Increase timeout for AI model loading
  serverRuntimeConfig: {
    maxDuration: 300,
  },
  // Handle large model files
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
