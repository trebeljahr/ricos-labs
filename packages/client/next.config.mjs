import { withLocalDev } from "@hatchkit/dev-plugin-next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  deploymentId: process.env.NEXT_DEPLOYMENT_ID,
  async headers() {
    return [{ source: "/version.json", headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }] }];
  },
  transpilePackages: ["@starter/shared"],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withLocalDev(nextConfig, { slug: "ricos-labs" });
