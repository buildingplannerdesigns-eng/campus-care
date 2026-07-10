import Image from "next/image";
import Link from "next/link";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ElementCard } from "@/components/ElementCard";
import { AudienceOutcomeCard } from "@/components/AudienceOutcomeCard";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";
import { coreElements } from "@/data/elements";
import { mentalHealthStats } from "@/data/stats";
import { audienceOutcomes } from "@/data/audiences";
import { siteCopy } from "@/data/copy";

function ArrowIcon() {
  return (
    <span
      className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100"
      aria-hidden
    >
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

function HomeCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "outline" | "light";
}) {
  const styles =
    variant === "dark"
      ? "border-[#0e4f88] bg-[#0e4f88] text-white hover:bg-white hover:text-[#0e4f88]"
      : variant === "light"
        ? "border-white bg-white text-[#0e4f88] hover:bg-transparent hover:text-white"
        : "border-[#0e4f88] bg-white text-[#0e4f88] hover:bg-[#0e4f88] hover:text-white";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center rounded-none border px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 sm:px-10 sm:py-3.5 sm:text-sm ${styles}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

export default function HomePage() {
  const { hero, mission, campusCare, whyItExists, guidingStatement } = siteCopy;

  return (
    <>
      {/* Hero — Persistent Technology style: logo left, text right */}
      <section className="border-b border-[#eeeae4] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-20 lg:gap-20 lg:py-24">
          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/logo.jpg"
              alt="ACT Healing logo"
              width={500}
              height={500}
              className="h-auto w-full max-w-[280px] md:max-w-[380px] lg:max-w-[460px]"
              priority
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="font-body text-xl font-bold uppercase tracking-[0.08em] text-[#0e4f88] md:text-2xl lg:text-[1.65rem]">
              {hero.orgName}
            </h1>
            <div className="mx-auto mt-4 h-1 w-full max-w-md bg-[#0e4f88] md:mx-0" />
            <p className="mx-auto mt-6 max-w-md text-base font-semibold leading-relaxed text-[#333] md:mx-0 md:text-lg">
              {hero.tagline}
            </p>
          </div>
        </div>
      </section>

      <LogoMarquee title="Trusted by communities and partners" />

      {/* Video showcase — desktop mockup */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">See It in Action</p>
            <h2 className="mt-3 font-display text-3xl italic text-parchment md:text-4xl">
              Campus Care 2.0 in Motion
            </h2>
          </div>
          <DesktopVideoMockup title={hero.videoTitle} urlBar="campuscare.com" />
        </div>
      </section>

      {/* Mission quote */}
      <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-8 h-px w-16 bg-water/40" />
          <blockquote className="font-display text-3xl italic leading-snug text-parchment md:text-4xl lg:text-5xl">
            {mission.heading}
          </blockquote>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-parchment/70 md:text-lg">
            {mission.body}
          </p>
        </div>
      </section>

      {/* Campus Care intro + Why */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-water">
              {campusCare.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl">
              {campusCare.headline}
            </h2>
            <div className="mt-5 h-px w-16 bg-water/40" />
            <p className="mt-5 leading-relaxed text-parchment/70">{campusCare.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <HomeCta href="/contact">{campusCare.primaryCta}</HomeCta>
              <HomeCta href="/programs" variant="outline">
                {campusCare.secondaryCta}
              </HomeCta>
            </div>
          </div>
          <div className="bg-white p-8 shadow-[0_18px_38px_rgba(0,0,0,0.06)] ring-1 ring-[#eeeae4] md:p-10">
            <h3 className="font-display text-2xl text-parchment">{whyItExists.heading}</h3>
            <div className="mt-3 h-px w-12 bg-water/40" />
            <div className="mt-6 space-y-5">
              {whyItExists.body.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-parchment/70 md:text-[0.95rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Five Core Elements */}
      <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">
              The Diaspora VR Sanctuary
            </p>
            <h2 className="mt-4 font-display text-4xl leading-snug text-parchment md:text-5xl">
              The 5 Core Elements™
            </h2>
            <p className="mt-4 font-display text-xl italic text-parchment/75 md:text-2xl">
              Why have we built the Sanctuary?
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
              Because true restorative wellness extends beyond traditional office counseling. By
              weaving ancient Afrocentric healing traditions with advanced digital biometrics, the
              Diaspora VR Sanctuary translates ancient pathways into five responsive digital
              environments.
            </p>
            <div className="mt-8 flex justify-center">
              <HomeCta href="/programs">Explore the Elements</HomeCta>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreElements.map((element, idx) => (
              <div
                key={element.key}
                className={idx === coreElements.length - 1 ? "lg:col-start-2" : undefined}
              >
                <ElementCard element={element} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience outcomes */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">
              Therapeutic Services
            </p>
            <h2 className="mt-4 font-display text-3xl italic text-parchment md:text-4xl">
              Individuals, Couples, Families &amp; Community
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audienceOutcomes.map((item) => (
              <AudienceOutcomeCard key={item.audience} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-[#eeeae4] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">
                The Evidence
              </p>
              <h2 className="mt-3 font-display text-3xl text-parchment md:text-4xl">
                Mental Health, By the Numbers
              </h2>
            </div>
            <Link
              href="/programs"
              className="group inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-[#0e4f88] underline decoration-[#0e4f88]/30 underline-offset-4"
            >
              View Research
              <ArrowIcon />
            </Link>
          </div>
          <div className="grid gap-px bg-[#eeeae4] sm:grid-cols-2 lg:grid-cols-3">
            {mentalHealthStats.map((stat) => (
              <div key={stat.stat + stat.source} className="bg-[#faf9f7] p-8">
                <p className="font-display text-5xl font-light text-water">{stat.stat}</p>
                <p className="mt-4 text-sm leading-relaxed text-parchment/80">{stat.description}</p>
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs text-parchment/45 underline decoration-dotted underline-offset-4 hover:text-water"
                >
                  {stat.source}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — dark band bookending the hero */}
      <section
        className="py-24 text-center md:py-32"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 28, 42, 0.72), rgba(18, 28, 42, 0.72)), linear-gradient(160deg, #1a3348 0%, #2a5570 45%, #1e3d35 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
            Get Started
          </p>
          <h2 className="mt-5 font-display text-3xl italic leading-snug text-white md:text-5xl">
            {guidingStatement}
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <HomeCta href="/contact" variant="light">
              Request a Campus Demo
            </HomeCta>
            <HomeCta href="/programs" variant="outline">
              Read the Clinical Whitepaper
            </HomeCta>
          </div>
        </div>
      </section>
    </>
  );
}
