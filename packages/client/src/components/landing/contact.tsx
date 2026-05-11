import { siteConfig } from "@/lib/site-config";

const facts = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    detail: "Rough sketches, pitches, RFPs. All welcome.",
  },
  {
    label: "Engagements",
    value: "1 week → 4 months",
    detail: "From a clickable prototype to a fully shipped multi-platform product.",
  },
  {
    label: "How we bill",
    value: "Fixed-scope milestones",
    detail: "Weekly invoices, no retainers, no surprises.",
  },
  {
    label: "Where",
    value: "Berlin · Wyoming",
    detail: "EU + US working hours · fully async-friendly.",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,1fr]">
          <div className="max-w-xl">
            <div className="eyebrow">Contact</div>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Got something <span className="italic">ambitious</span>?
              Let&apos;s ship it.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/75">
              Open for new projects, partnerships, and collaborations. Bring
              a rough sketch and we&apos;ll scope the smallest version that
              proves it works, then ship from there.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-8 inline-flex h-11 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {siteConfig.contact.email}
            </a>
          </div>
          <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
            {facts.map((f) => {
              const inner = (
                <div className="grid grid-cols-[1fr,2fr] items-baseline gap-4 py-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                    {f.label}
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-snug">
                      {f.value}
                    </span>
                    <span className="mt-0.5 block text-sm text-foreground/60">
                      {f.detail}
                    </span>
                  </span>
                </div>
              );
              return (
                <li key={f.label}>
                  {f.href ? (
                    <a
                      href={f.href}
                      className="block underline decoration-foreground/20 decoration-1 underline-offset-[5px] transition hover:decoration-foreground/60"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
