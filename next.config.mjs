/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting is run separately; don't fail production builds on lint warnings.
    ignoreDuringBuilds: true,
  },
  images: {
    // Placeholder photography is served from Picsum (real Unsplash photos, no API key).
    // When you swap in your own images under /public/photos these remote hosts are no
    // longer needed — local images don't require any config here.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
