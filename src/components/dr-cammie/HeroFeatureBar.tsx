import Image from "next/image";

type FeatureItem = {
  icon: "timer" | "document" | "checkmark";
  label: string;
};

const iconSrc = {
  timer: "/images/icons/timer.gif",
  document: "/images/icons/document.gif",
  checkmark: "/images/icons/checkmark.gif",
} as const;

export function HeroFeatureBar({ items }: { items: readonly FeatureItem[] }) {
  return (
    <section className="bg-[#0e4f88]">
      <div className="mx-auto grid max-w-6xl divide-y divide-white/30 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 px-6 py-7 text-white md:gap-5 md:px-8 md:py-8"
          >
            {/* Animated GIFs — same technique as stefaniegass.com/bootcamp */}
            <Image
              src={iconSrc[item.icon]}
              alt=""
              width={42}
              height={42}
              className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
              unoptimized
            />
            <p className="text-sm font-medium leading-snug tracking-wide md:text-[0.95rem]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
