import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Written once at build time: the site is a static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.seo.updatedAt);

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/imprint`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
