"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

/** Drop at public/videos/act-hero.mp4, or set NEXT_PUBLIC_ACT_HERO_VIDEO. */
const ACT_HERO_VIDEO =
  process.env.NEXT_PUBLIC_ACT_HERO_VIDEO?.trim() || "/videos/act-hero.mp4";
const ACT_HERO_POSTER =
  process.env.NEXT_PUBLIC_ACT_HERO_POSTER?.trim() || "/images/act/portrait-orange.jpg";

type DrCammieHeroProps = {
  headline: string;
  subhead: string;
  primaryCta: string;
  primaryCtaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  minimalText?: boolean;
  headshotSrc?: string;
  headshotAlt?: string;
};

export function DrCammieHero({
  headline,
  subhead,
  primaryCta,
  primaryCtaHref = "/contact",
  secondaryCta,
  secondaryCtaHref,
  minimalText = false,
  headshotSrc = "/images/team/dr.cammie.jpg",
  headshotAlt = "Dr. Connor",
}: DrCammieHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative bg-white pb-10 md:pb-14">
      {/* Header lives inside the hero so it sits on the video */}
      <SiteHeader inHero />

      {/* Full-bleed video band */}
      <div className="relative isolate overflow-hidden pb-36 md:pb-44 lg:pb-52">
        <div className="absolute inset-0 bg-[#0a1f33]" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${ACT_HERO_POSTER})`,
              opacity: videoReady ? 0 : 1,
            }}
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={ACT_HERO_POSTER}
            onCanPlay={() => {
              setVideoReady(true);
              void videoRef.current?.play().catch(() => undefined);
            }}
            onLoadedData={() => {
              setVideoReady(true);
              void videoRef.current?.play().catch(() => undefined);
            }}
            onError={() => setVideoReady(false)}
          >
            <source src={ACT_HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,38,0.5)_0%,rgba(8,22,38,0.28)_40%,rgba(8,22,38,0.55)_100%)]" />
        </div>

        <div
          className={`relative z-10 mx-auto flex min-h-[70svh] flex-col items-center justify-center px-5 text-center sm:px-6 md:min-h-[75svh] ${
            minimalText ? "max-w-4xl pt-28 md:pt-32" : "max-w-5xl pt-32 md:pt-36"
          }`}
        >
          <h1
            className={`font-display text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] ${
              minimalText
                ? "text-[2.2rem] leading-[1.05] sm:text-[2.7rem] md:text-5xl lg:text-6xl"
                : "text-[2rem] italic leading-[1.1] sm:text-[2.35rem] md:text-6xl lg:text-[4.1rem] lg:leading-[1.02]"
            }`}
          >
            {headline}
          </h1>
          <p
            className={`max-w-2xl text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)] ${
              minimalText
                ? "mt-3 text-base md:text-lg"
                : "mt-4 font-display text-lg sm:text-xl md:mt-5 md:text-2xl"
            }`}
          >
            {subhead}
          </p>
          <div className={`flex flex-wrap items-center justify-center gap-3 ${minimalText ? "mt-6" : "mt-8"}`}>
            <Link
              href={primaryCtaHref}
              className="group inline-flex items-center justify-center rounded-none border border-white bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#0e4f88] transition-all duration-200 hover:bg-transparent hover:text-white sm:px-10 sm:py-3.5 sm:text-sm"
            >
              {primaryCta}
              <span
                className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
                aria-hidden
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {secondaryCta && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="group inline-flex items-center justify-center rounded-none border border-white/80 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88] sm:px-10 sm:py-3.5 sm:text-sm"
              >
                {secondaryCta}
                <span
                  className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
                  aria-hidden
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Headshot — overlaps the video band */}
      <div className="relative z-10 mx-auto -mt-28 flex justify-center px-5 sm:px-8 md:-mt-36 lg:-mt-40">
        <div className="relative">
          <div
            className="absolute -left-3 -top-3 hidden h-full w-full border border-[#0e4f88]/25 md:block"
            aria-hidden
          />
          <div className="relative h-56 w-56 overflow-hidden rounded-full ring-[6px] ring-white sm:h-64 sm:w-64 md:h-72 md:w-72">
            <Image
              src={headshotSrc}
              alt={headshotAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
