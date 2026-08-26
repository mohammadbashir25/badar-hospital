import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import EmergencyContact from "./EmergencyContact";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage.hero");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <main>
      <ContactHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      <section className="bg-surface-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:px-8">
          <ContactInfo
            eyebrow={t("contactInfo.eyebrow")}
            title={t("contactInfo.title")}
            description={t("contactInfo.description")}
            labels={{
              phone: t("contactInfo.items.phone.label"),
              email: t("contactInfo.items.email.label"),
              address: t("contactInfo.items.address.label"),
              hours: t("contactInfo.items.hours.label"),
            }}
            values={{
              phone: t("contactInfo.items.phone.value"),
              email: t("contactInfo.items.email.value"),
              address: t("contactInfo.items.address.value"),
              hours: t("contactInfo.items.hours.value"),
            }}
          />

          <ContactForm
            labels={{
              eyebrow: t("form.eyebrow"),
              title: t("form.title"),
              description: t("form.description"),
              fields: {
                name: {
                  label: t("form.fields.name.label"),
                  placeholder: t("form.fields.name.placeholder"),
                },
                email: {
                  label: t("form.fields.email.label"),
                  placeholder: t("form.fields.email.placeholder"),
                },
                phone: {
                  label: t("form.fields.phone.label"),
                  placeholder: t("form.fields.phone.placeholder"),
                },
                subject: {
                  label: t("form.fields.subject.label"),
                  placeholder: t("form.fields.subject.placeholder"),
                },
                message: {
                  label: t("form.fields.message.label"),
                  placeholder: t("form.fields.message.placeholder"),
                },
              },
              submit: t("form.submit"),
              sending: t("form.sending"),
              successTitle: t("form.successTitle"),
              successMessage: t("form.successMessage"),
              errorTitle: t("form.errorTitle"),
              errorMessage: t("form.errorMessage"),
              errors: {
                nameRequired: t("form.errors.nameRequired"),
                emailRequired: t("form.errors.emailRequired"),
                emailInvalid: t("form.errors.emailInvalid"),
                subjectRequired: t("form.errors.subjectRequired"),
                messageRequired: t("form.errors.messageRequired"),
              },
            }}
          />
        </div>
      </section>

      <ContactMap
        eyebrow={t("map.eyebrow")}
        title={t("map.title")}
        description={t("map.description")}
        iframeTitle={t("map.iframeTitle")}
      />

      <EmergencyContact
        eyebrow={t("emergency.eyebrow")}
        title={t("emergency.title")}
        description={t("emergency.description")}
        cta={t("emergency.cta")}
      />
    </main>
  );
}
