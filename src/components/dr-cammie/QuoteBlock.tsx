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
  return (
    <blockquote className="relative mx-auto max-w-4xl px-6 text-center">
      <span
        className={`font-display leading-none text-water/25 ${size === "large" ? "text-7xl md:text-8xl" : "text-5xl md:text-6xl"}`}
        aria-hidden
      >
        &ldquo;
      </span>
      <p
        className={`relative -mt-6 font-display italic leading-snug text-parchment ${
          size === "large" ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl"
        }`}
      >
        {quote}
      </p>
      {reference && (
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-parchment/40">{reference}</p>
      )}
      {attribution && (
        <footer className="mt-6 text-sm font-semibold uppercase tracking-wider text-parchment/55">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
