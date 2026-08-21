"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import SpecialtyCard from "./SpecialtyCard";

type SpecialtyItem = {
  key: string;
  title: string;
  description: string;
};

type SpecialtiesMotionProps = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllLabel: string;
  specialties: SpecialtyItem[];
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

// Simple, consistent line icons — no icon library dependency required.
const specialtyIcons: Record<string, ReactNode> = {
  generalMedicine: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  ),

  generalSurgery: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M8 21h8" />
      <path d="M10 21V8l2-5 2 5v13" />
      <path d="M7 8h10" />
      <path d="M9 12h6" />
    </svg>
  ),

  neurosurgery: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <path d="M9 9.5c.8-1 2-1.5 3-1.5s2.2.5 3 1.5" />
      <path d="M9 14.5c.8 1 2 1.5 3 1.5s2.2-.5 3-1.5" />
      <path d="M12 8v8" />
    </svg>
  ),

  ent: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M8 6a4 4 0 0 1 8 0c0 3-2 4-2 6" />
      <path d="M10 15h4" />
      <path d="M9 18h6" />
      <path d="M10 21h4" />
    </svg>
  ),

  gynecologyObstetrics: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v8" />
      <path d="M8 20h8" />
      <path d="M5 8a7 7 0 0 0 14 0" />
    </svg>
  ),

  dental: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M8 4c-2 0-4 1.5-4 4 0 3 1.5 4 2 7 .4 2.5 1.2 5 2.5 5s1.5-4 3.5-4 2.2 4 3.5 4 2.1-2.5 2.5-5c.5-3 2-4 2-7 0-2.5-2-4-4-4-1.5 0-2.5 1-4 1S9.5 4 8 4Z" />
    </svg>
  ),

  psychiatry: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 10h.01M15.5 10h.01" />
      <path d="M9 14c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
      <path d="M12 4v2" />
    </svg>
  ),

  pediatrics: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 20s-7-4.35-9.5-8.5C.5 8 2 4.5 5.5 4.5c2 0 3.5 1.2 4.5 2.7C11 5.7 12.5 4.5 14.5 4.5 18 4.5 19.5 8 19.5 11.5 17 15.65 12 20 12 20Z" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function SpecialtiesMotion({
  eyebrow,
  title,
  description,
  viewAllLabel,
  specialties,
}: SpecialtiesMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1, delayChildren: 0.1 },
    },
  };

  const cardItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section aria-labelledby="specialties-heading" className="bg-background py-20 sm:py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
      >
        {/* Header — inherits "show" from the section-level trigger above */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl text-start">
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-dark">
              <span className="h-px w-8 bg-primary-dark/50" aria-hidden />
              {eyebrow}
            </span>

            <h2
              id="specialties-heading"
              className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              {title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              {description}
            </p>
          </div>

          <Link
            href="/specialties"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary-dark"
          >
            <span className="border-b border-navy pb-0.5 transition-colors group-hover:border-primary-dark">
              {viewAllLabel}
            </span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* Specialty grid — also inherits "show" from the same section-level trigger */}
        <motion.ul
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {specialties.map((specialty) => (
            <motion.li key={specialty.key} variants={cardItem} className="h-full list-none">
              <SpecialtyCard
                icon={specialtyIcons[specialty.key] ?? fallbackIcon}
                title={specialty.title}
                description={specialty.description}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
