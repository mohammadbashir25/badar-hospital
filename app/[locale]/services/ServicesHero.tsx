"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface ServicesHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageAlt: string;
}

export default function ServicesHero({
  eyebrow,
  title,
  description,
  imageAlt,
}: ServicesHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-surface-blue">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
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

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-6 mb-16 aspect-[16/7] overflow-hidden rounded-2xl border border-border-light bg-surface-soft lg:mx-8"
      >
        <Image
          src="/images/services/services-hero.jpg"
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}