"use client";

import { Children, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ---------------------------------------------------------------- */
/* Heading fade-up                                                   */
/* ---------------------------------------------------------------- */

export function FacilitiesFadeUp({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? undefined : variants}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Staggered reveal for the facility rows                            */
/* ---------------------------------------------------------------- */

export function FacilitiesRevealList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.ul
      className={className}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? undefined : containerVariants}
    >
      {Children.map(children, (child) => (
        <motion.li
          className="list-none"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* ---------------------------------------------------------------- */
/* Facility image with a clean placeholder fallback                  */
/* ---------------------------------------------------------------- */

function PlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9"
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="M4 17l4.5-4.5a1.5 1.5 0 0 1 2.12 0L14 15.9l2.15-2.15a1.5 1.5 0 0 1 2.12 0L20.5 16" />
    </svg>
  );
}

interface FacilityImageProps {
  /** Path under /public, e.g. "/images/facilities/modern.jpg" */
  src: string;
  alt: string;
}

/**
 * Renders the facility photo when it exists, and falls back to a
 * quiet, on-brand placeholder (no broken-image UI) when it doesn't —
 * so the section stays polished before real photography is added.
 */
export function FacilityImage({ src, alt }: FacilityImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-surface-blue text-primary/50"
      >
        <PlaceholderIcon />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      onError={() => setHasError(true)}
    />
  );
}
