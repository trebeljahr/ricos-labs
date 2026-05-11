const trustedBy = [
  { name: "European Space Agency", short: "ESA", detail: "Spacecraft trajectory tooling" },
  { name: "Klarna", short: "Klarna", detail: "Payments infrastructure" },
  { name: "Henkel", short: "Henkel", detail: "Internal tooling" },
  { name: "flowkey", short: "flowkey", detail: "Music education product" },
  { name: "Ironhack", short: "Ironhack", detail: "Taught 60+ developers" },
  { name: "Softgames", short: "Softgames", detail: "HTML5 game engineering" },
];

export function TrustedBy() {
  return (
    <section className="py-20">
      <div className="container-narrow">
        <div className="mb-10 max-w-2xl">
          <div className="eyebrow">Track record</div>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Production work for, and teaching at —
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-foreground/10 pt-8 sm:grid-cols-3 lg:grid-cols-6">
          {trustedBy.map((c) => (
            <li key={c.name} className="flex flex-col">
              <span className="font-display text-xl leading-tight">
                {c.short}
              </span>
              <span className="mt-1 text-xs leading-snug text-foreground/55">
                {c.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
