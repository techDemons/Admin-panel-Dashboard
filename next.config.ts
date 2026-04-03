import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ required for Netlify manual deploy

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    unoptimized: true, // ✅ important for static export (Next/Image fix)
  },
};

export default nextConfig;