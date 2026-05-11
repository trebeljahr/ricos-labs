"use client";

import dynamic from "next/dynamic";

const DividerScene = dynamic(
  () => import("@/components/three/divider-scene").then((m) => m.DividerScene),
  { ssr: false }
);

export function Divider() {
  return (
    <section aria-hidden className="relative py-16 sm:py-20">
      <div className="container-narrow">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr,auto,1fr]">
          <div className="rule" />
          <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96">
            <DividerScene />
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              hover · drag
            </div>
          </div>
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}
