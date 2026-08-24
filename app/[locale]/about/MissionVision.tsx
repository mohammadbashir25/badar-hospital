"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MissionVisionBlock {
  eyebrow: string;
  title: string;
  description: string;
}

interface MissionVisionProps {
  mission: MissionVisionBlock;
  vision: MissionVisionBlock;
}

function Card({ eyebrow, title, description }: MissionVisionBlock) {
  return (
    <div className="rounded-2xl border border-border-light bg-surface p-8 text-start">
      <span className="text-sm font-medium uppercase tracking-wide text-primary">
        {eyebrow}
      </span>
      <h3 className="mt-3 text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}

export default function MissionVision({ mission, vision }: MissionVisionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-surface-soft">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <Card {...mission} />
          <Card {...vision} />
        </motion.div>
      </div>
    </section>
  );
}