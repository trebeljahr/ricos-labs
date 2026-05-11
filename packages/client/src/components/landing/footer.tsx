import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 py-12">
      <div className="container-narrow">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="font-display text-xl">{siteConfig.legalName}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50">
              © {year} · All rights reserved
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/65">
            <a href={siteConfig.socials.portfolio} target="_blank" rel="noreferrer" className="hover:text-foreground">
              Portfolio
            </a>
            <a href={siteConfig.socials.blog} target="_blank" rel="noreferrer" className="hover:text-foreground">
              Blog
            </a>
            <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
            <Link href="/imprint" className="hover:text-foreground">Imprint</Link>
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-10 max-w-2xl text-xs leading-relaxed text-foreground/50">
          A Wyoming Limited Liability Company. Principal office:{" "}
          {siteConfig.entity.principalOffice.line1},{" "}
          {siteConfig.entity.principalOffice.line2},{" "}
          {siteConfig.entity.principalOffice.country}.
        </div>
      </div>
    </footer>
  );
}
