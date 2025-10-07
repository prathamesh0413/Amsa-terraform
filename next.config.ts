import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export instead of next export
  output: "export",

  // Required because Next.js image optimization doesn’t work with static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
