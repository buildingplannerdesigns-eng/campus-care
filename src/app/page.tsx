import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { DonateButton } from "@/components/DonateButton";
import { siteCopy } from "@/data/copy";
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
  const blogPosts = await getBlogPosts();
  const { mission: fallbackMission } = siteCopy;
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <HomeHero />

      {/* Post-hero — Patrice-style editorial welcome */}
      <section className="relative overflow-hidden border-b border-[#e6e0d6] bg-[#f7f8f9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #0e4f88 0%, transparent 42%), radial-gradient(circle at 82% 70%, #1f5c73 0%, transparent 40%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          {/* Large lead statement — like Patrice’s purpose question */}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0e4f88]/75">
              ACT Campus Care 2.0
            </p>
            <h2 className="mt-5 font-display text-[2rem] italic leading-[1.15] text-[#113f6c] sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              {fallbackMission.heading}
            </h2>
          </div>

          {/* Portrait + welcome story */}
          <div className="mt-14 grid items-center gap-12 md:mt-20 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-16 lg:gap-20">
            <div className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
              <div
                className="absolute -bottom-4 -right-4 hidden h-full w-full border border-[#0e4f88]/20 md:block"
                aria-hidden
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8eef3]">
                <Image
                  src="/images/team/dr.cammie.jpg"
                  alt="Dr. Cammie Connor"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 90vw, 44vw"
                  priority
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-display text-4xl italic leading-[1.08] text-[#113f6c] md:text-5xl lg:text-[3.5rem]">
                Welcome All,
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#5b6d7f]">
                I am Dr. Cammie Connor
              </p>
              <div className="mx-auto mt-6 h-px w-16 bg-[#0e4f88]/35 md:mx-0" aria-hidden />

              <div className="mx-auto mt-8 max-w-xl space-y-5 text-left md:mx-0 md:max-w-none">
                <p className="text-base leading-relaxed text-parchment/75 md:text-lg">
                  My name is Cammie Connor, Ph.D., and a Licensed Professional Counselor (LPC) in the
                  state of Missouri with over 20 years of experience. You just made an important step
                  in the change process and on your way to transitioning to a more achieving life.
                </p>
                <p className="text-base leading-relaxed text-parchment/75 md:text-lg">
                  A woman of purpose, I help individuals put their life back together one piece at a
                  time — and empower you to ACT on your purpose through counseling, coaching, and
                  Campus Care.
                </p>
              </div>

              <p className="mt-8 font-display text-2xl italic leading-snug text-[#0e4f88] md:text-3xl">
                Let me support your journey.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
                <HomeCta href="/act">Learn More</HomeCta>
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
            <div className="overflow-hidden border border-[#e6e0d6] bg-white text-left">
              <div className="relative aspect-[4/3] bg-[#e8eef3]">
                <Image
                  src="/images/team/consellor.jpg"
                  alt="Dr. Connor — Counseling"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 640px) 90vw, 360px"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-water">ACT Counseling</p>
                <h3 className="mt-3 font-display text-xl leading-snug text-parchment md:text-2xl">
                  Individual, couples &amp; family sessions
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-parchment/70">
                  Culturally grounded, relational work led by Dr. Connor.
                </p>
              </div>
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
            <DonateButton />
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
            <DonateButton variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
