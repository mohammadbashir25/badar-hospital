"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroMotionProps {
  children: ReactNode;
  delay?: number;
  trigger?: "mount" | "inView";
  className?: string;
}

export default function HeroMotion({
  children,
  delay = 0,
  trigger = "mount",
  className = "",
}: HeroMotionProps) {
  const reduceMotion = useReducedMotion();

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 16 };
  const visible = { opacity: 1, y: 0 };
  const transition = { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const };

  if (trigger === "inView") {
    return (
      <motion.div
        className={className}
        initial={hidden}
        whileInView={visible}
        viewport={{ once: true, margin: "-80px" }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={visible}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
