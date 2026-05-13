import type { Metadata } from "next";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Footer } from "@/components/landing/footer";
import { Nav } from "@/components/landing/nav";
import { brand } from "@/lib/brand";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Brand kit",
  description:
    "Ricos Labs brand kit: logo assets, palette, typography, and voice guidance.",
  alternates: {
    canonical: "/brand",
  },
};

const usage = [
  "Use the mark on dark fields, app tiles, favicons, and compact avatars.",
  "Use the lockup when the studio name needs to read at proposal or deck scale.",
  "Keep copper as the primary action color; use cyan as a smaller realtime signal.",
  "Pair warm paper with deep ink before adding violet depth from WebGL scenes.",
];

export default function BrandPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden bg-[hsl(var(--brand-ink))] text-[hsl(var(--brand-paper))]">
          <div className="container-narrow grid min-h-[calc(92svh-3.5rem)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[0.95fr,1.05fr]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brand-cyan))]">
                Brand kit · Ricos Labs
              </div>
              <h1 className="mt-5 font-display text-[2.75rem] leading-none sm:text-[4.2rem] lg:text-[5rem] xl:text-[5.35rem]">
                Charged glass.
                <br />
                Warm paper.
                <br />
                Real-time craft.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[hsl(var(--brand-paper))]/72">
                {brand.promise} The identity keeps the old plasma energy, but
                gives it a sharper monogram, a warmer editorial system, and
                ready-to-use assets.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="/brand/ricos-labs-lockup.svg"
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-[hsl(var(--brand-paper))] px-4 text-sm font-medium text-[hsl(var(--brand-ink))] transition hover:bg-white"
                >
                  <ArrowDownToLine aria-hidden className="h-4 w-4" />
                  Download lockup
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-[hsl(var(--brand-paper))]/22 px-4 text-sm font-medium text-[hsl(var(--brand-paper))] transition hover:border-[hsl(var(--brand-paper))]/55"
                >
                  Brand contact
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[460px]">
              <div
                aria-hidden
                className="absolute inset-x-4 top-1/2 h-px bg-[hsl(var(--brand-paper))]/12"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-[hsl(var(--brand-paper))]/12"
              />
              <BrandMark
                idPrefix="brand-kit-hero-mark"
                title="Ricos Labs"
                className="relative h-44 w-44 shadow-[0_34px_90px_-34px_rgba(53,196,216,0.75)] sm:h-60 sm:w-60"
              />
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="container-narrow">
            <div className="grid gap-12 lg:grid-cols-[0.8fr,1.2fr]">
              <div>
                <div className="eyebrow">Identity system</div>
                <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  One mark, three practical assets.
                </h2>
              </div>
              <div className="grid gap-4">
                {brand.assets.map((asset) => (
                  <a
                    key={asset.name}
                    href={asset.href}
                    download
                    className="group grid gap-5 rounded-lg border border-foreground/12 bg-background p-5 transition hover:border-primary/60 sm:grid-cols-[180px,1fr,auto] sm:items-center"
                  >
                    <span className="flex h-28 items-center justify-center rounded-md bg-secondary/60 p-4">
                      <img
                        src={asset.href}
                        alt=""
                        className="max-h-full max-w-full"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-2xl">
                        {asset.name}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-foreground/65">
                        {asset.description}
                      </span>
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-foreground/15 text-foreground/65 transition group-hover:border-primary/60 group-hover:text-primary">
                      <ArrowDownToLine aria-hidden className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/10 py-20 sm:py-24">
          <div className="container-narrow">
            <div className="mb-10 max-w-2xl">
              <div className="eyebrow">Palette</div>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Warm base, high-voltage signals.
              </h2>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {brand.palette.map((color) => (
                <li
                  key={color.name}
                  className="overflow-hidden rounded-lg border border-foreground/12 bg-background"
                >
                  <div
                    className="h-28"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <h3 className="font-display text-xl leading-tight">
                      {color.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/50">
                      {color.hex}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/62">
                      {color.usage}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="container-narrow grid gap-12 lg:grid-cols-[0.8fr,1.2fr]">
            <div>
              <div className="eyebrow">Typography</div>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Editorial head, product hands.
              </h2>
            </div>
            <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
              {brand.type.map((face) => (
                <li
                  key={face.name}
                  className="grid gap-4 py-7 sm:grid-cols-[10rem,1fr]"
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                      {face.role}
                    </div>
                    <h3 className="mt-1 text-sm font-medium">{face.name}</h3>
                  </div>
                  <p
                    className={
                      face.role === "Display"
                        ? "font-display text-4xl leading-tight"
                        : face.role === "Code / labels"
                          ? "font-mono text-lg uppercase tracking-[0.14em]"
                          : "text-xl leading-relaxed"
                    }
                  >
                    {face.sample}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[hsl(var(--brand-ink))] py-20 text-[hsl(var(--brand-paper))] sm:py-24">
          <div className="container-narrow grid gap-12 lg:grid-cols-[0.8fr,1.2fr]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brand-cyan))]">
                Voice and use
              </div>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Sharp enough for code. Human enough for clients.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl">Voice</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[hsl(var(--brand-paper))]/70">
                  {brand.voice.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl">Usage</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[hsl(var(--brand-paper))]/70">
                  {usage.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
