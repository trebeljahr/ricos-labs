import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: siteConfig.seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.seo.themeColor.light,
    theme_color: siteConfig.seo.themeColor.dark,
    lang: siteConfig.language,
    dir: "ltr",
    categories: ["business", "developer", "games", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/ricos-labs-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/brand/ricos-labs-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
