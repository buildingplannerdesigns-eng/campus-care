"use client";

import Image from "next/image";
import { SiteCta } from "@/components/SiteCta";
import { ACT_HERO_END_AT, ACT_HERO_TRIM_START, heroVideoSrc, useTrimmedLoopVideo } from "@/lib/useTrimmedLoopVideo";

/** Drop at public/videos/act-hero.mp4, or set NEXT_PUBLIC_ACT_HERO_VIDEO. */
const ACT_HERO_VIDEO =
  process.env.NEXT_PUBLIC_ACT_HERO_VIDEO?.trim() || "/videos/act-hero.mp4";
const ACT_HERO_POSTER =
  process.env.NEXT_PUBLIC_ACT_HERO_POSTER?.trim() || "/images/act/portrait-orange.jpg";

/** 40% of the circle hangs into HeroFeatureBar — keep spacer/margin classes in sync there. */
const CIRCLE_SPACER =
  "pointer-events-none relative z-20 h-[4.4rem] sm:h-[5.6rem] lg:h-[7.2rem]";
const CIRCLE_FRAME =
  "absolute left-1/2 top-0 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-[60%] sm:h-[14rem] sm:w-[14rem] lg:h-[18rem] lg:w-[18rem]";

type DrCammieHeroProps = {
  headline?: string;
  subhead?: string;
  primaryCta: string;
  primaryCtaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  minimalText?: boolean;
  headshotSrc?: string;
  headshotAlt?: string;
};

function withGoldAct(text: string) {
  return text.split(/(\bACT\b)/).map((part, i) =>
    part === "ACT" ? (
      <span key={i} className="text-[#C9A87C]">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function DrCammieHero({
  headline = "Ready to Heal, Transform & ACT on Your Purpose?",
  subhead = "Make lasting change through intergenerational trauma expertise — for individuals, couples, families, and communities.",
  primaryCta,
  primaryCtaHref = "/contact",
  secondaryCta,
  secondaryCtaHref,
  headshotSrc = "/images/attachments/image002.jpg",
  headshotAlt = "Dr. Cammiel",
}: DrCammieHeroProps) {
  const { videoRef, ready: videoReady } = useTrimmedLoopVideo({
    start: ACT_HERO_TRIM_START,
    endAt: ACT_HERO_END_AT,
    endPad: 16,
  });

  return (
    <section className="relative z-20" aria-label="ACT hero">
      <div className="relative min-h-[100svh] overflow-hidden bg-[#2a5559]">
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-[center_18%] transition-opacity duration-700 lg:bg-[70%_center]"
            style={{
              backgroundImage: `url(${ACT_HERO_POSTER})`,
              opacity: videoReady ? 0 : 1,
            }}
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-[center_18%] transition-opacity duration-700 lg:object-[70%_center] ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            muted
            playsInline
            preload="auto"
            poster={ACT_HERO_POSTER}
          >
            <source src={heroVideoSrc(ACT_HERO_VIDEO, ACT_HERO_TRIM_START)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,85,89,0.74)_0%,rgba(42,85,89,0.74)_24%,rgba(42,85,89,0.50)_48%,rgba(42,85,89,0.16)_70%,rgba(42,85,89,0.05)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,32,0.18)_0%,transparent_34%,rgba(12,28,32,0.12)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-36 pt-28 sm:px-10 sm:pb-40 lg:px-16 lg:pb-44">
          <div className="max-w-xl text-left lg:max-w-3xl">
            <p className="home-hero-fade font-body text-[11px] font-medium uppercase tracking-[0.38em] text-white sm:text-xs sm:tracking-[0.46em]">
              Dr. Cammiel
            </p>

            <h1 className="home-hero-fade-delay-1 mt-5 font-hero text-[2.15rem] font-normal leading-[1.12] text-[#E8C4B0] sm:text-5xl md:text-[3.25rem] lg:text-[3.65rem] lg:leading-[1.08]">
              {withGoldAct(headline)}
            </h1>

            {subhead ? (
              <p className="home-hero-fade-delay-2 mt-6 max-w-xl font-body text-sm font-medium leading-relaxed text-white/90 sm:text-base md:text-lg">
                {subhead}
              </p>
            ) : null}

            <div className="home-hero-fade-delay-3 mt-10 flex flex-wrap items-center gap-4">
              <SiteCta href={primaryCtaHref}>{primaryCta}</SiteCta>
              {secondaryCta && secondaryCtaHref && (
                <SiteCta href={secondaryCtaHref} variant="ghost">
                  {secondaryCta}
                </SiteCta>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer holds the hanging 40% so the circle is not clipped; HeroFeatureBar pulls up over it. */}
      <div className={CIRCLE_SPACER}>
        <div className={CIRCLE_FRAME}>
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.28)] ring-[3px] ring-white">
            <Image
              src={headshotSrc}
              alt={headshotAlt}
              fill
              className="object-cover object-[center_16%]"
              sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 288px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
