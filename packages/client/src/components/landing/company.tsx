import Link from "next/link";
import { Building2, FileText, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const facts = [
  {
    icon: Building2,
    label: "Legal entity",
    value: siteConfig.legalName,
    detail: siteConfig.entity.type,
  },
  {
    icon: FileText,
    label: "Formed",
    value: siteConfig.entity.formedOn,
    detail: siteConfig.entity.classification,
  },
  {
    icon: MapPin,
    label: "Principal office",
    value: siteConfig.entity.principalOffice.line1,
    detail: `${siteConfig.entity.principalOffice.line2} · ${siteConfig.entity.principalOffice.country}`,
  },
];

export function Company() {
  return (
    <section id="company" className="border-b border-border/40 py-24">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.2fr]">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              04 · The company
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              A registered software studio.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {siteConfig.legalName} is a Wyoming-domiciled limited liability
              company — the operating entity behind every product, app-store
              listing, and contract we touch. Single member-owned, run by{" "}
              <a
                href={siteConfig.socials.portfolio}
                className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                Rico Trebeljahr
              </a>
              , a self-taught fullstack engineer with a decade of production
              experience.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Set up to publish on Apple&apos;s App Store and Google Play, to
              process payments via Stripe, and to invoice US-domiciled clients
              cleanly — without the cross-border friction of operating purely
              as a foreign sole trader.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/imprint"
                className="inline-flex h-9 items-center rounded-md border border-border bg-card px-4 text-sm font-medium transition hover:border-primary/40"
              >
                Read full imprint
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Contact the studio
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-1">
            <div className="rounded-lg bg-background/40 p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Entity facts
              </div>
              <dl className="mt-5 space-y-5">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-start gap-4 border-t border-border pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30">
                      <f.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {f.value}
                      </dd>
                      <dd className="mt-0.5 text-sm text-muted-foreground">
                        {f.detail}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-md border border-border/60 bg-background/30 p-4 text-xs text-muted-foreground">
                Registered agent of record:{" "}
                <span className="font-mono text-foreground">
                  {siteConfig.entity.registeredAgent}
                </span>
                . Full statutory details available on the imprint page.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
