"use client";

import { useRef, useState } from "react";

/** Drop the file at public/videos/home-hero.mp4 (or set NEXT_PUBLIC_HOME_HERO_VIDEO). */
const HOME_HERO_VIDEO =
  process.env.NEXT_PUBLIC_HOME_HERO_VIDEO?.trim() || "/videos/home-hero.mp4";
const HOME_HERO_POSTER =
  process.env.NEXT_PUBLIC_HOME_HERO_POSTER?.trim() ||
  "/images/campus-care/campus-care-hero.png";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#0a1f33]"
      aria-label="Homepage hero"
    >
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${HOME_HERO_POSTER})`,
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
          poster={HOME_HERO_POSTER}
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
          <source src={HOME_HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,38,0.42)_0%,rgba(8,22,38,0.1)_32%,rgba(8,22,38,0.14)_100%)]" />
      </div>
    </section>
  );
}
