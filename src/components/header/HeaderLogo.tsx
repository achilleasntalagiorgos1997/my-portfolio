import React from "react";
import site from "../../content/site.json";
import type { SiteInfo } from "../../types/content";

const HeaderLogo: React.FC = () => {
  const s = site as SiteInfo;
  const name = s.name ?? "Site";

  return (
    <a
      href="#home"
      className="font-extrabold tracking-tight text-[var(--text)] hover:text-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]"
      aria-label={`${name} — go to home`}
    >
      {name}
    </a>
  );
};

export default HeaderLogo;
