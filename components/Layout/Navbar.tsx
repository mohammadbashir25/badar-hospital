import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "../UI/Container";
import Button from "../UI/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { WHATSAPP_APPOINTMENT_URL } from "@/lib/whatsapp";

export default async function Navbar() {
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/specialties", label: t("specialties") },
    { href: "/doctors", label: t("doctors") },
    { href: "/facilities", label: t("facilities") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border-light bg-surface/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between lg:h-18">
        <Link href="/" aria-label={t("home")} className="flex items-center">
          <div className="flex h-9 w-32 items-center justify-center rounded-lg border border-dashed border-border text-xs font-medium uppercase tracking-wide text-text-muted">
            Logo
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-surface-soft hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button href={WHATSAPP_APPOINTMENT_URL} variant="primary">
            {t("bookAppointment")}
          </Button>
        </div>

        <MobileMenu
          navItems={navItems}
          bookAppointmentLabel={t("bookAppointment")}
          bookAppointmentHref={WHATSAPP_APPOINTMENT_URL}
          menuLabel={tCommon("menu")}
          closeLabel={tCommon("close")}
        />
      </Container>
    </header>
  );
}