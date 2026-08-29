import { memo } from "react";

/**
 * BADAR — logo lockup.
 *
 * Icon (small SVG, symbol only) + "BADAR" as plain text next to it.
 * No text-in-SVG, no textLength/lengthAdjust, no animation library —
 * just a flex row, so it can never stack and letter-spacing is a normal
 * CSS value that just works.
 *
 * Usage:
 *   <Logo />                          // navy, ~32px tall, for light backgrounds
 *   <Logo variant="white" />          // white, for the navy footer
 *   <Logo size={24} />                // smaller, e.g. mobile nav
 */

export interface LogoProps {
  /** Ink color for the icon's cross stem and the text. */
  variant?: "navy" | "white";
  /** Total lockup height in px — icon and text both scale off this. */
  size?: number;
  /** Extra classes for the outer wrapper (margin, etc). */
  className?: string;
  /** Accessible label. Pass "" if the mark sits decoratively next to visible text. */
  title?: string;
}

const INK = { navy: "#011936", white: "#FFFFFF" } as const;
const CYAN = "#43C3D6";
const CYAN_LIGHT = "#7BD9E5";

function Logo({ variant = "navy", size = 32, className = "", title = "BADAR" }: LogoProps) {
  const ink = INK[variant];

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap: size * 0.3 }}
      role="img"
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      {/* Icon — symbol only, no text inside the SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M 80 32 A 36 36 0 0 1 32 80"
          stroke={CYAN_LIGHT}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <rect x="42" y="18" width="16" height="64" rx="8" fill={ink} />
        <rect x="18" y="42" width="64" height="16" rx="8" fill={CYAN} />
      </svg>

      {/* Wordmark — plain text, normal CSS letter-spacing */}
      <span
        style={{
          fontSize: size * 0.62,
          fontWeight: 800,
          letterSpacing: size * 0.05,
          color: ink,
          lineHeight: 1,
        }}
      >
        BADAR
      </span>
    </div>
  );
}

export default memo(Logo);