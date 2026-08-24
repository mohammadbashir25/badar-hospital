"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface SpecialtyItem {
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
}

interface SpecialtyGridProps {
  items: SpecialtyItem[];
}

export default function SpecialtyGrid({ items }: SpecialtyGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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