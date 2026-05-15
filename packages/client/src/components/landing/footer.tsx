import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 py-12">
      <div className="container-narrow">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
            <div>
              <div className="font-display text-xl">{siteConfig.legalName}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                © {year} · All rights reserved
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/65">
            <a href={siteConfig.socials.blog} target="_blank" rel="noreferrer" className="hover:text-foreground">
              Blog
            </a>
            <Link href="/imprint" className="hover:text-foreground">Imprint</Link>
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
