"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_COUNTRY_CODE, formatInternationalPhone } from "@/data/countryCodes";
import { PhoneWithCountryCode } from "@/components/PhoneWithCountryCode";
import {
  SecurityCheck,
  isSecuritySatisfied,
  isTurnstileConfigured,
} from "@/components/SecurityCheck";

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => value.replace(/[^\d]/g, "").length >= 7, {
      message: "Enter a valid phone number",
    }),
  countryCode: z.string().min(1),
  interest: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function EarlyRegistrationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [securityVerified, setSecurityVerified] = useState(false);
  const [turnstileError, setTurnstileError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      countryCode: DEFAULT_COUNTRY_CODE,
      phone: "",
    },
  });

  const countryCode = watch("countryCode") || DEFAULT_COUNTRY_CODE;
  const phoneValue = watch("phone") || "";

  async function onSubmit(data: RegistrationFormData) {
    if (
      !isSecuritySatisfied({
        turnstileConfigured: isTurnstileConfigured,
        token: turnstileToken,
        verified: securityVerified,
      })
    ) {
      setTurnstileError("Please complete the security check.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTurnstileError("");

    try {
      const formattedPhone = formatInternationalPhone(data.countryCode, data.phone);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: formattedPhone,
          subject: "Course early registration",
          message: data.interest?.trim() || "Early registration interest for Courses.",
          target: "general",
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ countryCode: DEFAULT_COUNTRY_CODE, phone: "" });
      setTurnstileToken("");
      setSecurityVerified(false);
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1.5 w-full border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/70 focus:bg-white/15";

  const phoneTriggerClass =
    "inline-flex shrink-0 items-center gap-2 border border-white/25 border-r-0 bg-white/15 px-3 py-3 text-sm text-white outline-none transition hover:bg-white/20 focus:border-white/70";

  const phoneInputClass =
    "min-w-0 flex-1 border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/70 focus:bg-white/15";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-firstName" className="block text-xs uppercase tracking-[0.16em] text-white/70">
            First name
          </label>
          <input
            id="reg-firstName"
            {...register("firstName")}
            className={fieldClass}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-[#ffb4a2]">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="reg-lastName" className="block text-xs uppercase tracking-[0.16em] text-white/70">
            Last name
          </label>
          <input
            id="reg-lastName"
            {...register("lastName")}
            className={fieldClass}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-[#ffb4a2]">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-xs uppercase tracking-[0.16em] text-white/70">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          {...register("email")}
          className={fieldClass}
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-[#ffb4a2]">{errors.email.message}</p>}
      </div>

      <PhoneWithCountryCode
        id="reg-phone"
        countryCode={countryCode}
        phone={phoneValue}
        onCountryCodeChange={(code) => setValue("countryCode", code, { shouldDirty: true })}
        onPhoneChange={(value) => setValue("phone", value, { shouldDirty: true, shouldValidate: true })}
        label="Phone"
        labelClassName="block text-xs uppercase tracking-[0.16em] text-white/70"
        required
        dark
        error={errors.phone?.message}
        triggerClassName={phoneTriggerClass}
        inputClassName={phoneInputClass}
        wrapperClassName="mt-1.5 flex"
      />

      <div>
        <label htmlFor="reg-interest" className="block text-xs uppercase tracking-[0.16em] text-white/70">
          What are you most interested in?{" "}
          <span className="normal-case tracking-normal text-white/40">(optional)</span>
        </label>
        <textarea
          id="reg-interest"
          rows={3}
          {...register("interest")}
          className={`${fieldClass} resize-none`}
          placeholder="Workshops, campus programs, professional training…"
        />
      </div>

      <SecurityCheck
        token={turnstileToken}
        onTokenChange={setTurnstileToken}
        verified={securityVerified}
        onVerifiedChange={setSecurityVerified}
        error={turnstileError}
        theme="dark"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center border border-white bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0c3f84] transition hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Submit Form"}
      </button>

      {status === "success" && (
        <p className="text-sm text-[#b8e0c8]">
          You&apos;re on the list — we&apos;ll reach out when Courses open.
        </p>
      )}
      {status === "error" && !turnstileError && (
        <p className="text-sm text-[#ffb4a2]">Something went wrong. Please try again shortly.</p>
      )}
    </form>
  );
}
