/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow production verification to use an isolated output directory so it
  // never overwrites a running `next dev` cache. Defaults to ".next".
  distDir: process.env.GRAVERSE_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
