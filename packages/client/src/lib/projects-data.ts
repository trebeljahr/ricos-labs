export type ProjectCategoryId = "games" | "tools" | "art";

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategoryId;
  status: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  source: string;
  url?: string;
  featured?: boolean;
};

export const projectCategories: Array<{
  id: ProjectCategoryId;
  label: string;
  title: string;
  description: string;
}> = [
  {
    id: "games",
    label: "Games",
    title: "Playable systems with real production surface area.",
    description:
      "Multiplayer board games, desktop/mobile runners, browser arenas, voxel worlds, and a newer 3D tower-defense game moving toward store distribution.",
  },
  {
    id: "tools",
    label: "Tools",
    title: "Infrastructure, asset pipelines, and product utilities.",
    description:
      "CLIs, MCP servers, game-asset tools, 3D conversion pipelines, publishing systems, and small SaaS-shaped products built to remove repeat work.",
  },
  {
    id: "art",
    label: "Art",
    title: "Interactive galleries, shaders, and public-domain collections.",
    description:
      "WebGL exhibitions, React Three Fiber scenes, shader studies, and a public-domain art gallery with a 3D museum and newsletter pipeline.",
  },
];

export const projects: Project[] = [
  {
    title: "Tiao",
    slug: "tiao",
    category: "games",
    status: "Live product",
    tagline: "Open-source multiplayer board game platform",
    description:
      "A real-time strategy board game with matchmaking, tournaments, friends, ratings, live spectating, accounts, payments, desktop builds, mobile builds, and Steam achievement sync.",
    image: "/images/tiao.png",
    tech: ["TypeScript", "Next.js", "Express", "WebSockets", "MongoDB", "Redis"],
    url: "https://playtiao.com",
    source: "https://github.com/trebeljahr/tiao",
    featured: true,
  },
  {
    title: "Extinction Protocol",
    slug: "extinction-protocol",
    category: "games",
    status: "In development",
    tagline: "3D roguelite tower defense for web, desktop, and mobile",
    description:
      "A sci-fi tower-defense campaign with 30 outposts, six tower classes, enemy compendium, achievements, audio, biome-specific scenery, Tauri desktop builds, and Capacitor mobile shells.",
    image: "/images/extinction-protocol.png",
    tech: ["React Three Fiber", "Zustand", "Vite", "Tauri", "Capacitor"],
    source: "https://github.com/trebeljahr/extinction-protocol",
    featured: true,
  },
  {
    title: "Raptor Runner",
    slug: "raptor-runner",
    category: "games",
    status: "Live game",
    tagline: "Pixel-art runner across web, desktop, and mobile",
    description:
      "A polished browser runner with day/night cycles, weather, cosmetics, shop systems, Electron desktop builds, and Capacitor mobile distribution from one TypeScript codebase.",
    image: "/images/raptor.png",
    tech: ["TypeScript", "Canvas 2D", "Vite", "Electron", "Capacitor"],
    url: "https://raptor.trebeljahr.com",
    source: "https://github.com/trebeljahr/raptor-runner",
    featured: true,
  },
  {
    title: "Asteroids",
    slug: "asteroids",
    category: "games",
    status: "Live game",
    tagline: "Real-time multiplayer space combat",
    description:
      "Classic asteroids rebuilt as an online arena with an authoritative server, client-side prediction, lag compensation, and WebSocket synchronization.",
    image: "/images/asteroids.png",
    tech: ["Canvas", "WebSockets", "Node.js"],
    url: "https://asteroids.trebeljahr.com",
    source: "https://github.com/trebeljahr/asteroid-game",
  },
  {
    title: "Minecraft Clone",
    slug: "minecraft-clone",
    category: "games",
    status: "Prototype",
    tagline: "Procedural voxel world with biomes and infinite chunks",
    description:
      "A browser voxel sandbox with procedural terrain, chunk meshing, caves, biomes, lighting, and worker-backed world generation.",
    image: "/images/minecraft-clone.png",
    tech: ["Three.js", "TypeScript", "Web Workers"],
    url: "https://mc.trebeljahr.com",
    source: "https://github.com/trebeljahr/minecraft-clone",
  },
  {
    title: "Chess",
    slug: "chess",
    category: "games",
    status: "Prototype",
    tagline: "Typed chess app with AI, editor, and PGN support",
    description:
      "A modern-stack rebuild of an early project with typed move generation, an AI opponent, board editor, and PGN import/export.",
    image: "/images/chess.png",
    tech: ["TypeScript", "React"],
    source: "https://github.com/trebeljahr/chess-app",
  },
  {
    title: "Hatchkit",
    slug: "hatchkit",
    category: "tools",
    status: "Published CLI",
    tagline: "Scaffold and deploy full-stack products on owned infra",
    description:
      "An interactive CLI and MCP server that scaffolds TypeScript apps, provisions DNS, VPS, Coolify, observability, email, analytics, S3, ML services, and encrypted secrets.",
    image: "/images/hatchkit.png",
    tech: ["Node.js", "CLI", "MCP", "Terraform", "Coolify"],
    url: "https://hatchkit.trebeljahr.com",
    source: "https://github.com/trebeljahr/hatchkit",
    featured: true,
  },
  {
    title: "sprite-tools",
    slug: "sprite-tools",
    category: "tools",
    status: "Published npm package",
    tagline: "Game-ready 2D sprite pipelines in web, CLI, and MCP form",
    description:
      "A browser app, CLI, and MCP server for sprite sheets, collision polygons, pivots, animation tags, pixel-art conversion, normal maps, palettes, atlas packing, and GIF export.",
    image: "/images/sprite-tools.png",
    tech: ["Next.js", "Canvas", "CLI", "MCP", "Vitest"],
    url: "https://sprites.trebeljahr.com",
    source: "https://github.com/trebeljahr/sprite-tools",
    featured: true,
  },
  {
    title: "conv3d",
    slug: "conv3d",
    category: "tools",
    status: "Published npm package",
    tagline: "Batch 3D model conversion for game and WebGL pipelines",
    description:
      "A CLI for recursively converting FBX, OBJ, GLTF, and GLB assets into optimized GLB files and optional React Three Fiber components.",
    image: "/images/conv3d.png",
    tech: ["Node.js", "CLI", "glTF", "React Three Fiber"],
    url: "https://conv3d.trebeljahr.com",
    source: "https://github.com/trebeljahr/conv3d",
  },
  {
    title: "GameDev Asset Library",
    slug: "gamedev",
    category: "tools",
    status: "In development",
    tagline: "Browsable CC0 game-asset library and preview system",
    description:
      "A model-first asset browser for 3D packs, sprites, sounds, media metadata, hover previews, loudness envelopes, and reusable preview cards.",
    image: "/images/gamedev.png",
    tech: ["Next.js", "3D Assets", "R2", "Audio", "Metadata"],
    url: "https://gamedev.trebeljahr.com",
    source: "https://github.com/trebeljahr/gamedev",
    featured: true,
  },
  {
    title: "ricos.site",
    slug: "ricos-site",
    category: "tools",
    status: "Live platform",
    tagline: "Custom publishing platform with 300+ pages",
    description:
      "A static-generated writing and demo platform with notes, essays, photography, newsletter flows, interactive R3F scenes, MDX content, and custom SEO plumbing.",
    image: "/images/blog.png",
    tech: ["Next.js", "MDX", "React Three Fiber", "GLSL"],
    url: "https://ricos.site",
    source: "https://github.com/trebeljahr/ricos.site",
  },
  {
    title: "3D Asset Browser",
    slug: "quaternius-showcase",
    category: "tools",
    status: "Live tool",
    tagline: "Interactive gallery for thousands of CC0 3D models",
    description:
      "A polished WebGL browser for large public-domain model collections, with in-browser previews before download.",
    image: "/images/dinosaur.png",
    tech: ["React Three Fiber", "glTF", "Three.js"],
    url: "https://quaternius.trebeljahr.com",
    source: "https://github.com/trebeljahr/quaternius-showcase",
  },
  {
    title: "Where Are My Friends",
    slug: "wherearemyfriends",
    category: "tools",
    status: "Prototype",
    tagline: "Privacy-controlled location sharing",
    description:
      "A consent-first location app where friends can share country, city, or exact location on their own terms, with web and mobile surfaces in mind.",
    image: "/images/wherearemyfriends.png",
    tech: ["React", "Vite", "MapLibre", "Flutter", "Node.js"],
    url: "https://wherearemyfriends.info",
    source: "https://github.com/trebeljahr/wherearemyfriends.info",
  },
  {
    title: "Better Bookmarks",
    slug: "better-bookmarks",
    category: "tools",
    status: "Prototype",
    tagline: "Relationship-aware bookmark manager",
    description:
      "A Chrome extension experiment for connected bookmarks, tags, page metadata, reading time, content type, and personal retrieval workflows.",
    image: "/images/better-bookmarks.png",
    tech: ["Chrome Extension", "React", "MUI", "TypeScript"],
    source: "https://github.com/trebeljahr/better-bookmarks",
  },
  {
    title: "Collection of Beauty",
    slug: "collection-of-beauty",
    category: "art",
    status: "Live gallery",
    tagline: "Public-domain art gallery with a WebGL museum",
    description:
      "A Next.js gallery for public-domain artworks with a multi-floor 3D museum, newsletter, R2-backed image variants, slim server projections, and a prebuilt asset pipeline.",
    image: "/images/beauty.png",
    tech: ["Next.js", "R3F", "Three.js", "R2", "Mailgun"],
    url: "https://beauty.trebeljahr.com",
    source: "https://github.com/trebeljahr/collection-of-beauty",
    featured: true,
  },
  {
    title: "Fractal Garden",
    slug: "fractal-garden",
    category: "art",
    status: "Live exhibition",
    tagline: "Interactive WebGL fractal exhibition",
    description:
      "A shader-driven mathematical exhibition with 37 interactive fractals, zoomable controls, WebGL acceleration, and a front-page Hacker News run.",
    image: "/images/fractal-garden.png",
    tech: ["WebGL", "GLSL", "React"],
    url: "https://fractal.garden",
    source: "https://github.com/trebeljahr/fractal-garden",
  },
  {
    title: "R3F Scene Gallery",
    slug: "r3f-demos",
    category: "art",
    status: "Live gallery",
    tagline: "39 interactive React Three Fiber scenes",
    description:
      "A hand-tuned gallery of plasma balls, particle fields, post-processing pipelines, shader experiments, and interactive WebGL studies.",
    image: "/images/r3f-demos.png",
    tech: ["React Three Fiber", "Three.js", "GLSL"],
    url: "https://ricos.site/r3f/scenes/plasma-ball",
    source: "https://github.com/trebeljahr/ricos.site",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectsByCategory = projectCategories.map((category) => ({
  ...category,
  projects: projects.filter((project) => project.category === category.id),
}));

export const additionalProjectsByCategory = projectCategories.map((category) => ({
  ...category,
  projects: projects.filter(
    (project) => project.category === category.id && !project.featured
  ),
}));

export const projectStats = {
  total: projects.length,
  categories: projectCategories.length,
  openSource: projects.length,
};

export const otherProjects = projects.filter((project) => !project.featured);
