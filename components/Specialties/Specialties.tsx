import { getTranslations } from "next-intl/server";
import SpecialtiesMotion from "./SpecialtiesMotion";

export default async function Specialties() {
  const t = await getTranslations("specialties");

  const specialties = [
    {
      key: "generalMedicine",
      title: t("generalMedicine.title"),
      description: t("generalMedicine.description"),
    },
    {
      key: "generalSurgery",
      title: t("generalSurgery.title"),
      description: t("generalSurgery.description"),
    },
    {
      key: "neurosurgery",
      title: t("neurosurgery.title"),
      description: t("neurosurgery.description"),
    },
    {
      key: "ent",
      title: t("ent.title"),
      description: t("ent.description"),
    },
    {
      key: "gynecologyObstetrics",
      title: t("gynecologyObstetrics.title"),
      description: t("gynecologyObstetrics.description"),
    },
    {
      key: "dental",
      title: t("dental.title"),
      description: t("dental.description"),
    },
    {
      key: "psychiatry",
      title: t("psychiatry.title"),
      description: t("psychiatry.description"),
    },
    {
      key: "pediatrics",
      title: t("pediatrics.title"),
      description: t("pediatrics.description"),
    },
  ];

  return (
    <SpecialtiesMotion
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      viewAllLabel={t("viewAll")}
      specialties={specialties}
    />
  );
}
