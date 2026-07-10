import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";
import { TeamDetailsDrawer } from "@/components/TeamDetailsDrawer";
import { team, pointOfContact } from "@/data/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "The people behind ACT Healing and Campus Care 2.0.",
};

export default function TeamPage() {
  const [featuredMember, ...teamMembers] = team;

  return (
    <>
      <Section className="pt-20">
        <div className="overflow-hidden border border-[#d7dfda] bg-[linear-gradient(145deg,#0c3f84_0%,#0c3f84_100%)]">
          <div className="flex flex-col justify-center px-6 py-14 text-white md:px-10 md:py-16 lg:px-14 lg:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">Meet the Team</p>
              <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.02] md:text-6xl">
                The people shaping Campus Care 2.0
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
                A focused group of clinicians, strategists, and builders working to make student support feel human,
                practical, and easy to access.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-none border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0c3f84] transition hover:bg-transparent hover:text-white"
                >
                  Contact Us
                  <span className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" aria-hidden>
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/programs"
                  className="group inline-flex items-center justify-center rounded-none border border-white/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-[#0c3f84]"
                >
                  Explore Programs
                  <span className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" aria-hidden>
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
          </div>
        </div>
      </Section>

      {featuredMember && (
        <Section className="border-t border-sanctuary-700/60 bg-[#f7fafc]">
          <div className="mx-auto max-w-5xl">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#0c3f84]">Featured Lead</p>
            <div className="grid items-start gap-10 md:grid-cols-[260px_1fr] lg:gap-16">

              {/* Portrait */}
              <div className="flex flex-col items-center text-center">
                <div className="relative h-60 w-60 overflow-hidden rounded-full border-[5px] border-[#d5e1ee] bg-[#edf2f7] shadow-[0_16px_40px_rgba(12,63,132,0.18)]">
                  {featuredMember.image ? (
                    <Image
                      src={featuredMember.image}
                      alt={`${featuredMember.name} photo`}
                      fill
                      className="object-cover object-top"
                      sizes="280px"
                    />
                  ) : (
                    <div className="h-full w-full bg-[linear-gradient(145deg,#0c3f84_0%,#1f5c73_55%,#3d5a3a_100%)]" />
                  )}
                </div>
                <h2 className="mt-5 font-display text-2xl text-[#113f6c]">{featuredMember.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#5b6d7f]">{featuredMember.role}</p>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4e6f95]">Profile</p>
                  <p className="mt-3 text-base leading-relaxed text-[#355879]">{featuredMember.bio}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-[#d8e1ea] bg-white p-5 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c3f84]">Specialty</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#355879]">Intergenerational trauma care, restorative healing systems, and clinical wellness design.</p>
                  </div>
                  <div className="border border-[#d8e1ea] bg-white p-5 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0c3f84]">Engagements</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#355879]">Keynotes, workshops, leadership coaching, and campus transformation strategy.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-[#d9e1dc] pt-5">
                  <Link
                    href="/dr-cammie-connor"
                    className="group inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
                  >
                    View Full Profile
                    <span className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" aria-hidden>
                      <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#0e4f88] transition-all duration-200 hover:bg-[#0e4f88] hover:text-white"
                  >
                    Book Dr. Cammie
                    <span className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" aria-hidden>
                      <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="The Team" heading="Collaborators Across Clinical, Creative, and Technical Work" />
        <p className="mt-4 max-w-2xl text-parchment/70">
          Open any card to view a dedicated detail drawer for that team member.
        </p>
        <div className="mt-10">
          <TeamDetailsDrawer teamMembers={teamMembers} />
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="Press & Partnerships" heading="Point of Contact" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-none border border-[#d7dfda] bg-[#0c3f84] p-8 text-white shadow-[0_16px_36px_rgba(12,63,132,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Primary Contact</p>
            <h3 className="mt-3 font-display text-3xl">{pointOfContact.name}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/70">{pointOfContact.role}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/85">
              For interviews, partnerships, or general enquiries, reach out using the details below.
            </p>
          </div>

          <div className="rounded-none border border-[#d7dfda] bg-white p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {pointOfContact.email && (
                <div className="border border-[#dbe2de] bg-[#f8f9f6] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Email</p>
                  <a href={`mailto:${pointOfContact.email}`} className="mt-2 block text-sm text-[#113f6c] transition hover:text-[#0c3f84]">
                    {pointOfContact.email}
                  </a>
                </div>
              )}
              {pointOfContact.phone && (
                <div className="border border-[#dbe2de] bg-[#f8f9f6] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Phone</p>
                  <p className="mt-2 text-sm text-[#113f6c]">{pointOfContact.phone}</p>
                </div>
              )}
              {pointOfContact.location && (
                <div className="border border-[#dbe2de] bg-[#f8f9f6] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Location</p>
                  <p className="mt-2 text-sm text-[#113f6c]">{pointOfContact.location}</p>
                </div>
              )}
              {pointOfContact.availableForTravel && (
                <div className="border border-[#dbe2de] bg-[#f8f9f6] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Availability</p>
                  <p className="mt-2 text-sm text-[#113f6c]">Available for travel</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
