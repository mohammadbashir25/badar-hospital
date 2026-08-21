"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import Button from "../UI/Button";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  bookAppointmentLabel: string;
  menuLabel: string;
  closeLabel: string;
}

export default function MobileMenu({
  navItems,
  bookAppointmentLabel,
  menuLabel,
  closeLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const listVariants = {
    open: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: 0.1 } },
    closed: {},
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: reduceMotion ? 0 : 12 },
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-surface-soft"
      >
        <LuMenu size={22} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-navy/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={menuLabel}
              className="ms-auto flex h-full w-full max-w-xs flex-col gap-6 bg-surface px-6 py-6 shadow-sm"
              initial={{ x: reduceMotion ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduceMotion ? 0 : "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between ">
                <span className="text-base font-semibold text-navy">{menuLabel}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={closeLabel}
                  className="flex h-10 w-10 items-start justify-center rounded-full text-navy transition-colors hover:bg-surface-soft "
                >
                  <LuX size={20} aria-hidden="true" />
                </button>
              </div>

              <motion.nav
                className="flex flex-col gap-1"
                initial="closed"
                animate="open"
                variants={listVariants}
              >
                {navItems.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-surface-soft"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="mt-auto flex flex-col gap-4">
                <LanguageSwitcher className="self-start" />
                <Button href="/appointment" variant="primary" className="w-full">
                  {bookAppointmentLabel}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
