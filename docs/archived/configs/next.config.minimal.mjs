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

  // Minimal experimental config for Next.js 14.x
  experimental: {},

  // Basic images optimization only
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = (await import("@next/mdx")).default({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
