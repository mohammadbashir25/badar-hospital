"use client";

import { motion, useReducedMotion } from "framer-motion";

interface CarePoint {
  title: string;
  description: string;
}

interface PatientCareProps {
  eyebrow: string;
  title: string;
  description: string;
  points: {
    patientFirst: CarePoint;
    professional: CarePoint;
    comfort: CarePoint;
  };
}

export default function PatientCare({ eyebrow, title, description, points }: PatientCareProps) {
  const reduceMotion = useReducedMotion();
  const entries = Object.entries(points) as [keyof typeof points, CarePoint][];

  return (
    <section className="bg-surface-soft">
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

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {entries.map(([key, point], index) => (
            <motion.li
              key={key}
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              className="rounded-2xl border border-border-light bg-surface p-6 text-start"
            >
              <span className="text-sm font-semibold text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {point.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}