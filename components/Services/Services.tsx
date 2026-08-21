import { getTranslations } from "next-intl/server";
import ServicesMotion from "./ServicesMotion";

export default async function Services() {
  const t = await getTranslations("services");

const services = [
  {
    key: "emergency",
    title: t("emergency.title"),
    description: t("emergency.description"),
  },
  {
    key: "outpatient",
    title: t("outpatient.title"),
    description: t("outpatient.description"),
  },
  {
    key: "diagnostics",
    title: t("diagnostics.title"),
    description: t("diagnostics.description"),
  },
  {
    key: "pharmacy",
    title: t("pharmacy.title"),
    description: t("pharmacy.description"),
  },
  {
    key: "ctScan",
    title: t("ctScan.title"),
    description: t("ctScan.description"),
  },
  {
    key: "ultrasound",
    title: t("ultrasound.title"),
    description: t("ultrasound.description"),
  },
];

  return (
    <ServicesMotion
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      viewAllLabel={t("viewAll")}
      services={services}
    />
  );
}
