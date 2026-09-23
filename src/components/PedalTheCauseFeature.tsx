import Image from "next/image";

/**
 * Temporary homepage feature for Pedal the Cause.
 * Set PEDAL_THE_CAUSE_ENABLED to false (or delete this component) after ~1 week / after 2026-09-30.
 */
const PEDAL_THE_CAUSE_ENABLED = true;

const PHOTO_SRC = "/images/Cancer_Cause_Picture.jpg";

export function PedalTheCauseFeature() {
  if (!PEDAL_THE_CAUSE_ENABLED) return null;

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
            If you would like to support this cause, give through ACT Campus Care payments — your gift
            helps honor this ride for Barb Brison-Brown.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="/payments"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-transparent bg-gradient-to-b from-[#f7efe8] to-[#ead5c6] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a3c40] shadow-[0_10px_32px_rgba(232,196,176,0.32)] transition-all duration-200 hover:from-white hover:to-[#f3e4d8] sm:px-10 sm:text-xs"
            >
              Support Pedal the Cause
            </a>
            <a
              href="https://pedalthecause.org/about/"
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
