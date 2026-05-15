"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "#projects", label: "Projects", sectionId: "projects" },
  { href: "#capabilities", label: "Capabilities", sectionId: "capabilities" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
];

const NAV_HEIGHT = 56;

function findActiveSection(): string | null {
  let best: string | null = null;
  let bestDistance = Infinity;

  for (const { sectionId } of navLinks) {
    const el = document.getElementById(sectionId);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < NAV_HEIGHT) continue;
    const distance = Math.abs(rect.top - NAV_HEIGHT);
    if (distance < bestDistance) {
      best = sectionId;
      bestDistance = distance;
    }
  }
  return best;
}

function positionIndicator(
  nav: HTMLElement,
  indicator: HTMLSpanElement,
  sectionId: string | null,
): void {
  if (!sectionId) {
    indicator.style.opacity = "0";
    return;
  }
  const linkEl = nav.querySelector<HTMLAnchorElement>(
    `a[data-section="${sectionId}"]`,
  );
  if (!linkEl || linkEl.offsetWidth === 0) {
    indicator.style.opacity = "0";
    return;
  }
  const navRect = nav.getBoundingClientRect();
  const linkRect = linkEl.getBoundingClientRect();
  indicator.style.opacity = "1";
  indicator.style.left = `${linkRect.left - navRect.left}px`;
  indicator.style.width = `${linkRect.width}px`;
}

export function Nav(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    let ticking = false;
    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const active = findActiveSection();
        setActiveSection(active);
        positionIndicator(nav, indicator, active);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/85 backdrop-blur">
      <div className="container-narrow flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-xl leading-none">
              Ricos Labs
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
              LLC
            </span>
          </span>
        </Link>
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden items-center gap-8 text-sm md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              data-section={link.sectionId}
              href={link.href}
              className={`py-1 transition-colors ${
                activeSection === link.sectionId
                  ? "text-foreground"
                  : "text-foreground/65 hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <span
            ref={indicatorRef}
            aria-hidden
            className="pointer-events-none absolute -bottom-[1px] h-[2px] bg-foreground transition-all duration-300 ease-in-out"
            style={{ opacity: 0 }}
          />
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
