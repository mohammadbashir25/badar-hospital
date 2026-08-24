"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WhyItem {
  title: string;
  description: string;
}

interface WhyBadarProps {
  eyebrow: string;
  title: string;
  description: string;
  items: {
    experiencedCare: WhyItem;
    modernSupport: WhyItem;
    patientRespect: WhyItem;
    accessibleCare: WhyItem;
  };
}

export default function WhyBadar({ eyebrow, title, description, items }: WhyBadarProps) {
  const reduceMotion = useReducedMotion();
  const entries = Object.entries(items) as [keyof typeof items, WhyItem][];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
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

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {entries.map(([key, item], index) => (
            <motion.div
              key={key}
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
              className="flex gap-4 border-b border-border-light pb-6 text-start"
            >
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}