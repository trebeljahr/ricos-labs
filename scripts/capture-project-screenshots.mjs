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
 * `visual` gives local/prototype projects a project-specific image. `cover`
 * remains as a simple fallback when a live site is temporarily unreachable.
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
    url: "https://beauty.trebeljahr.com",
    wait: 3500,
    visual: visual("beauty"),
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
    slug: "extinction-protocol",
    wait: 1000,
    visual: visual("extinction-protocol"),
  },
];

function cover(title, subtitle, label) {
  return { title, subtitle, label };
}

function visual(kind) {
  return { kind };
}

function parseOnly() {
  const arg = process.argv.find((a) => a.startsWith("--only="));
  if (!arg) return null;
  return new Set(arg.slice("--only=".length).split(",").map((s) => s.trim()));
}

async function capture(page, target) {
  const { slug, url, wait = SETTLE_MS } = target;
  const targetLabel = url ?? (target.visual ? "visual" : "cover");
  process.stdout.write(`  ${slug.padEnd(20)} ${targetLabel.padEnd(42)} ... `);

  if (url) {
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    } catch (err) {
      try {
        // Some pages (especially canvas-heavy ones) never go idle.
        await page.goto(url, { waitUntil: "load", timeout: 30_000 });
      } catch {
        if (!target.cover && !target.visual) throw err;
        await page.goto("about:blank", { waitUntil: "load" }).catch(() => {});
        await renderFallback(page, target);
        await page.waitForTimeout(wait);
        const buffer = await saveScreenshot(page, slug);
        console.log(`fallback visual ✓ ${(buffer.length / 1024).toFixed(0)}kb`);
        return;
      }
    }
  } else if (target.visual) {
    await page.goto("about:blank", { waitUntil: "load" }).catch(() => {});
    await renderFallback(page, target);
  } else if (target.cover) {
    await page.goto("about:blank", { waitUntil: "load" }).catch(() => {});
    await renderFallback(page, target);
  } else {
    throw new Error("Target needs either url, visual, or cover.");
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

async function renderFallback(page, target) {
  if (target.visual) {
    await page.setContent(visualHtml(target.visual), { waitUntil: "load" });
    return;
  }

  await renderCover(page, target.cover);
}

function visualHtml({ kind }) {
  if (kind === "beauty") {
    return beautyHtml();
  }

  if (kind === "extinction-protocol") {
    return extinctionProtocolHtml();
  }

  throw new Error(`Unknown visual kind: ${kind}`);
}

function beautyHtml() {
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
        background: #efe4d1;
        color: #231f1a;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        height: 100%;
        display: grid;
        grid-template-columns: 330px 1fr;
        background:
          linear-gradient(90deg, rgba(35, 31, 26, 0.92), rgba(35, 31, 26, 0.84) 330px, transparent 330px),
          linear-gradient(180deg, #f6efe4, #e8d6bc);
      }
      aside {
        position: relative;
        padding: 54px 42px;
        color: #f9f0e4;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 13px;
        font-size: 15px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(249, 240, 228, 0.74);
      }
      .mark {
        display: grid;
        width: 38px;
        height: 38px;
        place-items: center;
        border: 1px solid rgba(249, 240, 228, 0.38);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 25px;
      }
      h1 {
        margin: 168px 0 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 50px;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 0.98;
      }
      .copy {
        margin-top: 24px;
        font-size: 17px;
        line-height: 1.5;
        color: rgba(249, 240, 228, 0.72);
      }
      .meta {
        position: absolute;
        bottom: 52px;
        left: 42px;
        display: grid;
        gap: 13px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(249, 240, 228, 0.58);
      }
      .gallery {
        position: relative;
        padding: 52px 60px;
      }
      .rail {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 34px;
        height: 100%;
      }
      .wall {
        display: grid;
        align-content: center;
        gap: 32px;
      }
      .frame {
        position: relative;
        border: 14px solid #f8f1e7;
        box-shadow: 0 28px 70px rgba(63, 48, 31, 0.24);
        background: #f8f1e7;
      }
      .frame::after {
        content: "";
        position: absolute;
        inset: -15px;
        border: 1px solid rgba(79, 57, 34, 0.18);
      }
      .large { height: 440px; }
      .medium { height: 300px; }
      .small { height: 230px; }
      .art {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background:
          radial-gradient(circle at 30% 28%, rgba(255, 226, 141, 0.9), transparent 17%),
          radial-gradient(circle at 68% 38%, rgba(90, 121, 169, 0.82), transparent 25%),
          radial-gradient(circle at 54% 74%, rgba(140, 69, 54, 0.74), transparent 29%),
          linear-gradient(145deg, #191f2a, #dad0b8);
      }
      .art.two {
        background:
          linear-gradient(90deg, rgba(27, 31, 39, 0.2) 1px, transparent 1px),
          linear-gradient(rgba(27, 31, 39, 0.2) 1px, transparent 1px),
          radial-gradient(circle at 50% 40%, #f5d8b9, transparent 34%),
          linear-gradient(135deg, #30476b, #d86e45 54%, #f3d7aa);
        background-size: 38px 38px, 38px 38px, auto, auto;
      }
      .art.three {
        background:
          radial-gradient(circle at 48% 38%, #f8efe2 0 12%, transparent 13%),
          conic-gradient(from 0.2turn at 50% 52%, #283a55, #d39654, #702f30, #283a55);
      }
      .caption {
        margin-top: 10px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(35, 31, 26, 0.52);
      }
      .floor {
        position: absolute;
        inset: auto 0 0 330px;
        height: 180px;
        background:
          linear-gradient(rgba(45, 35, 25, 0.10) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45, 35, 25, 0.10) 1px, transparent 1px),
          rgba(214, 190, 154, 0.48);
        background-size: 78px 78px;
        transform: perspective(600px) rotateX(55deg);
        transform-origin: bottom center;
      }
    </style>
  </head>
  <body>
    <main>
      <aside>
        <div class="brand"><span class="mark">B</span><span>Collection of Beauty</span></div>
        <h1>Public-domain art, arranged as a web museum.</h1>
        <p class="copy">Curated artworks, generated variants, gallery browsing, and a 3D exhibition space built for quiet discovery.</p>
        <div class="meta"><span>Next.js</span><span>R3F museum</span><span>R2 image pipeline</span></div>
      </aside>
      <section class="gallery" aria-label="Gallery preview">
        <div class="rail">
          <div class="wall">
            <div>
              <div class="frame medium"><div class="art"></div></div>
              <div class="caption">featured works</div>
            </div>
            <div>
              <div class="frame small"><div class="art two"></div></div>
              <div class="caption">newsletter set</div>
            </div>
          </div>
          <div class="wall">
            <div>
              <div class="frame large"><div class="art three"></div></div>
              <div class="caption">museum floor 02</div>
            </div>
          </div>
          <div class="wall">
            <div>
              <div class="frame small"><div class="art two"></div></div>
              <div class="caption">open access</div>
            </div>
            <div>
              <div class="frame medium"><div class="art"></div></div>
              <div class="caption">image variants</div>
            </div>
          </div>
        </div>
        <div class="floor"></div>
      </section>
    </main>
  </body>
</html>`;
}

function extinctionProtocolHtml() {
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
        background: #081117;
        color: #e9f5ee;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        position: relative;
        height: 100%;
        background:
          radial-gradient(circle at 22% 22%, rgba(101, 196, 150, 0.24), transparent 26%),
          radial-gradient(circle at 78% 68%, rgba(234, 93, 57, 0.24), transparent 28%),
          linear-gradient(135deg, #081117 0%, #0c2022 46%, #1f301f 100%);
      }
      .hud {
        position: absolute;
        z-index: 4;
        inset: 28px 32px auto 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 13px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(233, 245, 238, 0.68);
      }
      .hud strong {
        color: #f4b75c;
        font-weight: 700;
      }
      .panel {
        position: absolute;
        z-index: 3;
        left: 38px;
        bottom: 38px;
        width: 360px;
        padding: 24px;
        background: rgba(5, 14, 17, 0.72);
        border: 1px solid rgba(233, 245, 238, 0.14);
        backdrop-filter: blur(18px);
      }
      h1 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 45px;
        font-weight: 400;
        line-height: 0.98;
        letter-spacing: 0;
      }
      .panel p {
        margin: 14px 0 0;
        color: rgba(233, 245, 238, 0.68);
        font-size: 15px;
        line-height: 1.45;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 18px;
      }
      .chips span {
        border: 1px solid rgba(244, 183, 92, 0.34);
        color: #f4b75c;
        padding: 7px 9px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .field {
        position: absolute;
        inset: 86px 44px 44px 344px;
        transform: skewY(-6deg);
        border: 1px solid rgba(233, 245, 238, 0.12);
        background:
          linear-gradient(30deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(150deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(244, 183, 92, 0.10), transparent 45%),
          rgba(17, 42, 34, 0.76);
        background-size: 58px 58px, 58px 58px, auto, auto;
        box-shadow: inset 0 0 90px rgba(0, 0, 0, 0.35), 0 28px 90px rgba(0, 0, 0, 0.28);
      }
      .path {
        position: absolute;
        inset: 130px 82px 120px 74px;
        border-radius: 42% 48% 44% 38%;
        border: 58px solid rgba(121, 94, 60, 0.86);
        transform: rotate(-8deg);
        filter: drop-shadow(0 16px 18px rgba(0, 0, 0, 0.18));
      }
      .path::before {
        content: "";
        position: absolute;
        inset: -35px;
        border-radius: inherit;
        border: 1px solid rgba(244, 183, 92, 0.24);
      }
      .tower,
      .enemy,
      .blast,
      .node {
        position: absolute;
        transform: skewY(6deg);
      }
      .tower {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        background: radial-gradient(circle, #c8f7d2 0 18%, #48a978 20% 43%, #1d4738 45% 100%);
        border: 2px solid rgba(214, 255, 226, 0.48);
        box-shadow: 0 0 34px rgba(88, 219, 139, 0.32);
      }
      .tower::after {
        content: "";
        width: 18px;
        height: 18px;
        border: 2px solid rgba(8, 17, 23, 0.58);
        transform: rotate(45deg);
      }
      .t1 { left: 330px; top: 156px; }
      .t2 { left: 555px; top: 352px; }
      .t3 { right: 226px; top: 208px; }
      .t4 { right: 330px; bottom: 126px; }
      .enemy {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 35% 30%, #ffd08a 0 16%, transparent 17%),
          radial-gradient(circle, #f05b3e 0 48%, #672226 50% 100%);
        box-shadow: 0 0 22px rgba(240, 91, 62, 0.44);
      }
      .e1 { left: 196px; top: 276px; }
      .e2 { left: 404px; top: 416px; }
      .e3 { left: 712px; top: 318px; }
      .e4 { right: 152px; top: 404px; }
      .e5 { right: 300px; bottom: 192px; }
      .blast {
        width: 190px;
        height: 2px;
        transform-origin: left center;
        background: linear-gradient(90deg, rgba(244, 183, 92, 0), #f4b75c, rgba(244, 183, 92, 0));
        box-shadow: 0 0 20px #f4b75c;
      }
      .b1 { left: 380px; top: 203px; rotate: 23deg; }
      .b2 { left: 606px; top: 390px; rotate: -22deg; }
      .b3 { right: 266px; bottom: 174px; rotate: -54deg; }
      .node {
        width: 110px;
        height: 110px;
        right: 76px;
        bottom: 54px;
        border: 2px solid rgba(244, 183, 92, 0.42);
        background: radial-gradient(circle, rgba(244, 183, 92, 0.28), rgba(244, 183, 92, 0.04) 58%, transparent 60%);
      }
      .node::before,
      .node::after {
        content: "";
        position: absolute;
        inset: 20px;
        border: 1px solid rgba(244, 183, 92, 0.46);
        transform: rotate(45deg);
      }
      .node::after {
        inset: 38px;
      }
      .scan {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.035) 1px, transparent 1px, transparent 6px);
        mix-blend-mode: overlay;
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="hud"><span>Outpost 17 / wave <strong>23</strong></span><span>cores 03 · towers 06 · threat rising</span></div>
      <section class="panel">
        <h1>Extinction Protocol</h1>
        <p>3D roguelite tower defense with branching outposts, biome pressure, tower builds, and desktop/mobile shells.</p>
        <div class="chips"><span>R3F</span><span>Tauri</span><span>Capacitor</span></div>
      </section>
      <div class="field" aria-label="Tower defense encounter preview">
        <div class="path"></div>
        <div class="tower t1"></div>
        <div class="tower t2"></div>
        <div class="tower t3"></div>
        <div class="tower t4"></div>
        <div class="enemy e1"></div>
        <div class="enemy e2"></div>
        <div class="enemy e3"></div>
        <div class="enemy e4"></div>
        <div class="enemy e5"></div>
        <div class="blast b1"></div>
        <div class="blast b2"></div>
        <div class="blast b3"></div>
        <div class="node"></div>
      </div>
      <div class="scan"></div>
    </main>
  </body>
</html>`;
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
