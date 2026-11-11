/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow production verification to use an isolated output directory so it
  // never overwrites a running `next dev` cache. Defaults to ".next".
  distDir: process.env.GRAVERSE_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Preserve the old public URLs. Query strings are carried over by Next.
      { source: "/explore", destination: "/explorer", permanent: false },
      { source: "/kids", destination: "/academy", permanent: false },
      { source: "/museum/timeline", destination: "/explorer", permanent: false },
    ];
  },
};

export default nextConfig;
