"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pointOfContact } from "@/data/team";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/solutions", label: "Solutions" },
  { href: "/programs", label: "Professional Courses" },
  { href: "/team", label: "The Team" },
  { href: "/payments", label: "Payments" },
  { href: "/diaspora-vr", label: "Diaspora VR" },
  { href: "/contact", label: "Contact Us" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://twitter.com", label: "X" },
];

function getSocialBrandHoverClass(label: string): string {
  if (label === "Instagram") return "hover:text-[#E4405F]";
  if (label === "LinkedIn") return "hover:text-[#0A66C2]";
  return "hover:text-black";
}

const HERO_ROUTES = ["/dr-cammie-connor"];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHeroRoute = HERO_ROUTES.includes(pathname);
  const isTransparent = isHeroRoute && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = isTransparent
    ? "whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] text-white/85 transition hover:text-ember xl:text-sm xl:tracking-[0.12em]"
    : "whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] text-parchment/80 transition hover:text-[#0c3f84] xl:text-sm xl:tracking-[0.12em]";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const phoneHref = pointOfContact.phone
    ? `tel:${pointOfContact.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* Top announcement bar */}
      <div
        className={`hidden border-b transition-colors lg:block ${
          isTransparent
            ? "border-white/10 bg-black/20 text-white/90 backdrop-blur-sm"
            : "border-[#0c3f84]/30 bg-[#0c3f84] text-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs xl:text-sm">
            {pointOfContact.email && (
              <a
                href={`mailto:${pointOfContact.email}`}
                aria-label="Email"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white/95 transition hover:border-ember/60 hover:bg-white/15 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{pointOfContact.email}</span>
              </a>
            )}

            {pointOfContact.phone && phoneHref && (
              <a
                href={phoneHref}
                aria-label="Telephone"
                className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-3 py-1.5 text-white/95 transition hover:border-white hover:bg-white/15 hover:text-white"
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

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-none border border-white/20 bg-white/10 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:border-white/70 hover:bg-white ${getSocialBrandHoverClass(link.label)}`}
              >
                {link.label === "Instagram" ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.25-.15-4.77-1.69-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.69 0 8.28.01 7 .07 2.7.27.27 2.7.07 7 .01 8.28 0 8.69 0 12s.01 3.72.07 5c.2 4.3 2.63 6.73 6.93 6.93 1.28.06 1.69.07 5 .07s3.72-.01 5-.07c4.3-.2 6.73-2.63 6.93-6.93.06-1.28.07-1.69.07-5s-.01-3.72-.07-5c-.2-4.3-2.63-6.73-6.93-6.93C15.72.01 15.31 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
                  </svg>
                ) : link.label === "LinkedIn" ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.17 17.52h1.83L7.08 4.13H5.12Z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`border-b transition-all duration-300 ${
          isTransparent
            ? "border-white/10 bg-transparent"
            : "border-sanctuary-700/50 bg-white/95 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:py-4">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center">
            <Image
              src="/images/logo.jpg"
              alt="Campus Care 2.0 logo"
              width={72}
              height={72}
              className="h-12 w-auto rounded-full ring-2 ring-transparent transition group-hover:ring-ember/40 sm:h-14 md:h-16"
              priority
            />
          </Link>

          {/* Desktop nav — flat, no dropdowns */}
          <nav className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.href === "/contact"
                    ? `group inline-flex items-center justify-center rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                        isActive(link.href)
                          ? "border-[#0c3f84] bg-white text-[#0c3f84]"
                          : "border-[#0c3f84] bg-[#0c3f84] text-white hover:bg-white hover:text-[#0c3f84]"
                      }`
                    : `${linkClass} ${isActive(link.href) ? (isTransparent ? "text-ember" : "text-[#0c3f84]") : ""}`
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className={`rounded-lg p-1.5 transition sm:p-2 lg:hidden ${isTransparent ? "text-white" : "text-parchment"}`}
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
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <div className="rounded-xl border border-sanctuary-700/60 bg-sanctuary-900/50 p-3">
                <div className="flex flex-col gap-2">
                {pointOfContact.email && (
                  <a
                    href={`mailto:${pointOfContact.email}`}
                    aria-label="Email"
                    className="inline-flex items-center gap-2 rounded-none border border-sanctuary-700 px-3 py-2 text-sm text-parchment/75 transition hover:border-[#0c3f84] hover:text-[#0c3f84]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{pointOfContact.email}</span>
                  </a>
                )}
                {pointOfContact.phone && phoneHref && (
                  <a
                    href={phoneHref}
                    aria-label="Telephone"
                    className="inline-flex items-center gap-2 rounded-none border border-sanctuary-700 px-3 py-2 text-sm text-parchment/75 transition hover:border-[#0c3f84] hover:text-[#0c3f84]"
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
                <div className="mt-1 flex items-center justify-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-none border border-sanctuary-700 text-parchment/75 transition hover:border-[#b4c8dd] hover:bg-white ${getSocialBrandHoverClass(link.label)}`}
                    >
                      {link.label === "Instagram" ? (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.25-.15-4.77-1.69-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.69 0 8.28.01 7 .07 2.7.27.27 2.7.07 7 .01 8.28 0 8.69 0 12s.01 3.72.07 5c.2 4.3 2.63 6.73 6.93 6.93 1.28.06 1.69.07 5 .07s3.72-.01 5-.07c4.3-.2 6.73-2.63 6.93-6.93.06-1.28.07-1.69.07-5s-.01-3.72-.07-5c-.2-4.3-2.63-6.73-6.93-6.93C15.72.01 15.31 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
                        </svg>
                      ) : link.label === "LinkedIn" ? (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.17 17.52h1.83L7.08 4.13H5.12Z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
