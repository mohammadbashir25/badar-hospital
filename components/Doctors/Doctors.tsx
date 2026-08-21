import { getTranslations } from "next-intl/server";
import DoctorsMotion from "./DoctorsMotion";
import { featuredDoctors } from "./doctors.data";

export default async function Doctors() {
  const t = await getTranslations("doctors");

  return (
    <DoctorsMotion
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      viewAllLabel={t("viewAll")}
      placeholderName={t("placeholderName")}
      placeholderSpecialty={t("placeholderSpecialty")}
      placeholderQualification={t("placeholderQualification")}
      doctors={featuredDoctors}
    />
  );
}
