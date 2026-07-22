import { team as fallbackTeam, pointOfContact as fallbackContact } from "@/data/team";
import { isSanityConfigured, sanityClient, urlForImage } from "@/lib/sanity";
import type { TeamMember } from "@/types";

type SanityTeamMember = {
  name?: string;
  role?: string;
  bio?: string;
  email?: string;
  image?: unknown;
  socialLinks?: TeamMember["socialLinks"];
};

type SanityContact = {
  contactName?: string;
  contactRole?: string;
  contactEmail?: string;
  supportEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSanityConfigured() || !sanityClient) return fallbackTeam;

  try {
    const rows = await sanityClient.fetch<SanityTeamMember[]>(
      `*[_type == "teamMember"] | order(order asc, name asc) {
        name, role, bio, email, image, socialLinks
      }`
    );

    if (!rows?.length) return fallbackTeam;

    return rows.map((row) => ({
      name: row.name?.trim() || "Team member",
      role: row.role?.trim() || "",
      bio: row.bio?.trim(),
      email: row.email?.trim(),
      image: urlForImage(row.image as never) || undefined,
      socialLinks: row.socialLinks,
    }));
  } catch {
    return fallbackTeam;
  }
}

export async function getPointOfContact(): Promise<TeamMember> {
  if (!isSanityConfigured() || !sanityClient) return fallbackContact;

  try {
    const settings = await sanityClient.fetch<SanityContact | null>(
      `*[_type == "siteSettings"][0]{
        contactName, contactRole, contactEmail, supportEmail, contactPhone, contactLocation
      }`
    );

    if (!settings?.contactEmail && !settings?.contactName) return fallbackContact;

    return {
      name: settings.contactName?.trim() || fallbackContact.name,
      role: settings.contactRole?.trim() || fallbackContact.role,
      email: settings.contactEmail?.trim() || fallbackContact.email,
      supportEmail: settings.supportEmail?.trim() || fallbackContact.supportEmail,
      phone: settings.contactPhone?.trim() || fallbackContact.phone,
      location: settings.contactLocation?.trim() || fallbackContact.location,
      availableForTravel: fallbackContact.availableForTravel,
    };
  } catch {
    return fallbackContact;
  }
}
