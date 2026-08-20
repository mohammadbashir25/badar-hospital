import { LucideIcon } from "lucide-react";

type IconBoxTone = "primary" | "navy" | "emergency";
type IconBoxSize = "sm" | "md" | "lg";

const toneStyles: Record<IconBoxTone, string> = {
  primary: "bg-surface-blue text-primary-dark",
  navy: "bg-navy text-white",
  emergency: "bg-red/10 text-red-dark",
};

const sizeStyles: Record<IconBoxSize, { box: string; icon: number }> = {
  sm: { box: "h-10 w-10 rounded-lg", icon: 18 },
  md: { box: "h-12 w-12 rounded-xl", icon: 22 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 26 },
};

interface IconBoxProps {
  icon: LucideIcon;
  tone?: IconBoxTone;
  size?: IconBoxSize;
  className?: string;
}

export default function IconBox({
  icon: Icon,
  tone = "primary",
  size = "md",
  className = "",
}: IconBoxProps) {
  const { box, icon } = sizeStyles[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center ${box} ${toneStyles[tone]} ${className}`}
    >
      <Icon size={icon} strokeWidth={2} aria-hidden="true" />
    </div>
  );
}
