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
  const signalId = `${idPrefix}-signal`;
  const fieldId = `${idPrefix}-field`;

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
        <linearGradient
          id={signalId}
          x1="30"
          y1="36"
          x2="51"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#D95D3E" />
          <stop offset="0.52" stopColor="#F09A56" />
          <stop offset="1" stopColor="#35C4D8" />
        </linearGradient>
        <radialGradient
          id={fieldId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(42 18) rotate(128) scale(48 56)"
        >
          <stop offset="0" stopColor="#26304A" />
          <stop offset="0.48" stopColor="#12141E" />
          <stop offset="1" stopColor="#080912" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${fieldId})`} />
      <path
        d="M21 49V15h16.5C45 15 50 19.4 50 26.8S44.7 38.5 36.8 38.5H21"
        fill="none"
        stroke="#F6EFE2"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.5 38.5 48 49"
        fill="none"
        stroke={`url(#${signalId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 25.5h9.2"
        fill="none"
        stroke="#35C4D8"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.95"
      />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="13"
        fill="none"
        stroke="#F6EFE2"
        strokeOpacity="0.12"
        strokeWidth="2"
      />
    </svg>
  );
}
