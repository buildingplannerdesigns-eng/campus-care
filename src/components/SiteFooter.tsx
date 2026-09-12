"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { SiteCta } from "@/components/SiteCta";

const lookAroundLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/act", label: "ACT" },
  { href: "/solutions", label: "Solutions" },
  { href: "/campus-care", label: "ACT Campus Care" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/payments", label: "Become a Partner" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <footer className="border-t border-[#cfdcd6] bg-sage text-[#1f3552]">
      <div className="h-10 bg-sage-deep" aria-hidden />

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.15fr_0.95fr] lg:gap-8">
          {/* Explore */}
          <div className="border-b border-[#c8c8c6] pb-10 text-center lg:border-b-0 lg:border-r lg:pr-8 lg:pb-0">
            <h3 className="font-display text-4xl italic text-[#0e4f88]">Explore</h3>
            <ul className="mt-5">
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

          {/* Come Listen */}
          <div className="border-b border-[#c8c8c6] pb-10 text-center lg:border-b-0 lg:border-r lg:px-8 lg:pb-0">
            <Link href="/" className="inline-flex items-center justify-center">
              <BrandLogo size="md" alt="ACT Campus Care logo" className="!h-28 !w-28" />
            </Link>
            <h3 className="mt-5 font-display text-4xl italic text-[#0e4f88]">
              Come join the movement
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#355879]">
              Explore ACT Campus Care programs, ACT Healing insights, and tools that grow restorative wellness.
            </p>
            <SiteCta href="/campus-care" className="mt-7">
              Learn More
            </SiteCta>
          </div>

          {/* Come Hang Out */}
          <div className="text-center lg:pl-6">
            <h3 className="font-display text-4xl italic text-[#0e4f88]">Hear from us</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#365a86]">
              Join our insider email list
            </p>
            <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-[#355879]">
              Get updates about events, partnerships, and new healing resources.
            </p>
            <SiteCta href="/contact" className="mt-7">
              Sign Up
            </SiteCta>
          </div>
        </div>

        <div className="mt-12 border-t border-[#d5d5d3] pt-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0e3f78] md:text-base">
              © {new Date().getFullYear()} ACT Campus Care
              <span className="mx-2 text-[#5b7a9a]">|</span>
              All Rights Reserved
            </p>

            <a
              href="https://www.celestialwebsolutions.net/portfolio/act-campus-care"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full flex-wrap items-center justify-center gap-3 text-center text-[#0c3f84] transition hover:text-[#082c5c]"
            >
              <span className="text-sm font-semibold leading-snug text-[#0c3f84] sm:text-base">
                Website Developed and Powered by Celestial Web Solutions
              </span>
              <Image
                src="/images/site-credit.png"
                alt="Celestial Web Solutions logo"
                width={48}
                height={48}
                className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
