import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.welcomesoftware.com",
      },
      {
        protocol: "https",
        hostname: "*.optimizely.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
};