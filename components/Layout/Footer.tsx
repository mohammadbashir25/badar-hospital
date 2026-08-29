import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "../UI/Logo";

interface EmergencyContact {
  label: string;
  phone: string;
}

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");
  const tAbout = await getTranslations("about");

  const emergencyContacts = tCta.raw("emergency.contacts") as EmergencyContact[];
  const primaryEmergencyContact = emergencyContacts?.[0];

  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: tNav("home") },
    { href: "/about", label: tNav("about") },
    { href: "/services", label: tNav("services") },
    { href: "/specialties", label: tNav("specialties") },
    { href: "/doctors", label: tNav("doctors") },
    { href: "/facilities", label: tNav("facilities") },
    { href: "/contact", label: tNav("contact") },
  ];

  const healthcareLinks = [
    { href: "/specialties", label: tNav("specialties") },
    { href: "/services", label: tNav("services") },
    { href: "/doctors", label: tNav("doctors") },
    { href: "/facilities", label: tNav("facilities") },
  ];

  return (
    <footer className="border-t border-navy-light/20 bg-navy text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo placeholder — replace with next/image logo component */}
            <div
              aria-hidden="true"
              className="flex h-12 w-40 items-center justify-center rounded-lg  text-xs font-medium uppercase tracking-wider text-white/40"
            >
              <Logo variant="white" />
            </div>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-quick-links-heading">
            <h2
              id="footer-quick-links-heading"
              className="text-sm font-semibold uppercase tracking-wider text-white"
            >
              {t("quickLinks")}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Healthcare */}
          <nav aria-labelledby="footer-healthcare-heading">
            <h2
              id="footer-healthcare-heading"
              className="text-sm font-semibold uppercase tracking-wider text-white"
            >
              {t("services")}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {healthcareLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <nav aria-labelledby="footer-contact-heading">
            <h2
              id="footer-contact-heading"
              className="text-sm font-semibold uppercase tracking-wider text-white"
            >
              {t("contact")}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
                >
                  {tNav("contact")}
                </Link>
              </li>
              {primaryEmergencyContact && (
                <li>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    {t("emergency")}
                  </p>
                  <a
                    href={`tel:${primaryEmergencyContact.phone}`}
                    className="mt-1 inline-block text-sm font-semibold text-white transition-colors duration-300 ease-out hover:text-red-light"
                  >
                    {primaryEmergencyContact.label}:{" "}
                    {primaryEmergencyContact.phone}
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-start sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {year} {tAbout("imageAlt")}. {t("allRightsReserved")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-xs text-white/45 transition-colors duration-300 ease-out hover:text-white"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-xs text-white/45 transition-colors duration-300 ease-out hover:text-white"
              >
                {t("terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
