import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";
import { siteConfig } from "@/lib/site-config";

const description = `Every server your browser contacts on ${siteConfig.domain}, what each one receives, and your rights under the GDPR.`;
const image = {
  url: siteConfig.seo.image.path,
  width: siteConfig.seo.image.width,
  height: siteConfig.seo.image.height,
  alt: siteConfig.seo.image.alt,
};
const updatedOn = new Date(siteConfig.privacy.updatedAt).toLocaleDateString(
  "en-US",
  { dateStyle: "long", timeZone: "UTC" },
);
const linkClass =
  "underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `Privacy Policy | ${siteConfig.name}`,
    description,
    url: "/privacy",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteConfig.name}`,
    description,
    images: [
      {
        url: siteConfig.seo.image.path,
        alt: siteConfig.seo.image.alt,
      },
    ],
  },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

function Host({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.92em] text-foreground">{children}</code>;
}

function PrivacyEmail() {
  return (
    <a href={`mailto:${siteConfig.contact.imprintEmail}`} className={linkClass}>
      {siteConfig.contact.imprintEmail}
    </a>
  );
}

export default function PrivacyPage() {
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
            Data protection
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm italic text-muted-foreground">
            Last updated: {updatedOn}
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed">
            <p className="text-foreground">
              This page lists every server your browser contacts when you open{" "}
              {siteConfig.domain}, and what each one receives. The site has no
              accounts, no forms and no newsletter. It sets no cookies.
            </p>

            <Section title="Controller">
              <p>
                The controller under the EU General Data Protection Regulation
                (GDPR) is the service provider named in the{" "}
                <Link href="/imprint" className={linkClass}>
                  imprint
                </Link>
                : {siteConfig.operator.name},{" "}
                {siteConfig.operator.addressLines.join(", ")}. Email for privacy
                questions: <PrivacyEmail />.
              </p>
            </Section>

            <Section title="Servers your browser contacts">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Host>{siteConfig.domain}</Host>: the site itself, served by
                  Cloudflare. Pages, fonts, images and the environment map of
                  the 3D scene all come from here.
                </li>
                <li>
                  <Host>static.cloudflareinsights.com</Host>: the script of
                  Cloudflare Web Analytics. Visitors in the EU, the EEA, the
                  United Kingdom and Switzerland do not get it.
                </li>
                <li>
                  <Host>plausible.trebeljahr.com</Host>: my own Plausible
                  Analytics server.
                </li>
              </ul>
              <p>
                No other server receives a request from your browser. A link to
                another site, such as GitHub or my blog, contacts that site only
                when you click it.
              </p>
            </Section>

            <Section title="Hosting by Cloudflare">
              <p>
                The site is a set of static files. Cloudflare, Inc., 101 Townsend
                St, San Francisco, CA 94107, USA, serves them from its Worker{" "}
                <Host>ricos-labs-client</Host>. No code of mine runs when you
                load a page.
              </p>
              <p>
                Cloudflare receives your IP address, the address of the page, the
                user agent and the referrer of each request. It uses them to
                deliver the site and to protect it against abuse. I do not export
                or keep logs of these requests.
              </p>
              <p>
                The fonts (Inter, JetBrains Mono and Instrument Serif) are copies
                on {siteConfig.domain}. So are the project screenshots and the
                environment map of the 3D scene. Your browser contacts no font
                service and no image service.
              </p>
              <p>
                Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in
                delivering the site securely).
              </p>
            </Section>

            <Section title="Cloudflare Web Analytics">
              <p>
                Cloudflare adds the script of{" "}
                <a
                  href="https://developers.cloudflare.com/web-analytics/"
                  className={linkClass}
                >
                  Cloudflare Web Analytics
                </a>{" "}
                to each page. Your browser loads it from{" "}
                <Host>static.cloudflareinsights.com</Host>, and the script sends
                its report to <Host>{siteConfig.domain}/cdn-cgi/rum</Host>.
              </p>
              <p>
                The report holds the page URL, the referrer and how long the page
                took to load, including Largest Contentful Paint, Interaction to
                Next Paint and Cumulative Layout Shift. Cloudflare shows me totals
                by page, country, browser and device type.
              </p>
              <p>
                The script sets no cookies and stores nothing on your device. It
                gives each page view a random ID and keeps no ID from one page
                view to the next. Cloudflare receives your IP address with the
                report, discards it at the nearest data center and does not store
                it.
              </p>
              <p>
                Cloudflare does not add the script for visitors who connect
                through a Cloudflare data center in the EU, the EEA, the United
                Kingdom or Switzerland. For all other visitors the legal basis is
                Art. 6 (1) (f) GDPR (legitimate interest in knowing how fast the
                pages load). You can object at any time, or block{" "}
                <Host>static.cloudflareinsights.com</Host> with a content
                blocker.
              </p>
            </Section>

            <Section title="Plausible Analytics">
              <p>
                I count visits with{" "}
                <a href="https://plausible.io/data-policy" className={linkClass}>
                  Plausible Analytics
                </a>
                . It runs on my own server at{" "}
                <Host>plausible.trebeljahr.com</Host>, rented from Hetzner Online
                GmbH in Nuremberg, Germany. Requests to it pass through Cloudflare
                as described under Hosting.
              </p>
              <p>
                Your browser loads the Plausible script from{" "}
                <Host>plausible.trebeljahr.com</Host> and sends its events there.
                That server receives your IP address and user agent. I do not
                route these requests through {siteConfig.domain}, so a content
                blocker can stop them. The site works the same without them.
              </p>
              <p>
                Plausible sets no cookies and stores nothing on your device. It
                combines your IP address and user agent with a salt that changes
                every day, and stores only the resulting hash. It deletes the salt
                after 24 hours, so nobody can trace the hash back to you. It never
                stores the IP address.
              </p>
              <p>
                Plausible records the page address, the referrer, the browser,
                the operating system, the device type and the country. It also
                records clicks on links to other sites and on file downloads. The
                script loads only on {siteConfig.domain}, not on local or test
                copies of the site.
              </p>
              <p>
                Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in knowing
                which pages people read). No information is stored on or read
                from your device, so § 25 TDDDG requires no consent. You can
                object at any time.
              </p>
            </Section>

            <Section title="Your theme choice">
              <p>
                The button in the navigation switches between the light and the
                dark theme. When you click it, your browser stores your choice in
                its local storage under the key <Host>theme</Host>. The site reads
                it on your next visit. The value never leaves your device, and you
                can delete it by clearing the site data in your browser.
              </p>
              <p>
                Legal basis: § 25 (2) No. 2 TDDDG (storage that you asked for by
                clicking the button).
              </p>
            </Section>

            <Section title="Transfers outside the EU">
              <p>
                Cloudflare, Inc. is established in the United States. It handles
                each request in a data center of its network, normally the one
                nearest to you. Access by U.S. authorities under U.S. law cannot
                be fully excluded. My Plausible server is in Germany.
              </p>
            </Section>

            <Section title="Storage period">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Plausible keeps its events with no time limit. Each event
                  carries only the daily hash, which nobody can link to you once
                  the salt is deleted after 24 hours.
                </li>
                <li>
                  Cloudflare Web Analytics keeps totals by page, country, browser
                  and device type. Cloudflare does not store the IP address.
                </li>
                <li>Your theme choice stays in your browser until you delete it.</li>
              </ul>
            </Section>

            <Section title="Your rights">
              <p>Under the GDPR you have the right to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>access the personal data held about you (Art. 15);</li>
                <li>have inaccurate data corrected (Art. 16);</li>
                <li>
                  have your data deleted (Art. 17), unless a legal obligation
                  requires me to keep it;
                </li>
                <li>restrict processing (Art. 18);</li>
                <li>receive your data in a portable format (Art. 20);</li>
                <li>
                  object to processing based on legitimate interest (Art. 21),
                  which includes both kinds of analytics above.
                </li>
              </ul>
              <p>
                To use any of these rights, email <PrivacyEmail />. You can also
                complain to a supervisory authority (Art. 77 GDPR). The authority
                responsible for me is the Landesbeauftragte für den Datenschutz
                und die Informationsfreiheit Baden-Württemberg.
              </p>
              <p>
                The site makes no automated decisions about you and builds no
                profile of you (Art. 22 GDPR).
              </p>
            </Section>

            <Section title="Changes">
              <p>
                I update this page when the site starts or stops using a server.
                The date at the top shows the last change.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
