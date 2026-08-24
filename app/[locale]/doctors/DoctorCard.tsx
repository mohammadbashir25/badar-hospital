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
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-border-light bg-surface"
    >
      <div className="relative aspect-[3/4] bg-surface-soft">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
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