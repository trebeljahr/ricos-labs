const capabilities = [
  {
    title: "Real-time multiplayer",
    body: "Authoritative WebSocket servers, matchmaking, tournaments, lag compensation, Redis-backed locks. Infrastructure that survives real players.",
  },
  {
    title: "3D graphics & shaders",
    body: "React Three Fiber, Three.js, hand-written GLSL. Procedural terrain, voxel meshing, post-processing, fractal exhibitions, scientific visualisation.",
  },
  {
    title: "Game development",
    body: "Canvas 2D engines from scratch. Physics, particles, parallax, day/night cycles, save states, cosmetics, in-game shops, achievements.",
  },
  {
    title: "Cross-platform delivery",
    body: "One codebase to web, signed Electron desktop (macOS / Windows / Linux), and Capacitor mobile (iOS / Android). itch.io and Steam-ready.",
  },
  {
    title: "Full-stack TypeScript",
    body: "Next.js, Express, tRPC, MongoDB, Redis, S3, better-auth, Stripe, Sentry, OpenPanel. Encrypted secrets in git. Boring infra, well plumbed.",
  },
  {
    title: "Tooling & content",
    body: "Published npm CLIs, MDX content platforms, design systems, CI/CD pipelines. Repeatable ship rituals across web, desktop, and mobile.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-28">
      <div className="container-narrow">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow">What the studio does</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Six things we do well. Most of it is already running in{" "}
            <span className="italic">production</span>.
          </h2>
        </div>

        <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
          {capabilities.map((c, i) => (
            <li
              key={c.title}
              className="group grid items-baseline gap-4 py-7 sm:grid-cols-[3rem,1fr,2fr]"
            >
              <div className="font-mono text-xs text-foreground/40">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-2xl leading-snug">{c.title}</h3>
              <p className="text-[15px] leading-relaxed text-foreground/70">
                {c.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
