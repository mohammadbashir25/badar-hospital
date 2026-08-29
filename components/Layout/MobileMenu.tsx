"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import Button from "../UI/Button";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  bookAppointmentLabel: string;
  bookAppointmentHref: string;
  menuLabel: string;
  closeLabel: string;
}

export default function MobileMenu({
  navItems,
  bookAppointmentLabel,
  bookAppointmentHref,
  menuLabel,
  closeLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const listVariants = {
    open: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
    closed: {},
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: reduceMotion ? 0 : 14 },
  };

  const barTransition = {
    duration: reduceMotion ? 0 : 0.25,
    ease: "easeInOut" as const,
  };

  const topBar = { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } };
  const middleBar = {
    closed: { opacity: 1, scale: 1 },
    open: { opacity: 0, scale: 0 },
  };
  const bottomBar = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? closeLabel : menuLabel}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-surface-soft"
      >
        <span className="flex flex-col items-center justify-center gap-1.5">
          <motion.span
            className="h-0.5 w-5 rounded-full bg-current"
            variants={topBar}
            animate={open ? "open" : "closed"}
            transition={barTransition}
          />
          <motion.span
            className="h-0.5 w-5 rounded-full bg-current"
            variants={middleBar}
            animate={open ? "open" : "closed"}
            transition={barTransition}
          />
          <motion.span
            className="h-0.5 w-5 rounded-full bg-current"
            variants={bottomBar}
            animate={open ? "open" : "closed"}
            transition={barTransition}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-label={menuLabel}
                className="fixed inset-0 z-50 flex h-dvh w-screen flex-col overflow-hidden bg-surface px-6 py-6"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="pointer-events-none absolute -top-24 end-[-4rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 start-[-3rem] h-64 w-64 rounded-full bg-navy/5 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <span className="flex items-center gap-2 text-base font-semibold text-navy">
                    <span className="relative flex h-2 w-2">
                      <motion.span
                        className="absolute inline-flex h-full w-full rounded-full bg-primary"
                        animate={
                          reduceMotion
                            ? undefined
                            : { scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    {menuLabel}
                  </span>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={closeLabel}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-surface-soft"
                  >
                    <span className="relative block h-4 w-4">
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                    </span>
                  </button>
                </div>

                <motion.nav
                  className="relative mt-4 flex flex-1 flex-col justify-center gap-1"
                  initial="closed"
                  animate="open"
                  variants={listVariants}
                >
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-1 py-3 text-2xl font-semibold tracking-tight transition-colors ${
                            isActive ? "text-navy" : "text-text-secondary"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full bg-primary transition-opacity ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                <div className="relative flex flex-col gap-4 pb-2 pt-4">
                  <LanguageSwitcher className="self-start" />

                  <motion.div
                    whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  >
                    <Button
                      href={bookAppointmentHref}
                      variant="primary"
                      className="w-full"
                    >
                      {bookAppointmentLabel}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}