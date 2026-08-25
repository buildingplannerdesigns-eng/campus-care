import Link from "next/link";
import type { ReactNode } from "react";

export type SiteCtaVariant = "peach" | "teal" | "outline" | "ghost";
export type SiteCtaSize = "sm" | "md";

const sizeClass: Record<SiteCtaSize, string> = {
  sm: "px-4 py-2 text-[11px] sm:text-[11px]",
  md: "px-8 py-3.5 sm:px-10 sm:py-3.5 text-[11px] sm:text-xs",
};

const variantClass: Record<SiteCtaVariant, string> = {
  peach:
    "border border-transparent bg-gradient-to-b from-[#f7efe8] to-[#ead5c6] text-[#1a3c40] shadow-[0_10px_32px_rgba(232,196,176,0.32)] hover:from-white hover:to-[#f3e4d8]",
  teal:
    "border border-[#1a3c40] bg-[#1a3c40] text-[#f7efe8] hover:border-[#ead5c6] hover:bg-gradient-to-b hover:from-[#f7efe8] hover:to-[#ead5c6] hover:text-[#1a3c40]",
  outline:
    "border border-[#1a3c40] bg-transparent text-[#1a3c40] hover:bg-[#1a3c40] hover:text-[#f7efe8]",
  ghost:
    "border border-white/80 bg-transparent text-white hover:border-transparent hover:bg-gradient-to-b hover:from-[#f7efe8] hover:to-[#ead5c6] hover:text-[#1a3c40]",
};

export function CtaArrow() {
  return (
    <span
      className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100 group-active:ml-2 group-active:w-4 group-active:opacity-100"
      aria-hidden
    >
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function siteCtaClassName({
  variant = "peach",
  size = "md",
  className = "",
}: {
  variant?: SiteCtaVariant;
  size?: SiteCtaSize;
  className?: string;
} = {}) {
  return `group inline-flex items-center justify-center rounded-sm font-semibold uppercase tracking-[0.22em] transition-all duration-200 ${sizeClass[size]} ${variantClass[variant]} ${className}`.trim();
}

type SiteCtaProps = {
  href?: string;
  children: ReactNode;
  variant?: SiteCtaVariant;
  size?: SiteCtaSize;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export function SiteCta({
  href,
  children,
  variant = "peach",
  size = "md",
  className = "",
  type = "button",
  disabled,
  onClick,
  target,
  rel,
}: SiteCtaProps) {
  const classes = siteCtaClassName({ variant, size, className });

  if (!href) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}>
        {children}
        <CtaArrow />
      </button>
    );
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
        <CtaArrow />
      </Link>
    );
  }

  return (
    <a href={href} target={target ?? (href.startsWith("mailto:") ? undefined : "_blank")} rel={rel ?? (href.startsWith("mailto:") ? undefined : "noopener noreferrer")} className={classes} onClick={onClick}>
      {children}
      <CtaArrow />
    </a>
  );
}
