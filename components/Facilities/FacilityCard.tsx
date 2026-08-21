import type { ReactElement } from "react";
import { FacilityImage } from "./FacilitiesMotion";

interface FacilityCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  icon: ReactElement;
  /** When true, the image sits on the opposite side on large screens. */
  reverse?: boolean;
}

export default function FacilityCard({
  image,
  alt,
  title,
  description,
  icon,
  reverse = false,
}: FacilityCardProps) {
  return (
    <div className="group grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border-light bg-surface-blue sm:aspect-[16/10] ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <FacilityImage src={image} alt={alt} />
      </div>

      <div
        className={`text-start ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-blue text-primary"
        >
          {icon}
        </span>

        <h3 className="mt-5 text-xl font-semibold text-navy sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
}
