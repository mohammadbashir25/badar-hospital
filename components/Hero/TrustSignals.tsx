import { getTranslations } from "next-intl/server";
import { LuCheckCheck } from "react-icons/lu";
import Container from "../UI/Container";
import HeroMotion from "./HeroMotion";

// Reuses the existing `stats` namespace, which is already written as
// qualitative labels with no numbers attached — exactly what's appropriate
// here since the uploaded content provides no real statistics to display.
const SIGNAL_KEYS = ["patients", "doctors", "specialties", "support"] as const;

export default async function TrustSignals() {
  const t = await getTranslations("stats");

  return (
    <section className="bg-surface">
      <Container className="py-8 sm:py-10">
        <HeroMotion trigger="inView">
          <ul className="flex flex-col gap-4 border-y border-border-light py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4">
            {SIGNAL_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm font-medium text-navy sm:text-base">
                <LuCheckCheck size={18} className="shrink-0 text-primary-dark" aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
        </HeroMotion>
      </Container>
    </section>
  );
}
