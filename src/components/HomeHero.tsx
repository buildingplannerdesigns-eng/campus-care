"use client";

import { SiteCta } from "@/components/SiteCta";
import { heroVideoSrc, useTrimmedLoopVideo } from "@/lib/useTrimmedLoopVideo";

/** Drop the file at public/videos/home-hero.mp4 (or set NEXT_PUBLIC_HOME_HERO_VIDEO). */
const HOME_HERO_VIDEO =
  process.env.NEXT_PUBLIC_HOME_HERO_VIDEO?.trim() || "/videos/home-hero.mp4";
const HOME_HERO_POSTER =
  process.env.NEXT_PUBLIC_HOME_HERO_POSTER?.trim() ||
  "/images/campus-care/campus-care-hero.png";

export function HomeHero() {
  const { videoRef, ready: videoReady } = useTrimmedLoopVideo();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#1f4a4e]"
      aria-label="Homepage hero"
    >
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-[center_20%] transition-opacity duration-700 lg:bg-[72%_center]"
          style={{
            backgroundImage: `url(${HOME_HERO_POSTER})`,
            opacity: videoReady ? 0 : 1,
          }}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-700 lg:object-[72%_center] ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          preload="auto"
          poster={HOME_HERO_POSTER}
        >
          <source src={heroVideoSrc(HOME_HERO_VIDEO)} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,74,78,0.86)_0%,rgba(31,74,78,0.86)_28%,rgba(31,74,78,0.62)_54%,rgba(31,74,78,0.22)_74%,rgba(31,74,78,0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,32,0.26)_0%,transparent_32%,rgba(12,28,32,0.18)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-16 pt-28 sm:px-10 lg:px-16">
        <div className="max-w-xl text-left lg:max-w-2xl">
          <h1 className="home-hero-fade font-hero text-[2.85rem] font-normal leading-[0.94] text-[#E8C4B0] sm:text-6xl md:text-7xl lg:text-[5.35rem] lg:leading-[0.92]">
            <span className="block text-[1.85rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              Dr. Connor is
            </span>
            <span className="mt-2 block sm:mt-3">Redefining</span>
            <span className="mt-1 block sm:mt-2">Campus Care</span>
          </h1>

          <p className="home-hero-fade-delay-1 mt-7 font-body text-sm font-medium uppercase tracking-[0.38em] text-[#C9A87C] sm:text-base sm:tracking-[0.42em] md:text-lg md:tracking-[0.46em] lg:text-xl">
            ACT
          </p>

          <div className="home-hero-fade-delay-2 mt-10">
            <SiteCta href="/campus-care">Explore Campus Care</SiteCta>
          </div>
        </div>
      </div>
    </section>
  );
}
