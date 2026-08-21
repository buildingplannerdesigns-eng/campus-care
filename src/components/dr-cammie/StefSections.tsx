import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeartHandshake, Mic, UsersRound, type LucideIcon } from "lucide-react";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";
import { QuoteCarousel } from "@/components/dr-cammie/QuoteCarousel";

function ArrowIcon() {
  return (
    <span
      className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100 group-active:ml-2 group-active:w-4 group-active:opacity-100"
      aria-hidden
    >
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 group-active:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

function StefCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "outline";
}) {
  return (
    <Link
      href={href}
      className={
        variant === "dark"
          ? "group inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
          : "group inline-flex items-center justify-center rounded-none border border-parchment/30 bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-parchment transition-all duration-200 hover:border-[#0e4f88] hover:bg-[#0e4f88] hover:text-white"
      }
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Intro — "Hey, I'm Dr. Cammie" portrait + copy                       */
/* ------------------------------------------------------------------ */

export function StefIntro({ copy }: { copy: typeof import("@/data/drCammie").drCammieCopy.intro }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Portrait with Stef-style offset frame */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-3 -top-3 h-full w-full border border-water/30" aria-hidden />
            <div
              className="relative aspect-[4/5] overflow-hidden shadow-[0_24px_50px_rgba(31,92,115,0.14)]"
              style={{ background: "linear-gradient(180deg, #d9d4cc 0%, #b8b0a8 100%)" }}
            >
              {/* Portrait */}
              <Image
                src="/images/act/portrait-polka-front.jpeg"
                alt="Dr. Connor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 40vw"
                priority
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="font-display text-3xl italic text-water md:text-4xl">{copy.greeting}</p>
            <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl">{copy.title}</h2>
            <div className="mx-auto mt-5 h-px w-16 bg-water/40 md:mx-0" aria-hidden />
            <p className="mt-5 text-sm leading-relaxed text-parchment/70 md:text-base">
              {copy.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <StefCta href="/about">{copy.cta}</StefCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Overwhelm heading + numbered steps around the central video         */
/* ------------------------------------------------------------------ */

export function StefOverwhelmAndSteps({
  overwhelm,
  steps,
  showMe,
  video,
}: {
  overwhelm: typeof import("@/data/drCammie").drCammieCopy.overwhelm;
  steps: typeof import("@/data/drCammie").drCammieCopy.steps;
  showMe: string;
  video?: typeof import("@/data/drCammie").drCammieCopy.video | typeof import("@/data/drCammie").drCammieCopy.homeVideo;
}) {
  return (
    <section id="show-me-how" className="scroll-mt-28 border-t border-[#eeeae4] bg-[#faf9f7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-snug text-parchment md:text-5xl">
            {overwhelm.heading}
          </h2>
          <div className="mt-6 space-y-3 text-base leading-relaxed text-parchment/75 md:text-lg">
            {overwhelm.body.map((line, i) => (
              <p key={i} className={i === overwhelm.body.length - 1 ? "font-display text-xl italic md:text-2xl" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Numbered steps flanking a central video — stefaniegass.com layout */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-10">
          {/* Left column */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {steps.slice(0, 2).map((step) => (
              <StefStep key={step.number} step={step} align="right" />
            ))}
          </div>

          {/* Center: video + "Let me show you how" */}
          <div className="order-first flex flex-col items-center lg:order-none">
            <DesktopVideoMockup
              title={video?.title}
              embedUrl={video?.embedUrl || undefined}
              videoSrc={video?.videoSrc || undefined}
              poster={video?.poster || undefined}
            />
            <p className="mt-8 text-center font-display text-2xl italic text-parchment md:mt-10 md:text-3xl">
              {showMe}
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {steps.slice(2).map((step) => (
              <StefStep key={step.number} step={step} align="left" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StefStep({
  step,
  align,
}: {
  step: (typeof import("@/data/drCammie").drCammieCopy.steps)[number];
  align: "left" | "right";
}) {
  const alignClass = align === "right" ? "lg:text-right lg:items-end" : "lg:text-left lg:items-start";
  return (
    <div className={`flex flex-col items-center text-center ${alignClass}`}>
      <span className="font-display text-6xl font-light leading-none text-water/30 md:text-7xl" aria-hidden>
        {step.number}
      </span>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment/70 md:text-[0.95rem]">
        {step.description}
      </p>
      <Link
        href={step.href}
        className="group mt-5 inline-flex items-center font-display text-xl italic leading-snug text-[#0e4f88] transition hover:text-[#0a3a66] md:text-2xl"
      >
        {step.cta}
        <ArrowIcon />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature — expert positioning + top ways to work together            */
/* ------------------------------------------------------------------ */

export function StefFeatureSection({ feature }: { feature: typeof import("@/data/drCammie").drCammieCopy.feature }) {
  return (
    <section className="border-t border-[#dce8ee] bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-16">
          {/* Left — editorial intro */}
          <div className="lg:sticky lg:top-28 lg:pt-2">
            <div className="h-px w-16 bg-ember" aria-hidden />
            <h2 className="mt-7 font-display text-4xl leading-[1.1] text-water md:text-5xl lg:text-[3.25rem]">
              {feature.listHeading}
            </h2>
            <p className="mt-5 font-display text-2xl italic leading-snug text-water/85 md:text-3xl">
              {feature.subheading}
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-parchment/75 md:text-base">
              {feature.heading}
            </p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-water/55">
              {feature.badgeSub} · {feature.badge}
            </p>
          </div>

          {/* Right — offset-frame image grid */}
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3">
            {feature.listItems.map((item) => (
              <li key={item.word} className="group">
                <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <div
                    className="absolute -left-2.5 -top-2.5 h-full w-full bg-[#d8e4eb] transition-colors duration-500 group-hover:bg-water/20"
                    aria-hidden
                  />
                  <div className="relative aspect-[3/4] overflow-hidden bg-mineral">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 45vw, 220px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-mineral/70 via-mineral/25 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                      <p className="font-script text-[2.35rem] leading-none text-white drop-shadow-sm sm:text-4xl md:text-[2.6rem]">
                        {item.word}
                      </p>
                      <p className="mt-2 max-w-[11rem] text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/95">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonies carousel — no images; calendar date meta                */
/* ------------------------------------------------------------------ */

export function StefQuoteCarousel({
  testimonies,
}: {
  testimonies: typeof import("@/data/drCammie").drCammieCopy.testimonies;
}) {
  return <QuoteCarousel slides={[...testimonies]} autoPlayMs={7000} />;
}

/* ------------------------------------------------------------------ */
/* Story — personal narrative + callout                                */
/* ------------------------------------------------------------------ */

export function StefStorySection({ story }: { story: typeof import("@/data/drCammie").drCammieCopy.story }) {
  return (
    <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {story.paragraphs.map((p, i) => (
          <p key={i} className="mt-5 text-base leading-relaxed text-parchment/75 first:mt-0 md:text-lg">
            {p}
          </p>
        ))}
        <div className="mt-12 border-y border-[#ddd8d0] py-10">
          <span className="block font-display text-6xl leading-none text-[#0c3f84]/18 md:text-7xl" aria-hidden>
            &ldquo;
          </span>
          <p className="-mt-4 font-display text-2xl italic leading-snug text-parchment md:text-3xl">
            {story.calloutQuote}
          </p>
          <span className="mt-1 inline-block font-display text-4xl leading-none text-[#0c3f84]/18" aria-hidden>
            &rdquo;
          </span>
        </div>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-water">{story.callout}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hi Friend                                                           */
/* ------------------------------------------------------------------ */

export function StefHiFriend({ copy }: { copy: typeof import("@/data/drCammie").drCammieCopy.hiFriend }) {
  return (
    <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none md:sticky md:top-36">
            <div className="absolute -left-3 -top-3 hidden h-full w-full border border-water/30 md:block" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden bg-[#eef2ef]">
              <Image
                src="/images/team/consellor.jpg"
                alt="Dr. Cammie Connor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 40vw"
                priority
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-4xl italic leading-snug text-parchment md:text-5xl">
              {copy.heading}
            </h2>
            <div className="mt-5 h-px w-16 bg-water/40" aria-hidden />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-parchment/50">
              {copy.subheading}
            </p>

            <div className="mt-8 space-y-5">
              {copy.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-sm leading-relaxed text-parchment/75 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[#e6e0d6] pt-8">
              <p className="font-display text-2xl italic leading-snug text-water md:text-3xl">
                {copy.cta}
              </p>
              <p className="mt-4 font-display text-lg text-parchment md:text-xl">{copy.signature}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Offers — three pathways with Lucide icons                           */
/* ------------------------------------------------------------------ */

const offerIcons: Record<(typeof import("@/data/drCammie").drCammieCopy.offers.items)[number]["icon"], LucideIcon> = {
  users: UsersRound,
  mic: Mic,
  "heart-handshake": HeartHandshake,
};

export function StefOffersSection({ offers }: { offers: typeof import("@/data/drCammie").drCammieCopy.offers }) {
  return (
    <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl text-parchment md:text-4xl">{offers.heading}</h2>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-water">
          {offers.subheading}
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {offers.items.map((item) => {
            const Icon = offerIcons[item.icon];
            return (
              <div
                key={item.title}
                className="flex flex-col border border-[#e6e0d6] bg-white p-8 text-left"
              >
                <Icon className="h-7 w-7 text-[#0e4f88]" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-6 font-display text-xl text-parchment md:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-parchment/65">{item.subtitle}</p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-sm leading-relaxed text-parchment/70 md:text-base">
          {offers.body}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Imagine — eyebrow + heading + second video mockup                   */
/* ------------------------------------------------------------------ */

export function StefImagineSection({
  imagine,
  video,
}: {
  imagine: typeof import("@/data/drCammie").drCammieCopy.imagine;
  video?: typeof import("@/data/drCammie").drCammieCopy.video | typeof import("@/data/drCammie").drCammieCopy.homeVideo;
}) {
  return (
    <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-4xl italic text-parchment md:text-5xl">{imagine.heading}</h2>
        <p className="mt-4 font-display text-xl italic text-water md:text-2xl">{imagine.eyebrow}</p>
        <div className="mt-12">
          <DesktopVideoMockup
            title={video?.title ?? "Dr. Cammie Connor — ACT Healing"}
            videoSrc="/videos/act-hero.mp4"
            poster={video?.poster || "/images/act/portrait-orange.jpg"}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA — dark band bookending the hero                         */
/* ------------------------------------------------------------------ */

export function StefClosingCta({ closing }: { closing: typeof import("@/data/drCammie").drCammieCopy.closingCta }) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-24 text-center md:py-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(18, 28, 42, 0.72), rgba(18, 28, 42, 0.72)), url('/images/act/portrait-polka-side.jpg')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="space-y-1 font-display text-4xl italic leading-tight text-white md:text-5xl">
          {closing.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href={closing.href}
            className="group inline-flex items-center justify-center rounded-none border border-white bg-white px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0e4f88] transition-all duration-200 hover:bg-transparent hover:text-white md:text-sm"
          >
            {closing.cta}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
