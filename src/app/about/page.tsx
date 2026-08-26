import type { LucideIcon } from "lucide-react";
import {
  Target,
  Eye,
  Brain,
  UsersRound,
  Fingerprint,
  Landmark,
  GraduationCap,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Section, SectionHeading, PrimaryButton } from "@/components/ui";
import { AudienceOutcomeCard } from "@/components/AudienceOutcomeCard";
import { TeamDetailsDrawer } from "@/components/TeamDetailsDrawer";
import { audienceOutcomes } from "@/data/audiences";
import { getTeamMembers } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Campus Care 2.0 is an immersive, culturally grounded VR sanctuary helping HBCU students and communities heal, connect, and thrive.",
  path: "/about",
  keywords: [
    "about Campus Care",
    "Campus Care 2.0",
    "VR Sanctuary",
    "HBCU wellness",
    "culturally grounded care",
  ],
});

const coreGoals: {
  number: string;
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    number: "01",
    title: "Promote Emotional Wellness",
    body: "Provide compassionate, evidence-based counseling that supports healing from anxiety, depression, trauma, grief, stress, and life transitions.",
    icon: Brain,
  },
  {
    number: "02",
    title: "Strengthen Relationships",
    body: "Equip couples and families with communication, conflict resolution, emotional regulation, and relationship-building skills that foster healthy connections across generations.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Restore Identity and Purpose",
    body: "Support clients in discovering their strengths, cultural identity, values, and life purpose while building confidence and resilience.",
    icon: Fingerprint,
  },
  {
    number: "04",
    title: "Transform Communities",
    body: "Develop partnerships with schools, colleges, organizations, faith communities, and businesses to increase awareness of mental health and expand access to culturally responsive services.",
    icon: Landmark,
  },
  {
    number: "05",
    title: "Cultivate Future Leaders",
    body: "Empower individuals to become advocates for mental wellness, community healing, and positive social change by inspiring collective responsibility and transformational leadership.",
    icon: GraduationCap,
  },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <PageIntro
        label="About"
        size="lg"
        heading="Campus Care is an immersive healing experience for students and communities."
        body="Campus Care 2.0 — the VR Sanctuary — is a culturally grounded virtual reality platform that supports mental well-being by tackling stress, anxiety, and depression, so students can connect, care, and belong."
      />

      {/* Mission & Vision */}
      <Section className="border-t border-sanctuary-700/60 bg-sage">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">
            What Guides Us
          </p>
          <h2 className="mt-3 font-display text-3xl italic leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            Mission &amp; Vision
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="flex h-full flex-col border border-[#e2ded4] bg-white p-8 md:p-10">
            <Target className="h-7 w-7 text-[#0e4f88]" strokeWidth={1.5} aria-hidden />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-water">Mission</p>
            <h3 className="mt-3 font-display text-3xl italic leading-snug text-[#113f6c]">
              Why we exist
            </h3>
            <div className="mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
            <p className="mt-6 text-sm leading-relaxed text-parchment/75 md:text-base">
              At ACT (Agents of Change and Transformation), our mission is to empower individuals,
              couples, families, and communities to heal, grow, and thrive through culturally
              responsive, trauma-informed, and evidence-based counseling services. We honor each
              person&apos;s story while fostering resilience, emotional wellness, healthy relationships,
              and purposeful living. By embracing cultural identity, compassion, and hope, we inspire
              meaningful transformation that extends from the individual to the family, campus,
              workplace, and community.
            </p>
          </article>

          <article className="flex h-full flex-col border border-[#e2ded4] bg-[#0c3f84] p-8 text-white md:p-10">
            <Eye className="h-7 w-7 text-white" strokeWidth={1.5} aria-hidden />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Vision</p>
            <h3 className="mt-3 font-display text-3xl italic leading-snug text-white">
              The future we&apos;re building
            </h3>
            <div className="mt-5 h-px w-14 bg-white/35" aria-hidden />
            <p className="mt-6 text-sm leading-relaxed text-white/85 md:text-base">
              Our vision is to become a nationally recognized leader in culturally grounded
              behavioral health and transformational counseling by creating safe spaces where healing,
              belonging, and personal growth flourish. We envision communities where mental wellness
              is accessible, stigma is reduced, families are strengthened, and every individual
              recognizes their capacity to become an Agent of Change and Transformation.
            </p>
          </article>
        </div>
      </Section>

      {/* Core Goals */}
      <Section className="border-t border-sanctuary-700/60 bg-sage">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-water">
            Core Goals
          </p>
          <h2 className="mt-3 font-display text-3xl italic leading-snug text-parchment md:text-4xl lg:text-[2.75rem]">
            What we work toward
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-[#0e4f88]/35" aria-hidden />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">
            Five commitments that shape every counseling relationship, campus partnership, and
            community program we lead.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreGoals.map(({ number, title, body, icon: Icon }, index) => (
            <article
              key={title}
              className={`border border-[#e2ded4] bg-white p-6 md:p-7 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <Icon className="h-6 w-6 shrink-0 text-[#0e4f88]" strokeWidth={1.5} aria-hidden />
                <span className="font-display text-3xl italic text-[#0e4f88]/25">{number}</span>
              </div>
              <h3 className="mt-5 font-display text-xl italic leading-snug text-[#113f6c] md:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-sanctuary-700/60 bg-sanctuary-900">
        <SectionHeading eyebrow="Meet the Team" heading="The People Behind the Work" />
        <p className="mt-4 max-w-2xl text-parchment/70">
          Tap any card to open a profile with their details, email, and social links.
        </p>
        <div className="mt-10">
          <TeamDetailsDrawer teamMembers={teamMembers} />
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
