import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import HeaderButton from "./buttons/HeaderButton";

// Content imports
import site from "../content/site.json";
import headerConfig from "../content/header.json";

type Site = {
  name: string;
  role?: string;
  social?: {
    github?: string | null;
    linkedin?: string | null;
    email?: string | null;
    x?: string | null;
    website?: string | null;
  };
  assets?: { resumeUrl?: string | null };
};

type HeaderConfig = {
  enableThemeToggle?: boolean;
  showResumeButton?: boolean;
  resumeLabel?: string;
};

const Header: React.FC = () => {
  const s = site as Site;
  const cfg = headerConfig as HeaderConfig;

  const name = s.name;
  const role = s.role;
  const resumeUrl = s.assets?.resumeUrl ?? "/resume.pdf";

  // Build social buttons from content
  const socials = [
    s.social?.email ? { icon: FaEnvelope, label: "Email", href: `mailto:${s.social?.email}`, external: false } : null,
    s.social?.github ? { icon: FaGithub, label: "GitHub", href: s.social.github!, external: true } : null,
    s.social?.linkedin ? { icon: FaLinkedin, label: "LinkedIn", href: s.social.linkedin!, external: true } : null
  ].filter(Boolean) as Array<{ icon: any; label: string; href: string; external?: boolean }>;

  // Create a simple monogram from the name (first + last initials)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-900/80 bg-gray-950/70 backdrop-blur-sm"
      role="banner"
    >
      {/* subtle gradient edge */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: Brand (monogram + name/role) */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 rounded-xl"
          aria-label="Go to home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400/25 via-amber-300/20 to-cyan-300/25 ring-1 ring-inset ring-amber-400/30">
            <span className="font-bold text-amber-200 tracking-wide">{initials}</span>
            <div className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-amber-400/10" aria-hidden />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-gray-100 tracking-tight group-hover:text-amber-200 transition-colors">
              {name}
            </span>
            <span className="text-xs text-gray-400">{role}</span>
          </div>
        </a>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {socials.map((s, idx) => (
            <HeaderButton key={idx} icon={s.icon} label={s.label} href={s.href} external={s.external} />
          ))}

          {cfg.showResumeButton && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-2 inline-flex items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200 transition-all hover:bg-amber-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950"
            >
              {cfg.resumeLabel ?? "Resume"}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
