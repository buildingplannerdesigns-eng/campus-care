import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { siteCopy } from "@/data/copy";
import { getEditableSiteCopy } from "@/lib/content/siteCopy";
import { getBlogPosts } from "@/lib/blog";

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

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-3xl italic text-[#0e4f88] md:text-4xl">{children}</p>
  );
}

export default async function HomePage() {
  const [editable, blogPosts] = await Promise.all([
    getEditableSiteCopy(),
    getBlogPosts(),
  ]);
  const { mission: fallbackMission } = siteCopy;
  const hero = editable.hero;
  const mission = editable.mission;
  const guidingStatement = editable.guidingStatement;
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
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
              <HomeCta href="/act">Meet Dr. Connor</HomeCta>
              <HomeCta href="/contact" variant="outline">
                Contact Us
              </HomeCta>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
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

      {/* ACT — Dr. Connor intro */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="order-2 text-center md:order-1 md:text-left">
              <SectionEyebrow>ACT</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.1] text-[#113f6c] md:text-5xl lg:text-[3.25rem]">
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
                    alt="Dr. Cammie Connor"
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

      {/* Solutions */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionEyebrow>Solutions</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Two pathways. One purpose.
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            Book ACT Healing for therapy, coaching, workshops, and speaking — or bring Campus Care
            interventions to your campus and community.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="border border-[#e6e0d6] bg-white p-6 text-left md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">Therapy</p>
              <h3 className="mt-3 font-display text-xl leading-snug text-parchment md:text-2xl">
                Individual, couples &amp; family sessions
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">
                Culturally grounded, relational work led by Dr. Connor.
              </p>
            </div>
            <div className="border border-[#e6e0d6] bg-white p-6 text-left md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
                Interventions
              </p>
              <h3 className="mt-3 font-display text-xl leading-snug text-parchment md:text-2xl">
                Campus &amp; community programs
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">
                Bio-responsive VR wellness for HBCU campuses at scale.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <HomeCta href="/solutions">Explore Solutions</HomeCta>
          </div>
        </div>
      </section>

      {/* Campus Care */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionEyebrow>Campus Care</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Immersive wellness for campuses and care teams
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <div className="mx-auto mt-6 max-w-2xl space-y-4">
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Campus Care 2.0 — the VR Sanctuary — is an immersive wellness platform designed to
              support student mental health with culturally affirming digital experiences.
            </p>
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              It expands creative reflection, connection, and access to care for organizations ready to
              grow restorative wellness.
            </p>
          </div>
          <div className="mt-9 flex justify-center">
            <HomeCta href="/campus-care">Explore Campus Care</HomeCta>
          </div>
        </div>
      </section>

      {/* Courses — Coming Soon */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-3">
            <SectionEyebrow>Courses</SectionEyebrow>
            <span className="animate-blink inline-flex items-center rounded-sm bg-[#C4471E] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
              Coming Soon
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Programs built for lasting change
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            Workshops, professional training, and campus-ready frameworks are on the way. Register
            early interest and we&apos;ll notify you when enrollment opens.
          </p>
          <div className="mt-9 flex justify-center">
            <HomeCta href="/courses">Register Early Interest</HomeCta>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-[#eeeae4] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Blog</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl leading-snug text-parchment md:text-4xl">
              Insights on culturally grounded wellness
            </h2>
            <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          </div>

          {featuredPosts.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden border border-[#e6e0d6] bg-white transition-shadow duration-300 hover:shadow-[0_18px_38px_rgba(12,63,132,0.1)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {post.category && (
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-water">
                        {post.category}
                      </p>
                    )}
                    <h3 className="mt-3 font-display text-lg leading-snug text-parchment md:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/70">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-[#0e4f88]">
                      Read article
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <HomeCta href="/blog">Read the Blog</HomeCta>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section className="border-t border-[#eeeae4] bg-[#faf9f7] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionEyebrow>Payments</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Support the work of healing and campus wellness
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <div className="mx-auto mt-6 max-w-2xl space-y-4">
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Your gift helps expand ACT Healing programs and bring Campus Care 2.0 to more students
              and communities.
            </p>
            <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
              Give once or set up ongoing support through Donorbox — every contribution moves this
              mission forward.
            </p>
          </div>
          <div className="mt-9 flex justify-center">
            <HomeCta href="/payments">Make a Payment</HomeCta>
          </div>
        </div>
      </section>

      {/* Get Started */}
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
            Reach out or meet Dr. Cammie Connor to begin the conversation.
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
