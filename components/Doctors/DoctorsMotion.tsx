"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import DoctorCard from "./DoctorCard";

type FeaturedDoctorDisplay = {
  id: string;
  imageSrc: string;
  name: string;
  specialty: string;
  qualification: string;
};

type DoctorsMotionProps = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllLabel: string;
  doctors: FeaturedDoctorDisplay[];
};

export default function DoctorsMotion({
  eyebrow,
  title,
  description,
  viewAllLabel,
  doctors,
}: DoctorsMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      aria-labelledby="doctors-heading"
      className="bg-background py-20 sm:py-24 lg:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 text-start sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-dark">
              <span className="h-px w-8 bg-primary-dark/50" aria-hidden />
              {eyebrow}
            </span>

            <h2
              id="doctors-heading"
              className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              {title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              {description}
            </p>
          </div>

          <Link
            href="/doctors"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary-dark"
          >
            <span className="border-b border-navy pb-0.5 transition-colors group-hover:border-primary-dark">
              {viewAllLabel}
            </span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* Featured doctors grid */}
        <motion.ul
          variants={stagger}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {doctors.map((doctor) => (
            <motion.li
              key={doctor.id}
              variants={cardItem}
              className="list-none"
            >
              <DoctorCard
                name={doctor.name}
                specialty={doctor.specialty}
                qualification={doctor.qualification}
                imageSrc={doctor.imageSrc}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}