import type { Metadata } from "next";
import { Section, SectionHeading, PrimaryButton } from "@/components/ui";
import { AudienceOutcomeCard } from "@/components/AudienceOutcomeCard";
import { TeamDetailsDrawer } from "@/components/TeamDetailsDrawer";
import { audienceOutcomes } from "@/data/audiences";
import { team } from "@/data/team";
import { siteCopy } from "@/data/copy";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ACT Healing empowers individuals, couples, families, and communities to heal from past wounds and build lasting resilience.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-20">
        <div className="overflow-hidden border border-[#d7dfda] bg-white shadow-[0_18px_40px_rgba(12,63,132,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="bg-[linear-gradient(145deg,#0c3f84_0%,#104f9e_100%)] px-6 py-14 text-white md:px-10 md:py-16 lg:px-14 lg:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">About Us</p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.02] md:text-6xl">
                Agents of Change and Transformation
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                {siteCopy.mission.heading}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/78 md:text-base">
                {siteCopy.mission.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton href="/contact">Work With Us</PrimaryButton>
              </div>
            </div>

            <div className="flex items-center bg-[#fbfaf7] px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-16">
              <div className="w-full border border-[#d7dfda] bg-white p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4e6f95]">Our Guiding Statement</p>
                <blockquote className="mt-4 font-display text-3xl italic leading-tight text-[#113f6c] md:text-4xl">
                  {siteCopy.guidingStatement}
                </blockquote>
                <p className="mt-5 text-sm leading-relaxed text-[#355879]">
                  We build healing-centered experiences that honor the whole person and translate trauma-informed care into practical support.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="border border-[#dbe2de] bg-[#faf9f7] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Focus</p>
                    <p className="mt-2 text-sm text-[#113f6c]">Trauma-informed healing</p>
                  </div>
                  <div className="border border-[#dbe2de] bg-[#faf9f7] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Approach</p>
                    <p className="mt-2 text-sm text-[#113f6c]">Culturally grounded support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="Therapeutic Services" heading="What Healing Means for Every Circle" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audienceOutcomes.map((item) => (
            <AudienceOutcomeCard key={item.audience} item={item} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading heading="Rooted in Intergenerational Trauma Expertise" />
        <p className="mt-6 max-w-2xl text-parchment/70">
          Dr. Cammie&apos;s expertise in intergenerational trauma helps break the thought
          patterns that are not serving purpose — informing every module inside Campus
          Care 2.0.
        </p>
      </Section>

      <Section className="border-t border-sanctuary-700/60">
        <SectionHeading eyebrow="Meet the Team" heading="The People Behind the Work" />
        <p className="mt-4 max-w-2xl text-parchment/70">
          Tap any card to open a profile with their details, email, and social links.
        </p>
        <div className="mt-10">
          <TeamDetailsDrawer teamMembers={team} />
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 text-center">
        <p className="mx-auto max-w-xl text-parchment/70">
          Ready to bring this work to your campus or organization?
        </p>
        <div className="mt-6 flex justify-center">
          <PrimaryButton href="/contact">Get in touch</PrimaryButton>
        </div>
      </Section>
    </>
  );
}
