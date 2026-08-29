"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "../UI/Container";
import Button from "../UI/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { WHATSAPP_APPOINTMENT_URL } from "@/lib/whatsapp";
import Logo from "../UI/Logo";

// Pixel movement required before a scroll counts as a deliberate up/down
// gesture — filters out trackpad jitter and momentum micro-scrolls so the
// navbar doesn't flicker on tiny movements.
const SCROLL_THRESHOLD = 15;
// How long the navbar stays visible after appearing from an upward scroll,
// if the user stops scrolling (or resumes scrolling down) without reaching
// the very top of the page.
const AUTO_HIDE_DELAY = 3000;
// Within this many px of the top, the navbar is always visible and never
// auto-hides.
const TOP_OFFSET = 8;

export default function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function clearHideTimeout() {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    }

    function scheduleAutoHide() {
      clearHideTimeout();
      hideTimeoutRef.current = setTimeout(() => {
        setVisible(false);
        hideTimeoutRef.current = null;
      }, AUTO_HIDE_DELAY);
    }

    function handleScroll() {
      const currentY = window.scrollY;

      // Always visible at the very top, and never auto-hides from there.
      if (currentY <= TOP_OFFSET) {
        clearHideTimeout();
        setVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      const diff = currentY - lastScrollY.current;

      if (diff > SCROLL_THRESHOLD) {
        // Scrolled down past the threshold — hide immediately.
        clearHideTimeout();
        setVisible(false);
        lastScrollY.current = currentY;
      } else if (diff < -SCROLL_THRESHOLD) {
        // Scrolled up past the threshold — show, then auto-hide after a pause.
        setVisible(true);
        scheduleAutoHide();
        lastScrollY.current = currentY;
      }
      // Movement smaller than the threshold is ignored — lastScrollY is left
      // as-is so small back-and-forth jitter accumulates instead of
      // resetting (and flipping visibility) on every tick.
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearHideTimeout();
    };
  }, []);

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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-border-light bg-surface/90 backdrop-blur-sm transition-transform duration-300 ease-out will-change-transform ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Container className="flex h-16 items-center justify-between lg:h-18">
          <Link href="/" aria-label={t("home")} className="flex items-center">
            <div className="flex h-9 w-32 items-center justify-center rounded-lg   text-xs font-medium uppercase tracking-wide text-text-muted">
              <Logo />
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

      {/*
        Spacer preserving the header's height in normal document flow.
        The header is now `fixed` (required so hide/show can overlay the
        page instead of pushing content) — this keeps everything below it
        exactly where it was before that change.
      */}
      <div className="h-16 lg:h-18" aria-hidden="true" />
    </>
  );
}
