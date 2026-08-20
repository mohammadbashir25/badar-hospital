import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "../UI/Container";
import Button from "../UI/Button";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const t = await getTranslations("nav");

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
        <Link href="/" className="flex items-center gap-2 text-base font-bold text-navy sm:text-lg">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            B
          </span>
          <span className="hidden sm:inline">Badar Medical Hospital</span>
          <span className="sm:hidden">Badar</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("mainNavigation")}>
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
          <LocaleSwitcher />
          <Button href="/appointment" variant="primary">
            {t("bookAppointment")}
          </Button>
        </div>

        <MobileMenu
          navItems={navItems}
          bookAppointmentLabel={t("bookAppointment")}
          menuLabel={t("openMenu")}
          closeLabel={t("closeMenu")}
        />
      </Container>
    </header>
  );
}
