export const siteConfig = {
  name: "Ricos Labs",
  legalName: "Ricos Labs LLC",
  tagline: "Open-source games, tools, and interactive art.",
  description:
    "Ricos Labs is an open-source product studio building games, developer tools, SaaS-shaped utilities, WebGL galleries, and cross-platform software products.",
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
    title: "Ricos Labs | Open-Source Games, Tools & Interactive Art",
    description:
      "Ricos Labs builds open-source games, developer tools, SaaS-shaped utilities, real-time apps, and 3D/WebGL experiences.",
    ogTitle: "Ricos Labs LLC | Open-Source Product Studio",
    ogDescription:
      "Open-source product studio shipping games, developer tools, SaaS-shaped utilities, and interactive art for browser, desktop, and mobile.",
    updatedAt: "2026-05-13",
    image: {
      path: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Ricos Labs LLC: open-source games, tools, and interactive art.",
    },
    themeColor: {
      light: "#F6EFE2",
      dark: "#12141E",
    },
    keywords: [
      "Ricos Labs",
      "Rico Trebeljahr",
      "open-source product studio",
      "software studio",
      "game studio",
      "multiplayer game development",
      "real-time web apps",
      "SaaS tools",
      "WebSocket development",
      "3D WebGL experiences",
      "interactive art",
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
