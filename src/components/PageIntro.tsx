import type { ReactNode } from "react";

type PageIntroProps = {
  label: string;
  heading: ReactNode;
  body?: ReactNode;
  aside?: ReactNode;
  extra?: ReactNode;
  size?: "md" | "lg";
};

export function PageIntro({
  label,
  heading,
  body,
  aside,
  extra,
  size = "md",
}: PageIntroProps) {
  const large = size === "lg";

  return (
    <section className="bg-sage" aria-label="Page hero">
      <div className="bg-[#1a3c40]">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-4 sm:gap-8 sm:px-10 lg:px-16">
          <p
            className={`shrink-0 whitespace-nowrap font-body uppercase text-[#C9A87C] ${
              large
                ? "text-xs font-medium tracking-[0.34em] sm:text-sm sm:tracking-[0.4em]"
                : "text-[11px] font-normal tracking-[0.32em] sm:text-xs sm:tracking-[0.38em]"
            }`}
          >
            {label}
          </p>
          <div className="h-px min-w-0 flex-1 bg-white/85" aria-hidden />
        </div>
      </div>

      <div
        className={`mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-20 lg:px-16 ${
          aside ? "grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""
        }`}
      >
        <div className={large ? "max-w-5xl" : "max-w-3xl"}>
          <h1
            className={`font-normal text-[#1a3c40] ${
              large
                ? "font-display text-[2.85rem] font-medium leading-[1.08] sm:text-6xl md:text-7xl lg:text-[4.85rem] lg:leading-[1.05]"
                : "font-hero text-[2.35rem] leading-[1.12] sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem]"
            }`}
          >
            {heading}
          </h1>
          <div
            className={`mt-6 h-px w-full bg-[#1a3c40]/30 ${large ? "max-w-2xl" : "max-w-xl"}`}
            aria-hidden
          />
          {body ? (
            <div
              className={`mt-6 leading-relaxed text-[#1a3c40] ${
                large
                  ? "max-w-3xl text-lg md:text-xl md:leading-relaxed"
                  : "max-w-2xl text-[15px] text-[#1a3c40]/80 md:text-lg"
              }`}
            >
              {typeof body === "string" ? <p>{body}</p> : body}
            </div>
          ) : null}
          {extra ? <div className="mt-8 max-w-xl">{extra}</div> : null}
        </div>

        {aside ? <div>{aside}</div> : null}
      </div>
    </section>
  );
}
