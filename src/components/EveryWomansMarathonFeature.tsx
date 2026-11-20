"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";

/**
 * Homepage fundraising feature for Every Woman's Marathon 2027.
 * Fundraising event (not a partnership) — gifts go via ACT Campus Care payments.
 */
const EVERY_WOMANS_MARATHON_ENABLED = true;

const PHOTOS = [
  {
    src: "/marathon/IMG_0515.jpg",
    alt: "Dr. Cammie Connor after a marathon finish with the 26.2 Team Milk sign",
  },
  {
    src: "/marathon/IMG_0547.jpg",
    alt: "Dr. Cammie Connor holding a Let's Go Cammie cheer sign at a race",
  },
] as const;

const VIDEO_SRC = "/marathon/every-womans-marathon.mp4";
const EVENT_URL = "https://www.everywomansmarathon.com";
const DONATE_HREF = "/payments";
const SECTION_ID = "every-womans-marathon";
/** Race day — local midnight Feb 28, 2027 */
const EVENT_AT = new Date(2027, 1, 28, 0, 0, 0, 0).getTime();

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getCountdownParts(now = Date.now()): CountdownParts {
  const diff = Math.max(0, EVENT_AT - now);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

function MarathonCountdown() {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    setParts(getCountdownParts());
    const id = window.setInterval(() => setParts(getCountdownParts()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = parts ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  if (display.done) {
    return (
      <p className="mt-8 font-display text-xl italic text-[#0e4f88] md:text-2xl">
        Race day is here!
      </p>
    );
  }

  const units = [
    { label: "Days", value: display.days },
    { label: "Hours", value: display.hours },
    { label: "Minutes", value: display.minutes },
    { label: "Seconds", value: display.seconds },
  ] as const;

  return (
    <div className="mt-8" aria-live="polite" aria-atomic="true">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5b6d7f]">
        Countdown to race day
      </p>
      <div className="mt-4 flex flex-wrap items-start justify-center gap-3 sm:gap-5">
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-start gap-3 sm:gap-5">
            <div className="min-w-[4.25rem] text-center sm:min-w-[5rem]">
              <p className="font-display text-3xl leading-none text-[#113f6c] tabular-nums sm:text-4xl md:text-[2.75rem]">
                {String(unit.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5b6d7f]">
                {unit.label}
              </p>
            </div>
            {index < units.length - 1 && (
              <span
                className="mt-1 font-display text-2xl leading-none text-[#0e4f88]/35 sm:mt-1.5 sm:text-3xl"
                aria-hidden
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EveryWomansMarathonFeature() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!EVERY_WOMANS_MARATHON_ENABLED) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  if (!EVERY_WOMANS_MARATHON_ENABLED) return null;

  return (
    <section
      ref={sectionRef}
      id={SECTION_ID}
      className="scroll-mt-24 border-b border-[#cfdcd6] bg-sage py-16 md:py-20"
      aria-label="Every Woman's Marathon 2027 — fundraising campaign"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0e4f88]">
            Fundraising Event
          </p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Every Woman&apos;s Marathon 2027!
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#5b6d7f]">
            New Orleans, LA · February 28, 2027 · 26.2 miles
          </p>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <MarathonCountdown />
        </div>

        {/* Photos flanking the desktop mockup */}
        <div className="mt-12 grid items-end gap-6 lg:mt-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.35fr)_minmax(0,0.72fr)] lg:items-center lg:gap-8">
          <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[240px] overflow-hidden border border-[#d9d2c6] bg-[#e8e4df] lg:mx-0 lg:block lg:max-w-none">
            <Image
              src={PHOTOS[0].src}
              alt={PHOTOS[0].alt}
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 0px, 22vw"
              priority
            />
          </div>

          <div className="order-first lg:order-none">
            <DesktopVideoMockup
              title="Every Woman's Marathon Journey"
              videoSrc={VIDEO_SRC}
              poster={PHOTOS[0].src}
              simpleLoop
              objectFit="contain"
              className="max-w-[720px]"
            />
          </div>

          <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[240px] overflow-hidden border border-[#d9d2c6] bg-[#e8e4df] lg:mx-0 lg:block lg:max-w-none">
            <Image
              src={PHOTOS[1].src}
              alt={PHOTOS[1].alt}
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 0px, 22vw"
              priority
            />
          </div>
        </div>

        {/* Mobile / tablet: both photos under the mockup */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:hidden">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/5] overflow-hidden border border-[#d9d2c6] bg-[#e8e4df]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-[center_15%]"
                sizes="45vw"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center md:mt-14">
          <div className="space-y-4 text-sm leading-relaxed text-parchment/70 md:text-base">
            <p>Hello Family and Friends! Yes, this is a fundraising run. 🙂</p>
            <p>
              Please support my New Orleans Marathon Journey — your gift helps build a
              Healing-Centered Mental Health Intervention with Virtual Reality technology. This
              tool will use immersive simulations to teach stress management, anxiety reduction,
              and self-care practices for college students&apos; wellness using an Afro-centric
              model. These VR healing journeys position students and HBCUs as leaders in culturally
              grounded, future-forward mental health care.
            </p>
            <p>
              I will be training to run 26.2 miles as a fundraiser to build the immersive
              environment so college students have access to this VR during their college
              experience.
            </p>
            <p>
              This Campus Care model has completely changed my perspective on healing. With your
              support, this intervention tool will allow students across the nation to experience a
              Mental Health journey to wellness.
            </p>
            <p className="font-medium text-parchment/85">Will you donate?</p>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={DONATE_HREF}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-transparent bg-gradient-to-b from-[#f7efe8] to-[#ead5c6] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a3c40] shadow-[0_10px_32px_rgba(232,196,176,0.32)] transition-all duration-200 hover:from-white hover:to-[#f3e4d8] sm:px-10 sm:text-xs"
            >
              Support the Marathon Journey
            </a>
            <a
              href={EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-[#1a3c40] bg-transparent px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a3c40] transition-all duration-200 hover:bg-[#1a3c40] hover:text-[#f7efe8] sm:px-10 sm:text-xs"
            >
              About the Event
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
