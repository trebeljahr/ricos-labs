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
  const pillClipId = `${idPrefix}-pill`;
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
        <clipPath id={pillClipId}>
          <rect x="0" y="0" width="64" height="64" rx="14" />
        </clipPath>
        <clipPath id={leftClipId}>
          <rect x="0" y="0" width="31" height="64" />
        </clipPath>
        <clipPath id={rightClipId}>
          <rect x="33" y="0" width="31" height="64" />
        </clipPath>
        <linearGradient
          id={signalId}
          x1="32"
          y1="10"
          x2="32"
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
          d="M14 10H40C49 10 54 15 54 24C54 31 50 36 42 36L54 54H44L30 38H22V54H14ZM22 16H38C43 16 46 19 46 24C46 29 43 32 38 32H22Z"
        />
      </defs>
      <g clipPath={`url(#${pillClipId})`}>
        <rect width="64" height="64" fill={`url(#${fieldId})`} />
        <g clipPath={`url(#${leftClipId})`}>
          <use href={`#${rId}`} fill="#F6EFE2" fillRule="evenodd" />
        </g>
        <g clipPath={`url(#${rightClipId})`}>
          <use href={`#${rId}`} fill={`url(#${signalId})`} fillRule="evenodd" />
        </g>
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
