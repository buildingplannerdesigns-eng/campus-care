import Image from "next/image";

type LogoItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type LogoMarqueeProps = {
  title?: string;
  logos?: LogoItem[];
  className?: string;
};

const defaultLogos: LogoItem[] = [
  { src: "/images/logos/partner-01.svg", alt: "Partner logo 01", width: 220, height: 84 },
  { src: "/images/logos/partner-02.svg", alt: "Partner logo 02", width: 220, height: 84 },
  { src: "/images/logos/partner-03.svg", alt: "Partner logo 03", width: 220, height: 84 },
  { src: "/images/logos/partner-04.svg", alt: "Partner logo 04", width: 220, height: 84 },
  { src: "/images/logos/partner-05.svg", alt: "Partner logo 05", width: 220, height: 84 },
  { src: "/images/logos/partner-06.svg", alt: "Partner logo 06", width: 220, height: 84 },
  { src: "/images/logos/partner-07.svg", alt: "Partner logo 07", width: 220, height: 84 },
  { src: "/images/logos/partner-08.svg", alt: "Partner logo 08", width: 220, height: 84 },
];

export function LogoMarquee({
  title = "Trusted by brands and partners",
  logos = defaultLogos,
  className = "",
}: LogoMarqueeProps) {
  const loopLogos = [...logos, ...logos];
  const getCardWidth = (logo: LogoItem) => {
    const ratio = logo.width / logo.height;
    return Math.min(250, Math.max(170, Math.round(ratio * 74)));
  };

  return (
    <section className={`border-y border-[#1a5f9f] bg-[#0e4f88] ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-5">
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
          {title}
        </p>
        <div className="relative overflow-hidden">
          <div className="logo-marquee-track flex min-w-max items-center gap-4 md:gap-5">
            {loopLogos.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="inline-flex h-16 items-center justify-center border border-white/20 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(3,27,48,0.22)] md:h-[74px] md:px-5"
                style={{ width: `${getCardWidth(logo)}px` }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-9 w-auto max-w-full object-contain md:max-h-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
