import { EsaLogo } from "@/components/logos/EsaLogo";
import { FlowkeyLogo } from "@/components/logos/FlowkeyLogo";
import { HenkelLogo } from "@/components/logos/HenkelLogo";
import { IronhackLogo } from "@/components/logos/IronhackLogo";
import { KlarnaLogo } from "@/components/logos/KlarnaLogo";
import { SoftgamesLogo } from "@/components/logos/SoftgamesLogo";
import { cn } from "@/lib/utils";

const brands = [
  {
    name: "European Space Agency",
    Logo: EsaLogo,
    detail: "Spacecraft trajectory tooling",
    logoClassName: "h-8",
  },
  {
    name: "Klarna",
    Logo: KlarnaLogo,
    detail: "Payments infrastructure",
    logoClassName: "h-8",
  },
  {
    name: "Henkel",
    Logo: HenkelLogo,
    detail: "Internal tooling",
    logoClassName: "h-8",
  },
  {
    name: "flowkey",
    Logo: FlowkeyLogo,
    detail: "Music education product",
    logoClassName: "h-8",
  },
  {
    name: "Softgames",
    Logo: SoftgamesLogo,
    detail: "HTML5 game engineering",
    logoClassName: "h-6",
  },
  {
    name: "Ironhack",
    Logo: IronhackLogo,
    detail: "Engineering instruction",
    logoClassName: "h-10",
  },
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
        <ul className="grid grid-cols-2 items-start gap-x-8 gap-y-10 border-t border-foreground/10 pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map(({ name, Logo, detail, logoClassName }) => (
            <li key={name} className="flex min-w-0 flex-col items-start">
              <div className="flex h-12 w-full items-center justify-start">
                <Logo
                  role="img"
                  aria-hidden={false}
                  aria-label={name}
                  className={cn(
                    "w-auto max-w-full shrink-0 text-foreground/85",
                    logoClassName,
                  )}
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
