"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type AboutMotionProps = {
  eyebrow: string;
  title: string;
  description: string;
  descriptionTwo: string;
  imageAlt: string;
  primaryCta: string;
};

export default function AboutMotion({
  eyebrow,
  title,
  description,
  descriptionTwo,
  imageAlt,
  primaryCta,
}: AboutMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ps";

  const fadeSlide = (direction: "start" | "end" | "up" = "up"): Variants => {
    if (shouldReduceMotion) {
      return { hidden: { opacity: 1 }, show: { opacity: 1 } };
    }

    let offset: { x?: number; y?: number };
    if (direction === "up") {
      offset = { y: 24 };
    } else {
      // "start"/"end" are logical directions; flip the physical x offset for RTL locales
      // so elements still visually enter from their correct inline-start/inline-end side.
      let x = direction === "start" ? -24 : 24;
      if (isRtl) x = -x;
      offset = { x };
    }

    return {
      hidden: { opacity: 0, ...offset },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
    };
  };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:px-12">
        {/* Image */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlide("start")}
          className="relative lg:order-1 lg:col-span-5 rtl:lg:order-2"
        >
          {/* Offset frame — signature accent, sits behind the photograph */}
          <div
            aria-hidden
            className="absolute -bottom-4 -start-4 hidden h-full w-full rounded-2xl border border-primary/30 sm:block"
          />

          <div className="relative aspect-6/5 w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="/about.png"
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Minimal cross mark — a quiet nod to the clinical setting */}
          <div
            aria-hidden
            className="absolute -top-3 -end-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface shadow-sm sm:h-10 sm:w-10"
          >
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-primary" />
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-primary" />
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="lg:order-2 lg:col-span-7 text-left rtl:text-right"
        >
          <motion.span
            variants={fadeSlide("end")}
            className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-dark"
          >
            <span className="h-px w-8 bg-primary-dark/50" aria-hidden />
            {eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeSlide("end")}
            className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeSlide("end")}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {description}
          </motion.p>

          <motion.p
            variants={fadeSlide("end")}
            className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {descriptionTwo}
          </motion.p>

          <motion.div variants={fadeSlide("end")} className="mt-10">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary-dark"
            >
              <span className="border-b border-navy pb-0.5 transition-colors group-hover:border-primary-dark">
                {primaryCta}
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
