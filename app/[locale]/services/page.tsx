import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import ServicesHero from "./ServicesHero";
import ServicesOverview from "./ServicesOverview";
import ServiceSection from "./ServicesSection";
import DiagnosticServices from "./DiagnosticServices";
import ServicesCTA from "./ServicesCTA";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage.hero");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");

  return (
    <main>
      <ServicesHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageAlt={t("hero.imageAlt")}
      />

      <ServicesOverview
        eyebrow={t("overview.eyebrow")}
        title={t("overview.title")}
        description={t("overview.description")}
      />

      <ServiceSection
        index={1}
        tone="accent"
        title={t("emergency.title")}
        description={t("emergency.description")}
        imageAlt={t("emergency.imageAlt")}
        imageSrc="/images/services/emergency.jpg"
      />

      <ServiceSection
        index={2}
        reverse
        title={t("outpatient.title")}
        description={t("outpatient.description")}
        imageAlt={t("outpatient.imageAlt")}
        imageSrc="/images/services/outpatient.jpg"
      />

      <ServiceSection
        index={3}
        title={t("pharmacy.title")}
        description={t("pharmacy.description")}
        imageAlt={t("pharmacy.imageAlt")}
        imageSrc="/images/services/pharmacy.jpg"
      />

      <DiagnosticServices
        eyebrow={t("diagnostics.title")}
        title={t("diagnostics.title")}
        description={t("diagnostics.description")}
        items={[
          {
            title: t("ctScan.title"),
            description: t("ctScan.description"),
            imageAlt: t("ctScan.imageAlt"),
            imageSrc: "/images/services/ct-scan.jpg",
          },
          {
            title: t("xray.title"),
            description: t("xray.description"),
            imageAlt: t("xray.imageAlt"),
            imageSrc: "/images/services/xray.jpg",
          },
          {
            title: t("ultrasound.title"),
            description: t("ultrasound.description"),
            imageAlt: t("ultrasound.imageAlt"),
            imageSrc: "/images/services/ultrasound.jpg",
          },
        ]}
      />

      <ServicesCTA
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryCta={t("cta.primaryCta")}
        secondaryCta={t("cta.secondaryCta")}
      />
    </main>
  );
}
