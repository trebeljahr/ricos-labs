export type Project = {
  title: string;
  url: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  source?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Tiao",
    url: "https://playtiao.com",
    tagline: "Multiplayer board game, shipped in two weeks",
    description:
      "Real-time multiplayer board game with matchmaking, tournaments, friends, ratings, and live spectating. Auth, payments, S3 uploads, observability. Two weeks from empty repo to shipped product.",
    image: "/images/tiao.png",
    tech: ["TypeScript", "Next.js", "Express", "WebSockets", "MongoDB", "Redis"],
    source: "https://github.com/trebeljahr/tiao",
  },
  {
    title: "Raptor Runner",
    url: "https://raptor.trebeljahr.com",
    tagline: "Pixel-art runner. Web, desktop, mobile.",
    description:
      "A homage to Chrome's dino game with a day/night cycle, weather, cosmetics, and a shop. One TypeScript codebase ships to the browser, Electron (macOS / Windows / Linux), and Capacitor (iOS / Android).",
    image: "/images/raptor.png",
    tech: ["TypeScript", "Canvas 2D", "Vite", "Electron", "Capacitor"],
    source: "https://github.com/trebeljahr/raptor-runner",
  },
  {
    title: "ricos.site",
    url: "https://ricos.site",
    tagline: "Custom publishing platform. 300+ pages.",
    description:
      "A Next.js-powered writing platform with notes, essays, an interactive R3F demo gallery, photography, and a newsletter. Static-generated and free to host at any scale.",
    image: "/images/blog.png",
    tech: ["Next.js", "MDX", "React Three Fiber", "GLSL"],
    source: "https://github.com/trebeljahr/ricos.site",
  },
];

export const otherProjects: Project[] = [
  {
    title: "Mesozoic Protocol",
    url: "https://mesozoicprotocol.com",
    tagline: "3D roguelite tower defense for web, desktop, and mobile",
    description:
      "A 3D tower defense game with roguelite progression. Built with React Three Fiber, ships to browser, desktop (Tauri), and mobile (Capacitor).",
    image: "/images/extinction-protocol.png",
    tech: ["React Three Fiber", "Zustand", "Vite", "Tauri", "Capacitor"],
  },
  {
    title: "Hatchkit",
    url: "https://hatchkit.trebeljahr.com",
    tagline: "Scaffold and deploy full-stack products on owned infra",
    description:
      "A CLI that scaffolds full-stack TypeScript projects and deploys them on your own infrastructure. MCP integration, Terraform, Coolify.",
    image: "/images/hatchkit.png",
    tech: ["Node.js", "CLI", "MCP", "Terraform", "Coolify"],
    source: "https://github.com/trebeljahr/hatchkit",
  },
  {
    title: "Collection of Beauty",
    url: "https://beauty.trebeljahr.com",
    tagline: "Public-domain art gallery with a WebGL museum",
    description:
      "A curated gallery of public-domain artwork with a 3D museum walkthrough. Newsletter, search, and high-res downloads.",
    image: "/images/beauty.png",
    tech: ["Next.js", "R3F", "Three.js", "R2", "Mailgun"],
    source: "https://github.com/trebeljahr/collection-of-beauty",
  },
  {
    title: "Fractal Garden",
    url: "https://fractal.garden",
    tagline: "37 interactive fractals. 157 GitHub stars. Hacker News front page.",
    description:
      "An interactive exhibition of mathematical fractals. WebGL-accelerated, fully zoomable, with custom shaders.",
    image: "/images/fractal-garden.png",
    tech: ["WebGL", "GLSL", "React"],
    source: "https://github.com/trebeljahr/fractal-garden",
  },
  {
    title: "Interactive 3D Demos",
    url: "https://ricos.site/r3f/scenes/shader-art-demo",
    tagline: "39 demos in React Three Fiber and custom GLSL",
    description:
      "A library of interactive scenes: plasma balls, particle fields, post-processing pipelines, shader experiments. Written and tuned by hand.",
    image: "/images/r3f-demos.png",
    tech: ["React Three Fiber", "Three.js", "GLSL"],
    source: "https://github.com/trebeljahr/ricos.site",
  },
  {
    title: "sprite-tools",
    url: "https://sprites.trebeljahr.com",
    tagline: "Game-ready 2D sprite pipelines in web, CLI, and MCP form",
    description:
      "Sprite sheet generation and manipulation for game dev. Available as a web app, npm CLI, and MCP server.",
    image: "/images/sprite-tools.png",
    tech: ["Next.js", "Canvas", "CLI", "MCP", "Vitest"],
    source: "https://github.com/trebeljahr/sprite-tools",
  },
  {
    title: "GameDev Asset Library",
    url: "https://gamedev.trebeljahr.com",
    tagline: "Browsable CC0 game-asset library and preview system",
    description:
      "A browsable library of CC0 game assets with 3D preview, audio playback, and metadata search.",
    image: "/images/gamedev.png",
    tech: ["Next.js", "3D Assets", "R2", "Audio"],
    source: "https://github.com/trebeljahr/gamedev",
  },
  {
    title: "Minecraft Clone",
    url: "https://mc.trebeljahr.com",
    tagline: "Procedural voxel world with biomes, caves, and infinite chunks",
    description:
      "A browser-based voxel sandbox with procedural terrain, biomes, lighting, and a cave system. Three.js with custom chunk meshing.",
    image: "/images/minecraft-clone.png",
    tech: ["Three.js", "TypeScript", "Web Workers"],
    source: "https://github.com/trebeljahr/minecraft-clone",
  },
  {
    title: "Asteroids",
    url: "https://asteroids.trebeljahr.com",
    tagline: "Real-time multiplayer space combat",
    description:
      "Classic asteroids reimagined as a real-time multiplayer arena. Authoritative server, client-side prediction, lag compensation.",
    image: "/images/asteroids.png",
    tech: ["Canvas", "WebSockets", "Node.js"],
    source: "https://github.com/trebeljahr/asteroid-game",
  },
  {
    title: "3D Asset Browser",
    url: "https://quaternius.trebeljahr.com",
    tagline: "Interactive 3D model browser for CC0 assets",
    description:
      "A polished gallery for thousands of CC0 3D assets. Preview them in-browser before downloading.",
    image: "/images/dinosaur.png",
    tech: ["React Three Fiber", "glTF"],
    source: "https://github.com/trebeljahr/quaternius-showcase",
  },
  {
    title: "conv3D",
    url: "https://conv3d.trebeljahr.com",
    tagline: "Published npm CLI for batch 3D model conversion",
    description:
      "A command-line tool for converting between glTF, FBX, OBJ, GLB and more. Used in art pipelines across several of our projects.",
    image: "/images/conv3d.png",
    tech: ["Node.js", "CLI", "glTF"],
    source: "https://github.com/trebeljahr/conv3d",
  },
  {
    title: "Chess App",
    url: "https://github.com/trebeljahr/chess-app",
    tagline: "Full-stack chess platform with AI opponent",
    description:
      "Typed move generation, AI opponent, board editor, PGN import/export — rebuilt from scratch on a modern stack.",
    image: "/images/chess.png",
    tech: ["TypeScript", "React"],
    source: "https://github.com/trebeljahr/chess-app",
  },
];
