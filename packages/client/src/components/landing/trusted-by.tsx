import { EsaLogo } from "@/components/logos/EsaLogo";
import { FlowkeyLogo } from "@/components/logos/FlowkeyLogo";
import { HenkelLogo } from "@/components/logos/HenkelLogo";
import { IronhackLogo } from "@/components/logos/IronhackLogo";
import { KlarnaLogo } from "@/components/logos/KlarnaLogo";
import { SoftgamesLogo } from "@/components/logos/SoftgamesLogo";

const brands = [
  { name: "European Space Agency", Logo: EsaLogo, detail: "Spacecraft trajectory tooling" },
  { name: "Klarna", Logo: KlarnaLogo, detail: "Payments infrastructure" },
  { name: "Henkel", Logo: HenkelLogo, detail: "Internal tooling" },
  { name: "flowkey", Logo: FlowkeyLogo, detail: "Music education product" },
  { name: "Softgames", Logo: SoftgamesLogo, detail: "HTML5 game engineering" },
  { name: "Ironhack", Logo: IronhackLogo, detail: "Engineering instruction" },
];

export function TrustedBy() {
  return (
    <section className="py-20">
      <div className="container-narrow">
        <div className="mb-10 max-w-2xl">
          <div className="eyebrow">Track record</div>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Production experience across games, payments, tooling, and{" "}
            <span className="italic">education</span>.
          </h2>
        </div>
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 border-t border-foreground/10 pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map(({ name, Logo, detail }) => (
            <li key={name} className="flex flex-col items-start">
              <div className="flex h-10 w-full items-center justify-start">
                <Logo
                  role="img"
                  aria-label={name}
                  className="h-full w-auto max-w-[140px] text-foreground/85"
                />
              </div>
              <span className="mt-3 text-xs leading-snug text-foreground/55">
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
