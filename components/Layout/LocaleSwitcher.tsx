"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  fa: "دری",
  ps: "پښتو",
};

interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className = "" }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-1 rounded-full border border-border bg-surface p-1 ${className}`}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => router.replace({ pathname, params }, { locale: loc })}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
              active
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-surface-soft hover:text-navy"
            }`}
          >
            {LOCALE_LABELS[loc] ?? loc}
          </button>
        );
      })}
    </div>
  );
}
