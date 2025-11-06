// src/types/content.ts

// --- CTA Variants ---
export type CtaVariant = "primary" | "secondary" | "link";

// --- Site-wide info (from site.json) ---
export interface SiteInfo {
  name: string;
  role?: string;
  social?: {
    github?: string | null;
    linkedin?: string | null;
    email?: string | null;
  };
  assets?: {
    resumeUrl?: string;
  };
}

// --- Header config (from header.json) ---
export interface HeaderConfig {
  title: string;
  subtitle?: string;
  buttons?: string[];
}

// --- Hero section (from hero.json) ---
export interface HeroContent {
  greeting: string;
  name: string;
  headline: { before: string; highlight: string; after: string };
  subheadline: string;
  badges: string[];
  ctas: {
    label: string;
    href: string;
    external?: boolean;
    variant: CtaVariant;
  }[];
  microcopy: { scrollHint: string; scrollSymbol: string };
}

// --- Navigation items (from navigation.json) ---
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  hidden?: boolean;
}

// --- Experience section (from experience.json) ---
export interface ExperienceHighlight {
  label: string;
  value: string;
}

export interface ExperienceLink {
  label: string;
  href: string;
  type?: "primary" | "secondary";
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  start: string; // YYYY-MM
  end: string | null; // YYYY-MM or null (current)
  highlights?: ExperienceHighlight[];
  bullets: string[];
  tech?: string[];
  links?: ExperienceLink[];
}

export interface ExperienceContent {
  intro: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  items: ExperienceItem[];
}

// --- SEO metadata (from seo.json) ---
export interface SeoData {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

// --- Side rail / social links (from rail.json) ---
export interface RailItem {
  icon: string;
  url: string;
  label?: string;
}

export type ProficiencyHint = "Proficient" | "Skilled" | "Familiar";

/** Icon keys are strings in JSON; mapped to real components at runtime */
export type IconKey =
  | "layout" // Frontend
  | "server" // Backend
  | "gitBranch" // Versioning
  | "database" // Databases
  | "flask" // Testing
  | "messageSquare" // Communication
  | "users" // Collaboration
  | "puzzle" // Problem Solving
  | "repeat" // Adaptability
  | "shieldCheck" // Ownership
  | "box"
  | "type"
  | "fileCode"
  | "sparkles"
  | "wrench"
  | "terminal"
  | "cpu"
  | "none"; // fallback when you don't want an icon

export interface SkillItem {
  label: string;
  hint?: ProficiencyHint;
  iconKey?: IconKey; // optional small icon next to chip label
}

export interface SkillCategory {
  id: string; // unique key used for accordion state
  title: string;
  iconKey: IconKey; // category icon (mapped in component)
  description?: string;
  items: SkillItem[];
}

export interface SkillsContent {
  hard: SkillCategory[];
  soft: SkillCategory[];
}
