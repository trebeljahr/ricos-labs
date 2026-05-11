export const siteConfig = {
  name: "Ricos Labs",
  legalName: "Ricos Labs LLC",
  tagline: "An independent software studio building games, real-time apps, and developer tools.",
  description:
    "Ricos Labs is an independent software studio. We design and ship multiplayer games, 3D graphics demos, content platforms, and cross-platform applications — all from a single TypeScript codebase, end to end.",
  domain: "ricoslabs.com",
  url: "https://ricoslabs.com",

  contact: {
    email: "hello@ricoslabs.com",
    imprintEmail: "imprint@ricoslabs.com",
  },

  entity: {
    type: "Limited Liability Company (Wyoming, USA)",
    classification: "Single-member, member-managed",
    formedOn: "April 17, 2026",
    jurisdiction: "Wyoming, United States",
    principalOffice: {
      line1: "30 N Gould St, Ste N",
      line2: "Sheridan, WY 82801",
      country: "United States",
    },
    registeredAgent: "Northwest Registered Agent Service Inc.",
    owner: "Rico Trebeljahr (sole member)",
    fiscalYear: "January 1 – December 31",
  },

  socials: {
    portfolio: "https://portfolio.trebeljahr.com",
    blog: "https://ricos.site",
    github: "https://github.com/trebeljahr",
  },
} as const;
