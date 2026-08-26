"use client";

import { motion, useReducedMotion } from "framer-motion";

// Placeholder emergency number — replace with the real number.
const emergencyPhone = "+93700380380";

interface EmergencyContactProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
}

export default function EmergencyContact({
  eyebrow,
  title,
  description,
  cta,
}: EmergencyContactProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-red-light/10">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-red/20 bg-surface p-8 text-start sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-wide text-red">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>

          <a
            href={`tel:${emergencyPhone}`}
            className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-red px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-dark"
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}