import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import SpecialtiesHero from "./SpecialtiesHero";
import SpecialtiesOverview from "./SpecialtiesOverview";
import SpecialtySection from "./SpecialtiesSection";
import SpecialtyGrid from "./SpecialtyGrid";
import SpecialtiesCTA from "./SpecialtiesCTA";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("specialtiesPage.hero");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SpecialtiesPage() {
  const t = await getTranslations("specialtiesPage");

  return (
    <main>
      <SpecialtiesHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageAlt={t("hero.imageAlt")}
      />

      <SpecialtiesOverview
        eyebrow={t("overview.eyebrow")}
        title={t("overview.title")}
        description={t("overview.description")}
      />

      <SpecialtySection
        index={1}
        tone="accent"
        title={t("generalMedicine.title")}
        description={t("generalMedicine.description")}
        imageAlt={t("generalMedicine.imageAlt")}
        imageSrc="/specialties/generalMedicine.png"
      />

      <SpecialtySection
        index={2}
        reverse
        title={t("generalSurgery.title")}
        description={t("generalSurgery.description")}
        imageAlt={t("generalSurgery.imageAlt")}
        imageSrc="/specialties/surgery.png"
      />

      <SpecialtySection
        index={3}
        title={t("obstetricsGynecology.title")}
        description={t("obstetricsGynecology.description")}
        imageAlt={t("obstetricsGynecology.imageAlt")}
        imageSrc="/specialties/obstestrics.png"
      />

      <SpecialtyGrid
        items={[
          {
            title: t("neurosurgery.title"),
            description: t("neurosurgery.description"),
            imageAlt: t("neurosurgery.imageAlt"),
            imageSrc: "/specialties/neurology.png",
          },
          {
            title: t("ent.title"),
            description: t("ent.description"),
            imageAlt: t("ent.imageAlt"),
            imageSrc: "/specialties/ENT.png",
          },
          {
            title: t("dental.title"),
            description: t("dental.description"),
            imageAlt: t("dental.imageAlt"),
            imageSrc: "/specialties/dental.png",
          },
          {
            title: t("psychiatry.title"),
            description: t("psychiatry.description"),
            imageAlt: t("psychiatry.imageAlt"),
            imageSrc: "/specialties/psychology.png",
          },
          {
            title: t("pediatrics.title"),
            description: t("pediatrics.description"),
            imageAlt: t("pediatrics.imageAlt"),
            imageSrc: "/specialties/ped.png",
          },
        ]}
      />

      <SpecialtiesCTA
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryCta={t("cta.primaryCta")}
        secondaryCta={t("cta.secondaryCta")}
      />
    </main>
  );
}
