import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  generateBuildId: () => `${Date.now()}`, // Chunk cache busting
  images: {
    domains: ["www.webmindsdesigns.com"],
  },
  experimental: {
    // ⚠️ Only enable this if you use serverActions
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["https://www.webmindsdesigns.com"],
    },
  },
};

export default bundleAnalyzer(nextConfig);
