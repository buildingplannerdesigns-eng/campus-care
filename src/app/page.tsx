import Image from "next/image";
import Link from "next/link";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BrandLogo } from "@/components/BrandLogo";
import { DesktopVideoMockup } from "@/components/dr-cammie/DesktopVideoMockup";
import { siteCopy } from "@/data/copy";
import { getEditableSiteCopy } from "@/lib/content/siteCopy";

export const revalidate = 60;

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

export default async function HomePage() {
  const editable = await getEditableSiteCopy();
  const { mission: fallbackMission } = siteCopy;
  const hero = editable.hero;
  const mission = editable.mission;
  const guidingStatement = editable.guidingStatement;

  return (
    <>
      <section className="border-b border-[#eeeae4]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-20 lg:gap-20 lg:py-24">
          <div className="flex justify-center md:justify-end">
            <BrandLogo size="xl" priority alt="ACT Healing logo" />
          </div>

          <div className="text-center md:text-left">
            <h1 className="font-body text-xl font-bold uppercase tracking-[0.08em] text-[#0e4f88] md:text-2xl lg:text-[1.65rem]">
              {hero.orgName}
            </h1>
            <div className="mx-auto mt-4 h-1 w-full max-w-md bg-[#0e4f88] md:mx-0" />
            <p className="mx-auto mt-6 max-w-md text-base font-semibold leading-relaxed text-[#333] md:mx-0 md:text-lg">
              {hero.tagline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <HomeCta href="/campus-care">Explore Campus Care</HomeCta>
              <HomeCta href="/contact" variant="outline">
                Contact Us
              </HomeCta>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee title="Trusted by communities and partners" />

      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">See It in Action</p>
            <h2 className="mt-3 font-display text-3xl italic text-parchment md:text-4xl">
              Campus Care 2.0 in Motion
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-parchment/65">
              A short look at the immersive wellness experience.
            </p>
          </div>
          <DesktopVideoMockup title={hero.videoTitle} urlBar="actcampuscare.com" />
        </div>
      </section>

      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="font-display text-3xl italic leading-snug text-parchment md:text-4xl">
            {mission.heading || fallbackMission.heading}
          </blockquote>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            {guidingStatement}
          </p>
        </div>
      </section>

      {/* Campus Care */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl italic text-[#0e4f88] md:text-4xl">Campus Care</p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Immersive wellness for campuses and care teams
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <div className="mx-auto mt-6 max-w-2xl space-y-4">
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Campus Care 2.0 is an immersive wellness platform designed to support student mental health
              with culturally affirming digital experiences.
            </p>
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              It expands creative reflection, connection, and access to care for organizations ready to grow
              restorative wellness.
            </p>
          </div>
          <div className="mt-9 flex justify-center">
            <HomeCta href="/campus-care">Explore Campus Care</HomeCta>
          </div>
        </div>
      </section>

      {/* ACT — Stefanie-inspired intro with portrait */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="order-2 text-center md:order-1 md:text-left">
              <h2 className="font-display text-4xl leading-[1.1] text-[#113f6c] md:text-5xl lg:text-[3.25rem]">
                Hi Friend! I&apos;m Dr. Connor
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#5b6d7f]">
                Intergenerational trauma expert &amp; founder of ACT Healing
              </p>
              <div className="mx-auto mt-6 space-y-4 md:mx-0">
                <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
                  For years, I&apos;ve helped individuals, couples, families, and communities heal from
                  patterns that no longer serve them — with culturally grounded care and practical tools
                  for lasting change.
                </p>
                <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
                  Through speaking, workshops, coaching, and Campus Care 2.0, my work is built to help you
                  transform pain into purpose and ACT on what matters most.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <HomeCta href="/act">Explore ACT</HomeCta>
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-md md:order-2 md:max-w-none">
              <div className="relative">
                <div className="absolute -left-3 -top-3 hidden h-full w-full border border-[#0e4f88]/25 md:block" aria-hidden />
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eef2ef] shadow-[0_24px_50px_rgba(17,63,108,0.14)]">
                  <Image
                    src="/images/team/dr.cammie.jpg"
                    alt="Dr. Connor"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 90vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Elements — summary */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-water">The Diaspora VR Sanctuary</p>
            <h2 className="mt-3 font-display text-3xl italic text-parchment md:text-4xl">
              The 5 Core Elements™
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-parchment/65">
              Five immersive environments — each a pathway from stress to steadiness. Explore the full
              experience on the Campus Care page.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "Water", focus: "Regulation", accent: "#7FC4DE" },
              { label: "Fire", focus: "Release", accent: "#FF9D4D" },
              { label: "Earth", focus: "Grounding", accent: "#C99A66" },
              { label: "Mineral", focus: "Perspective", accent: "#A8B3D6" },
              { label: "Nature", focus: "Renewal", accent: "#A3C98A" },
            ].map((element, index) => (
              <div
                key={element.label}
                className={`border-t-2 pt-3 text-center ${index === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                style={{ borderColor: element.accent }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-water">0{index + 1}</p>
                <p className="mt-1 font-display text-xl italic text-parchment">{element.label}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-parchment/55">{element.focus}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <HomeCta href="/campus-care">Explore the Elements</HomeCta>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl italic text-[#0e4f88] md:text-4xl">Courses</p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Programs built for lasting change
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <div className="mx-auto mt-6 max-w-2xl space-y-4">
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              From professional courses to campus-ready frameworks, our programs translate ACT Healing into
              practical pathways.
            </p>
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Explore the five core elements and tools designed to help communities regulate stress and build
              resilience.
            </p>
          </div>
          <div className="mt-9 flex justify-center">
            <HomeCta href="/courses">View Courses</HomeCta>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl italic text-[#0e4f88] md:text-4xl">Payments</p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Support the work of healing and campus wellness
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <div className="mx-auto mt-6 max-w-2xl space-y-4">
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Your gift helps expand ACT Healing programs and bring Campus Care 2.0 to more students and
              communities.
            </p>
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Give once or set up ongoing support — every contribution moves this mission forward.
            </p>
          </div>
          <div className="mt-9 flex justify-center">
            <HomeCta href="/payments">Make a Payment</HomeCta>
          </div>
        </div>
      </section>

      <section
        className="py-20 text-center md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 28, 42, 0.72), rgba(18, 28, 42, 0.72)), linear-gradient(160deg, #1a3348 0%, #2a5570 45%, #1e3d35 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">Get Started</p>
          <p className="mx-auto mt-5 max-w-2xl font-display text-2xl italic leading-snug text-white md:text-3xl">
            Ready to bring healing, transformation, and campus wellness into your community?
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
            Reach out or meet Dr. Connor to begin the conversation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <HomeCta href="/contact" variant="light">
              Contact Us
            </HomeCta>
            <HomeCta href="/act" variant="outline">
              Meet Dr. Connor
            </HomeCta>
            <HomeCta href="/payments" variant="outline">
              Make a Payment
            </HomeCta>
          </div>
        </div>
      </section>
    </>
  );
}
