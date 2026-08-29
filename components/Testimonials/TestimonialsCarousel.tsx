"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const AUTOPLAY_DELAY_MS = 2800;

interface TestimonialItem {
  quote: string;
  name: string;
  role?: string;
}

function PersonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "start" | "end" }) {
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
      {direction === "start" ? (
        <path d="M14.5 5.5 8 12l6.5 6.5" />
      ) : (
        <path d="M9.5 5.5 16 12l-6.5 6.5" />
      )}
    </svg>
  );
}

function PlayPauseIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      {isPlaying ? (
        <>
          <path d="M9 6v12" />
          <path d="M15 6v12" />
        </>
      ) : (
        <path d="M8 5.5v13l11-6.5-11-6.5z" />
      )}
    </svg>
  );
}

function TestimonialAvatar() {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-light bg-surface-blue text-primary">
      <PersonIcon />
    </div>
  );
}

export default function TestimonialsCarousel({
  items,
}: {
  items: TestimonialItem[];
}) {
  const t = useTranslations("testimonials");
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedByInteraction, setIsPausedByInteraction] = useState(false);

  const canAutoplay = !shouldReduceMotion && items.length > 1;
  const isAutoplaying = canAutoplay && isPlaying && !isPausedByInteraction;

  const goTo = (next: number) => {
    setIndex(((next % items.length) + items.length) % items.length);
  };

  useEffect(() => {
    if (!isAutoplaying) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_DELAY_MS);

    return () => clearInterval(id);
  }, [isAutoplaying, items.length, index]);

  const current = items[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("title")}
      className="relative"
      onMouseEnter={() => setIsPausedByInteraction(true)}
      onMouseLeave={() => setIsPausedByInteraction(false)}
      onFocus={() => setIsPausedByInteraction(true)}
      onBlur={() => setIsPausedByInteraction(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-border-light bg-surface px-6 py-10 sm:px-12 sm:py-12">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute start-6 top-4 select-none font-serif text-6xl leading-none text-primary/10 sm:start-10 sm:text-7xl"
        >
          &ldquo;
        </span>

        <div aria-live="polite" className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="text-start text-lg leading-relaxed text-navy sm:text-xl">
                {current.quote}
              </blockquote>

              <footer className="mt-8 flex items-center gap-4 text-start">
                <TestimonialAvatar />
                <div>
                  <p className="font-semibold text-navy">{current.name}</p>
                  {current.role && (
                    <p className="text-sm text-text-muted">{current.role}</p>
                  )}
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={t("previous")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-navy transition-colors duration-300 ease-out hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronIcon direction="start" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={t("goToTestimonial", { number: dotIndex + 1 })}
                aria-current={dotIndex === index}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  dotIndex === index
                    ? "bg-primary"
                    : "bg-border-light hover:bg-primary/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={t("next")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-navy transition-colors duration-300 ease-out hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronIcon direction="end" />
          </button>

          {canAutoplay && (
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? t("pauseAutoplay") : t("playAutoplay")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-light text-text-muted transition-colors duration-300 ease-out hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <PlayPauseIcon isPlaying={isPlaying} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}