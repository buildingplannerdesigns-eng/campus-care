"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type QuoteSlide = {
  name: string;
  brand: string;
  quote: string;
  image?: string;
};

type QuoteCarouselProps = {
  slides: QuoteSlide[];
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
        direction === "prev" ? "left-0" : "right-0"
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

export function QuoteCarousel({ slides, autoPlayMs = 6000 }: QuoteCarouselProps) {
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
      aria-label="Community quotations"
    >
      <div className="relative mx-auto max-w-6xl px-10 md:px-14 lg:px-16">
        {count > 1 && (
          <>
            <NavArrow direction="prev" onClick={goPrev} label="Previous quote" />
            <NavArrow direction="next" onClick={goNext} label="Next quote" />
          </>
        )}

        <div
          key={active.name + active.quote}
          className="relative grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16"
        >
          {/* Portrait — left, never covered by quote marks */}
          <div className="relative justify-self-center md:justify-self-start">
            <div className="relative aspect-square w-[220px] overflow-hidden rounded-full border border-[#d7dfda] bg-[#eef2ef] shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:w-[260px] md:w-[280px] lg:w-[300px]">
              {active.image ? (
                <Image
                  src={active.image}
                  alt={`${active.name} portrait`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 260px, 300px"
                  priority={index === 0}
                  unoptimized={active.image.endsWith(".svg")}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#0c3f84_0%,#1f5c73_55%,#3d5a3a_100%)] text-white">
                  <span className="font-display text-7xl italic">{active.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Text + oversized quote marks (text column only) */}
          <div className="relative min-h-[280px] md:min-h-[320px]">
            <span
              className="pointer-events-none absolute -right-1 -top-12 select-none font-display leading-[0.75] text-[#b7c9db] sm:-top-16 md:-right-2 md:-top-20 lg:-top-24"
              style={{ fontSize: "clamp(8rem, 20vw, 15rem)" }}
              aria-hidden
            >
              &ldquo;
            </span>

            <div className="relative z-10 pt-6 md:pt-8">
              <p className="font-script text-4xl leading-none text-[#1f3552] md:text-5xl lg:text-[3.4rem]">
                {active.name}
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5b6d7f] md:text-xs">
                {active.brand}
              </p>
              <p className="mt-8 max-w-xl text-lg font-medium uppercase leading-relaxed tracking-[0.04em] text-[#374151] md:text-xl md:leading-[1.55] lg:text-[1.35rem]">
                {active.quote}
              </p>
            </div>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2" aria-hidden>
            {slides.map((slide, i) => (
              <button
                key={slide.name + slide.brand}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to quote ${i + 1}`}
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
