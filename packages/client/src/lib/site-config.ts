export const siteConfig = {
  name: "Ricos Labs",
  legalName: "Ricos Labs LLC",
  tagline: "An independent software studio building games, real-time apps, and developer tools.",
  description:
    "Ricos Labs is an independent software studio. We design and ship multiplayer games, 3D graphics demos, content platforms, and cross-platform apps. One TypeScript codebase, browser to mobile.",
  domain: "ricoslabs.com",
  url: "https://ricoslabs.com",

  contact: {
    email: "hello@ricoslabs.com",
    imprintEmail: "imprint+ricoslabs@trebeljahr.com",
  },

  entity: {
    name: "Ricos Labs LLC",
    type: "Limited Liability Company",
    jurisdiction: "Wyoming, USA",
    formedOn: "April 17, 2026",
  },

  operator: {
    name: "Rico Trebeljahr",
    addressLines: [
      "c/o Block Services",
      "Stuttgarter Str. 106",
      "70736 Fellbach",
      "Germany",
    ],
  },

  socials: {
    portfolio: "https://portfolio.trebeljahr.com",
    blog: "https://ricos.site",
    github: "https://github.com/trebeljahr",
  },
} as const;
