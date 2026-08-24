"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ContactHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function ContactHero({
  eyebrow,
  title,
  description,
}: ContactHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-surface-blue">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-start"
        >
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}