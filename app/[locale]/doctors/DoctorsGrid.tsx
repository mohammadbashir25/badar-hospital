"use client";

import { motion, useReducedMotion } from "framer-motion";
import DoctorCard, { type Doctor } from "./DoctorCard";

interface ChiefDoctor extends Doctor {
  badge: string;
}

interface DoctorsGridProps {
  eyebrow: string;
  title: string;
  description: string;
  chief: ChiefDoctor;
  doctors: Doctor[];
}

export default function DoctorsGrid({
  eyebrow,
  title,
  description,
  chief,
  doctors,
}: DoctorsGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-surface-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
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

        <div className="mt-10">
          <DoctorCard doctor={chief} featured badge={chief.badge} />
        </div>

        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.key} doctor={doctor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}