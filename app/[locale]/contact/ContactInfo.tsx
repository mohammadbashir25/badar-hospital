"use client";

import { motion, useReducedMotion } from "framer-motion";

// Centralized placeholder contact data.
// Replace these values with the real hospital information.
const contactItems = [
  {
    key: "phone",
    value: "+93 000 000 000", // Replace with real phone number
  },
  {
    key: "email",
    value: "info@example.com", // Replace with real email address
  },
  {
    key: "address",
    value: "Hospital Address Placeholder, City, Afghanistan", // Replace with real address
  },
  {
    key: "hours",
    value: "Placeholder opening hours", // Replace with real opening hours
  },
] as const;

interface ContactInfoProps {
  eyebrow: string;
  title: string;
  description: string;
  labels: Record<(typeof contactItems)[number]["key"], string>;
}

export default function ContactInfo({
  eyebrow,
  title,
  description,
  labels,
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
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}