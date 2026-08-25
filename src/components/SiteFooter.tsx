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
  { href: "/campus-care", label: "Campus Care" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/payments", label: "Payments" },
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
              <BrandLogo size="md" alt="Campus Care 2.0 logo" className="!h-28 !w-28" />
            </Link>
            <h3 className="mt-5 font-display text-4xl italic text-[#0e4f88]">
              Come join the movement
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#355879]">
              Explore Campus Care programs, ACT Healing insights, and tools that grow restorative wellness.
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

        <div className="mt-12 border-t border-[#d5d5d3] pt-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] text-[#2f537d]">
              © {new Date().getFullYear()} Campus Care 2.0
              <span className="mx-2 text-[#94a9bf]">|</span>
              All Rights Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.celestialwebsolutions.net/portfolio/act-campus-care"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#0c3f84] transition hover:text-[#0a3269]"
              >
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#0c3f84]/70 group-hover:text-[#0c3f84]">
                  Website Developed and Powered by Celestial Web Solutions
                </span>
                <Image
                  src="/images/site-credit.png"
                  alt="Celestial Web Solutions logo"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
