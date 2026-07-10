import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    name: "Dr. Cammie Connor",
    role: "Founder · Speaker, Workshops & Coaching",
    bio: "Dr. Cammie's expertise in intergenerational trauma helps break the thought patterns that no longer serve a person's purpose — the clinical foundation behind ACT Healing and Campus Care 2.0.",
    image: "/images/team/dr.cammie.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com",
      x: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Precious Osei",
    role: "Program Strategy & Partnerships",
    bio: "Precious supports program operations and cross-campus collaboration to expand equitable student wellness access.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      x: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Yaov",
    role: "Technology & Product",
    bio: "Yaov leads platform execution and helps shape reliable, user-centered digital experiences for Campus Care 2.0.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      x: "https://x.com",
      instagram: "https://instagram.com",
    },
  },
];

// Point of contact for press, partnerships, and general enquiries.
export const pointOfContact: TeamMember = {
  name: "Tessa Brock",
  role: "Contact",
  email: "info@campuscare.com",
  phone: "520.404.1245",
  location: "Tucson, Arizona",
  availableForTravel: true,
};
