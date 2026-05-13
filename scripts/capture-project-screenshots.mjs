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
const DEVICE_SCALE = 1;
const SETTLE_MS = 2500; // give animations/3D scenes a beat to render

/**
 * Each target maps to one PNG. `wait` lets us hold the page for richer scenes.
 * `cover` gives local/prototype projects a reproducible marketing plate and
 * acts as a fallback when a live site is temporarily unreachable.
 */
const targets = [
  {
    slug: "tiao",
    url: "https://playtiao.com",
    cover: cover("Tiao", "Multiplayer board game", "Games"),
  },
  {
    slug: "raptor",
    url: "https://raptor.trebeljahr.com",
    cover: cover("Raptor Runner", "Cross-platform pixel runner", "Games"),
  },
  {
    slug: "blog",
    url: "https://ricos.site",
    cover: cover("ricos.site", "Publishing platform", "Tools"),
  },
  {
    slug: "fractal-garden",
    url: "https://fractal.garden",
    wait: 4000,
    cover: cover("Fractal Garden", "Interactive WebGL exhibition", "Art"),
  },
  {
    slug: "r3f-demos",
    url: "https://ricos.site/r3f/scenes/plasma-ball",
    wait: 4000,
    cover: cover("R3F Scene Gallery", "Shader and WebGL studies", "Art"),
  },
  {
    slug: "minecraft-clone",
    url: "https://mc.trebeljahr.com",
    wait: 4000,
    cover: cover("Minecraft Clone", "Procedural voxel sandbox", "Games"),
  },
  {
    slug: "asteroids",
    url: "https://asteroids.trebeljahr.com",
    wait: 3000,
    cover: cover("Asteroids", "Multiplayer space combat", "Games"),
  },
  {
    slug: "dinosaur",
    url: "https://quaternius.trebeljahr.com",
    wait: 3000,
    cover: cover("3D Asset Browser", "CC0 model preview tool", "Tools"),
  },
  {
    slug: "beauty",
    wait: 3500,
    cover: cover("Collection of Beauty", "Public-domain art gallery", "Art"),
  },
  {
    slug: "hatchkit",
    url: "https://hatchkit.trebeljahr.com",
    wait: 2500,
    cover: cover("hatchkit", "Scaffold and deploy full-stack apps", "Tools"),
  },
  {
    slug: "sprite-tools",
    url: "https://sprites.trebeljahr.com",
    wait: 2500,
    cover: cover("sprite-tools", "Game-ready 2D asset pipeline", "Tools"),
  },
  {
    slug: "gamedev",
    url: "https://gamedev.trebeljahr.com",
    wait: 3000,
    cover: cover("GameDev Asset Library", "Browsable CC0 game assets", "Tools"),
  },
  {
    slug: "wherearemyfriends",
    url: "https://wherearemyfriends.info",
    wait: 2500,
    cover: cover("Where Are My Friends", "Privacy-controlled location sharing", "Tools"),
  },
  {
    slug: "extinction-protocol",
    wait: 1000,
    cover: cover("Extinction Protocol", "3D roguelite tower defense", "Games"),
  },
  {
    slug: "better-bookmarks",
    wait: 1000,
    cover: cover("Better Bookmarks", "Relationship-aware bookmark manager", "Tools"),
  },
];

function cover(title, subtitle, label) {
  return { title, subtitle, label };
}

function parseOnly() {
  const arg = process.argv.find((a) => a.startsWith("--only="));
  if (!arg) return null;
  return new Set(arg.slice("--only=".length).split(",").map((s) => s.trim()));
}

async function capture(page, target) {
  const { slug, url, wait = SETTLE_MS } = target;
  process.stdout.write(`  ${slug.padEnd(20)} ${(url ?? "cover").padEnd(42)} ... `);

  if (url) {
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    } catch (err) {
      try {
        // Some pages (especially canvas-heavy ones) never go idle.
        await page.goto(url, { waitUntil: "load", timeout: 30_000 });
      } catch {
        if (!target.cover) throw err;
        await page.goto("about:blank", { waitUntil: "load" }).catch(() => {});
        await renderCover(page, target.cover);
        await page.waitForTimeout(wait);
        const buffer = await saveScreenshot(page, slug);
        console.log(`fallback cover ✓ ${(buffer.length / 1024).toFixed(0)}kb`);
        return;
      }
    }
  } else if (target.cover) {
    await page.goto("about:blank", { waitUntil: "load" }).catch(() => {});
    await renderCover(page, target.cover);
  } else {
    throw new Error("Target needs either url or cover.");
  }

  await page.waitForTimeout(wait);
  const buffer = await saveScreenshot(page, slug);
  console.log(`✓ ${(buffer.length / 1024).toFixed(0)}kb`);
}

async function saveScreenshot(page, slug) {
  const buffer = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, ...VIEWPORT },
  });
  await writeFile(resolve(outDir, `${slug}.png`), buffer);
  return buffer;
}

async function renderCover(page, data) {
  await page.setContent(coverHtml(data), { waitUntil: "load" });
}

function coverHtml({ title, subtitle, label }) {
  const escapedTitle = escapeHtml(title);
  const escapedSubtitle = escapeHtml(subtitle);
  const escapedLabel = escapeHtml(label);
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: ${VIEWPORT.width}px;
        height: ${VIEWPORT.height}px;
        overflow: hidden;
        background:
          radial-gradient(circle at 76% 24%, rgba(226, 75, 45, 0.28), transparent 28%),
          radial-gradient(circle at 18% 76%, rgba(55, 97, 164, 0.22), transparent 34%),
          linear-gradient(135deg, #141824 0%, #22263a 44%, #f3eadb 44.2%, #efe1cd 100%);
        color: #f7efe4;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .wrap {
        position: relative;
        height: 100%;
        padding: 78px;
      }
      .plate {
        position: absolute;
        inset: 58px;
        border: 1px solid rgba(247, 239, 228, 0.18);
      }
      .label {
        position: absolute;
        top: 78px;
        left: 78px;
        width: fit-content;
        border: 1px solid rgba(247, 239, 228, 0.28);
        border-radius: 999px;
        padding: 10px 14px;
        font-size: 18px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(247, 239, 228, 0.72);
      }
      .content {
        position: absolute;
        top: 305px;
        left: 78px;
        max-width: 620px;
      }
      h1 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 80px;
        font-weight: 400;
        letter-spacing: -0.02em;
        line-height: 0.96;
      }
      p {
        margin: 28px 0 0;
        max-width: 620px;
        font-size: 31px;
        line-height: 1.15;
        color: rgba(247, 239, 228, 0.72);
      }
      .mark {
        position: absolute;
        right: 78px;
        bottom: 70px;
        color: rgba(20, 24, 36, 0.76);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 24px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .mesh {
        position: absolute;
        inset: auto 80px 80px auto;
        display: grid;
        grid-template-columns: repeat(5, 34px);
        gap: 14px;
        opacity: 0.55;
      }
      .mesh i {
        width: 34px;
        height: 34px;
        border: 1px solid rgba(20, 24, 36, 0.45);
        transform: rotate(45deg);
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <div class="plate"></div>
      <div class="label">${escapedLabel} / open source</div>
      <section class="content">
        <h1>${escapedTitle}</h1>
        <p>${escapedSubtitle}</p>
      </section>
      <div class="mesh">${Array.from({ length: 20 }, () => "<i></i>").join("")}</div>
      <div class="mark">Ricos Labs</div>
    </main>
  </body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
