import { getTranslations } from "next-intl/server";
import { LuShieldPlus, LuClock3 } from "react-icons/lu";
import Container from "../UI/Container";
import Button from "../UI/Button";
import Badge from "../UI/Badge";
import HeroMotion from "./HeroMotion";
import Image from "next/image";
import { WHATSAPP_APPOINTMENT_URL } from "@/lib/whatsapp";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -top-50 end-[-10%] h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-15 lg:grid-cols-2 lg:py-10">
        <HeroMotion className="flex flex-col items-start gap-6">
          <Badge variant="primary">{t("eyebrow")}</Badge>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
            {t("description")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={WHATSAPP_APPOINTMENT_URL} variant="primary">
              {t("primaryCta")}
            </Button>
            <Button href="/services" variant="outline">
              {t("secondaryCta")}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 rounded-full bg-red/10 px-4 py-2 text-sm font-semibold text-red-dark">
              <LuShieldPlus size={18} aria-hidden="true" />
              {t("emergency")}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <LuClock3
                size={18}
                className="text-primary-dark"
                aria-hidden="true"
              />
              {t("available")}
            </div>
          </div>
        </HeroMotion>

        <HeroMotion delay={0.15}>
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-border sm:h-[480px] lg:h-[560px]">
            <Image
              src="/hero.png"
              alt={t("title")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[70%_center]"
            />
          </div>
        </HeroMotion>
      </Container>
    </section>
  );
}