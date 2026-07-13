export function QuoteBlock({
  quote,
  attribution,
  reference,
  size = "large",
}: {
  quote: string;
  attribution?: string;
  reference?: string;
  size?: "large" | "medium";
}) {
  const isLarge = size === "large";

  return (
    <blockquote className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
      {/* Oversized opening quotation */}
      <span
        className={`pointer-events-none absolute left-0 top-0 select-none font-display leading-none text-[#0c3f84]/15 ${
          isLarge ? "-translate-y-2 text-[7.5rem] md:text-[9.5rem]" : "-translate-y-1 text-[5.5rem] md:text-[7rem]"
        }`}
        aria-hidden
      >
        &ldquo;
      </span>

      <div className={`relative ${isLarge ? "pt-10 md:pt-12" : "pt-8 md:pt-10"}`}>
        <p
          className={`font-display italic leading-[1.25] text-parchment ${
            isLarge ? "text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]" : "text-xl sm:text-2xl md:text-3xl"
          }`}
        >
          {quote}
        </p>

        {/* Closing quotation */}
        <span
          className={`mt-1 inline-block select-none font-display leading-none text-[#0c3f84]/15 ${
            isLarge ? "text-[4.5rem] md:text-[5.5rem]" : "text-[3.5rem] md:text-5xl"
          }`}
          aria-hidden
        >
          &rdquo;
        </span>

        {(attribution || reference) && (
          <footer className="mt-2 flex flex-col items-center gap-2">
            <div className="h-px w-12 bg-[#0c3f84]/35" aria-hidden />
            {attribution && (
              <p className="text-sm font-semibold tracking-[0.08em] text-parchment md:text-[15px]">
                {attribution}
              </p>
            )}
            {reference && (
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-parchment/45">
                {reference}
              </p>
            )}
          </footer>
        )}
      </div>
    </blockquote>
  );
}
