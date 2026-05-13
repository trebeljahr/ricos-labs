const services = [
  {
    title: "Multiplayer game or app",
    body: "Real-time gameplay, matchmaking, friends, tournaments, leaderboards. Shipped end-to-end like playtiao.com — production servers, accounts, payments included.",
    examples: "Best for · board games · social arenas · async play",
  },
  {
    title: "Cross-platform product",
    body: "One TypeScript codebase to the browser, signed Electron desktop (macOS / Windows / Linux), and Capacitor mobile (iOS / Android). itch.io and Steam-ready.",
    examples: "Best for · indie launches · companion apps · internal tools",
  },
  {
    title: "Real-time backend",
    body: "WebSocket protocols, matchmaking queues, presence, distributed locks, rate limiting. The boring infrastructure that keeps multiplayer products honest under load.",
    examples: "Best for · existing apps that need live sync, sockets, or scale",
  },
  {
    title: "3D / WebGL experience",
    body: "Interactive demos, product configurators, scientific visualisation, generative art. React Three Fiber, Three.js, custom GLSL when the off-the-shelf shader won't cut it.",
    examples: "Best for · marketing pieces · launches · explorable explanations",
  },
  {
    title: "Custom developer tooling",
    body: "Published npm CLIs, content platforms, design systems, CI/CD pipelines. Whatever your team is doing by hand twice a week and would rather not.",
    examples: "Best for · internal tools · DX upgrades · pipeline automation",
  },
  {
    title: "Prototype, audit, or advisory",
    body: "Two-week clickable prototype to de-risk a pitch. Architecture review of an existing system. Scoping for a build you're trying to greenlight. Fixed scope, fixed price.",
    examples: "Best for · early-stage validation · pre-build scoping · second opinions",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="container-narrow">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow">Selective client work</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Available when the brief overlaps with the studio&apos;s own{" "}
            <span className="italic">product practice</span>.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
            Client work stays intentionally close to the systems Ricos Labs
            already builds and operates: multiplayer, graphics, cross-platform
            apps, developer tools, and production infrastructure.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl bg-foreground/10 sm:grid-cols-2">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col gap-3 bg-background p-7 sm:p-8"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                {String(i + 1).padStart(2, "0")} — Engagement
              </div>
              <h3 className="font-display text-2xl leading-snug">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-foreground/70">
                {s.body}
              </p>
              <p className="mt-auto pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/50">
                {s.examples}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
