const pastWork = [
  { name: "European Space Agency", detail: "Spacecraft trajectory tooling" },
  { name: "Klarna", detail: "Payments infrastructure" },
  { name: "Henkel", detail: "Internal tooling" },
  { name: "flowkey", detail: "Music education product" },
  { name: "Softgames", detail: "HTML5 game engineering" },
  { name: "Ironhack", detail: "Engineering instruction" },
];

// Plain text on purpose: client names and what was built, no brand logos.
export function PastWork() {
  return (
    <section className="py-20">
      <div className="container-narrow">
        <div className="mb-10 max-w-2xl">
          <div className="eyebrow">Track record</div>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Production experience across games, payments, tooling, and{" "}
            <span className="italic">education</span>.
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-foreground/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {pastWork.map(({ name, detail }) => (
            <li key={name} className="min-w-0">
              <span className="block text-sm font-medium text-foreground/85">
                {name}
              </span>
              <span className="mt-1 block text-xs leading-snug text-foreground/55">
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
