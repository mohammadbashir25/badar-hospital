import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import FacilitiesHero from "./FacilitiesHero";
import FacilitiesOverview from "./FacilitiesOverview";
import FacilitySection from "./FacilitySection";
import FacilitiesCTA from "./FacilitiesCTA";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("facilitiesPage.hero");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FacilitiesPage() {
  const t = await getTranslations("facilitiesPage");

  return (
    <main>
      <FacilitiesHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageAlt={t("hero.imageAlt")}
      />

      <FacilitiesOverview
        eyebrow={t("overview.eyebrow")}
        title={t("overview.title")}
        description={t("overview.description")}
      />

      <FacilitySection
        index={1}
        tone="accent"
        title={t("emergency.title")}
        description={t("emergency.description")}
        imageAlt={t("emergency.imageAlt")}
        imageSrc="/images/facilities/emergency.jpg"
      />

      <FacilitySection
        index={2}
        reverse
        title={t("diagnostic.title")}
        description={t("diagnostic.description")}
        imageAlt={t("diagnostic.imageAlt")}
        imageSrc="/images/facilities/diagnostics.jpg"
      />

      <FacilitySection
        index={3}
        title={t("patientCare.title")}
        description={t("patientCare.description")}
        imageAlt={t("patientCare.imageAlt")}
        imageSrc="/images/facilities/patient-care.jpg"
      />

      <FacilitySection
        index={4}
        reverse
        tone="accent"
        title={t("environment.title")}
        description={t("environment.description")}
        imageAlt={t("environment.imageAlt")}
        imageSrc="/images/facilities/environment.jpg"
      />

      <FacilitySection
        index={5}
        title={t("accessibility.title")}
        description={t("accessibility.description")}
        imageAlt={t("accessibility.imageAlt")}
        imageSrc="/images/facilities/facility-01.jpg"
      />

      <FacilitiesCTA
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryCta={t("cta.primaryCta")}
        secondaryCta={t("cta.secondaryCta")}
      />
    </main>
  );
}
