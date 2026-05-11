#!/usr/bin/env node
// Refreshes packages/client/public/images/*.png from the live project URLs.
// Run: pnpm exec node scripts/capture-project-screenshots.mjs
//      pnpm exec node scripts/capture-project-screenshots.mjs --only=tiao,raptor

import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../packages/client/public/images");

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE = 2;
const SETTLE_MS = 2500; // give animations/3D scenes a beat to render

/**
 * Each target maps to one PNG. `wait` lets us hold the page for richer scenes;
 * `clip` lets us frame around a hero element instead of grabbing the full fold.
 */
const targets = [
  { slug: "tiao", url: "https://playtiao.com" },
  { slug: "raptor", url: "https://raptor.trebeljahr.com" },
  { slug: "blog", url: "https://ricos.site" },
  { slug: "fractal-garden", url: "https://fractal.garden", wait: 4000 },
  { slug: "r3f-demos", url: "https://ricos.site/r3f/scenes/plasma-ball", wait: 4000 },
  { slug: "minecraft-clone", url: "https://mc.trebeljahr.com", wait: 4000 },
  { slug: "asteroids", url: "https://asteroids.trebeljahr.com", wait: 3000 },
  { slug: "dinosaur", url: "https://quaternius.trebeljahr.com", wait: 3000 },
];

function parseOnly() {
  const arg = process.argv.find((a) => a.startsWith("--only="));
  if (!arg) return null;
  return new Set(arg.slice("--only=".length).split(",").map((s) => s.trim()));
}

async function capture(page, target) {
  const { slug, url, wait = SETTLE_MS } = target;
  process.stdout.write(`  ${slug.padEnd(18)} ${url} … `);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  } catch {
    // Some pages (especially canvas-heavy ones) never go idle.
    await page.goto(url, { waitUntil: "load", timeout: 30_000 });
  }
  await page.waitForTimeout(wait);
  const buffer = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, ...VIEWPORT },
  });
  await writeFile(resolve(outDir, `${slug}.png`), buffer);
  console.log(`✓ ${(buffer.length / 1024).toFixed(0)}kb`);
}

async function main() {
  const only = parseOnly();
  const queue = only ? targets.filter((t) => only.has(t.slug)) : targets;
  if (queue.length === 0) {
    console.error("No targets matched --only.");
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();

  console.log(`Capturing ${queue.length} screenshot(s) → ${outDir}`);
  for (const t of queue) {
    try {
      await capture(page, t);
    } catch (err) {
      console.error(`✗ ${t.slug}: ${err.message}`);
    }
  }

  await browser.close();
}

await main();
