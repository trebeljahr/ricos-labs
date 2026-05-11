import { ArrowRight, Github } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 grid-background opacity-60" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" aria-hidden />
      <div className="container-narrow relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono">Open for new projects · 2026</span>
          </div>

          <h1 className="mt-7 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            <span className="text-gradient">
              Software studio building games, real-time apps, and developer tools.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {siteConfig.legalName} is the studio behind{" "}
            <a href="https://playtiao.com" className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              playtiao.com
            </a>
            ,{" "}
            <a href="https://raptor.trebeljahr.com" className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              raptor.trebeljahr.com
            </a>
            ,{" "}
            <a href="https://ricos.site" className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              ricos.site
            </a>
            , and a portfolio of open-source experiments. Multiplayer, 3D, cross-platform — one TypeScript codebase, end to end.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              See what we&apos;ve built
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card/40 px-5 text-sm font-medium text-foreground transition hover:bg-card"
            >
              <Github className="h-4 w-4" />
              Open source on GitHub
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {[
              { label: "Projects shipped", value: "20+" },
              { label: "GitHub stars", value: "300+" },
              { label: "Past clients", value: "ESA · Klarna" },
              { label: "Platforms", value: "Web · Desktop · Mobile" },
            ].map((stat) => (
              <div key={stat.label} className="text-left sm:text-center">
                <div className="font-mono text-lg font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
