import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";
import FacilityCard from "./FacilityCard";
import { FacilitiesFadeUp, FacilitiesRevealList } from "./FacilitiesMotion";

type FacilityKey = "modern" | "diagnostic" | "patientCare";

/* Small, purpose-built line icons — no icon library dependency. */

function ModernIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M4 20.5V7.5L12 3.5l8 4v13" />
      <path d="M4 20.5h16" />
      <path d="M9 20.5v-5h6v5" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
    </svg>
  );
}

function DiagnosticIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M5 3.5v6.5a5 5 0 0 0 10 0V3.5" />
      <path d="M7 3.5h6" />
      <path d="M10 15v3" />
      <circle cx="10" cy="20" r="1.25" />
      <circle cx="18.5" cy="8.5" r="2.5" />
    </svg>
  );
}

function PatientCareIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 20s-6.5-4.03-9-8.06C1.4 8.9 2.9 6 5.7 6c1.6 0 2.9.9 3.6 2.1L12 6.9l2.7 1.2c.7-1.2 2-2.1 3.6-2.1 2.8 0 4.3 2.9 2.7 5.94C18.5 15.97 12 20 12 20z" />
    </svg>
  );
}

const FACILITIES: { key: FacilityKey; image: string; icon: ReactElement }[] = [
  {
    key: "modern",
    image: "/services/modren.png",
    icon: <ModernIcon />,
  },
  {
    key: "diagnostic",
    image: "/services/diagnostic.png",
    icon: <DiagnosticIcon />,
  },
  {
    key: "patientCare",
    image: "/services/patientCare.png",
    icon: <PatientCareIcon />,
  },
];

export default async function Facilities() {
  const t = await getTranslations("facilities");

  return (
    <section
      aria-labelledby="facilities-heading"
      className="bg-surface-soft py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FacilitiesFadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              {t("eyebrow")}
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
            </p>

            <h2
              id="facilities-heading"
              className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl"
            >
              {t("title")}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              {t("description")}
            </p>
          </div>
        </FacilitiesFadeUp>

        <FacilitiesRevealList className="mt-14 flex flex-col gap-14 sm:mt-16 sm:gap-16 lg:mt-20 lg:gap-20">
          {FACILITIES.map(({ key, image, icon }, index) => (
            <FacilityCard
              key={key}
              image={image}
              alt={t(`${key}.title`)}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              icon={icon}
              reverse={index % 2 === 1}
            />
          ))}
        </FacilitiesRevealList>

        <div className="mt-14 text-center sm:mt-16 lg:mt-20">
          <Link
            href="/facilities"
            className="inline-flex items-center justify-center rounded-lg border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors duration-300 ease-out hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
