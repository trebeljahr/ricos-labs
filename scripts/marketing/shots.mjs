// The screenshots of ricoslabs.com, shared by capture-screenshots.mjs and
// write-manifest.mjs.
export const baseUrl = (process.env.BASE_URL ?? "https://ricoslabs.com").replace(/\/$/, "");

const desktop = { width: 1600, height: 1000 };
const mobile = { width: 390, height: 844 };

// theme: next-themes reads localStorage "theme" (the site follows the system
// theme by default). motion: the hero's WebGL glass scene renders only when
// the visitor allows motion, so hero shots turn it on and wait for the scene.
export const shots = [
  { name: "home-light", path: "/", viewport: desktop, theme: "light", motion: true, waitMs: 8000 },
  { name: "home-dark", path: "/", viewport: desktop, theme: "dark", motion: true, waitMs: 8000 },
  { name: "projects-light", path: "/", viewport: desktop, theme: "light", scrollTo: "#projects" },
  { name: "projects-dark", path: "/", viewport: desktop, theme: "dark", scrollTo: "#projects" },
  // The full grid of other projects under the three featured ones.
  { name: "grid-light", path: "/", viewport: desktop, theme: "light", scrollTo: ".eyebrow:has-text('More from the shelf')" },
  { name: "home-mobile-light", path: "/", viewport: mobile, theme: "light", mobile: true, motion: true, waitMs: 8000 },
];
