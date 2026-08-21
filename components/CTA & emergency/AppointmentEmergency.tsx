import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CTAFadeUp } from "./CTAMotion";

interface EmergencyContact {
  label: string;
  phone: string;
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

function EmergencyCrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M12 3.5v17M3.5 12h17" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M5.5 4h3.2l1.3 4.2-2 1.6a11.5 11.5 0 0 0 5.2 5.2l1.6-2 4.2 1.3v3.2c0 1-.8 1.8-1.8 1.7-5.9-.5-10.6-5.2-11.1-11.1C5.4 6.8 5.4 4.9 5.5 4z" />
    </svg>
  );
}

export default async function AppointmentEmergency() {
  const t = await getTranslations("cta");
  const emergencyContacts = t.raw("emergency.contacts") as EmergencyContact[];
  const primaryContact = emergencyContacts?.[0];

  return (
    <section
      aria-labelledby="appointment-cta-heading"
      className="bg-background py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border-light lg:grid-cols-2">
          {/* Appointment — calm, primary focus */}
          <CTAFadeUp>
            <div className="flex h-full flex-col justify-center bg-surface-blue p-8 text-start sm:p-12">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <CalendarIcon />
              </span>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
                {t("eyebrow")}
              </p>
              <h2
                id="appointment-cta-heading"
                className="mt-3 text-2xl font-bold leading-tight text-navy sm:text-3xl"
              >
                {t("title")}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
                {t("description")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 ease-out hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors duration-300 ease-out hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>
          </CTAFadeUp>

          {/* Emergency — urgent, secondary block */}
          <CTAFadeUp delay={0.1}>
            <div className="flex h-full flex-col justify-center border-t border-red-dark/10 bg-red p-8 text-start lg:border-s lg:border-t-0 sm:p-12">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-white"
              >
                <EmergencyCrossIcon />
              </span>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/80">
                {t("emergency.eyebrow")}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                {t("emergency.title")}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
                {t("emergency.description")}
              </p>

              {primaryContact && (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${primaryContact.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-red-dark transition-colors duration-300 ease-out hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <PhoneIcon />
                    {t("emergency.ctaLabel")}
                  </a>
                  <a
                    href={`tel:${primaryContact.phone}`}
                    className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-white"
                  >
                    {primaryContact.label}: {primaryContact.phone}
                  </a>
                </div>
              )}

              {emergencyContacts && emergencyContacts.length > 1 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {emergencyContacts.slice(1).map((contact) => (
                    <li key={contact.phone}>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sm text-white/80 underline decoration-white/30 underline-offset-4 transition-colors duration-300 ease-out hover:text-white"
                      >
                        {contact.label}: {contact.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CTAFadeUp>
        </div>
      </div>
    </section>
  );
}
