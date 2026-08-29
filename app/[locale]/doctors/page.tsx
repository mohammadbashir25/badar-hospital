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

interface ChiefTranslation {
  badge: string;
  name: string;
  specialty: string;
  qualification: string;
  description: string;
  image: string;
}

interface DoctorTranslation {
  name: string;
  specialty: string;
  qualification: string;
  description: string;
  image: string;
}

export default async function DoctorsPage() {
  const t = await getTranslations("doctorsPage");

  const rawChief = t.raw("chief");
  const rawList = t.raw("list");

  if (!Array.isArray(rawList)) {
    // Helps pinpoint the exact problem in your terminal instead of the
    // page crashing silently — check the dev server console for this.
    console.error(
      "doctorsPage.list is not an array. Received:",
      rawList,
      "— check that messages/{locale}.json has doctorsPage.list as an array.",
    );
  }

  const chiefData = (rawChief ?? {}) as Partial<ChiefTranslation>;
  const listData = (
    Array.isArray(rawList) ? rawList : []
  ) as DoctorTranslation[];

  const chief: Doctor & { badge: string } = {
    key: "doctor-chief",
    name: chiefData.name ?? "",
    specialty: chiefData.specialty ?? "",
    qualification: chiefData.qualification ?? "",
    description: chiefData.description ?? "",
    image: chiefData.image ?? "/doctors/5.jpg",
    badge: chiefData.badge ?? "",
  };

  const doctors: Doctor[] = listData.map((doctor, index) => ({
    key: `doctor-${index + 1}`,
    name: doctor.name,
    specialty: doctor.specialty,
    qualification: doctor.qualification,
    description: doctor.description,
    image: doctor.image,
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
        chief={chief}
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