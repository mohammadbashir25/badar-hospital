import { getTranslations } from "next-intl/server";
import TestimonialsCarousel from "./TestimonialsCarousel";

interface TestimonialItem {
  quote: string;
  name: string;
  role?: string;
}

export default async function Testimonials() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as TestimonialItem[];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-background py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          {t("eyebrow")}
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
        </p>

        <h2
          id="testimonials-heading"
          className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl"
        >
          {t("title")}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {t("description")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:mt-16 lg:px-8">
        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}