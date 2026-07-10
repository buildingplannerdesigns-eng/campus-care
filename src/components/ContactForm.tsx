"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSubjects = {
  general: [
    "General enquiry",
    "Campus partnership",
    "Speaking request",
    "Programs and services",
    "Donation support",
  ],
  "dr-cammie": [
    "Speaking request",
    "Workshop booking",
    "Coaching or therapy",
    "Campus partnership",
    "Media or interview request",
  ],
} as const;

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type ContactFormTarget = "general" | "dr-cammie";

export function ContactForm({
  target = "general",
  submitLabel,
  successMessage,
}: {
  target?: ContactFormTarget;
  submitLabel?: string;
  successMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileError, setTurnstileError] = useState<string>("");
  const subjectOptions = contactSubjects[target];

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    window.onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
      setTurnstileError("");
    };

    window.onTurnstileExpired = () => {
      setTurnstileToken("");
    };

    return () => {
      delete window.onTurnstileSuccess;
      delete window.onTurnstileExpired;
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: "",
      subject: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setTurnstileError("Please complete the security check.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTurnstileError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, target, turnstileToken }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ phone: "", subject: "" });
      setTurnstileToken("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm text-parchment/70">
            First name
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            className="mt-1 w-full rounded-lg border border-sanctuary-700 bg-sanctuary-900 px-4 py-2.5 text-sm outline-none focus:border-ember"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-fire-glow">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm text-parchment/70">
            Last name
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            className="mt-1 w-full rounded-lg border border-sanctuary-700 bg-sanctuary-900 px-4 py-2.5 text-sm outline-none focus:border-ember"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-fire-glow">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-parchment/70">
          Email address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-lg border border-sanctuary-700 bg-sanctuary-900 px-4 py-2.5 text-sm outline-none focus:border-ember"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-fire-glow">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-parchment/70">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="mt-1 w-full rounded-lg border border-sanctuary-700 bg-sanctuary-900 px-4 py-2.5 text-sm outline-none focus:border-ember"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-fire-glow">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-parchment/70">
          Subject
        </label>
        <select
          id="subject"
          defaultValue=""
          {...register("subject")}
          className="mt-1 w-full rounded-lg border border-sanctuary-700 bg-sanctuary-900 px-4 py-2.5 text-sm text-parchment outline-none focus:border-ember"
        >
          <option value="" disabled>
            Select a subject
          </option>
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-xs text-fire-glow">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-parchment/70">
          Message <span className="text-parchment/40">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1 w-full rounded-lg border border-sanctuary-700 bg-sanctuary-900 px-4 py-2.5 text-sm outline-none focus:border-ember"
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <p className="text-xs text-parchment/50">
            This form is protected by Cloudflare Turnstile verification.
          </p>
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-callback="onTurnstileSuccess"
            data-expired-callback="onTurnstileExpired"
          />
          {turnstileError && <p className="text-xs text-fire-glow">{turnstileError}</p>}
        </>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center rounded-none border border-[#0e4f88] bg-[#0e4f88] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-white hover:text-[#0e4f88] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{status === "submitting" ? "Sending..." : submitLabel ?? "Stay in touch"}</span>
        <span
          className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100 group-active:ml-2 group-active:w-4 group-active:opacity-100"
          aria-hidden
        >
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 group-active:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>

      {status === "success" && (
        <p className="text-sm text-nature-glow">{successMessage ?? "Thanks — you&apos;re on the list."}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-fire-glow">
          Something went wrong. Please try again shortly.
        </p>
      )}
    </form>
  );
}
