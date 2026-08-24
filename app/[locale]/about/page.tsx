import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import MissionVision from "./MissionVision";
import CoreValues from "./CoreValues";
import PatientCare from "./PatientCare";
import WhyBadar from "./WhyBadar";
import AboutCTA from "./AboutCTA";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage.hero");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  return (
    <main>
      <AboutHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageAlt={t("hero.imageAlt")}
      />

      <AboutStory
        eyebrow={t("story.eyebrow")}
        title={t("story.title")}
        description={t("story.description")}
        descriptionTwo={t("story.descriptionTwo")}
        imageAlt={t("story.imageAlt")}
      />

      <MissionVision
        mission={{
          eyebrow: t("mission.eyebrow"),
          title: t("mission.title"),
          description: t("mission.description"),
        }}
        vision={{
          eyebrow: t("vision.eyebrow"),
          title: t("vision.title"),
          description: t("vision.description"),
        }}
      />

      <CoreValues
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        description={t("values.description")}
        items={{
          respect: {
            title: t("values.items.respect.title"),
            description: t("values.items.respect.description"),
          },
          compassion: {
            title: t("values.items.compassion.title"),
            description: t("values.items.compassion.description"),
          },
          integrity: {
            title: t("values.items.integrity.title"),
            description: t("values.items.integrity.description"),
          },
          excellence: {
            title: t("values.items.excellence.title"),
            description: t("values.items.excellence.description"),
          },
        }}
      />

      <PatientCare
        eyebrow={t("care.eyebrow")}
        title={t("care.title")}
        description={t("care.description")}
        points={{
          patientFirst: {
            title: t("care.points.patientFirst.title"),
            description: t("care.points.patientFirst.description"),
          },
          professional: {
            title: t("care.points.professional.title"),
            description: t("care.points.professional.description"),
          },
          comfort: {
            title: t("care.points.comfort.title"),
            description: t("care.points.comfort.description"),
          },
        }}
      />

      <WhyBadar
        eyebrow={t("whyBadar.eyebrow")}
        title={t("whyBadar.title")}
        description={t("whyBadar.description")}
        items={{
          experiencedCare: {
            title: t("whyBadar.items.experiencedCare.title"),
            description: t("whyBadar.items.experiencedCare.description"),
          },
          modernSupport: {
            title: t("whyBadar.items.modernSupport.title"),
            description: t("whyBadar.items.modernSupport.description"),
          },
          patientRespect: {
            title: t("whyBadar.items.patientRespect.title"),
            description: t("whyBadar.items.patientRespect.description"),
          },
          accessibleCare: {
            title: t("whyBadar.items.accessibleCare.title"),
            description: t("whyBadar.items.accessibleCare.description"),
          },
        }}
      />

      <AboutCTA
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryCta={t("cta.primaryCta")}
        secondaryCta={t("cta.secondaryCta")}
      />
    </main>
  );
}
