import { ExternalLink, Github, Mail, Newspaper } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    detail: "Best for project inquiries, partnerships, press.",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/trebeljahr",
    href: siteConfig.socials.github,
    detail: "All projects are open source.",
  },
  {
    icon: ExternalLink,
    label: "Portfolio",
    value: "portfolio.trebeljahr.com",
    href: siteConfig.socials.portfolio,
    detail: "Personal CV, project gallery, contact form.",
  },
  {
    icon: Newspaper,
    label: "Writing",
    value: "ricos.site",
    href: siteConfig.socials.blog,
    detail: "Notes, essays, demos, photography.",
  },
];

export function Contact() {
  return (
    <section id="contact" className="border-b border-border/40 py-24">
      <div className="container-narrow">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            04 · Contact
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Open for new projects, partnerships, and collaborations.
            Project-based work with milestone payments preferred.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/40"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30 transition group-hover:bg-primary/20">
                <c.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-0.5 truncate font-medium text-foreground">
                  {c.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {c.detail}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
