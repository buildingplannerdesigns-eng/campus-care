"use client";

import { useEffect, useRef } from "react";

/** Drop the file at public/videos/home-hero.mp4 (or set NEXT_PUBLIC_HOME_HERO_VIDEO). */
const HOME_HERO_VIDEO =
  process.env.NEXT_PUBLIC_HOME_HERO_VIDEO?.trim() || "/videos/home-hero.mp4";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#0a1f33]"
      aria-label="Homepage hero"
    >
      <div className="absolute inset-0" aria-hidden>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HOME_HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Soft top shade so sticky nav stays legible — not a poster image */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,38,0.45)_0%,rgba(8,22,38,0.08)_28%,rgba(8,22,38,0.12)_100%)]" />
      </div>
    </section>
  );
}
