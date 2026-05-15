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
  const rId = `${idPrefix}-r`;
  const leftClipId = `${idPrefix}-left`;
  const rightClipId = `${idPrefix}-right`;

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
        <clipPath id={leftClipId}>
          <rect x="0" y="0" width="29" height="64" />
        </clipPath>
        <clipPath id={rightClipId}>
          <rect x="29" y="0" width="35" height="64" />
        </clipPath>
        <linearGradient
          id={signalId}
          x1="29"
          y1="10"
          x2="29"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#D95D3E" />
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
        <path
          id={rId}
          d="M18 10H35C42 10 47 16 47 24C47 31 43 35.5 38 37L52 54H44L32 38H24V54H18ZM24 16V32H34C39 32 41 29 41 24C41 19 39 16 34 16Z"
        />
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${fieldId})`} />
      <g clipPath={`url(#${leftClipId})`}>
        <use href={`#${rId}`} fill="#F6EFE2" fillRule="evenodd" />
      </g>
      <g clipPath={`url(#${rightClipId})`}>
        <use href={`#${rId}`} fill={`url(#${signalId})`} fillRule="evenodd" />
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
