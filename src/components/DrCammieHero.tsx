import Link from "next/link";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";

type DrCammieHeroProps = {
  headline: string;
  subhead: string;
  primaryCta: string;
  primaryCtaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  minimalText?: boolean;
  videoTitle?: string;
  videoEmbedUrl?: string;
  videoSrc?: string;
  videoPoster?: string;
};

export function DrCammieHero({
  headline,
  subhead,
  primaryCta,
  primaryCtaHref = "/contact",
  secondaryCta,
  secondaryCtaHref,
  minimalText = false,
  videoTitle,
  videoEmbedUrl,
  videoSrc,
  videoPoster,
}: DrCammieHeroProps) {
  return (
    <section className="relative bg-white pb-10 md:pb-14">
      {/* Dark gradient band — bottom padding hosts the top half of the mockup */}
      <div
        className="bg-cover bg-center pb-44 md:pb-72 lg:pb-96"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 28, 42, 0.62), rgba(18, 28, 42, 0.62)), linear-gradient(160deg, #1a3348 0%, #2a5570 45%, #1e3d35 100%)",
        }}
      >
        {/* Centered headline stack — mirrors stefaniegass.com hero */}
        <div className={`relative mx-auto flex flex-col items-center justify-center px-5 text-center sm:px-6 ${minimalText ? "max-w-4xl pt-32 md:pt-40" : "max-w-5xl pt-36 md:pt-44"}`}>
        <h1 className={`font-display text-white ${minimalText ? "text-[2.2rem] leading-[1.05] sm:text-[2.7rem] md:text-5xl lg:text-6xl" : "text-[2rem] italic leading-[1.1] sm:text-[2.35rem] md:text-6xl lg:text-[4.1rem] lg:leading-[1.02]"}`}>
          {headline}
        </h1>
        <p className={`max-w-2xl text-white/85 ${minimalText ? "mt-3 text-base md:text-lg" : "mt-4 font-display text-lg sm:text-xl md:mt-5 md:text-2xl"}`}>
          {subhead}
        </p>
        <div className={`flex flex-wrap items-center justify-center gap-3 ${minimalText ? "mt-6" : "mt-8"}`}>
          <Link
            href={primaryCtaHref}
            className="group inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88] sm:px-10 sm:py-3.5 sm:text-sm"
          >
            {primaryCta}
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
          </Link>

          {secondaryCta && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className="group inline-flex items-center justify-center rounded-none border border-white/45 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88] sm:px-10 sm:py-3.5 sm:text-sm"
            >
              {secondaryCta}
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
            </Link>
          )}
        </div>
        </div>
      </div>

      {/* Featured video — top half sits on the dark band, bottom half on white.
          Negative margin is always smaller than the band's bottom padding, so it
          never touches the hero text, and normal flow keeps the next section clear. */}
      <div className="relative z-10 mx-auto -mt-28 w-full max-w-5xl px-4 sm:px-6 md:-mt-56 lg:-mt-80">
        <DesktopVideoMockup
          title={videoTitle ?? headline}
          embedUrl={videoEmbedUrl}
          videoSrc={videoSrc}
          poster={videoPoster}
          urlBar="campuscare.com / dr-cammie-connor"
        />
      </div>
    </section>
  );
}
