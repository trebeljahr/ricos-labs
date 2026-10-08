import { withLocalDev } from "@hatchkit/dev-plugin-next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  deploymentId: process.env.NEXT_DEPLOYMENT_ID,
  async headers() {
    return [{ source: "/version.json", headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }] }];
  },
  async rewrites() {
    return [
      // Plausible script, served first-party so content blockers that block
      // plausible.trebeljahr.com still let visits through. Events go through
      // src/app/kestrel/k/route.ts, which passes the visitor's IP on.
      {
        source: "/kestrel/k.js",
        destination:
          "https://plausible.trebeljahr.com/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js",
      },
    ];
  },
  transpilePackages: ["@starter/shared"],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withLocalDev(nextConfig, { slug: "ricos-labs" });
