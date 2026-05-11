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
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,1fr]">
          <div className="relative z-10 max-w-2xl">
            <div className="eyebrow">An independent studio · est. 2026</div>

            <h1 className="mt-5 text-balance text-[2.4rem] leading-[1.05] sm:text-[3.4rem] sm:leading-[1.02]">
              <span className="font-display">We make </span>
              <span className="font-display italic">games</span>
              <span className="font-display">, real-time apps</span>
              <span className="font-display">,</span>
              <span className="font-display"> and other </span>
              <span className="font-display italic">small machines</span>
              <span className="font-display"> for the browser.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75">
              {siteConfig.legalName} is a one-person studio run by Rico
              Trebeljahr. We design, build, and ship the whole thing — from
              the shader on the screen to the database under it. The work
              behind{" "}
              <a href="https://playtiao.com" className="link-underline">playtiao</a>,{" "}
              <a href="https://raptor.trebeljahr.com" className="link-underline">raptor</a>,{" "}
              <a href="https://ricos.site" className="link-underline">ricos.site</a>,
              and a long shelf of open-source experiments lives here.
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

          <div className="relative aspect-square w-full lg:aspect-auto lg:h-[520px]">
            <HeroScene />
            <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              drag to orbit
            </div>
          </div>
        </div>
      </div>
      <div className="rule mx-auto max-w-6xl" />
    </section>
  );
}
