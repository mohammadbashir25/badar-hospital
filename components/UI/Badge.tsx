import { ReactNode } from "react";

type BadgeVariant = "primary" | "navy" | "emergency" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-surface-blue text-primary-dark",
  navy: "bg-navy/5 text-navy",
  emergency: "bg-red/10 text-red-dark",
  neutral: "bg-surface-soft text-text-secondary",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
