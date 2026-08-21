import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";
import WhyChooseItem from "./WhyChooseItem";
import { WhyChooseFadeUp, WhyChooseMotionGrid } from "./WhyChooseMotion";

type ReasonKey =
  | "trustedCare"
  | "compassionateTeam"
  | "modernFacilities"
  | "comprehensiveCare";

/* Small, purpose-built line icons — no icon library dependency. */

function ShieldCheckIcon(): ReactElement {
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
      <path d="M12 3.5l6.5 2.4v5.2c0 4.2-2.7 7.6-6.5 9.4-3.8-1.8-6.5-5.2-6.5-9.4V5.9L12 3.5z" />
      <path d="M9.25 12l1.85 1.85 3.65-3.85" />
    </svg>
  );
}

function HeartHandIcon(): ReactElement {
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

function ModernBuildingIcon(): ReactElement {
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

function SpecialtiesIcon(): ReactElement {
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
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

const REASONS: { key: ReasonKey; icon: ReactElement }[] = [
  { key: "trustedCare", icon: <ShieldCheckIcon /> },
  { key: "compassionateTeam", icon: <HeartHandIcon /> },
  { key: "modernFacilities", icon: <ModernBuildingIcon /> },
  { key: "comprehensiveCare", icon: <SpecialtiesIcon /> },
];

export default async function WhyChooseBadar() {
  const t = await getTranslations("whyChooseBadar");

  return (
    <section
      aria-labelledby="why-choose-badar-heading"
      className="bg-background py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Focal point: eyebrow, heading, description */}
          <div className="lg:col-span-5">
            <WhyChooseFadeUp>
              <div className="max-w-xl text-start">
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-primary"
                  />
                  {t("eyebrow")}
                </p>

                <h2
                  id="why-choose-badar-heading"
                  className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl"
                >
                  {t("title")}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                  {t("description")}
                </p>
              </div>
            </WhyChooseFadeUp>
          </div>

          {/* Trust points */}
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <WhyChooseMotionGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {REASONS.map(({ key, icon }) => (
                <WhyChooseItem
                  key={key}
                  icon={icon}
                  title={t(`reasons.${key}.title`)}
                  description={t(`reasons.${key}.description`)}
                />
              ))}
            </WhyChooseMotionGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
