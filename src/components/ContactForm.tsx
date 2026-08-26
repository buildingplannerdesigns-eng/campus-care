"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_COUNTRY_CODE, formatInternationalPhone } from "@/data/countryCodes";
import { PhoneWithCountryCode } from "@/components/PhoneWithCountryCode";
import { CtaArrow, siteCtaClassName } from "@/components/SiteCta";
import {
  SecurityCheck,
  isSecuritySatisfied,
  isTurnstileConfigured,
} from "@/components/SecurityCheck";

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
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((value) => value.replace(/[^\d]/g, "").length >= 7, {
      message: "Enter a valid phone number",
    }),
  countryCode: z.string().min(1),
  subject: z.string().trim().min(1, "Please select a subject"),
  message: z.string().trim().min(10, "Please share at least a sentence so we can help"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type ContactFormTarget = "general" | "dr-cammie";
type ContactFormSize = "default" | "lg";

export function ContactForm({
  target = "general",
  submitLabel,
  successMessage,
  size = "default",
  requireConfirmation = false,
  idPrefix = "",
  compact = false,
}: {
  target?: ContactFormTarget;
  submitLabel?: string;
  successMessage?: string;
  size?: ContactFormSize;
  requireConfirmation?: boolean;
  idPrefix?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [securityVerified, setSecurityVerified] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string>("");
  const [reviewData, setReviewData] = useState<ContactFormData | null>(null);
  const [step, setStep] = useState(0);
  const subjectOptions = contactSubjects[target];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      phone: "",
      countryCode: DEFAULT_COUNTRY_CODE,
      subject: "",
      message: "",
    },
  });

  const countryCode = watch("countryCode") || DEFAULT_COUNTRY_CODE;
  const phoneValue = watch("phone") || "";

  const isLarge = size === "lg" && !compact;
  const ids = {
    firstName: `${idPrefix}firstName`,
    lastName: `${idPrefix}lastName`,
    email: `${idPrefix}email`,
    subject: `${idPrefix}subject`,
    message: `${idPrefix}message`,
    phone: `${idPrefix}phone`,
  };

  const fieldClass = useMemo(
    () =>
      `mt-2 w-full rounded-none border border-[#d5d0c4] bg-white text-parchment outline-none transition focus:border-[#0e4f88] focus:ring-2 focus:ring-[#0e4f88]/20 ${
        isLarge ? "px-4 py-3.5 text-base" : compact ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
      }`,
    [isLarge, compact]
  );

  const phoneTriggerClass = useMemo(
    () =>
      `inline-flex shrink-0 items-center gap-2 rounded-none border border-[#d5d0c4] border-r-0 bg-[#faf9f7] text-parchment outline-none transition hover:bg-white focus:border-[#0e4f88] focus:ring-2 focus:ring-[#0e4f88]/20 ${
        isLarge
          ? "min-w-[7rem] px-3 py-3.5 text-sm"
          : compact
            ? "min-w-[5.25rem] px-2 py-2 text-xs"
            : "min-w-[6rem] px-3 py-2.5 text-xs"
      }`,
    [isLarge, compact]
  );

  const phoneInputClass = useMemo(
    () =>
      `min-w-0 flex-1 rounded-none border border-[#d5d0c4] bg-white text-parchment outline-none transition focus:border-[#0e4f88] focus:ring-2 focus:ring-[#0e4f88]/20 ${
        isLarge ? "px-4 py-3.5 text-base" : compact ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm"
      }`,
    [isLarge, compact]
  );

  const labelClass = `block font-semibold uppercase tracking-[0.14em] text-parchment/70 ${
    isLarge ? "text-xs" : "text-[11px]"
  }`;

  const errorClass = "mt-1.5 text-xs font-medium text-[#b3421c]";

  useEffect(() => {
    register("phone");
    register("countryCode");
  }, [register]);

  async function goToNextStep() {
    const names =
      step === 0 ? (["firstName", "lastName"] as const) : (["email", "phone"] as const);
    const valid = await trigger(names);
    if (!valid) {
      for (const name of names) {
        if (getFieldState(name).invalid) {
          document.getElementById(ids[name])?.focus();
          break;
        }
      }
      return;
    }
    setStep((current) => current + 1);
  }

  function resetSecurity() {
    setTurnstileToken("");
    setSecurityVerified(false);
  }

  async function submitToApi(data: ContactFormData) {
    setStatus("submitting");
    setErrorMessage("");
    setTurnstileError("");
    try {
      const formattedPhone = formatInternationalPhone(data.countryCode, data.phone);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: formattedPhone,
          target,
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setStep(0);
      reset({
        phone: "",
        countryCode: DEFAULT_COUNTRY_CODE,
        subject: "",
        message: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      resetSecurity();
      setReviewData(null);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  }

  async function onSubmit(data: ContactFormData) {
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

    if (requireConfirmation) {
      setReviewData(data);
      setStatus("idle");
      setErrorMessage("");
      return;
    }

    await submitToApi(data);
  }

  if (reviewData) {
    return (
      <ReviewPanel
        data={reviewData}
        target={target}
        size={size}
        status={status}
        errorMessage={errorMessage}
        onEdit={() => {
          setReviewData(null);
          setStatus("idle");
          setErrorMessage("");
        }}
        onConfirm={() => submitToApi(reviewData)}
        successMessage={successMessage}
      />
    );
  }

  if (status === "success") {
    return (
      <div className={`border border-[#c9dfd0] bg-[#f0f7f2] text-center ${compact ? "p-5" : "p-8"}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2f7a4e]/10 text-[#2f7a4e]">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`mt-5 font-display italic text-parchment ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}>
          Message sent
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-parchment/70 md:text-base">
          {successMessage ?? "Thank you — we'll be in touch soon."}
        </p>
        {compact ? (
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setErrorMessage("");
              setStep(0);
            }}
            className={`${siteCtaClassName({ variant: "peach", className: "mt-5 w-full" })}`}
          >
            Send another message
            <CtaArrow />
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={compact ? "space-y-3.5" : isLarge ? "space-y-7" : "space-y-5"}
      noValidate
    >
      {compact ? (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0e4f88]">
            Step {step + 1} of 3
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`h-1 flex-1 ${index <= step ? "bg-[#1a3c40]" : "bg-[#d5d0c4]"}`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className={compact && step !== 0 ? "hidden" : compact ? "grid gap-3.5" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label htmlFor={ids.firstName} className={labelClass}>
            First name <span className="text-[#b3421c]">*</span>
          </label>
          <input
            id={ids.firstName}
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName) || undefined}
            {...register("firstName")}
            className={fieldClass}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor={ids.lastName} className={labelClass}>
            Last name <span className="text-[#b3421c]">*</span>
          </label>
          <input
            id={ids.lastName}
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName) || undefined}
            {...register("lastName")}
            className={fieldClass}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className={compact && step !== 1 ? "hidden" : compact ? "grid gap-3.5" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label htmlFor={ids.email} className={labelClass}>
            Email <span className="text-[#b3421c]">*</span>
          </label>
          <input
            id={ids.email}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email) || undefined}
            {...register("email")}
            className={fieldClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <PhoneWithCountryCode
          id={ids.phone}
          countryCode={countryCode}
          phone={phoneValue}
          onCountryCodeChange={(code) => setValue("countryCode", code, { shouldDirty: true })}
          onPhoneChange={(value) => setValue("phone", value, { shouldDirty: true, shouldValidate: true })}
          label="Phone"
          labelClassName={labelClass}
          required
          error={errors.phone?.message}
          triggerClassName={phoneTriggerClass}
          inputClassName={phoneInputClass}
          wrapperClassName="mt-2 flex"
          menuClassName={compact ? "!w-full !max-w-full" : undefined}
        />
      </div>

      <div
        className={
          compact && step !== 2
            ? "hidden"
            : compact
              ? "space-y-3.5"
              : isLarge
                ? "space-y-7"
                : "space-y-5"
        }
      >
        <div>
          <label htmlFor={ids.subject} className={labelClass}>
            Subject <span className="text-[#b3421c]">*</span>
          </label>
          <select
            id={ids.subject}
            aria-invalid={Boolean(errors.subject) || undefined}
            {...register("subject")}
            className={fieldClass}
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
          {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor={ids.message} className={labelClass}>
            Message <span className="text-[#b3421c]">*</span>
          </label>
          <textarea
            id={ids.message}
            rows={isLarge ? 7 : compact ? 3 : 4}
            aria-invalid={Boolean(errors.message) || undefined}
            {...register("message")}
            className={fieldClass}
          />
          {errors.message && <p className={errorClass}>{errors.message.message}</p>}
        </div>

        <SecurityCheck
          token={turnstileToken}
          onTokenChange={setTurnstileToken}
          verified={securityVerified}
          onVerifiedChange={setSecurityVerified}
          error={turnstileError}
          theme="light"
        />

        <div
          className={
            compact
              ? "flex flex-col items-stretch gap-3 border-t border-[#e6e0d6] pt-4"
              : "flex flex-col-reverse items-stretch gap-4 border-t border-[#e6e0d6] pt-6 sm:flex-row sm:items-center sm:justify-between"
          }
        >
          {compact ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className={siteCtaClassName({ variant: "outline", className: "w-full" })}
            >
              Back
            </button>
          ) : null}
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`${siteCtaClassName({ variant: "peach", className: compact ? "w-full" : "" })} ${
              isLarge ? "px-8 py-4 text-sm" : ""
            }`}
          >
            <span>
              {status === "submitting"
                ? "Sending…"
                : requireConfirmation
                  ? "Review & Submit"
                  : submitLabel ?? "Submit Form"}
            </span>
            <CtaArrow />
          </button>
          <p className={`text-xs text-parchment/55 ${compact ? "text-center" : ""}`}>
            Fields marked <span className="text-[#b3421c]">*</span> are required.
          </p>
        </div>
      </div>

      {compact && step < 2 ? (
        <div className="flex flex-col gap-2 pt-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((current) => current - 1)}
              className={siteCtaClassName({ variant: "outline", className: "w-full" })}
            >
              Back
            </button>
          ) : null}
          <button
            type="button"
            onClick={goToNextStep}
            className={siteCtaClassName({ variant: "peach", className: "w-full" })}
          >
            Continue
            <CtaArrow />
          </button>
        </div>
      ) : null}

      {status === "error" && errorMessage && (
        <p className={`text-sm ${errorClass}`}>{errorMessage}</p>
      )}
    </form>
  );
}

