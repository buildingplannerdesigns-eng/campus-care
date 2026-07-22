import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";
import { QuoteCarousel, type QuoteSlide } from "@/components/dr-cammie/QuoteCarousel";

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
                src="/images/team/dr.cammie.jpg"
                alt="Dr. Connor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 40vw"
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
  video?: typeof import("@/data/drCammie").drCammieCopy.video;
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

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-10">
          {steps.slice(0, 2).map((step) => (
            <StefStepCard key={step.number} step={step} />
          ))}
        </div>

        {/* Central video — desktop mockup like stefaniegass.com */}
        <div className="mt-12 md:mt-14">
          <DesktopVideoMockup
            title={video?.title}
            embedUrl={video?.embedUrl || undefined}
            videoSrc={video?.videoSrc || undefined}
            poster={video?.poster || undefined}
          />
        </div>

        <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-2 lg:gap-10">
          {steps.slice(2).map((step) => (
            <StefStepCard key={step.number} step={step} />
          ))}
        </div>

        <p className="mt-16 text-center font-display text-3xl italic text-parchment md:text-4xl">
          {showMe}
        </p>
      </div>
    </section>
  );
}

function StefStepCard({ step }: { step: (typeof import("@/data/drCammie").drCammieCopy.steps)[number] }) {
  return (
    <div className="group/card relative flex flex-col bg-white p-7 pt-10 shadow-[0_18px_38px_rgba(0,0,0,0.06)] ring-1 ring-[#eeeae4] transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(31,92,115,0.12)] md:p-9 md:pt-12">
      <span
        className="pointer-events-none absolute -top-6 left-6 font-display text-7xl font-light leading-none text-water/20 md:-top-7 md:text-8xl"
        aria-hidden
      >
        {step.number}
      </span>
      <h3 className="font-display text-2xl leading-snug text-parchment">{step.title}</h3>
      <div className="mt-3 h-px w-10 bg-water/40" aria-hidden />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/70 md:text-[0.95rem]">
        {step.description}
      </p>
      <Link
        href={step.href}
        className="group mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-[#0e4f88] underline decoration-[#0e4f88]/30 underline-offset-4 transition hover:decoration-[#0e4f88]"
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
    <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">{feature.badgeSub}</p>
          <p className="mt-2 font-display text-2xl italic text-parchment md:text-3xl">{feature.badge}</p>
        </div>

        <p className="mx-auto mt-10 max-w-4xl text-center text-base leading-relaxed text-parchment/75 md:text-lg">
          {feature.heading}
        </p>
        <h3 className="mx-auto mt-10 max-w-3xl text-center font-display text-2xl italic text-parchment md:text-3xl">
          {feature.subheading}
        </h3>

        <div className="mx-auto mt-14 max-w-2xl bg-[#faf9f7] p-8 ring-1 ring-[#eeeae4] md:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-parchment/60">
            {feature.listHeading}
          </p>
          <ul className="mt-7 space-y-0">
            {feature.listItems.map((item, i) => (
              <li
                key={i}
                className="flex items-baseline gap-5 border-b border-[#e8e4df] py-4 text-sm text-parchment/80 last:border-b-0 md:text-base"
              >
                <span className="shrink-0 font-mono text-xs text-water/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Quotations carousel — Stefanie Gass style with auto-scroll          */
/* ------------------------------------------------------------------ */

export function StefQuoteCarousel({
  featuredQuotes,
  testimonials,
}: {
  featuredQuotes: typeof import("@/data/drCammie").drCammieCopy.featuredQuotes;
  testimonials: typeof import("@/data/drCammie").drCammieCopy.testimonials;
}) {
  const slides: QuoteSlide[] = [
    ...featuredQuotes.map((item) => ({
      name: item.attribution,
      brand: item.reference,
      quote: item.quote,
      image: item.image,
    })),
    ...testimonials.map((item) => ({
      name: item.name,
      brand: item.brand,
      quote: item.quote,
      image: item.image,
    })),
  ];

  return <QuoteCarousel slides={slides} autoPlayMs={6500} />;
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
    <section className="border-t border-[#eeeae4] bg-white py-20 text-center md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl italic text-parchment md:text-5xl">{copy.heading}</h2>
        <div className="mx-auto mt-6 h-px w-16 bg-water/40" aria-hidden />
        <p className="mt-6 font-display text-xl text-parchment/80 md:text-2xl">{copy.subheading}</p>
        <p className="mt-10 font-display text-3xl italic text-water md:text-4xl">{copy.cta}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Offers — three cards with gradient banner tops                      */
/* ------------------------------------------------------------------ */

const offerGradients = [
  "linear-gradient(135deg, #1F5C73 0%, #2a7a96 100%)",
  "linear-gradient(135deg, #3D5A3A 0%, #567a52 100%)",
  "linear-gradient(135deg, #0e4f88 0%, #2a6cae 100%)",
];

export function StefOffersSection({ offers }: { offers: typeof import("@/data/drCammie").drCammieCopy.offers }) {
  return (
    <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl text-parchment md:text-4xl">{offers.heading}</h2>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-water">
          {offers.subheading}
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {offers.items.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col overflow-hidden bg-white shadow-[0_18px_34px_rgba(0,0,0,0.06)] ring-1 ring-[#eeeae4] transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(31,92,115,0.14)]"
            >
              <div
                className="flex h-28 items-center justify-center"
                style={{ background: offerGradients[i % offerGradients.length] }}
              >
                <span className="font-display text-4xl font-light text-white/85">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-xl text-parchment md:text-2xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm text-parchment/65">{item.subtitle}</p>
                <div className="mt-7">
                  <StefCta href={item.href}>{item.cta}</StefCta>
                </div>
              </div>
            </div>
          ))}
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
  video?: typeof import("@/data/drCammie").drCammieCopy.video;
}) {
  return (
    <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-4xl italic text-parchment md:text-5xl">{imagine.heading}</h2>
        <p className="mt-4 font-display text-xl italic text-water md:text-2xl">{imagine.eyebrow}</p>
        <div className="mt-12">
          <DesktopVideoMockup
            title={video?.title ?? "Imagine consistent healing and transformation"}
            embedUrl={video?.embedUrl || undefined}
            videoSrc={video?.videoSrc || undefined}
            poster={video?.poster || undefined}
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
      className="py-24 text-center md:py-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(18, 28, 42, 0.72), rgba(18, 28, 42, 0.72)), linear-gradient(160deg, #1a3348 0%, #2a5570 45%, #1e3d35 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-6">
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
