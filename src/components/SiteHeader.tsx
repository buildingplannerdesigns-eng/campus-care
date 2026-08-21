"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { pointOfContact } from "@/data/team";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/act", label: "ACT" },
  { href: "/solutions", label: "Solutions" },
  { href: "/campus-care", label: "Campus Care" },
  { href: "/courses", label: "Courses", comingSoon: true },
  { href: "/blog", label: "Blog" },
  { href: "/payments", label: "Payments" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export const HERO_ROUTES = ["/", "/act"] as const;

function isHeroPath(pathname: string | null) {
  if (!pathname) return false;
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return (HERO_ROUTES as readonly string[]).includes(path);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHeroRoute = isHeroPath(pathname);
  /** Home/ACT: one fixed nav floats over the video, then turns solid on scroll. */
  const overHero = isHeroRoute && !scrolled && !mobileOpen;
  const hideContactBar = isHeroRoute;

  useEffect(() => {
    setMobileOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const linkClass = overHero
    ? "whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] text-white transition hover:text-ember xl:text-sm xl:tracking-[0.12em]"
    : "whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] text-parchment/80 transition hover:text-[#0c3f84] xl:text-sm xl:tracking-[0.12em]";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const phoneHref = pointOfContact.phone
    ? `tel:${pointOfContact.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* Contact strip: omit entirely on Home/ACT so it cannot reappear via lg:block */}
      {!hideContactBar && (
        <div className="hidden border-b border-[#0c3f84]/30 bg-[#0c3f84] text-white lg:block">
          <div className="mx-auto flex max-w-7xl items-center px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 text-xs xl:text-sm">
              {pointOfContact.email && (
                <a
                  href={`mailto:${pointOfContact.email}`}
                  aria-label="Info email"
                  className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-3 py-1.5 text-white/95 transition hover:border-white/70 hover:bg-white hover:text-[#0c3f84]"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{pointOfContact.email}</span>
                </a>
              )}

              {pointOfContact.supportEmail && (
                <a
                  href={`mailto:${pointOfContact.supportEmail}`}
                  aria-label="Support email"
                  className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-3 py-1.5 text-white/95 transition hover:border-white/70 hover:bg-white hover:text-[#0c3f84]"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{pointOfContact.supportEmail}</span>
                </a>
              )}

              {pointOfContact.phone && phoneHref && (
                <a
                  href={phoneHref}
                  aria-label="Telephone"
                  className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-3 py-1.5 text-white/95 transition hover:border-white/70 hover:bg-white hover:text-[#0c3f84]"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 18.8a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.8.68 2.64a2 2 0 0 1-.45 2.1L8 9.75a16 16 0 0 0 6.25 6.25l1.29-1.29a2 2 0 0 1 2.1-.45c.84.33 1.73.56 2.64.68A2 2 0 0 1 22 16.92Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{pointOfContact.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main navigation bar */}
      <div
        className={`border-b transition-all duration-300 ${
          overHero
            ? "border-transparent bg-transparent"
            : "border-sanctuary-700/50 bg-white/95 shadow-sm backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 ${
            isHeroRoute ? "py-4 lg:py-5" : "py-3 lg:py-4"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center">
            <BrandLogo
              size="sm"
              priority
              alt="Campus Care 2.0 logo"
              className={`ring-2 ring-transparent transition group-hover:ring-ember/40 !h-11 !w-11 sm:!h-12 sm:!w-12 md:!h-14 md:!w-14 ${
                overHero ? "ring-white/35 shadow-[0_2px_16px_rgba(0,0,0,0.35)]" : ""
              }`}
            />
          </Link>

          {/* Desktop nav — flat, no dropdowns */}
          <nav className="hidden items-center gap-3 xl:gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.href === "/contact"
                    ? `group inline-flex items-center justify-center rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                        isActive(link.href)
                          ? overHero
                            ? "border-white bg-white text-[#0c3f84]"
                            : "border-[#0c3f84] bg-white text-[#0c3f84]"
                          : overHero
                            ? "border-white/90 bg-transparent text-white hover:bg-white hover:text-[#0c3f84]"
                            : "border-[#0c3f84] bg-[#0c3f84] text-white hover:bg-white hover:text-[#0c3f84]"
                      }`
                    : `${linkClass} ${isActive(link.href) ? (overHero ? "text-ember" : "text-[#0c3f84]") : ""}`
                }
              >
                <span className="inline-flex items-center gap-1.5">
                  {link.label}
                  {link.comingSoon && (
                    <span
                      className="animate-blink inline-flex items-center rounded-sm bg-[#C4471E] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                      aria-label="Coming soon"
                    >
                      Soon
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className={`rounded-lg p-1.5 transition sm:p-2 lg:hidden ${
              overHero ? "text-white [filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.45))]" : "text-parchment"
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-b border-sanctuary-700/50 bg-white px-4 py-4 shadow-lg sm:px-6 sm:py-5 lg:hidden">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === "/contact"
                      ? `group mt-1 inline-flex w-full items-center justify-center rounded-none border px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                          isActive(link.href)
                            ? "border-[#0c3f84] bg-white text-[#0c3f84]"
                            : "border-[#0c3f84] bg-[#0c3f84] text-white hover:bg-white hover:text-[#0c3f84]"
                        }`
                      : `block rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-wider transition hover:bg-sanctuary-900 ${
                          isActive(link.href) ? "text-[#0c3f84]" : "text-parchment/85"
                        }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="inline-flex items-center gap-2">
                    {link.label}
                    {link.comingSoon && (
                      <span
                        className="animate-blink inline-flex items-center rounded-sm bg-[#C4471E] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                        aria-label="Coming soon"
                      >
                        Soon
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <div className="rounded-xl border border-sanctuary-700/60 bg-sanctuary-900/50 p-3">
                <div className="flex flex-col gap-2">
                {pointOfContact.email && (
                  <a
                    href={`mailto:${pointOfContact.email}`}
                    aria-label="Info email"
                    className="inline-flex items-center gap-2 rounded-none border border-sanctuary-700 px-3 py-2 text-sm text-parchment/75 transition hover:border-[#b4c8dd] hover:bg-white hover:text-[#0c3f84]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{pointOfContact.email}</span>
                  </a>
                )}
                {pointOfContact.supportEmail && (
                  <a
                    href={`mailto:${pointOfContact.supportEmail}`}
                    aria-label="Support email"
                    className="inline-flex items-center gap-2 rounded-none border border-sanctuary-700 px-3 py-2 text-sm text-parchment/75 transition hover:border-[#b4c8dd] hover:bg-white hover:text-[#0c3f84]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{pointOfContact.supportEmail}</span>
                  </a>
                )}
                {pointOfContact.phone && phoneHref && (
                  <a
                    href={phoneHref}
                    aria-label="Telephone"
                    className="inline-flex items-center gap-2 rounded-none border border-sanctuary-700 px-3 py-2 text-sm text-parchment/75 transition hover:border-[#b4c8dd] hover:bg-white hover:text-[#0c3f84]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 18.8a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.8.68 2.64a2 2 0 0 1-.45 2.1L8 9.75a16 16 0 0 0 6.25 6.25l1.29-1.29a2 2 0 0 1 2.1-.45c.84.33 1.73.56 2.64.68A2 2 0 0 1 22 16.92Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{pointOfContact.phone}</span>
                  </a>
                )}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
