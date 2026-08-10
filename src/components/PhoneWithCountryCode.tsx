"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { countryDialCodes, DEFAULT_COUNTRY_CODE } from "@/data/countryCodes";

type PhoneWithCountryCodeProps = {
  id?: string;
  countryCode: string;
  phone: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneChange: (phone: string) => void;
  triggerClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  required?: boolean;
  error?: string;
  label?: React.ReactNode;
  labelClassName?: string;
  errorClassName?: string;
  dark?: boolean;
};

function flagUrl(countryCode: string) {
  return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
}

function flagSrcSet(countryCode: string) {
  const c = countryCode.toLowerCase();
  return `https://flagcdn.com/48x36/${c}.png 2x, https://flagcdn.com/72x54/${c}.png 3x`;
}

function getCountry(code: string) {
  return countryDialCodes.find((c) => c.code === code) ?? countryDialCodes[0];
}

export function PhoneWithCountryCode({
  id = "phone",
  countryCode,
  phone,
  onCountryCodeChange,
  onPhoneChange,
  triggerClassName,
  inputClassName,
  wrapperClassName = "mt-2 flex",
  required,
  error,
  label,
  labelClassName,
  errorClassName,
  dark,
}: PhoneWithCountryCodeProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const active = getCountry(countryCode);
  const errColor =
    errorClassName ??
    (dark ? "mt-1 text-xs text-[#ffb4a2]" : "mt-1.5 text-xs font-medium text-[#b3421c]");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countryDialCodes;
    return countryDialCodes.filter((c) => {
      const dial = c.dial.replace("+", "");
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.toLowerCase().includes(q) ||
        dial.includes(q.replace("+", ""))
      );
    });
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => searchRef.current?.focus(), 0);
    setActiveIndex(0);

    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(0);
  }, [filtered.length, activeIndex]);

  function selectCountry(code: string) {
    onCountryCodeChange(code);
    setOpen(false);
    setQuery("");
  }

  const isDark = dark;
  const menuPanel = isDark
    ? "border border-white/20 bg-[#0a2f66] text-white shadow-2xl"
    : "border border-[#d5d0c4] bg-white text-parchment shadow-[0_18px_44px_rgba(12,63,132,0.14)]";
  const searchInputCls = isDark
    ? "w-full border border-white/25 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/70"
    : "w-full border border-[#d5d0c4] bg-white px-3 py-2 text-sm text-parchment outline-none placeholder:text-parchment/40 focus:border-[#0e4f88] focus:ring-2 focus:ring-[#0e4f88]/20";
  const rowIdleCls = isDark
    ? "hover:bg-white/10"
    : "hover:bg-[#f4f8fc]";
  const rowActiveCls = isDark
    ? "bg-white/15"
    : "bg-[#eaf1fa]";
  const noResultsCls = isDark ? "text-white/60" : "text-parchment/50";

  return (
    <div ref={rootRef} className="relative">
      {label !== undefined ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required && (
            <span className={isDark ? "text-[#ffb4a2]" : "text-[#b3421c]"}> *</span>
          )}
        </label>
      ) : null}

      <div className={wrapperClassName}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={triggerClassName}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${active.name} ${active.dial}`}
        >
          <span className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagUrl(active.code)}
              srcSet={flagSrcSet(active.code)}
              alt=""
              width={24}
              height={18}
              className="h-[18px] w-[24px] shrink-0 object-cover"
              loading="lazy"
            />
            <span className="font-semibold tracking-tight">{active.dial}</span>
            <svg
              className={`h-3 w-3 shrink-0 transition ${open ? "rotate-180" : ""}`}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5 6 7.5l3-3" />
            </svg>
          </span>
        </button>

        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Phone number"
          className={inputClassName}
          aria-invalid={Boolean(error) || undefined}
          required={required}
        />
      </div>

      {open && (
        <div
          className={`absolute z-40 mt-2 w-[min(22rem,90vw)] ${menuPanel}`}
          role="dialog"
          aria-label="Select country code"
        >
          <div className="p-3">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const chosen = filtered[activeIndex];
                  if (chosen) selectCountry(chosen.code);
                }
              }}
              placeholder="Search country or code (e.g. Ghana, +233, GH)"
              className={searchInputCls}
              aria-label="Search country"
            />
          </div>
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-72 overflow-auto pb-2"
          >
            {filtered.length === 0 && (
              <li className={`px-4 py-3 text-sm ${noResultsCls}`}>No results</li>
            )}
            {filtered.map((country, index) => {
              const isSelected = country.code === countryCode;
              const isActive = index === activeIndex;
              return (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectCountry(country.code);
                  }}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2 text-sm ${
                    isActive ? rowActiveCls : rowIdleCls
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flagUrl(country.code)}
                    srcSet={flagSrcSet(country.code)}
                    alt=""
                    width={24}
                    height={18}
                    className="h-[18px] w-[24px] shrink-0 object-cover"
                    loading="lazy"
                  />
                  <span className="flex-1 truncate">{country.name}</span>
                  <span
                    className={`shrink-0 tabular-nums ${
                      isDark ? "text-white/70" : "text-parchment/60"
                    }`}
                  >
                    {country.dial}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className={errColor}>{error}</p>}
    </div>
  );
}

export { DEFAULT_COUNTRY_CODE };
