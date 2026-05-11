import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@starter/shared"],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
