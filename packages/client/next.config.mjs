import { withLocalDev } from "@hatchkit/dev-plugin-next";
import { deviceSizes, imageSizes } from "./image-sizes.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A static export, served by the Cloudflare Worker `ricos-labs-client`
  // (wrangler.jsonc). Headers live in public/_headers.
  output: "export",
  images: {
    // An export has no image optimizer. scripts/optimize-images.mjs writes
    // the WebP widths that src/lib/image-loader.ts points to.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes,
    imageSizes,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withLocalDev(nextConfig, { slug: "ricos-labs" });
