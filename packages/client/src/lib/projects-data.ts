export type ProjectCategoryId = "games" | "tools" | "art";

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategoryId;
  status: string;
  tagline: string;
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
}> = [
  {
    id: "games",
    label: "Games",
    title: "Playable systems with real production surface area.",
  },
  {
    id: "tools",
    label: "Tools",
    title: "Infrastructure, asset pipelines, and product utilities.",
  },
  {
    id: "art",
    label: "Art",
    title: "Interactive galleries, shaders, and public-domain collections.",
  },
];

export const projects: Project[] = [
  {
    title: "Tiao",
    slug: "tiao",
    category: "games",
    status: "Live product",
    tagline: "Open-source multiplayer board game platform",
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
    image: "/images/dinosaur.png",
    tech: ["React Three Fiber", "glTF", "Three.js"],
    url: "https://quaternius.trebeljahr.com",
    source: "https://github.com/trebeljahr/quaternius-showcase",
  },
  {
    title: "Collection of Beauty",
    slug: "collection-of-beauty",
    category: "art",
    status: "Live gallery",
    tagline: "Public-domain art gallery with a WebGL museum",
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
