import { siteCopy as fallbackCopy } from "@/data/copy";
import { isSanityConfigured, sanityClient } from "@/lib/sanity";

export type EditableSiteCopy = {
  hero: {
    orgName: string;
    tagline: string;
    videoTitle: string;
  };
  mission: {
    heading: string;
    body: string;
  };
  guidingStatement: string;
  contact: {
    heading: string;
    body: string;
  };
};

type SanitySettings = {
  heroOrgName?: string;
  heroTagline?: string;
  videoTitle?: string;
  missionHeading?: string;
  missionBody?: string;
  guidingStatement?: string;
  contactHeading?: string;
  contactBody?: string;
};

export async function getEditableSiteCopy(): Promise<EditableSiteCopy> {
  const fallback: EditableSiteCopy = {
    hero: {
      orgName: fallbackCopy.hero.orgName,
      tagline: fallbackCopy.hero.tagline,
      videoTitle: fallbackCopy.hero.videoTitle,
    },
    mission: {
      heading: fallbackCopy.mission.heading,
      body: fallbackCopy.mission.body,
    },
    guidingStatement: fallbackCopy.guidingStatement,
    contact: {
      heading: fallbackCopy.contact.heading,
      body: fallbackCopy.contact.body,
    },
  };

  if (!isSanityConfigured() || !sanityClient) return fallback;

  try {
    const settings = await sanityClient.fetch<SanitySettings | null>(
      `*[_type == "siteSettings"][0]{
        heroOrgName, heroTagline, videoTitle,
        missionHeading, missionBody, guidingStatement,
        contactHeading, contactBody
      }`
    );

    if (!settings) return fallback;

    return {
      hero: {
        orgName: settings.heroOrgName?.trim() || fallback.hero.orgName,
        tagline: settings.heroTagline?.trim() || fallback.hero.tagline,
        videoTitle: settings.videoTitle?.trim() || fallback.hero.videoTitle,
      },
      mission: {
        heading: settings.missionHeading?.trim() || fallback.mission.heading,
        body: settings.missionBody?.trim() || fallback.mission.body,
      },
      guidingStatement: settings.guidingStatement?.trim() || fallback.guidingStatement,
      contact: {
        heading: settings.contactHeading?.trim() || fallback.contact.heading,
        body: settings.contactBody?.trim() || fallback.contact.body,
      },
    };
  } catch {
    return fallback;
  }
}
