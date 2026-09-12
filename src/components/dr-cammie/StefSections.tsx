import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeartHandshake, Mic, UsersRound, type LucideIcon } from "lucide-react";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";
import { QuoteCarousel } from "@/components/dr-cammie/QuoteCarousel";
import { OffsetImageFrame } from "@/components/OffsetImageFrame";
import { SiteCta, CtaArrow } from "@/components/SiteCta";

function StefCta({
  href,
  children,
  variant = "peach",
}: {
  href: string;
  children: ReactNode;
  variant?: "peach" | "outline";
}) {
  return (
    <SiteCta href={href} variant={variant}>
      {children}
    </SiteCta>
  );
}

/* ------------------------------------------------------------------ */
/* Intro — "Hey, I'm Dr. Cammie" portrait + copy                       */
/* ------------------------------------------------------------------ */

export function StefIntro({ copy }: { copy: typeof import("@/data/drCammie").drCammieCopy.intro }) {
  return (
    <section className="bg-sage py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Portrait with Stef-style offset frame */}
          <div className="relative mx-auto w-full max-w-md p-3">
            <OffsetImageFrame aspectClassName="aspect-[4/5]">
              <Image
                src="/images/act/portrait-polka-front.jpeg"
                alt="Dr. Cammie"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 40vw"
                priority
              />
            </OffsetImageFrame>
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
    <section id="show-me-how" className="scroll-mt-28 border-t border-[#cfdcd6] bg-sage py-20 md:py-28">
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
      <p className="mt-4 font-display text-xl italic leading-snug text-[#1a3c40] md:text-2xl">
        {step.title}
      </p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-parchment/70 md:text-[0.95rem]">
        {step.description}
      </p>
      <Link
        href={step.href}
        className="group mt-5 inline-flex items-center font-display text-xl italic leading-snug text-[#1a3c40] transition hover:text-[#C9A87C] md:text-2xl"
      >
        {step.cta}
        <CtaArrow />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature — expert positioning + top ways to work together            */
/* ------------------------------------------------------------------ */

export function StefFeatureSection({ feature }: { feature: typeof import("@/data/drCammie").drCammieCopy.feature }) {
  return (
    <section className="border-t border-[#cfdcd6] bg-sage py-20 md:py-28">
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
          <ul className="grid grid-cols-2 gap-x-7 gap-y-11 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3">
            {feature.listItems.map((item) => (
              <li key={item.word} className="group p-3 text-center">
                <OffsetImageFrame className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 45vw, 220px"
                  />
                </OffsetImageFrame>
                <p className="mt-4 font-script text-[2rem] leading-none text-[#1a3c40] sm:text-[2.2rem]">
                  {item.word}
                </p>
                <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-parchment/60">
                  {item.tagline}
                </p>
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
    <section className="border-t border-[#cfdcd6] bg-sage py-20 md:py-28">
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
        {story.callout ? (
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-water">{story.callout}</p>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hi Friend                                                           */
/* ------------------------------------------------------------------ */

export function StefHiFriend({ copy }: { copy: typeof import("@/data/drCammie").drCammieCopy.hiFriend }) {
  return (
    <section className="border-t border-[#cfdcd6] bg-sage py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md p-3 md:mx-0 md:max-w-none md:sticky md:top-36">
            <OffsetImageFrame aspectClassName="aspect-[4/5]">
              <Image
                src="/images/team/consellor.jpg"
                alt="Dr. Cammie Connor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 40vw"
                priority
              />
            </OffsetImageFrame>
          </div>

          <div>
            <h2 className="font-display text-4xl italic leading-snug text-parchment md:text-5xl">
              {copy.heading}
            </h2>
            <div className="mt-5 h-px w-16 bg-water/40" aria-hidden />
            {copy.subheading ? (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-parchment/50">
                {copy.subheading}
              </p>
            ) : null}

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
              {copy.signature ? (
                <p className="mt-4 font-display text-lg text-parchment md:text-xl">{copy.signature}</p>
              ) : null}
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
    <section className="border-t border-[#cfdcd6] bg-sage py-20 md:py-28">
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
    <section className="border-t border-[#cfdcd6] bg-sage py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-4xl italic text-parchment md:text-5xl">{imagine.heading}</h2>
        <p className="mt-4 font-display text-xl italic text-water md:text-2xl">{imagine.eyebrow}</p>
        <div className="mt-12">
          <DesktopVideoMockup
            title={video?.title ?? "Dr. Cammie Connor — ACT Healing"}
            videoSrc="/videos/act-hero.mp4"
            poster={video?.poster || "/images/act/portrait-orange.jpg"}
            hideLowerThird
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
          <SiteCta href={closing.href}>{closing.cta}</SiteCta>
        </div>
      </div>
    </section>
  );
}
