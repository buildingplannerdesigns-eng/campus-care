"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/types";

function SocialIcon({ platform }: { platform: "linkedin" | "x" | "instagram" }) {
  if (platform === "linkedin") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.25-.15-4.77-1.69-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.69 0 8.28.01 7 .07 2.7.27.27 2.7.07 7 .01 8.28 0 8.69 0 12s.01 3.72.07 5c.2 4.3 2.63 6.73 6.93 6.93 1.28.06 1.69.07 5 .07s3.72-.01 5-.07c4.3-.2 6.73-2.63 6.93-6.93.06-1.28.07-1.69.07-5s-.01-3.72-.07-5c-.2-4.3-2.63-6.73-6.93-6.93C15.72.01 15.31 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.17 17.52h1.83L7.08 4.13H5.12Z" />
    </svg>
  );
}

function TeamDetailsPanel({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b1f34]/72 backdrop-blur-md md:items-center md:justify-end">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close team details overlay"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden border border-white/15 bg-[#faf9f7] shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:mr-6 md:max-h-[85vh] md:rounded-sm">
        <div className="relative flex max-h-[92svh] flex-col overflow-y-auto p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center border border-[#d8ded9] bg-white text-[#0c3f84] transition hover:bg-[#0c3f84] hover:text-white"
            aria-label="Close team details"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-[#d8ded9] bg-[#eef2ef] shadow-sm sm:h-32 sm:w-32">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={`${member.name} photo`}
                  fill
                  className="object-cover object-center"
                  sizes="128px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#0c3f84_0%,#1f5c73_50%,#3d5a3a_100%)] text-white">
                  <span className="font-display text-4xl italic">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#4e6f95]">Team Member</p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-[#113f6c] md:text-4xl">{member.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#5b6d7f] md:text-sm">{member.role}</p>
          </div>

          <div className="mt-6 border-t border-[#d8ded9] pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4e6f95]">Profile</p>
            <p className="mt-3 text-sm leading-relaxed text-[#355879] md:text-base">{member.bio}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border border-[#d8ded9] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Role</p>
              <p className="mt-2 text-sm text-[#113f6c]">{member.role}</p>
            </div>
            <div className="border border-[#d8ded9] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Focus</p>
              <p className="mt-2 text-sm text-[#113f6c]">Clinical care, strategy, and community support</p>
            </div>
            {member.email && (
              <div className="border border-[#d8ded9] bg-white p-4 sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4e6f95]">Email</p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-2 block text-sm text-[#113f6c] transition hover:text-[#0c3f84]"
                >
                  {member.email}
                </a>
              </div>
            )}
          </div>

          {member.socialLinks && (
            <div className="mt-8 flex flex-wrap gap-3 pb-2">
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#d8ded9] bg-white text-[#113f6c] transition hover:border-[#0A66C2] hover:text-[#0A66C2]"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <SocialIcon platform="linkedin" />
                </a>
              )}
              {member.socialLinks.x && (
                <a
                  href={member.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#d8ded9] bg-white text-[#113f6c] transition hover:border-black hover:text-black"
                  aria-label={`${member.name} X`}
                >
                  <SocialIcon platform="x" />
                </a>
              )}
              {member.socialLinks.instagram && (
                <a
                  href={member.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#d8ded9] bg-white text-[#113f6c] transition hover:border-[#E4405F] hover:text-[#E4405F]"
                  aria-label={`${member.name} Instagram`}
                >
                  <SocialIcon platform="instagram" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TeamDetailsDrawer({ teamMembers }: { teamMembers: TeamMember[] }) {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <button
            key={member.name}
            type="button"
            onClick={() => setActiveMember(member)}
            className="group border border-[#d7dfda] bg-white p-5 text-left shadow-[0_12px_32px_rgba(11,31,52,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(11,31,52,0.14)] md:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#d7dfda] bg-[#eef3ef] sm:h-24 sm:w-24">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name} photo`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#0c3f84_0%,#1f5c73_50%,#3d5a3a_100%)] text-white">
                    <span className="font-display text-3xl italic">{member.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4e6f95]">Team Member</p>
                <h3 className="mt-1 font-display text-xl text-[#113f6c] sm:text-2xl">{member.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#5b6d7f]">{member.role}</p>
              </div>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#355879]">
              {member.bio ?? "Open this profile to learn more about their role and impact."}
            </p>

            <span className="mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-[0.16em] text-[#0c3f84]">
              View Profile
              <span className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100" aria-hidden>
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeMember && (
        <TeamDetailsPanel member={activeMember} onClose={() => setActiveMember(null)} />
      )}
    </>
  );
}