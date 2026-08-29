import { getTranslations } from "next-intl/server";
import DoctorsMotion from "./DoctorsMotion";

interface DoctorTranslation {
  id?: string;
  image: string;
  name: string;
  specialty: string;
  qualification: string;
}

export default async function Doctors() {
  const t = await getTranslations("doctors");

  const rawList = t.raw("list");
  const list = Array.isArray(rawList) ? (rawList as DoctorTranslation[]) : [];

  const doctors = list.map((doctor, index) => ({
    id: doctor.id ?? `doctor-${index + 1}`,
    imageSrc: doctor.image,
    name: doctor.name ?? t("placeholderName"),
    specialty: doctor.specialty ?? t("placeholderSpecialty"),
    qualification: doctor.qualification ?? t("placeholderQualification"),
  }));

  return (
    <DoctorsMotion
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      viewAllLabel={t("viewAll")}
      doctors={doctors}
    />
  );
}