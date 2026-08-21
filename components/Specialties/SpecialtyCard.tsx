import type { ReactNode } from "react";

type SpecialtyCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function SpecialtyCard({ icon, title, description }: SpecialtyCardProps) {
  return (
    <div className="group h-full rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-blue text-primary-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
