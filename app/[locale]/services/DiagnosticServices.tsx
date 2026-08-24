"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface DiagnosticItem {
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
}

interface DiagnosticServicesProps {
  eyebrow: string;
  title: string;
  description: string;
  items: DiagnosticItem[];
}

export default function DiagnosticServices({
  eyebrow,
  title,
  description,
  items,
}: DiagnosticServicesProps) {
  const reduceMotion = useReducedMotion();

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
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-border-light bg-surface"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-start">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}