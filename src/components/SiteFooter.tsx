"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BackToTopButton } from "@/components/BackToTopButton";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/solutions", label: "Solutions" },
  { href: "/programs", label: "Professional Courses" },
  { href: "/dr-cammie-connor", label: "Dr. Cammie Connor" },
  { href: "/team", label: "Meet the Team" },
  { href: "/blog", label: "Blog" },
  { href: "/payments", label: "Payments" },
  { href: "/diaspora-vr", label: "Diaspora VR" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <footer className="border-t border-[#d9d9d7] bg-[#f4f4f2] text-[#1f3552]">
      <div className="h-12 bg-[#d7e2df]" aria-hidden />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10">
          <div className="border-b border-[#c8c8c6] pb-8 lg:border-b-0 lg:border-r lg:pr-10 lg:pb-0">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#325786]">Explore</p>
            <ul className="space-y-0">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={`block border-b border-[#c8c8c6] py-2 text-sm uppercase tracking-[0.14em] transition ${
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

          <div className="border-b border-[#c8c8c6] pb-8 text-center lg:border-b-0 lg:border-r lg:pr-10 lg:pb-0">
            <div className="mx-auto max-w-sm">
              <Link href="/" className="inline-flex items-center justify-center">
                <Image
                  src="/images/logo.jpg"
                  alt="Campus Care 2.0 logo"
                  width={180}
                  height={180}
                  className="h-28 w-auto rounded-full"
                />
              </Link>
              <h3 className="mt-5 font-display text-4xl italic text-[#0e4f88]">Come listen</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#365a86]">
                to the movement
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#355879]">
                Explore Campus Care 2.0 programs, insights, and tools designed to grow
                restorative wellness on your campus.
              </p>
              <Link
                href="/programs"
                className="group mt-7 inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-10 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
              >
                Learn More
                <span
                  className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100"
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
              </Link>
            </div>
          </div>

          <div className="text-center lg:pl-2">
            <h3 className="font-display text-4xl italic text-[#0e4f88]">Come hang out!</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#365a86]">
              Join our insider email list
            </p>
            <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-[#355879]">
              Get updates about events, partnerships, and new healing resources.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-10 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88]"
            >
              Sign Up
              <span
                className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100"
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
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-[#d5d5d3] pt-6">
          <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="text-center text-xs uppercase tracking-[0.12em] text-[#2f537d] md:col-start-2">
              <span>© {new Date().getFullYear()} Campus Care 2.0</span>
              <span className="mx-2 text-[#94a9bf]">|</span>
              <span>All Rights Reserved</span>
            </div>

            <div className="justify-self-center md:col-start-3 md:justify-self-end">
              <BackToTopButton />
            </div>
          </div>

          <div className="mt-4 flex justify-center border-t border-[#dfe2e6] pt-4">
            <a
              href="https://celestialwebsolutions.net/campus-care"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[#cf7a3d] opacity-90 transition-all duration-200 hover:text-[#b8642c] hover:opacity-100"
            >
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#7f8ea0] group-hover:text-[#8b9cae]">Website Developed & Powered by</span>
              <Image
                src="/images/site-credit.png"
                alt="Celestial Web Solutions logo"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="text-[11px] uppercase tracking-[0.2em]">Celestial Web Solutions</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
