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
      <g transform="translate(4, -3)" opacity="0.4">
        <path
          d="M19 50V14h16c8 0 13 5 13 12s-5 12-13 12H19"
          fill="none"
          stroke="#6F4BE8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 38l14 12"
          fill="none"
          stroke="#6F4BE8"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(2, -1.5)" opacity="0.55">
        <path
          d="M19 50V14h16c8 0 13 5 13 12s-5 12-13 12H19"
          fill="none"
          stroke="#35C4D8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 38l14 12"
          fill="none"
          stroke="#35C4D8"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <g>
        <path
          d="M19 50V14h16c8 0 13 5 13 12s-5 12-13 12H19"
          fill="none"
          stroke="#F6EFE2"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 38l14 12"
          fill="none"
          stroke="#F6EFE2"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
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
