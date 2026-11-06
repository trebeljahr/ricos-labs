# Marketing images

Screenshots and GitHub social preview options for ricoslabs.com. The README embeds the screenshots from here. `manifest.json` lists every file with its pixel size, bytes, SHA-256, source and date.

All screenshots are real captures of the live site (https://ricoslabs.com, read-only, serving commit `deffc9c`), taken on 2026-11-06 with headless Playwright Chromium at device scale factor 2. These are images of ricoslabs.com itself. The project screenshots the site shows live in `packages/client/public/images/` and come from `pnpm screenshots`.

## Screenshots

| File | Shows | Pixels |
| --- | --- | --- |
| `screenshots/home-light.jpg` | Hero with the WebGL plasma ball, light theme (README hero) | 3200×2000 |
| `screenshots/home-dark.jpg` | The same hero, dark theme | 3200×2000 |
| `screenshots/projects-light.jpg` | The three featured projects, light | 3200×2000 |
| `screenshots/projects-dark.jpg` | The three featured projects, dark | 3200×2000 |
| `screenshots/grid-light.jpg` | "More from the shelf", the grid of other projects | 3200×2000 |
| `screenshots/home-mobile-light.jpg` | Home page on a 390×844 phone viewport | 780×1688 |

## Social preview

GitHub's repository card: 1280×640 PNG, under 1 MB, text inside a 64 px margin. All three come from `social-preview/template.html` (`?v=a|b|c`), with the palette and type from `BRAND.md` (Instrument Serif, Inter, JetBrains Mono) and the flask from `packages/client/src/app/icon.png`, the mark the site's nav and favicon use.

| File | Option |
| --- | --- |
| `social-preview/social-preview-a.png` | A: screenshot-led on Warm Paper. Lockup and tagline left, the dark hero with the plasma ball right. |
| `social-preview/social-preview-b.png` | B: typographic on Deep Ink. Large serif name, copper eyebrow, cyan accent. |
| `social-preview/social-preview-c.png` | C: eight real project screenshots above a Deep Ink band with the lockup. |

## Regenerate

`@playwright/test` is a dev dependency here. Install its browser once, then:

```bash
pnpm exec playwright install chromium   # once
pnpm marketing:screenshots              # add --only=home-light to capture a subset
pnpm marketing:social                   # renders A, B and C, then rewrites manifest.json
```

- `BASE_URL=http://127.0.0.1:<port> pnpm marketing:screenshots` captures a local build instead of the live site.
- `node scripts/marketing/render-social-preview.mjs --review=<file.jpg>` also writes a sheet with A, B and C side by side.
- The shot list (page, viewport, theme, scroll target, motion) is in `scripts/marketing/shots.mjs`.
