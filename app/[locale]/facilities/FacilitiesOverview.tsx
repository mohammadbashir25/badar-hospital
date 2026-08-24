"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FacilitiesOverviewProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function FacilitiesOverview({
  eyebrow,
  title,
  description,
}: FacilitiesOverviewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-start"
        >
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}