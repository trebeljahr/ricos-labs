export const brand = {
  name: "Ricos Labs",
  thesis: "Charged glass, warm paper, and precise TypeScript craft.",
  promise: "Real-time software with the tactility of games and the discipline of tools.",
  palette: [
    {
      name: "Deep Ink",
      hex: "#12141E",
      hsl: "222 26% 9%",
      usage: "Primary text, dark surfaces, favicon field.",
    },
    {
      name: "Warm Paper",
      hex: "#F6EFE2",
      hsl: "36 30% 96%",
      usage: "Main background, light logo field, quiet UI surfaces.",
    },
    {
      name: "Signal Copper",
      hex: "#D95D3E",
      hsl: "13 68% 55%",
      usage: "Primary accent, active states, calls to action.",
    },
    {
      name: "Flux Cyan",
      hex: "#35C4D8",
      hsl: "187 67% 53%",
      usage: "Secondary signal, realtime energy, small highlights.",
    },
    {
      name: "Plasma Violet",
      hex: "#6F4BE8",
      hsl: "254 78% 60%",
      usage: "3D scene continuity, depth gradients, rare emphasis.",
    },
  ],
  type: [
    {
      name: "Instrument Serif",
      role: "Display",
      sample: "Build the impossible part first.",
    },
    {
      name: "Inter",
      role: "Interface",
      sample: "Clear product copy, steady labels, readable long-form notes.",
    },
    {
      name: "JetBrains Mono",
      role: "Code / labels",
      sample: "REAL-TIME · WEBGL · TYPESCRIPT",
    },
  ],
  voice: [
    "Direct about craft.",
    "Warm without hype.",
    "Specific about shipped work.",
    "Comfortable with technical depth.",
  ],
  assets: [
    {
      name: "Primary lockup",
      href: "/brand/ricos-labs-lockup.svg",
      description: "Full horizontal logo for proposals, decks, and headers.",
    },
    {
      name: "Wordmark",
      href: "/brand/ricos-labs-wordmark.svg",
      description: "Text-only mark when the symbol already appears nearby.",
    },
    {
      name: "App icon",
      href: "/brand/ricos-labs-mark.svg",
      description: "Square mark for favicon, avatars, and app tiles.",
    },
  ],
} as const;
