const trustedBy = [
  {
    name: "European Space Agency",
    short: "ESA",
    detail: "Spacecraft trajectory tools",
  },
  { name: "Klarna", short: "Klarna", detail: "Payments infrastructure" },
  { name: "Henkel", short: "Henkel", detail: "Internal tooling" },
  { name: "flowkey", short: "flowkey", detail: "Music education product" },
  { name: "Ironhack", short: "Ironhack", detail: "Taught 60+ developers" },
  { name: "Softgames", short: "Softgames", detail: "HTML5 game engineering" },
];

export function TrustedBy() {
  return (
    <section className="border-b border-border/40 py-20">
      <div className="container-narrow">
        <div className="mb-10 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            Track record
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for and trusted by
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Production work and teaching experience across space, payments,
            consumer goods, music, and games.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {trustedBy.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/40 px-4 py-6 text-center transition hover:border-primary/30 hover:bg-card"
            >
              <div className="font-mono text-base font-semibold tracking-tight text-foreground">
                {c.short}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {c.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
