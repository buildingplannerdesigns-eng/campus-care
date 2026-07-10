export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  bodyBlocks?: BlogPortableBlock[];
  publishedAt: string;
  author: string;
  category: string;
  imageUrl: string;
};

export type BlogMarkDef = {
  _key: string;
  _type?: string;
  href?: string;
};

export type BlogPortableTextChild = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

export type BlogPortableBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: BlogPortableTextChild[];
  markDefs?: BlogMarkDef[];
};

function paragraphsToBlocks(paragraphs: string[]): BlogPortableBlock[] {
  return paragraphs.map((paragraph, index) => ({
    _key: `fallback-block-${index}`,
    _type: "block",
    style: "normal",
    children: [
      {
        _key: `fallback-span-${index}`,
        _type: "span",
        text: paragraph,
        marks: [],
      },
    ],
    markDefs: [],
  }));
}

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "fallback-1",
    title: "Why culturally grounded digital wellness matters now",
    slug: "culturally-grounded-digital-wellness",
    excerpt:
      "A practical look at how culturally responsive immersive environments can increase trust, reduce stress, and improve student engagement in care.",
    body: [
      "Culturally grounded care is not just a value statement; it is a design requirement for meaningful outcomes. Students are more likely to engage when language, symbolism, and pacing reflect their lived reality.",
      "In immersive environments, this means tuning visual atmosphere, sound cues, and narrative prompts to foster familiarity and psychological safety. When these signals are aligned, students often report lower resistance and stronger emotional openness.",
      "The long-term opportunity is to combine this design approach with measurable regulation data, helping institutions move from one-size-fits-all support to responsive, context-aware care pathways.",
    ],
    bodyBlocks: paragraphsToBlocks([
      "Culturally grounded care is not just a value statement; it is a design requirement for meaningful outcomes. Students are more likely to engage when language, symbolism, and pacing reflect their lived reality.",
      "In immersive environments, this means tuning visual atmosphere, sound cues, and narrative prompts to foster familiarity and psychological safety. When these signals are aligned, students often report lower resistance and stronger emotional openness.",
      "The long-term opportunity is to combine this design approach with measurable regulation data, helping institutions move from one-size-fits-all support to responsive, context-aware care pathways.",
    ]),
    publishedAt: "2026-06-30",
    author: "Campus Care Team",
    category: "Clinical Perspective",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "fallback-2",
    title: "Designing restorative digital spaces for HBCU students",
    slug: "designing-restorative-digital-spaces",
    excerpt:
      "How sensory pacing, familiar symbolism, and narrative structure support psychological safety in immersive experiences.",
    body: [
      "Restorative digital spaces should feel intentional from the first frame. Lighting, environmental tone, and interactive tempo can reduce cognitive load before a student takes any explicit action.",
      "Design teams can incorporate recognizable textures and story arcs that mirror communal resilience, creating a stronger sense of belonging while preserving privacy and autonomy.",
      "When these experiences are paired with trauma-informed facilitation, they become practical tools for campuses seeking scalable and culturally coherent wellness pathways.",
    ],
    bodyBlocks: paragraphsToBlocks([
      "Restorative digital spaces should feel intentional from the first frame. Lighting, environmental tone, and interactive tempo can reduce cognitive load before a student takes any explicit action.",
      "Design teams can incorporate recognizable textures and story arcs that mirror communal resilience, creating a stronger sense of belonging while preserving privacy and autonomy.",
      "When these experiences are paired with trauma-informed facilitation, they become practical tools for campuses seeking scalable and culturally coherent wellness pathways.",
    ]),
    publishedAt: "2026-06-10",
    author: "Campus Care Team",
    category: "Design Notes",
    imageUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "fallback-3",
    title: "From stress response to regulation: an implementation view",
    slug: "stress-response-to-regulation",
    excerpt:
      "A brief implementation walkthrough of closed-loop support using biometric input, immersive modules, and guided re-entry techniques.",
    body: [
      "Closed-loop implementation begins with baseline sensing. Even lightweight physiological signals can help classify when a user needs downregulation, grounding, or perspective-shifting support.",
      "Immersive modules can then adapt in real time through pacing, prompts, and sensory density. The goal is not overstimulation; it is steady movement toward regulation and clarity.",
      "A structured re-entry phase closes the session by translating internal shifts into practical next steps, improving continuity between digital intervention and daily campus life.",
    ],
    bodyBlocks: paragraphsToBlocks([
      "Closed-loop implementation begins with baseline sensing. Even lightweight physiological signals can help classify when a user needs downregulation, grounding, or perspective-shifting support.",
      "Immersive modules can then adapt in real time through pacing, prompts, and sensory density. The goal is not overstimulation; it is steady movement toward regulation and clarity.",
      "A structured re-entry phase closes the session by translating internal shifts into practical next steps, improving continuity between digital intervention and daily campus life.",
    ]),
    publishedAt: "2026-05-22",
    author: "Campus Care Team",
    category: "Implementation",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
  },
];
