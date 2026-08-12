"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

export type TestimonySlide = {
  quote: string;
  date: string;
  context: string;
};

type QuoteCarouselProps = {
  slides: TestimonySlide[];
  autoPlayMs?: number;
};

function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-20 -translate-y-1/2 text-[#0c3f84] transition hover:opacity-70 focus-visible:outline-none ${
        direction === "prev" ? "left-0 sm:left-2" : "right-0 sm:right-2"
      }`}
    >
      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {direction === "prev" ? (
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        ) : (
          <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        )}
      </svg>
    </button>
  );
}

export function QuoteCarousel({ slides, autoPlayMs = 7000 }: QuoteCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    if (count <= 1 || paused || autoPlayMs <= 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlayMs, count, paused]);

  if (!active) return null;

  const goPrev = () => setIndex((current) => (current - 1 + count) % count);
  const goNext = () => setIndex((current) => (current + 1) % count);

  return (
    <section
      className="relative overflow-hidden border-t border-[#eeeae4] bg-white py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonies"
    >
      <div className="relative mx-auto max-w-4xl px-12 md:px-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-water">
          Testimonies
        </p>

        {count > 1 && (
          <>
            <NavArrow direction="prev" onClick={goPrev} label="Previous testimony" />
            <NavArrow direction="next" onClick={goNext} label="Next testimony" />
          </>
        )}

        <div key={`${active.date}-${index}`} className="relative mt-8 text-center md:mt-10">
          <span
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-display leading-none text-[#b7c9db]/70"
            style={{ fontSize: "clamp(5rem, 12vw, 8rem)" }}
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote className="relative z-10 pt-10 md:pt-14">
            <p className="mx-auto max-w-3xl font-display text-xl italic leading-relaxed text-parchment md:text-2xl lg:text-[1.75rem] lg:leading-snug">
              {active.quote}
            </p>
          </blockquote>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-center sm:gap-3">
            <CalendarDays
              className="mt-0.5 h-5 w-5 shrink-0 text-[#0e4f88]"
              strokeWidth={1.5}
              aria-hidden
            />
            <p className="text-sm leading-relaxed text-parchment/65 md:text-base">
              <span className="font-semibold text-parchment/80">Written on {active.date}</span>
              {active.context ? ` ${active.context}` : ""}
            </p>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2" aria-hidden>
            {slides.map((slide, i) => (
              <button
                key={`${slide.date}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimony ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#0c3f84]" : "w-1.5 bg-[#0c3f84]/25 hover:bg-[#0c3f84]/45"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** @deprecated Use TestimonySlide */
export type QuoteSlide = TestimonySlide;
