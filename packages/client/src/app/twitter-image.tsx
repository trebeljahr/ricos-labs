import OpengraphImage from "./opengraph-image";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = siteConfig.seo.image.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
