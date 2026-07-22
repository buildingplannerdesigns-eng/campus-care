"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BackToTopButton } from "@/components/BackToTopButton";
import { BrandLogo } from "@/components/BrandLogo";
import { triggerPwaInstall } from "@/components/PwaRegister";

const lookAroundLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/act", label: "ACT" },
  { href: "/solutions", label: "Solutions" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/payments", label: "Payments" },
  { href: "/campus-care", label: "Campus Care" },
  { href: "/contact", label: "Contact Us" },
];

function FooterCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-7 inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-10 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
    >
      {children}
      <span
        className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100"
        aria-hidden
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <footer className="border-t border-[#d9d9d7] bg-[#f7f7f5] text-[#1f3552]">
      <div className="h-10 bg-[#d7e2df]" aria-hidden />

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.15fr_0.95fr] lg:gap-8">
          {/* Look Around */}
          <div className="border-b border-[#c8c8c6] pb-10 lg:border-b-0 lg:border-r lg:pr-8 lg:pb-0">
            <div className="flex gap-5">
              <p
                className="hidden shrink-0 font-display text-[1.65rem] italic leading-none text-[#0e4f88] lg:block"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Look Around
              </p>
              <div className="min-w-0 flex-1">
                <p className="mb-4 font-display text-3xl italic text-[#0e4f88] lg:hidden">Look Around</p>
                <ul>
                  {lookAroundLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block border-b border-[#c8c8c6] py-2.5 text-sm uppercase tracking-[0.16em] transition ${
                          isActive(link.href)
                            ? "bg-[#e6edf5] px-2 font-semibold text-[#0e3f78]"
                            : "text-[#365a86] hover:text-[#0e3f78]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Come Listen */}
          <div className="border-b border-[#c8c8c6] pb-10 text-center lg:border-b-0 lg:border-r lg:px-8 lg:pb-0">
            <Link href="/" className="inline-flex items-center justify-center">
              <BrandLogo size="md" alt="Campus Care 2.0 logo" className="!h-28 !w-28" />
            </Link>
            <h3 className="mt-5 font-display text-4xl italic text-[#0e4f88]">Come listen</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#365a86]">
              to the movement
            </p>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#355879]">
              Explore Campus Care programs, ACT Healing insights, and tools that grow restorative wellness.
            </p>
            <FooterCta href="/campus-care">Learn More</FooterCta>
          </div>

          {/* Come Hang Out */}
          <div className="text-center lg:pl-6">
            <h3 className="font-display text-4xl italic text-[#0e4f88]">Come hang out!</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#365a86]">
              Join our insider email list
            </p>
            <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-[#355879]">
              Get updates about events, partnerships, and new healing resources.
            </p>
            <FooterCta href="/contact">Sign Up</FooterCta>
          </div>
        </div>

        <div className="mt-12 border-t border-[#d5d5d3] pt-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] text-[#2f537d]">
              © {new Date().getFullYear()} Campus Care 2.0
              <span className="mx-2 text-[#94a9bf]">|</span>
              All Rights Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => triggerPwaInstall()}
                className="text-[10px] uppercase tracking-[0.2em] text-[#0c3f84]/80 transition hover:text-[#0c3f84]"
              >
                Install App
              </button>
              <span className="hidden text-[#94a9bf] sm:inline" aria-hidden>
                |
              </span>
              <a
                href="https://celestialwebsolutions.net/campus-care"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#0c3f84] transition hover:text-[#0a3269]"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#0c3f84]/70 group-hover:text-[#0c3f84]">
                  Site Credit
                </span>
                <Image
                  src="/images/site-credit.png"
                  alt="Celestial Web Solutions logo"
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain"
                />
              </a>
              <BackToTopButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
