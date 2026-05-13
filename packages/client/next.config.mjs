import { withLocalDev } from "@hatchkit/dev-plugin-next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@starter/shared"],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withLocalDev(nextConfig, { slug: "ricos-labs" });
