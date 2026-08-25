import type { ReactNode } from "react";

type OffsetImageFrameProps = {
  children: ReactNode;
  className?: string;
  aspectClassName?: string;
  /** Rectangular mats by default; `circle` uses equal width/height + rounded-full on all layers. */
  shape?: "rect" | "circle";
};

/** Dual offset mats — mint behind top-left, peach behind bottom-right. */
export function OffsetImageFrame({
  children,
  className = "",
  aspectClassName = "aspect-[3/4]",
  shape = "rect",
}: OffsetImageFrameProps) {
  const isCircle = shape === "circle";
  const roundClass = isCircle ? "rounded-full" : "";
  const aspect = isCircle ? "aspect-square" : aspectClassName;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute -left-2.5 -top-2.5 h-full w-full bg-[#cfe3dc] md:-left-3 md:-top-3 ${roundClass}`}
        aria-hidden
      />
      <div
        className={`absolute -bottom-2.5 -right-2.5 h-full w-full bg-[#ead5c6] md:-bottom-3 md:-right-3 ${roundClass}`}
        aria-hidden
      />
      <div className={`relative overflow-hidden bg-mineral ${aspect} ${roundClass}`}>{children}</div>
    </div>
  );
}
