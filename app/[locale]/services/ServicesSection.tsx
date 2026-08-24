"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface ServiceSectionProps {
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  reverse?: boolean;
  index: number;
  tone?: "default" | "accent";
}

export default function ServiceSection({
  title,
  description,
  imageAlt,
  imageSrc,
  reverse = false,
  index,
  tone = "default",
}: ServiceSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={tone === "accent" ? "bg-surface-blue" : "bg-surface-soft"}>
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:px-8 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-light bg-surface"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-start"
        >
          <span className="text-sm font-semibold text-primary">
            0{index}
          </span>
          <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}