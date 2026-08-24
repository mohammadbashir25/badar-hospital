"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface DoctorsCTAProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  variant?: "highlight" | "final";
}

export default function DoctorsCTA({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "final",
}: DoctorsCTAProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "highlight") {
    return (
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border-light bg-surface-blue p-8 text-start sm:flex-row sm:items-center sm:p-10"
          >
            <div>
              <span className="text-sm font-medium uppercase tracking-wide text-primary">
                {eyebrow}
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
                {description}
              </p>
            </div>
            <Link
              href="/appointment"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              {primaryCta}
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wide text-primary-light">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              {primaryCta}
            </Link>
            {secondaryCta ? (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCta}
              </Link>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}