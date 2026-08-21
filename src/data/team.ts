import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    name: "Dr. Cammie Connor",
    role: "Founder · Speaker, Workshops & Coaching",
    bio: "Dr. Cammie's expertise in intergenerational trauma helps break the thought patterns that no longer serve a person's purpose — the clinical foundation behind ACT Healing and Campus Care 2.0.",
    image: "/images/team/dr.cammie.jpg",
    email: "cconnor@actcampuscare.com",
  },
  {
    name: "Precious Osei",
    role: "Program Strategy & Partnerships",
    bio: "Precious supports program operations and cross-campus collaboration to expand equitable student wellness access.",
    image: "/images/team/precious.jpeg",
    email: "posei@actcampuscare.com",
  },
  {
    name: "Yaov",
    role: "Technology & Product",
    bio: "Yaov leads platform execution and helps shape reliable, user-centered digital experiences for Campus Care 2.0.",
  },
];

// Public contact is always Dr. Cammie Connor (Tessa was an error and must not appear).
// Location and travel availability are omitted from public display.
export const CONTACT_PHONE = "+1 573-203-6723";

export const pointOfContact: TeamMember = {
  name: "Dr. Cammie Connor",
  role: "Founder · Speaker, Workshops & Coaching",
  email: "cconnor@actcampuscare.com",
  supportEmail: "info@actcampuscare.com",
  phone: CONTACT_PHONE,
};
