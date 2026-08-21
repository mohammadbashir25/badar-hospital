import type { ReactNode } from "react";

interface WhyChooseItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

/**
 * Single trust-point card. Presentational only — no client-side
 * logic — so it can be rendered from a Server Component and simply
 * be passed as a child into the animated grid wrapper.
 */
export default function WhyChooseItem({
  icon,
  title,
  description,
}: WhyChooseItemProps) {
  return (
    <div className="group h-full rounded-xl border border-border-light bg-surface p-6 transition-colors duration-300 ease-out hover:border-primary/40 hover:bg-surface-blue sm:p-7">
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-blue text-primary transition-colors duration-300 ease-out group-hover:bg-primary group-hover:text-white"
      >
        {icon}
      </span>

      <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}
