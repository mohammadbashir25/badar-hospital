"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_APPOINTMENT_URL } from "@/lib/whatsapp";
import Button from "@/components/UI/Button";

interface FacilitiesCTAProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export default function FacilitiesCTA({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: FacilitiesCTAProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wide text-primary-light">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={WHATSAPP_APPOINTMENT_URL} variant="primary">
              {primaryCta}
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}