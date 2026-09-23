import Image from "next/image";
import { CtaArrow, siteCtaClassName } from "@/components/SiteCta";

/** Temporary homepage feature — remove after this date (local). */
export const PEDAL_THE_CAUSE_UNTIL = new Date("2026-09-30T23:59:59-05:00");

const DONATE_URL = "https://pedalthecause.org/donate/";
const ABOUT_URL = "https://pedalthecause.org/about/";
const PHOTO_SRC = "/images/Cancer_Cause_Picture.jpg";

export function isPedalTheCauseActive(now = new Date()) {
  return now.getTime() <= PEDAL_THE_CAUSE_UNTIL.getTime();
}

export function PedalTheCauseFeature() {
  if (!isPedalTheCauseActive()) return null;

  return (
    <section
      className="border-b border-[#cfdcd6] bg-sage py-16 md:py-20"
      aria-label="Pedal the Cause — temporary campaign"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-[#d9d2c6] bg-[#e8e4df] lg:mx-0 lg:max-w-none">
          <Image
            src={PHOTO_SRC}
            alt="Dr. Cammie Connor after completing a 52-mile Pedal the Cause cancer ride"
            fill
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 90vw, 44vw"
            priority
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0e4f88]">
            Pedal the Cause
          </p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl">
            Riding 52 miles for Barb Brison-Brown
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35 lg:mx-0" aria-hidden />
          <p className="mt-6 text-sm leading-relaxed text-parchment/70 md:text-base">
            Dr. Cammie Connor completed a 52-mile ride for Pedal the Cause — a cancer fundraising
            event — sponsoring Barb Brison-Brown, who is currently receiving treatment. 100% of
            participant-raised gifts fund cancer research at Siteman Cancer Center and Siteman Kids.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-parchment/70 md:text-base">
            If you would like to support this cause, please donate through Pedal the Cause.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={siteCtaClassName({})}
            >
              Support Pedal the Cause
              <CtaArrow />
            </a>
            <a
              href={ABOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={siteCtaClassName({ variant: "outline" })}
            >
              About the Event
              <CtaArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
