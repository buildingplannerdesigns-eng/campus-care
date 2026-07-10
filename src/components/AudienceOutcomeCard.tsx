"use client";

import { Handshake, Heart, House, UserRound } from "lucide-react";
import type { AudienceOutcome } from "@/types";

const iconMap = {
  "user-round": UserRound,
  heart: Heart,
  house: House,
  handshake: Handshake,
} as const;

export function AudienceOutcomeCard({ item }: { item: AudienceOutcome }) {
  const Icon = iconMap[item.icon];

  return (
    <div className="bg-white p-7 shadow-[0_14px_30px_rgba(0,0,0,0.05)] ring-1 ring-[#eeeae4] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(31,92,115,0.12)]">
      <div className="flex h-11 w-11 items-center justify-center bg-water/10 text-water">
        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
      </div>
      <p className="mt-5 font-display text-xl text-parchment">{item.audience}</p>
      <div className="mt-3 h-px w-10 bg-water/40" aria-hidden />
      <p className="mt-4 text-sm leading-relaxed text-parchment/70">{item.outcome}</p>
    </div>
  );
}