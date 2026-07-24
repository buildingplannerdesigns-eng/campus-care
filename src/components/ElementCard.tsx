import type { CoreElement } from "@/types";
import Image from "next/image";

// Per-element visual config

const elementConfig: Record<
  string,
  {
    imageSrc: string;
    imageAlt: string;
    imagePosition: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  water: {
    imageSrc: "/images/elements/water.jpeg",
    imageAlt: "Twilight shoreline with calm ocean waves and reflective light",
    imagePosition: "center 60%",
    accent: "#7FC4DE",
    badgeBg: "#e3f1f4",
    badgeText: "#034e5f",
  },
  fire: {
    imageSrc: "/images/elements/fire.jpeg",
    imageAlt: "People gathered around a glowing fire at dusk",
    imagePosition: "center 52%",
    accent: "#FF9D4D",
    badgeBg: "#fdf2ed",
    badgeText: "#802204",
  },
  earth: {
    imageSrc: "/images/elements/earth.jpeg",
    imageAlt: "Grounded landscape with layered hills, trees, and morning light",
    imagePosition: "center 56%",
    accent: "#C99A66",
    badgeBg: "#f7f1eb",
    badgeText: "#4d351e",
  },
  mineral: {
    imageSrc: "/images/elements/mineral.jpeg",
    imageAlt: "Mountain peaks at sunrise with clear expansive sky",
    imagePosition: "center 46%",
    accent: "#A8B3D6",
    badgeBg: "#f1f2f5",
    badgeText: "#1f2537",
  },
  nature: {
    imageSrc: "/images/elements/nature.jpeg",
    imageAlt: "Lush forest canopy with sun filtering through green leaves",
    imagePosition: "center 42%",
    accent: "#A3C98A",
    badgeBg: "#f2f5f1",
    badgeText: "#1e331a",
  },
};

// Component

export function ElementCard({ element }: { element: CoreElement }) {
  const config = elementConfig[element.key];

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#dccfc2] bg-[#fffdfa] shadow-[0_12px_28px_rgba(18,44,67,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(18,44,67,0.16)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#eadfd5]">
        <Image
          src={config.imageSrc}
          alt={config.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ objectPosition: config.imagePosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d45]/78 via-[#0f2d45]/20 to-transparent" />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ backgroundColor: config.badgeBg, color: config.badgeText }}
        >
          {element.eyebrow}
        </span>
        <h4 className="absolute bottom-4 left-4 right-4 font-display text-[1.45rem] italic leading-tight font-semibold text-white">
          {element.name}
        </h4>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div
          className="mb-4 h-[3px] w-14"
          style={{ backgroundColor: config.accent }}
          aria-hidden
        />
        <p className="text-[0.95rem] leading-relaxed text-[#3e474f]">{element.description}</p>
      </div>
    </article>
  );
}