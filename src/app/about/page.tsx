import { Compass, Eye, Target } from "lucide-react";
import { Section, SectionHeading, PrimaryButton } from "@/components/ui";
import { AudienceOutcomeCard } from "@/components/AudienceOutcomeCard";
import { audienceOutcomes } from "@/data/audiences";
import { getEditableSiteCopy } from "@/lib/content/siteCopy";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "ACT Healing empowers individuals, couples, families, and communities to heal from past wounds and build lasting resilience.",
  path: "/about",
  keywords: ["about ACT Healing", "Agents of Change and Transformation", "team"],
});

export default async function AboutPage() {
  const copy = await getEditableSiteCopy();

  return (
    <>
      <Section className="pt-20">
        <div className="overflow-hidden border border-[#d7dfda] bg-white shadow-[0_18px_40px_rgba(12,63,132,0.08)]">
          <div className="bg-[linear-gradient(145deg,#0c3f84_0%,#104f9e_100%)] px-6 py-14 text-white md:px-10 md:py-16 lg:px-14 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">About Us</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] md:text-6xl">
              Agents of Change and Transformation
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
              {copy.mission.heading}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/78 md:text-base">
              {copy.mission.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/contact">Work With Us</PrimaryButton>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 bg-[#faf9f7]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">
            What Guides Us
          </p>
          <h2 className="mt-3 font-display text-3xl italic leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Mission, Vision &amp; Goal
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            The three statements that anchor every ACT Healing program, Campus Care initiative, and
            partnership we take on.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="flex flex-col border border-[#e2ded4] bg-white p-8 shadow-[0_18px_40px_rgba(12,63,132,0.06)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0e4f88]/10 text-[#0e4f88]">
              <Compass className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
              Mission
            </p>
            <h3 className="mt-2 font-display text-2xl italic leading-snug text-[#113f6c]">
              Why we exist
            </h3>
            <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-parchment/75 md:text-base" />
          </article>

          <article className="flex flex-col border border-[#e2ded4] bg-white p-8 shadow-[0_18px_40px_rgba(12,63,132,0.06)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0e4f88]/10 text-[#0e4f88]">
              <Eye className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
              Vision
            </p>
            <h3 className="mt-2 font-display text-2xl italic leading-snug text-[#113f6c]">
              The future we&apos;re building
            </h3>
            <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-parchment/75 md:text-base" />
          </article>

          <article className="flex flex-col border border-[#e2ded4] bg-white p-8 shadow-[0_18px_40px_rgba(12,63,132,0.06)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0e4f88]/10 text-[#0e4f88]">
              <Target className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-water">
              Goal
            </p>
            <h3 className="mt-2 font-display text-2xl italic leading-snug text-[#113f6c]">
              What we work toward
            </h3>
            <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-parchment/75 md:text-base" />
          </article>
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
          Dr. Connor&apos;s expertise in intergenerational trauma helps break the thought
          patterns that are not serving purpose — informing every module inside Campus
          Care 2.0.
        </p>
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
