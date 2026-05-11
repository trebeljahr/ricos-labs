import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#company", label: "Company" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30 transition group-hover:bg-primary/20">
            <span className="font-mono text-sm font-bold text-primary">R</span>
          </span>
          <span className="font-semibold tracking-tight">
            {siteConfig.name}
            <span className="text-muted-foreground"> LLC</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="hidden md:inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
