import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import DoctorsHero from "./DoctorsHero";
import DoctorsOverview from "./DoctorsOverview";
import DoctorsGrid from "./DoctorsGrid";
import DoctorsCTA from "./DoctorsCTA";
import type { Doctor } from "./DoctorCard";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("doctorsPage.hero");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DoctorsPage() {
  const t = await getTranslations("doctorsPage");

  // No real doctor data has been provided yet — using translated
  // placeholders. Replace this array with real doctor entries
  // (and real image paths) once that information is available.
  const placeholderName = t("doctorPlaceholder.name");
  const placeholderSpecialty = t("doctorPlaceholder.specialty");
  const placeholderQualification = t("doctorPlaceholder.qualification");
  const placeholderDescription = t("doctorPlaceholder.description");

  const doctors: Doctor[] = Array.from({ length: 4 }).map((_, index) => ({
    key: `doctor-${index + 1}`,
    name: placeholderName,
    specialty: placeholderSpecialty,
    qualification: placeholderQualification,
    description: placeholderDescription,
    image: `/images/doctors/doctor-0${index + 1}.jpg`,
  }));

  return (
    <main>
      <DoctorsHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageAlt={t("hero.imageAlt")}
      />

      <DoctorsOverview
        eyebrow={t("overview.eyebrow")}
        title={t("overview.title")}
        description={t("overview.description")}
      />

      <DoctorsGrid
        eyebrow={t("doctors.eyebrow")}
        title={t("doctors.title")}
        description={t("doctors.description")}
        doctors={doctors}
      />

      <DoctorsCTA
        variant="highlight"
        eyebrow={t("appointment.eyebrow")}
        title={t("appointment.title")}
        description={t("appointment.description")}
        primaryCta={t("appointment.primaryCta")}
      />

      <DoctorsCTA
        variant="final"
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryCta={t("cta.primaryCta")}
        secondaryCta={t("cta.secondaryCta")}
      />
    </main>
  );
}
