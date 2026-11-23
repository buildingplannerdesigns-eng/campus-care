import Image from "next/image";

const MILE_CHALLENGES = [
  { label: "Sponsor 1 mile", amount: "$26.20" },
  { label: "Sponsor 2 miles", amount: "$52.40" },
  { label: "Sponsor 5 miles", amount: "$131.00" },
  { label: "Sponsor 10 miles", amount: "$262.00" },
  { label: "Sponsor the entire Marathon", amount: "$686.84" },
] as const;

const HEALING_ENVIRONMENTS_SRC = "/images/campus-care/healing-environments.png";

export function MarathonJourneyChallenge() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0e4f88]">
          Challenge
        </p>
        <h3 className="mt-3 font-display text-2xl leading-snug text-parchment md:text-3xl">
          Will you participate in the journey?
        </h3>
        <div className="mx-auto mt-4 max-w-xl space-y-3 text-sm leading-relaxed text-parchment/70 md:text-base">
          <p>I invite you to become part of this journey.</p>
          <p>Sponsor a mile. Make a donation. Become a founding partner.</p>
          <p className="font-medium text-parchment/85">
            Together, we can turn 26.2 miles into a movement for healing.
          </p>
        </div>
      </div>

      <ul className="divide-y divide-[#e6e0d6] border border-[#e6e0d6] bg-white">
        {MILE_CHALLENGES.map((tier) => (
          <li
            key={tier.label}
            className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 sm:px-6"
          >
            <span className="text-sm font-medium text-parchment md:text-base">{tier.label}</span>
            <span className="font-display text-xl tabular-nums text-[#0e4f88] md:text-2xl">
              {tier.amount}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <p className="text-sm leading-relaxed text-parchment/70 md:text-base">
          I invite Corporate partners to become Founding Sponsors of one of the five immersive
          healing environments.
        </p>
        <div className="relative mx-auto mt-6 w-full max-w-xl overflow-hidden border border-[#d9d2c6] bg-white">
          <Image
            src={HEALING_ENVIRONMENTS_SRC}
            alt="Campus Care 2.0 five immersive healing environments — Fire, Water, Nature, Earth, and Minerals"
            width={1200}
            height={1500}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 576px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
