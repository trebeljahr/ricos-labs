import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#capabilities", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/85 backdrop-blur">
      <div className="container-narrow flex h-14 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl leading-none">
            Ricos Labs
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
            LLC
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/65 transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="hidden h-9 items-center rounded-md border border-foreground/20 px-3.5 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background md:inline-flex"
        >
          Write us
        </a>
      </div>
    </header>
  );
}
