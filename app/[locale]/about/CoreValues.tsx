"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ValueItem {
  title: string;
  description: string;
}

interface CoreValuesProps {
  eyebrow: string;
  title: string;
  description: string;
  items: {
    respect: ValueItem;
    compassion: ValueItem;
    integrity: ValueItem;
    excellence: ValueItem;
  };
}

const icons: Record<keyof CoreValuesProps["items"], React.ReactNode> = {
  respect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-2.5-8-5.5-8-10a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-4 7.5-8 10Z" />
    </svg>
  ),
  compassion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      <circle cx="12" cy="12" r="9" strokeLinecap="round" />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 4 6v6c0 4.5 3.2 7.9 8 9 4.8-1.1 8-4.5 8-9V6l-8-3Z" />
    </svg>
  ),
  excellence: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.24-6.24-2.12 2.12M8.88 15.12l-2.12 2.12m0-10.48 2.12 2.12m8.24 8.24-2.12-2.12" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
};

export default function CoreValues({ eyebrow, title, description, items }: CoreValuesProps) {
  const reduceMotion = useReducedMotion();
  const entries = Object.entries(items) as [keyof typeof items, ValueItem][];

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

        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {entries.map(([key, item]) => (
            <motion.div
              key={key}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-border-light bg-surface p-6 text-start"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-blue text-primary">
                {icons[key]}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}