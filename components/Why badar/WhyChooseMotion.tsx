"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Small motion wrapper for the "Why Choose Badar" heading block.
 * Isolated as a client component so the parent section can stay a
 * Server Component.
 */
export function WhyChooseFadeUp({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? undefined : variants}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered reveal for the trust-point list. Accepts pre-rendered
 * (Server Component) children and wraps each one in a motion <li>
 * so the section's content can remain server-rendered.
 */
export function WhyChooseMotionGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.ul
      className={className}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? undefined : containerVariants}
    >
      {Children.map(children, (child) => (
        <motion.li
          className="list-none"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
