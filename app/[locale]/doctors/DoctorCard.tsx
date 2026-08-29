"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface Doctor {
  key: string;
  name: string;
  specialty: string;
  qualification: string;
  description?: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  /** Larger, richer layout for a single standout doctor (e.g. the chief). */
  featured?: boolean;
  /** Small label shown above the name when featured (e.g. "Chief Medical Officer"). */
  badge?: string;
}

export default function DoctorCard({
  doctor,
  featured = false,
  badge,
}: DoctorCardProps) {
  const reduceMotion = useReducedMotion();

  if (featured) {
    return (
      <motion.div
        initial={reduceMotion ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
        className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-border-light bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl md:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft md:aspect-auto md:min-h-[22rem]">
          <Image
            priority
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-center p-8 text-start sm:p-10">
          {badge ? (
            <motion.span
              initial={reduceMotion ? undefined : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex w-fit items-center rounded-full bg-surface-blue px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-dark"
            >
              {badge}
            </motion.span>
          ) : null}

          <h3 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            {doctor.name}
          </h3>
          <p className="mt-2 text-base font-medium text-primary">
            {doctor.specialty}
          </p>
          <p className="mt-1 text-sm text-text-muted">{doctor.qualification}</p>
          {doctor.description ? (
            <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
              {doctor.description}
            </p>
          ) : null}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-border-light bg-surface shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-soft">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <div className="p-5 text-start">
        <h3 className="text-base font-semibold text-foreground">
          {doctor.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">
          {doctor.specialty}
        </p>
        <p className="mt-1 text-sm text-text-muted">{doctor.qualification}</p>
        {doctor.description ? (
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {doctor.description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}