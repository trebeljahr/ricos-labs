import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Imprint",
  description: `Legal disclosure (§ 5 DDG, § 18 (2) MStV) for ${siteConfig.legalName} and ${siteConfig.domain}.`,
};

function Address() {
  return (
    <address className="mt-3 not-italic text-foreground">
      {siteConfig.operator.name}
      {siteConfig.operator.addressLines.map((line) => (
        <span key={line}>
          <br />
          {line}
        </span>
      ))}
    </address>
  );
}

export default function ImprintPage() {
  return (
    <>
      <Nav />
      <main id="main" className="border-b border-border/40 py-16 sm:py-24">
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
          <p className="mt-3 text-sm italic text-muted-foreground">
            Information pursuant to § 5 DDG (Digitale-Dienste-Gesetz) and § 18 (2) MStV
            (Medienstaatsvertrag).
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed">
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Service Provider
              </h2>
              <Address />
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Contact
              </h2>
              <p className="mt-3 text-foreground">
                Email:{" "}
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
                Person Responsible for Content (§ 18 (2) MStV)
              </h2>
              <Address />
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Operating entity
              </h2>
              <p className="mt-3 text-muted-foreground">
                {siteConfig.domain} and the products linked from it are
                published under the trade name <span className="text-foreground">{siteConfig.legalName}</span>,
                a {siteConfig.entity.type.toLowerCase()} organized under the laws of{" "}
                {siteConfig.entity.jurisdiction}. For all purposes of § 5 DDG
                and § 18 (2) MStV, please use the postal address and email
                listed above.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Liability for Content
              </h2>
              <p className="mt-3 text-muted-foreground">
                As a service provider I am responsible for my own content on
                these pages in accordance with § 7 (1) DDG and general laws.
                Pursuant to §§ 8 to 10 DDG, however, I am not obligated as a
                service provider to monitor third-party information that is
                transmitted or stored, or to investigate circumstances that
                indicate illegal activity. Obligations to remove or block the
                use of information under the general laws remain unaffected.
                Liability in this respect is only possible from the point in
                time at which a concrete infringement of the law becomes
                known. Upon notification of corresponding infringements, the
                content in question will be removed immediately.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Liability for Links
              </h2>
              <p className="mt-3 text-muted-foreground">
                This site contains links to external websites operated by
                third parties over whose content I have no influence. I
                cannot therefore assume any liability for these external
                contents. The respective provider or operator of the linked
                pages is always responsible for their content. The linked
                pages were checked for possible legal violations at the time
                of linking; illegal content was not recognizable at that
                time. A permanent control of the content of the linked pages
                is not reasonable without concrete indications of an
                infringement. Upon notification of violations, such links
                will be removed immediately.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Copyright
              </h2>
              <p className="mt-3 text-muted-foreground">
                The content and works on these pages created by the site
                operator are subject to German copyright law. Duplication,
                processing, distribution, or any form of commercialisation of
                such material beyond the scope of the copyright law shall
                require the prior written consent of its respective author or
                creator. Source code published in linked repositories is
                released under the licence stated in the respective
                repository.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
