import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoMarquee } from "@/components/LogoMarquee";
import { StefQuoteCarousel } from "@/components/dr-cammie/StefSections";
import { drCammieCopy } from "@/data/drCammie";
import { audienceOutcomes } from "@/data/audiences";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Book ACT Healing for therapy, workshops, and campus interventions — culturally grounded care that helps people heal, grow, and ACT on purpose.",
};

function ArrowIcon() {
  return (
    <span
      className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
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

function SolutionsCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "outline" | "light" | "ghost";
}) {
  const styles =
    variant === "dark"
      ? "border-[#0e4f88] bg-[#0e4f88] text-white hover:bg-white hover:text-[#0e4f88]"
      : variant === "light"
        ? "border-white bg-white text-[#0e4f88] hover:bg-transparent hover:text-white"
        : variant === "ghost"
          ? "border-white/45 bg-white/10 text-white hover:bg-white hover:text-[#0e4f88]"
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

const expectations = [
  {
    number: "01",
    title: "A clear discovery conversation",
    body: "We listen first — clarifying needs for individuals, couples, families, or campus partners.",
  },
  {
    number: "02",
    title: "Culturally grounded care",
    body: "Every pathway honors lived experience and intergenerational trauma expertise.",
  },
  {
    number: "03",
    title: "Practical tools you can use",
    body: "Sessions, workshops, and Campus Care tools that move people from insight to action.",
  },
  {
    number: "04",
    title: "A partner through the process",
    body: "Prompt, professional follow-through so healing and institutional impact stay on track.",
  },
] as const;

const pathways = [
  {
    id: "therapy",
    eyebrow: "Therapy",
    title: "Individual, Couples & Family Sessions",
    body: "One-on-one and relational work led by Dr. Connor to help clients discover strengths, foster intimacy, and build supportive environments for growth.",
    outcomes: audienceOutcomes.slice(0, 2),
    cta: { href: "/contact", label: "Book a Consultation" },
    avatars: [
      { src: "/images/avatars/female.svg", alt: "Therapy avatar" },
      { src: "/images/avatars/male.svg", alt: "Therapy avatar" },
    ],
  },
  {
    id: "interventions",
    eyebrow: "Interventions",
    title: "Campus & Community Programs",
    body: "Campus Care 2.0 brings culturally grounded, bio-responsive wellness to HBCU campuses — building pride, resilience, and social justice at scale.",
    outcomes: audienceOutcomes.slice(2),
    cta: { href: "/campus-care", label: "Explore Campus Care" },
    avatars: [
      { src: "/images/avatars/male.svg", alt: "Campus avatar" },
      { src: "/images/avatars/female.svg", alt: "Community avatar" },
    ],
  },
] as const;

export default function SolutionsPage() {
  return (
    <>
      {/* Hero — Stef speaking page style */}
      <section
        className="relative overflow-hidden px-6 pb-20 pt-36 text-center md:pb-28 md:pt-44"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 28, 42, 0.72), rgba(18, 28, 42, 0.72)), linear-gradient(160deg, #1a3348 0%, #2a5570 45%, #1e3d35 100%)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Solutions</p>
        <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl italic leading-[1.05] text-white md:text-6xl lg:text-[4.1rem]">
          Book ACT Healing for lasting change
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-display text-xl text-white/85 md:text-2xl">
          Want to help your people heal, grow, and ACT on purpose?
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <SolutionsCta href="/contact" variant="light">
            Invite Us to Work With You
          </SolutionsCta>
          <SolutionsCta href="#pathways" variant="ghost">
            See How We Work
          </SolutionsCta>
        </div>
      </section>

      {/* Pull quote strip */}
      <section className="border-b border-[#eeeae4] bg-white py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl italic leading-snug text-parchment md:text-3xl">
            &ldquo;From therapy to campus wellness, ACT delivers care that transforms.&rdquo;
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SolutionsCta href="/contact">Book a Consultation</SolutionsCta>
            <SolutionsCta href="/campus-care" variant="outline">
              Explore Campus Care
            </SolutionsCta>
          </div>
        </div>
      </section>

      {/* Credibility / bio */}
      <section className="border-b border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex justify-center lg:justify-start">
            <div className="flex -space-x-6">
              {[
                { src: "/images/avatars/female.svg", alt: "Community member" },
                { src: "/images/team/dr.cammie.jpg", alt: "Dr. Connor" },
                { src: "/images/avatars/male.svg", alt: "Campus partner" },
              ].map((avatar, index) => (
                <div
                  key={avatar.src}
                  className="relative h-28 w-28 overflow-hidden rounded-full ring-[5px] ring-[#faf9f7] shadow-[0_12px_28px_rgba(17,63,108,0.14)] sm:h-32 sm:w-32"
                  style={{ zIndex: 3 - index }}
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    className="object-cover"
                    sizes="128px"
                    unoptimized={avatar.src.endsWith(".svg")}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-water">
              Therapy · Workshops · Campus Care
            </p>
            <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl">
              From a culturally grounded approach you can trust
            </h2>
            <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35 lg:mx-0" aria-hidden />
            <p className="mt-6 text-sm leading-relaxed text-parchment/70 md:text-base">
              With deep expertise in intergenerational trauma and a mission to inspire hope, purpose,
              and collective action, Dr. Connor and the ACT Healing team help individuals, couples,
              families, and campuses move from pain into purpose.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-parchment/70 md:text-base">
              You leave not only inspired — but equipped with practical tools for healing,
              stronger relationships, and lasting wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Pathways — speaking "topics" equivalent */}
      <section id="pathways" className="border-b border-[#eeeae4] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">Let&apos;s Work Together</p>
            <h2 className="mt-4 font-display text-4xl italic text-parchment md:text-5xl">
              Two pathways. One purpose.
            </h2>
            <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {pathways.map((pathway) => (
              <article
                key={pathway.id}
                id={pathway.id}
                className="border border-[#eeeae4] bg-[#faf9f7] px-6 py-10 text-center md:px-10 md:py-12"
              >
                <div className="flex justify-center">
                  <div className="flex -space-x-4">
                    {pathway.avatars.map((avatar) => (
                      <div
                        key={avatar.src + avatar.alt}
                        className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-[0_8px_20px_rgba(17,63,108,0.12)]"
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized={avatar.src.endsWith(".svg")}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-8 font-display text-2xl italic text-[#0e4f88] md:text-3xl">
                  {pathway.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-snug text-parchment md:text-3xl">
                  {pathway.title}
                </h3>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-parchment/70">
                  {pathway.body}
                </p>

                <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                  {pathway.outcomes.map((item) => (
                    <li
                      key={item.audience}
                      className="flex items-start gap-3 border-b border-[#e8e4df] pb-3 text-sm text-parchment/80 last:border-b-0"
                    >
                      <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-water">
                        {item.audience.slice(0, 3)}
                      </span>
                      <span>
                        <span className="font-medium text-parchment">{item.audience}</span>
                        {" — "}
                        {item.outcome}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex justify-center">
                  <SolutionsCta href={pathway.cta.href}>{pathway.cta.label}</SolutionsCta>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What you can expect — numbered like speaking page */}
      <section className="border-b border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl italic text-parchment md:text-5xl">
              Here&apos;s what you can expect from ACT Healing
            </h2>
            <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((item) => (
              <div key={item.number} className="text-center">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-water">{item.number}</p>
                <h3 className="mt-4 font-display text-xl text-parchment md:text-2xl">{item.title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-parchment/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <SolutionsCta href="/contact">Book ACT Now</SolutionsCta>
          </div>
        </div>
      </section>

      {/* Quotes carousel */}
      <StefQuoteCarousel
        featuredQuotes={drCammieCopy.featuredQuotes}
        testimonials={drCammieCopy.testimonials}
      />

      {/* Partner letter — speaking page style */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-water">
            More than a service — a partner
          </p>
          <h2 className="mt-4 font-display text-4xl italic leading-snug text-parchment md:text-5xl">
            Your healing success is our top priority
          </h2>
          <div className="mx-auto mt-6 h-px w-14 bg-[#0e4f88]/35" aria-hidden />

          <div className="mt-10 space-y-5 text-left text-sm leading-relaxed text-parchment/75 md:text-base">
            <p>
              It is an honor to be considered for your next season of healing — whether that looks like
              therapy, a workshop, a speaking engagement, or bringing Campus Care 2.0 to your campus.
            </p>
            <p>
              When you work with ACT Healing, you get more than a session or a platform. You get a team
              committed to making the experience meaningful, culturally affirming, and actionable.
            </p>
            <p>
              Our heart is to meet people where they are and help them ACT according to purpose —
              with compassion, clinical grounding, and tools that create lasting change.
            </p>
            <p>
              If you want a partner who works as hard as you do to make transformation real, we&apos;re
              ready. Let&apos;s begin.
            </p>
          </div>

          <p className="mt-10 font-script text-4xl text-[#0e4f88] md:text-5xl">Dr. Connor</p>
        </div>
      </section>

      <LogoMarquee title="Trusted by communities and partners" />

      {/* Closing CTA */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">Ready to reach out?</p>
          <h2 className="mt-4 font-display text-4xl italic text-parchment md:text-5xl">
            Invite ACT Healing to your next chapter
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-parchment/70 md:text-base">
            Tell us about your goals — personal healing, community impact, or campus wellness — and
            we&apos;ll help you choose the right pathway.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <SolutionsCta href="/contact">Contact Us</SolutionsCta>
            <SolutionsCta href="/act" variant="outline">
              Meet Dr. Connor
            </SolutionsCta>
          </div>
        </div>
      </section>
    </>
  );
}
