import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  idPrefix?: string;
  title?: string;
};

export function BrandMark({
  idPrefix = "brand-mark",
  title,
  ...props
}: BrandMarkProps) {
  const orbId = `${idPrefix}-orb`;
  const boltId = `${idPrefix}-bolt`;
  const haloId = `${idPrefix}-halo`;
  const glowId = `${idPrefix}-glow`;

  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      <defs>
        <radialGradient id={orbId} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#2c2050" />
          <stop offset="55%" stopColor="#120e22" />
          <stop offset="100%" stopColor="#06050f" />
        </radialGradient>
        <linearGradient id={boltId} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="45%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <radialGradient id={haloId} cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#a855f7" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${orbId})`} />
      <circle cx="32" cy="28" r="22" fill={`url(#${haloId})`} />
      <ellipse cx="22" cy="16" rx="9" ry="5" fill="#ffffff" opacity="0.12" />
      <path
        d="M20 13 L33 27 L25 33 L44 52"
        stroke={`url(#${boltId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.55"
        filter={`url(#${glowId})`}
      />
      <path
        d="M20 13 L33 27 L25 33 L44 52"
        stroke={`url(#${boltId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="44"
        cy="52"
        r="4.5"
        fill="#67e8f9"
        opacity="0.4"
        filter={`url(#${glowId})`}
      />
      <circle cx="44" cy="52" r="2" fill="#ecfeff" />
    </svg>
  );
}
