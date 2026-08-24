"use client";

import { motion, useReducedMotion } from "framer-motion";

// Centralized placeholder location data.
// Replace with Badar Medical Hospital coordinates.
const hospitalLocation = {
  latitude: 34.52278973601946,
  longitude: 69.32629804443681,
  zoom: 15,
  address: "Hospital Address Placeholder, Khost, Afghanistan",
};

interface ContactMapProps {
  eyebrow: string;
  title: string;
  description: string;
  iframeTitle: string;
}

export default function ContactMap({
  eyebrow,
  title,
  description,
  iframeTitle,
}: ContactMapProps) {
  const reduceMotion = useReducedMotion();

  const mapSrc = `https://www.google.com/maps?q=${hospitalLocation.latitude},${hospitalLocation.longitude}&z=${hospitalLocation.zoom}&output=embed`;

  return (
    <section className="bg-background">
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

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-8 overflow-hidden rounded-2xl border border-border-light"
        >
          <div className="relative aspect-[16/9] w-full">
            <iframe
              src={mapSrc}
              title={iframeTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </motion.div>

        <p className="mt-4 text-sm text-text-muted" dir="ltr">
          {hospitalLocation.address}
        </p>
      </div>
    </section>
  );
}