import type { ImageLoaderProps } from "next/image";

/**
 * A static export has no image optimizer. For the PNGs under /images/,
 * scripts/optimize-images.mjs writes one WebP per width that Next can ask
 * for (image-sizes.mjs) to /images/opt/. Other images, and every image
 * under `next dev`, load as they are.
 *
 * Next requires the default export for `images.loaderFile`.
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const match = /^\/images\/([\w-]+)\.png$/.exec(src);
  if (!match || process.env.NODE_ENV !== "production") return `${src}?w=${width}`;
  return `/images/opt/${match[1]}-${width}.webp`;
}
