"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface AboutStoryProps {
  eyebrow: string;
  title: string;
  description: string;
  descriptionTwo: string;
  imageAlt: string;
}

export default function AboutStory({
  eyebrow,
  title,
  description,
  descriptionTwo,
  imageAlt,
}: AboutStoryProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-light bg-surface-soft"
        >
          <Image
            src="/specialties/surgery.png"
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-start"
        >
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            {description}
          </p>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {descriptionTwo}
          </p>
        </motion.div>
      </div>
    </section>
  );
}