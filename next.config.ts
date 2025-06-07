import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  generateBuildId: () => {
    return `${Date.now()}`; // for chunk cache busting
  },
  images: {
    domains: ["www.webmindsdesigns.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["https://www.webmindsdesigns.com"],
    },
  },
};

export default nextConfig;
