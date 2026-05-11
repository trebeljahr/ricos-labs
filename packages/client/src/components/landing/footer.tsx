import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12">
      <div className="container-narrow">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30">
              <span className="font-mono text-sm font-bold text-primary">R</span>
            </span>
            <div>
              <div className="text-sm font-semibold">{siteConfig.legalName}</div>
              <div className="font-mono text-[11px] text-muted-foreground">
                © {year} · All rights reserved
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a
              href={siteConfig.socials.portfolio}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Portfolio
            </a>
            <a
              href={siteConfig.socials.blog}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Blog
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <Link href="/imprint" className="hover:text-foreground">
              Imprint
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          A Wyoming Limited Liability Company. Principal office:{" "}
          {siteConfig.entity.principalOffice.line1},{" "}
          {siteConfig.entity.principalOffice.line2},{" "}
          {siteConfig.entity.principalOffice.country}.
        </div>
      </div>
    </footer>
  );
}
