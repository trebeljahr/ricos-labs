// Writes the WebP widths that src/lib/image-loader.ts points to. A static
// export has no image optimizer, and the screenshots in public/images are
// up to 7 MB each.
//
//   node scripts/optimize-images.mjs [out]      default: out
//
// Reads public/images/*.png and writes <out>/images/opt/<name>-<width>.webp
// for every width in image-sizes.mjs. A width above the source width keeps
// the source width, so every URL the loader can build exists.
import { mkdirSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { deviceSizes, imageSizes } from "../image-sizes.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
// Next's default quality, which the loader does not override.
const QUALITY = 75;

export async function optimizeImages({
  source = join(ROOT, "public/images"),
  out = join(ROOT, "out"),
  widths = [...new Set([...imageSizes, ...deviceSizes])],
} = {}) {
  const target = join(out, "images/opt");
  mkdirSync(target, { recursive: true });
  const written = [];
  for (const file of readdirSync(source).filter((name) => name.endsWith(".png")).sort()) {
    const name = basename(file, ".png");
    if (!/^[\w-]+$/.test(name)) throw new Error(`The image loader cannot address ${file}.`);
    const input = sharp(join(source, file));
    for (const width of widths) {
      const path = join(target, `${name}-${width}.webp`);
      await input
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path);
      written.push(path);
    }
  }
  return written;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const started = Date.now();
  const written = await optimizeImages({ out: resolve(process.argv[2] ?? join(ROOT, "out")) });
  console.log(`Wrote ${written.length} WebP files in ${Math.round((Date.now() - started) / 1000)} s.`);
}
