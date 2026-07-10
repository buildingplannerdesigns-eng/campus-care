import type { TeamMember } from "@/types";
import Image from "next/image";

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

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group overflow-hidden rounded-none border border-[#d7dfda] bg-white shadow-[0_12px_32px_rgba(11,31,52,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(11,31,52,0.14)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eef3ef]">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} photo`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="h-full w-full bg-[linear-gradient(145deg,#0c3f84_0%,#1f5c73_50%,#3d5a3a_100%)]"
            aria-hidden
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f34]/80 via-[#0b1f34]/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl text-white">{member.name}</h3>
          <p className="mt-1 text-sm text-white/80">{member.role}</p>
        </div>

        <div className="absolute inset-0 flex items-end bg-[#0c3f84]/92 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="w-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">About</p>
            {member.bio && (
              <p className="mt-2 text-sm leading-relaxed text-white/88">{member.bio}</p>
            )}
            {member.socialLinks && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-white/30 text-white/85 transition hover:border-[#0A66C2] hover:bg-white hover:text-[#0A66C2]"
                  >
                    <SocialIcon platform="linkedin" />
                  </a>
                )}
                {member.socialLinks.x && (
                  <a
                    href={member.socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} X`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-white/30 text-white/85 transition hover:border-black hover:bg-white hover:text-black"
                  >
                    <SocialIcon platform="x" />
                  </a>
                )}
                {member.socialLinks.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} Instagram`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-white/30 text-white/85 transition hover:border-[#E4405F] hover:bg-white hover:text-[#E4405F]"
                  >
                    <SocialIcon platform="instagram" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
