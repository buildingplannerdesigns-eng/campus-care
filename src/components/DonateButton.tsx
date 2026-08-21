import type { ReactNode } from "react";
import Link from "next/link";

function ArrowIcon() {
  return (
    <span
      className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100"
      aria-hidden
    >
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function DonateButton({
  children = "Donate or Support",
  href = "/payments",
  variant = "dark",
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  variant?: "dark" | "outline" | "light";
  className?: string;
}) {
  const styles =
    variant === "dark"
      ? "border-[#0e4f88] bg-[#0e4f88] text-white hover:bg-white hover:text-[#0e4f88]"
      : variant === "light"
        ? "border-white bg-white text-[#0e4f88] hover:bg-transparent hover:text-white"
        : "border-[#0e4f88] bg-white text-[#0e4f88] hover:bg-[#0e4f88] hover:text-white";

  const classes = `group inline-flex items-center justify-center rounded-none border px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 sm:px-10 sm:py-3.5 sm:text-sm ${styles} ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
        <ArrowIcon />
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
      <ArrowIcon />
    </a>
  );
}