function ReviewPanel({
  data,
  target,
  size,
  status,
  errorMessage,
  onEdit,
  onConfirm,
  successMessage,
}: {
  data: ContactFormData;
  target: ContactFormTarget;
  size: ContactFormSize;
  status: "idle" | "submitting" | "success" | "error";
  errorMessage: string;
  onEdit: () => void;
  onConfirm: () => void;
  successMessage?: string;
}) {
  const isLarge = size === "lg";
  const phoneDisplay = formatInternationalPhone(data.countryCode, data.phone);

  if (status === "success") {
    return (
      <div className="border border-[#c9dfd0] bg-[#f0f7f2] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2f7a4e]/10 text-[#2f7a4e]">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl italic text-parchment md:text-3xl">Message sent</h3>
        <p className="mt-3 text-sm leading-relaxed text-parchment/70 md:text-base">
          {successMessage ?? "Thank you — we'll be in touch soon."}
        </p>
      </div>
    );
  }

  const rows = [
    { label: "Name", value: `${data.firstName} ${data.lastName}` },
    { label: "Email", value: data.email },
    { label: "Phone", value: phoneDisplay },
    { label: "Subject", value: data.subject },
    { label: "Sending to", value: target === "dr-cammie" ? "Dr. Cammie Connor" : "ACT Healing" },
  ];

  return (
    <div className={isLarge ? "space-y-7" : "space-y-5"}>
      <div className="border border-[#0e4f88]/25 bg-[#f4f8fc] p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0e4f88]">
          Please review your message
        </p>
        <p className="mt-2 text-sm text-parchment/70">
          Verify the details below before sending. You can edit any field or confirm to submit.
        </p>
      </div>

      <dl className="divide-y divide-[#e6e0d6] border border-[#e6e0d6] bg-white">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[160px_1fr] sm:items-baseline">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-parchment/60">
              {row.label}
            </dt>
            <dd className="text-sm text-parchment md:text-base">{row.value}</dd>
          </div>
        ))}
        <div className="px-5 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-parchment/60">
            Message
          </dt>
          <dd className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-parchment md:text-base">
            {data.message}
          </dd>
        </div>
      </dl>

      {status === "error" && errorMessage && (
        <p className="text-sm font-medium text-[#b3421c]">{errorMessage}</p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onEdit}
          disabled={status === "submitting"}
          className={`${siteCtaClassName({ variant: "outline" })} disabled:opacity-60 ${
            isLarge ? "px-8 py-4 text-sm" : ""
          }`}
        >
          Edit message
          <CtaArrow />
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={status === "submitting"}
          className={`${siteCtaClassName({ variant: "peach" })} disabled:cursor-not-allowed disabled:opacity-60 ${
            isLarge ? "px-10 py-4 text-sm" : ""
          }`}
        >
          {status === "submitting" ? "Sending…" : "Submit Form"}
          <CtaArrow />
        </button>
      </div>
    </div>
  );
}
