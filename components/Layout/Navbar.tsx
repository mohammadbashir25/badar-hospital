"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "../UI/Container";
import Button from "../UI/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { WHATSAPP_APPOINTMENT_URL } from "@/lib/whatsapp";
import Logo from "../UI/Logo";

const SCROLL_THRESHOLD = 15;
const AUTO_HIDE_DELAY = 3000;
const TOP_OFFSET = 8;

export default function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
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
      setCompact(currentY > TOP_OFFSET);

      if (currentY <= TOP_OFFSET) {
        clearHideTimeout();
        setVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      const diff = currentY - lastScrollY.current;

      if (diff > SCROLL_THRESHOLD) {
        clearHideTimeout();
        setVisible(false);
        lastScrollY.current = currentY;
      } else if (diff < -SCROLL_THRESHOLD) {
        setVisible(true);
        scheduleAutoHide();
        lastScrollY.current = currentY;
      }
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
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out will-change-transform ${
          visible ? "translate-y-0" : "-translate-y-[calc(100%+1.5rem)]"
        }`}
      >
        <motion.header
          initial={reduceMotion ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`border border-border-light bg-surface/90 backdrop-blur-md transition-[margin,box-shadow,border-radius] duration-300 ease-out ${
            compact
              ? "mx-3 mt-3 rounded-full shadow-lg shadow-navy/5 lg:mx-6"
              : "mx-0 mt-0 rounded-none border-x-0 border-t-0 shadow-none"
          }`}
        >
          <Container
            className={`flex items-center justify-between transition-[height] duration-300 ease-out ${
              compact ? "h-14 lg:h-16" : "h-16 lg:h-18"
            }`}
          >
            <Link href="/" aria-label={t("home")} className="flex items-center">
              <div className="relative flex h-9 w-32 items-center justify-center rounded-lg text-xs font-medium uppercase tracking-wide text-text-muted">
                <Logo />
                <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-primary"
                    animate={
                      reduceMotion
                        ? undefined
                        : { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
              </div>
            </Link>

            <nav
              className="hidden items-center gap-1 lg:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const isHighlighted = hovered
                  ? hovered === item.href
                  : isActive;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-navy"
                        : "text-text-secondary hover:text-navy"
                    }`}
                  >
                    {isHighlighted && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-soft"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSwitcher />
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                <Button href={WHATSAPP_APPOINTMENT_URL} variant="primary">
                  {t("bookAppointment")}
                </Button>
              </motion.div>
            </div>

            <MobileMenu
              navItems={navItems}
              bookAppointmentLabel={t("bookAppointment")}
              bookAppointmentHref={WHATSAPP_APPOINTMENT_URL}
              menuLabel={tCommon("menu")}
              closeLabel={tCommon("close")}
            />
          </Container>
        </motion.header>
      </div>

      <div className="h-16 lg:h-18" aria-hidden="true" />
    </>
  );
}