"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ServiceCard from "./ServiceCard";

type ServiceItem = {
  key: string;
  title: string;
  description: string;
};

type ServicesMotionProps = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllLabel: string;
  services: ServiceItem[];
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
const serviceIcons: Record<string, ReactNode> = {
  emergency: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),

  outpatient: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 5h16v10H8l-4 4V5Z" />
    </svg>
  ),

  diagnostics: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="10" cy="10" r="6" />
      <path d="M20 20l-5.2-5.2" />
    </svg>
  ),

  pharmacy: (
    <svg {...iconProps} aria-hidden="true">
      <rect
        x="3"
        y="9"
        width="18"
        height="6"
        rx="3"
        transform="rotate(45 12 12)"
      />
      <path d="M9.5 14.5l5-5" />
    </svg>
  ),

  ctScan: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
    </svg>
  ),
  ultrasound: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 3a7 7 0 0 1 7 7c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 7-7Z" />
      <path d="M12 7a3 3 0 0 1 3 3" />
      <path d="M12 10h.01" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function ServicesMotion({
  eyebrow,
  title,
  description,
  viewAllLabel,
  services,
}: ServicesMotionProps) {
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
    <section aria-labelledby="services-heading" className="bg-surface-soft py-20 sm:py-24 lg:py-32">
      {/*
        Single scroll trigger for the whole section — header and grid inherit
        "show" from this one motion.div via variant propagation, so they always
        animate in together instead of relying on two separate viewport checks.
      */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-left rtl:text-right">
          <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-dark">
            <span className="h-px w-8 bg-primary-dark/50" aria-hidden />
            {eyebrow}
          </span>

          <h2
            id="services-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            {title}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {description}
          </p>
        </motion.div>

        {/* Services grid — 2x2 on tablet/desktop keeps 4 services evenly balanced with no orphan card */}
        <motion.ul
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 sm:gap-6"
        >
          {services.map((service) => (
            <motion.li key={service.key} variants={cardItem} className="list-none">
              <ServiceCard
                icon={serviceIcons[service.key] ?? fallbackIcon}
                title={service.title}
                description={service.description}
              />
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-10 text-left rtl:text-right sm:text-right sm:rtl:text-left">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary-dark"
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
      </motion.div>
    </section>
  );
}
