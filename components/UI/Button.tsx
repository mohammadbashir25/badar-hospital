import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "emergency" | "outline";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary-dark",
  secondary:
    "bg-navy text-white hover:bg-navy-light focus-visible:outline-navy",
  emergency:
    "bg-red text-white hover:bg-red-dark focus-visible:outline-red-dark",
  outline:
    "border border-border bg-transparent text-navy hover:bg-surface-soft focus-visible:outline-primary",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

interface CommonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
