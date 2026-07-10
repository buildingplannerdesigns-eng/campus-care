export type ElementKey = "water" | "fire" | "earth" | "mineral" | "nature";

export interface CoreElement {
  key: ElementKey;
  name: string;
  eyebrow: string;
  description: string;
}

export interface OperationStep {
  order: number;
  title: string;
  description: string;
}

export interface MentalHealthStat {
  stat: string;
  description: string;
  source: string;
  sourceUrl: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  socialLinks?: {
    linkedin?: string;
    x?: string;
    instagram?: string;
  };
  email?: string;
  phone?: string;
  location?: string;
  availableForTravel?: boolean;
}

export interface AudienceOutcome {
  audience: "Individuals" | "Couples" | "Families" | "Communities";
  outcome: string;
  icon: "user-round" | "heart" | "house" | "handshake";
}

export interface ExternalResource {
  label: string;
  url: string;
  description: string;
}

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  target?: "general" | "dr-cammie";
}
