import {
  Boxes,
  Cpu,
  Gamepad2,
  Globe,
  Network,
  Wrench,
} from "lucide-react";

const capabilities = [
  {
    icon: Network,
    title: "Real-time multiplayer",
    body: "Authoritative servers, WebSocket protocols, matchmaking, tournaments, lag compensation, distributed locks with Redis. Production-grade game and app infrastructure.",
  },
  {
    icon: Cpu,
    title: "3D graphics & shaders",
    body: "React Three Fiber, Three.js, custom GLSL. Procedural generation, post-processing, voxel meshing, fractal exhibitions, interactive scientific visualizations.",
  },
  {
    icon: Gamepad2,
    title: "Game development",
    body: "Canvas 2D engines built from scratch — physics, particles, parallax, day/night cycles, save-state systems, cosmetics, in-game shops, achievements.",
  },
  {
    icon: Globe,
    title: "Cross-platform delivery",
    body: "One codebase to web, Electron desktop (signed macOS / Windows / Linux builds), and Capacitor mobile (iOS / Android). itch.io and Steam-ready.",
  },
  {
    icon: Boxes,
    title: "Full-stack TypeScript",
    body: "Next.js, Express, tRPC, MongoDB, Redis, S3-compatible storage, better-auth, Stripe, dotenvx-encrypted secrets, Sentry, OpenPanel analytics.",
  },
  {
    icon: Wrench,
    title: "Tooling & content",
    body: "Published npm CLIs, content platforms with MDX, static-site publishing, design systems, and CI/CD pipelines for repeatable, multi-target shipping.",
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative border-b border-border/40 py-24"
    >
      <div className="container-narrow">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            03 · Capabilities
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            What we can build for you
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Everything from a single-page experiment to a multi-platform
            product. We&apos;ve done it ourselves — shipped, deployed, and
            maintained in production.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="group rounded-xl border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 transition group-hover:bg-primary/20">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
