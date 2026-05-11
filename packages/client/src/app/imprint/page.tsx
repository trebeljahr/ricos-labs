import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Imprint",
  description: `Legal disclosure and statutory company information for ${siteConfig.legalName}.`,
};

export default function ImprintPage() {
  const office = siteConfig.entity.principalOffice;

  return (
    <>
      <Nav />
      <main className="border-b border-border/40 py-16 sm:py-24">
        <div className="container-narrow max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {siteConfig.name}
          </Link>

          <div className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">
            Legal disclosure
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Imprint
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Statutory information about {siteConfig.legalName}, the operator
            of {siteConfig.domain} and the products linked from it.
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed">
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Company
              </h2>
              <p className="mt-3 font-medium text-foreground">
                {siteConfig.legalName}
              </p>
              <p className="text-muted-foreground">
                {siteConfig.entity.type}
              </p>
              <p className="text-muted-foreground">
                {siteConfig.entity.classification}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Formed: {siteConfig.entity.formedOn} ·{" "}
                Fiscal year: {siteConfig.entity.fiscalYear}
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Principal office address
              </h2>
              <address className="mt-3 not-italic text-foreground">
                {siteConfig.legalName}
                <br />
                {office.line1}
                <br />
                {office.line2}
                <br />
                {office.country}
              </address>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Registered agent
              </h2>
              <p className="mt-3 text-foreground">
                {siteConfig.entity.registeredAgent}
              </p>
              <p className="text-muted-foreground">
                Service of process is accepted at the principal office address
                listed above.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Person responsible for content
              </h2>
              <p className="mt-3 text-foreground">{siteConfig.entity.owner}</p>
              <p className="text-muted-foreground">
                Sole member and manager of {siteConfig.legalName}.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Contact
              </h2>
              <p className="mt-3 text-foreground">
                General inquiries:{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-foreground">
                Legal / takedown / DMCA:{" "}
                <a
                  href={`mailto:${siteConfig.contact.imprintEmail}`}
                  className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {siteConfig.contact.imprintEmail}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Liability for content
              </h2>
              <p className="mt-3 text-muted-foreground">
                We strive for accuracy and currency of the content on this
                site, but we make no warranty as to its completeness,
                correctness, or timeliness. Where this website links to
                external resources operated by third parties, we have no
                influence over their content and accept no responsibility for
                it.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Copyright
              </h2>
              <p className="mt-3 text-muted-foreground">
                Unless otherwise noted, the content, source code, design, and
                trade dress on this website are © {new Date().getFullYear()}{" "}
                {siteConfig.legalName}. Project source code is open source —
                see each project&apos;s repository for license terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
