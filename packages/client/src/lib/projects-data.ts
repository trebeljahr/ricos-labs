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
  },
  {
    title: "ricos.site",
    url: "https://ricos.site",
    tagline: "Custom publishing platform. 300+ pages.",
    description:
      "A Next.js-powered writing platform with notes, essays, an interactive R3F demo gallery, photography, and a newsletter. Static-generated and free to host at any scale.",
    image: "/images/blog.png",
    tech: ["Next.js", "MDX", "React Three Fiber", "GLSL"],
  },
];

export const otherProjects: Project[] = [
  {
    title: "Fractal Garden",
    url: "https://fractal.garden",
    tagline: "37 interactive fractals. 157 GitHub stars. Hacker News front page.",
    description:
      "An interactive exhibition of mathematical fractals. WebGL-accelerated, fully zoomable, with custom shaders.",
    image: "/images/fractal-garden.png",
    tech: ["WebGL", "GLSL", "React"],
  },
  {
    title: "Interactive 3D Demos",
    url: "https://ricos.site/r3f/scenes/plasma-ball",
    tagline: "39 demos in React Three Fiber and custom GLSL",
    description:
      "A library of interactive scenes: plasma balls, particle fields, post-processing pipelines, shader experiments. Written and tuned by hand.",
    image: "/images/r3f-demos.png",
    tech: ["React Three Fiber", "Three.js", "GLSL"],
  },
  {
    title: "Minecraft Clone",
    url: "https://mc.trebeljahr.com",
    tagline: "Procedural voxel world with biomes, caves, and infinite chunks",
    description:
      "A browser-based voxel sandbox with procedural terrain, biomes, lighting, and a cave system. Three.js with custom chunk meshing.",
    image: "/images/minecraft-clone.png",
    tech: ["Three.js", "TypeScript", "Web Workers"],
  },
  {
    title: "Asteroids",
    url: "https://asteroids.trebeljahr.com",
    tagline: "Real-time multiplayer space combat",
    description:
      "Classic asteroids reimagined as a real-time multiplayer arena. Authoritative server, client-side prediction, lag compensation.",
    image: "/images/asteroids.png",
    tech: ["Canvas", "WebSockets", "Node.js"],
  },
  {
    title: "Quaternius 3D Viewer",
    url: "https://quaternius.trebeljahr.com",
    tagline: "Interactive 3D model browser",
    description:
      "A polished gallery for thousands of CC0 3D assets. Preview them in-browser before downloading.",
    image: "/images/dinosaur.png",
    tech: ["React Three Fiber", "glTF"],
  },
  {
    title: "Chess App",
    url: "https://github.com/trebeljahr/chess-app",
    tagline: "Modern stack revamp of my first-ever project",
    description:
      "Rebuilt from scratch on a modern stack. Typed move generation, AI opponent, board editor, PGN import/export.",
    image: "/images/chess.png",
    tech: ["TypeScript", "React"],
  },
  {
    title: "conv3D",
    url: "https://github.com/trebeljahr/conv3d",
    tagline: "Published npm CLI for batch 3D model conversion",
    description:
      "A command-line tool for converting between glTF, FBX, OBJ, GLB and more. Used in art pipelines across several of our projects.",
    image: "/images/conv3d.png",
    tech: ["Node.js", "CLI"],
  },
];
