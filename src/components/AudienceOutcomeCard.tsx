"use client";

import { HeartHandshake, Home, UserRound, UsersRound } from "lucide-react";
import type { AudienceOutcome } from "@/types";

const iconMap = {
  "user-round": UserRound,
  heart: HeartHandshake,
  house: Home,
  handshake: UsersRound,
} as const;

export function AudienceOutcomeCard({ item }: { item: AudienceOutcome }) {
  const Icon = iconMap[item.icon];

  return (
    <div className="bg-white p-7 ring-1 ring-[#eeeae4]">
      <Icon className="h-5 w-5 text-water" strokeWidth={1.5} aria-hidden />
      <p className="mt-5 font-display text-xl text-parchment">{item.audience}</p>
      <div className="mt-3 h-px w-10 bg-water/40" aria-hidden />
      <p className="mt-4 text-sm leading-relaxed text-parchment/70">{item.outcome}</p>
    </div>
  );
}
