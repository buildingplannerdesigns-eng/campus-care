import type { MentalHealthStat } from "@/types";

export function StatCard({ item }: { item: MentalHealthStat }) {
  return (
    <div className="rounded-sanctuary border border-sanctuary-700 bg-sanctuary-900 p-6">
      <p className="font-display text-4xl font-light text-ember md:text-5xl">{item.stat}</p>
      <p className="mt-3 text-sm leading-relaxed text-parchment/80">{item.description}</p>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-parchment/50 underline decoration-dotted underline-offset-4 hover:text-ember"
      >
        {item.source}
      </a>
    </div>
  );
}
