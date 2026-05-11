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

          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {/* Soft outer halo on the page so the dark orb sits naturally on cream. */}
            <div
              aria-hidden
              className="absolute inset-[-12%] rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(160,75,255,0.22), rgba(90,139,255,0.08) 55%, transparent 75%)",
              }}
            />
            {/* The glass vessel — dark interior so the plasma reads. */}
            <div
              className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-foreground/20 shadow-[0_30px_80px_-30px_rgba(20,15,35,0.55)]"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, #1b1530 0%, #0c0a1a 60%, #06050f 100%)",
              }}
            >
              <HeroScene />
              {/* Specular highlight on the glass. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 32% 22%, rgba(255,255,255,0.18), transparent 35%)",
                }}
              />
            </div>
            <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              touch the glass
            </div>
          </div>
        </div>
      </div>
      <div className="rule mx-auto max-w-6xl" />
    </section>
  );
}
