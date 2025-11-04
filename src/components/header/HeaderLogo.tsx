import React from "react";
import site from "../../content/site.json";
import type { SiteInfo } from "../../types/content";

const HeaderLogo: React.FC = () => {
  const s = site as SiteInfo;
  const name = s.name ?? "Site";
  return (
    <a
      href="#home"
      className="font-extrabold tracking-tight text-gray-100 hover:text-amber-300 transition-colors"
      aria-label={`${name} — go to home`}
    >
      {name}
    </a>
  );
};

export default HeaderLogo;
