"use client";

import { motion, useReducedMotion } from "framer-motion";



// Centralized placeholder contact data.
// Replace these values with the real hospital information.
const contactItems = [
  { key: "phone" },
  { key: "email" },
  { key: "address" },
  { key: "hours" },
] as const;


interface ContactInfoProps {
  eyebrow: string;
  title: string;
  description: string;
  values: Record<(typeof contactItems)[number]["key"], string>;
  labels: Record<(typeof contactItems)[number]["key"], string>;
}

export default function ContactInfo({
  eyebrow,
  title,
  description,
  labels,
  values
}: ContactInfoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-start"
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

      <dl className="mt-8 space-y-6">
        {contactItems.map((item) => (
          <div
            key={item.key}
            className="border-b border-border-light pb-6 last:border-none"
          >
            <dt className="text-sm font-medium text-text-muted">
              {labels[item.key]}
            </dt>
            <dd className="mt-1 text-base font-medium text-foreground" dir="ltr">
              {values[item.key]}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}