"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/site-config";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative overflow-hidden paper-grain">
      <div className="container-narrow relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr,1.05fr]">
          <div className="relative z-10 max-w-2xl">
            <div className="eyebrow">An independent studio · est. 2026</div>

            <h1 className="mt-5 text-balance text-[2.4rem] leading-[1.05] sm:text-[3.4rem] sm:leading-[1.02]">
              <span className="font-display">We build </span>
              <span className="font-display italic">games</span>
              <span className="font-display">, real-time apps, and developer tools for the browser.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75">
              {siteConfig.legalName} is the studio behind{" "}
              <a href="https://playtiao.com" className="link-underline">playtiao</a>,{" "}
              <a href="https://raptor.trebeljahr.com" className="link-underline">raptor</a>,{" "}
              <a href="https://ricos.site" className="link-underline">ricos.site</a>,
              and a long list of open-source experiments. We work across the
              full stack: shaders, multiplayer servers, payments, databases,
              and the CLIs and pipelines that ship them.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href="#projects"
                className="inline-flex h-10 items-center rounded-md bg-foreground px-4 font-medium text-background transition hover:bg-foreground/90"
              >
                See the work
              </a>
              <a
                href="#contact"
                className="text-foreground/70 underline decoration-foreground/20 underline-offset-[5px] transition hover:text-foreground hover:decoration-foreground/60"
              >
                Start a conversation →
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-x-6 text-sm">
              {[
                { k: "Based", v: "Berlin / Wyoming" },
                { k: "Stack", v: "TypeScript, end to end" },
                { k: "Open source", v: "Most of it" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                    {item.k}
                  </dt>
                  <dd className="mt-1 text-foreground/85">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            {/* Soft outer halo on the page so the dark panel sits naturally on cream. */}
            <div
              aria-hidden
              className="absolute inset-[-12%] rounded-3xl opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(242,0,255,0.22), rgba(90,139,255,0.08) 55%, transparent 75%)",
              }}
            />
            {/* Dark display panel — the real plasma lamp lives inside. */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl ring-1 ring-foreground/20 shadow-[0_30px_80px_-30px_rgba(20,15,35,0.55)] bg-[#121524]">
              <HeroScene />
            </div>
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              touch the glass
            </div>
          </div>
        </div>
      </div>
      <div className="rule mx-auto max-w-6xl" />
    </section>
  );
}
