"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { LuChevronDown } from "react-icons/lu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Language autonyms are locale metadata, not page copy, so each locale's
// own name is shown regardless of the active locale (a standard i18n pattern).
const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  fa: "دری",
  ps: "پښتو",
};

const LOCALE_SHORT: Record<string, string> = {
  en: "EN",
  fa: "دری",
  ps: "پښتو",
};

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectLocale(nextLocale: string) {
    setOpen(false);
    router.replace({ pathname, query: params }, { locale: nextLocale });
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/*
        No translation key exists yet for this control's accessible name
        (e.g. "Language" / "Select language"). Using a plain screen-reader-only
        label as a placeholder — replace with a real key once added to
        messages/en.json, fa.json, and ps.json.
      */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label="Language"
        className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-navy transition-colors duration-200 hover:border-primary"
      >
        {LOCALE_SHORT[locale] ?? locale.toUpperCase()}
        <LuChevronDown size={14} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label="Language"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            className="absolute end-0 top-full z-50 mt-2 min-w-32 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg"
          >
            {routing.locales.map((loc) => {
              const active = loc === locale;
              return (
                <li key={loc} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => selectLocale(loc)}
                    className={`block w-full px-4 py-2 text-start text-sm transition-colors duration-200 ${
                      active
                        ? "bg-surface-blue font-semibold text-primary-dark"
                        : "text-text-secondary hover:bg-surface-soft hover:text-navy"
                    }`}
                  >
                    {LOCALE_NAMES[loc] ?? loc}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
