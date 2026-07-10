import type { ElementKey } from "@/types";

export const elementAccent: Record<ElementKey, { text: string; border: string; bg: string }> = {
  water: { text: "text-water-glow", border: "border-water", bg: "bg-water/10" },
  fire: { text: "text-fire-glow", border: "border-fire", bg: "bg-fire/10" },
  earth: { text: "text-earth-glow", border: "border-earth", bg: "bg-earth/10" },
  mineral: { text: "text-mineral-glow", border: "border-mineral", bg: "bg-mineral/10" },
  nature: { text: "text-nature-glow", border: "border-nature", bg: "bg-nature/10" },
};
