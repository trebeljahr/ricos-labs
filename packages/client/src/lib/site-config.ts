export const siteConfig = {
  name: "Ricos Labs",
  legalName: "Ricos Labs LLC",
  tagline:
    "An independent software studio building games, real-time apps, and developer tools.",
  description:
    "Ricos Labs is an independent software studio. We design and ship multiplayer games, 3D graphics demos, content platforms, and cross-platform apps. One TypeScript codebase, browser to mobile.",
  domain: "ricoslabs.com",
  url: "https://ricoslabs.com",
  language: "en-US",
  locale: "en_US",

  contact: {
    email: "hello@ricoslabs.com",
    imprintEmail: "imprint+ricoslabs@trebeljahr.com",
  },

  entity: {
    name: "Ricos Labs LLC",
    type: "Limited Liability Company",
    jurisdiction: "Wyoming, USA",
    formedOn: "April 17, 2026",
    foundingDate: "2026-04-17",
  },

  operator: {
    name: "Rico Trebeljahr",
    addressLines: [
      "c/o Block Services",
      "Stuttgarter Str. 106",
      "70736 Fellbach",
      "Germany",
    ],
    address: {
      streetAddress: "c/o Block Services\nStuttgarter Str. 106",
      postalCode: "70736",
      addressLocality: "Fellbach",
      addressCountry: "DE",
    },
  },

  socials: {
    portfolio: "https://portfolio.trebeljahr.com",
    blog: "https://ricos.site",
    github: "https://github.com/trebeljahr",
  },

  seo: {
    title: "Ricos Labs | Games, Real-Time Apps & Developer Tools",
    description:
      "Ricos Labs builds multiplayer games, real-time web apps, 3D/WebGL experiences, and developer tools from one TypeScript codebase.",
    ogTitle: "Ricos Labs LLC | Games, Real-Time Apps & Developer Tools",
    ogDescription:
      "Independent software studio shipping multiplayer games, real-time apps, 3D/WebGL experiences, and developer tools for browser, desktop, and mobile.",
    updatedAt: "2026-05-13",
    image: {
      path: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Ricos Labs LLC: games, real-time apps, and developer tools for the browser.",
    },
    themeColor: {
      light: "#F6EFE2",
      dark: "#12141E",
    },
    keywords: [
      "Ricos Labs",
      "Rico Trebeljahr",
      "software studio",
      "multiplayer game development",
      "real-time web apps",
      "WebSocket development",
      "3D WebGL experiences",
      "React Three Fiber",
      "TypeScript studio",
      "developer tooling",
      "cross-platform apps",
      "Wyoming LLC",
    ],
  },

  services: [
    {
      name: "Multiplayer game development",
      description:
        "Real-time gameplay, matchmaking, tournaments, friends, ratings, live spectating, payments, and production infrastructure.",
    },
    {
      name: "Cross-platform product development",
      description:
        "TypeScript applications shipped to browser, desktop, and mobile from one codebase.",
    },
    {
      name: "Real-time backend development",
      description:
        "WebSocket protocols, presence, queues, distributed locks, rate limiting, and observability for live products.",
    },
    {
      name: "3D and WebGL experiences",
      description:
        "Interactive demos, product configurators, scientific visualization, generative art, Three.js, and custom GLSL.",
    },
    {
      name: "Developer tooling",
      description:
        "npm CLIs, content platforms, design systems, CI/CD pipelines, and internal automation.",
    },
    {
      name: "Prototype, audit, and advisory",
      description:
        "Fixed-scope prototypes, architecture reviews, product scoping, and technical second opinions.",
    },
  ],
} as const;
