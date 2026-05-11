import { siteConfig } from "@/lib/site-config";

const channels = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    detail: "Project inquiries, partnerships, press.",
  },
  {
    label: "GitHub",
    value: "github.com/trebeljahr",
    href: siteConfig.socials.github,
    detail: "Almost everything is open source.",
  },
  {
    label: "Portfolio",
    value: "portfolio.trebeljahr.com",
    href: siteConfig.socials.portfolio,
    detail: "CV, project gallery, contact form.",
  },
  {
    label: "Writing",
    value: "ricos.site",
    href: siteConfig.socials.blog,
    detail: "Notes, essays, demos, photography.",
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
              Let&apos;s build something <span className="italic">small</span>{" "}
              and well-made.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/75">
              Open for new projects, partnerships, and collaborations.
              Project-based work with milestone payments preferred. Bring a
              rough sketch — we&apos;ll figure out what it wants to be.
            </p>
          </div>
          <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group grid grid-cols-[1fr,2fr] items-baseline gap-4 py-5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                    {c.label}
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-snug underline decoration-foreground/20 decoration-1 underline-offset-[5px] transition group-hover:decoration-primary">
                      {c.value}
                    </span>
                    <span className="mt-0.5 block text-sm text-foreground/60">
                      {c.detail}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
