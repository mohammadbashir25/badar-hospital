interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-start";
  const titleColor = tone === "dark" ? "text-white" : "text-navy";
  const descColor = tone === "dark" ? "text-white/70" : "text-text-secondary";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-wide text-primary-dark">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
