import { memo } from "react";
import Image from "next/image";

/**
 * BADAR — logo mark.
 *
 * Real logo image (/public/logo.png) only — no wordmark text.
 *
 * Usage:
 *   <Logo />                          // ~56px tall
 *   <Logo size={40} />                // smaller, e.g. mobile nav
 */

export interface LogoProps {
  /** Total logo height in px (width scales automatically via objectFit). */
  size?: number;
  /** Extra classes for the outer wrapper (margin, etc). */
  className?: string;
  /** Accessible label. Pass "" if the mark sits decoratively next to visible text. */
  title?: string;
}

function Logo({ size = 90, className = "", title = "BADAR" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt={title}
      width={size}
      height={size}
      className={className}
      style={{
        width: "auto",
        height: size,
        objectFit: "contain",
        flexShrink: 0,
      }}
      priority
    />
  );
}

export default memo(Logo);