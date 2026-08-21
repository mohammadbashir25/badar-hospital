import { getTranslations } from "next-intl/server";
import AboutMotion from "./AboutMotion";

export default async function About() {
  const t = await getTranslations("about");

  return (
    <AboutMotion
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      descriptionTwo={t("descriptionTwo")}
      imageAlt={t("imageAlt")}
      primaryCta={t("primaryCta")}
    />
  );
}
