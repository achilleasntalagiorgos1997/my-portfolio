import React from "react";
import site from "../../content/site.json";
import type { SiteInfo } from "../../types/content";

import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderButton from "./HeaderButton";

const Header: React.FC = () => {
  const s = site as SiteInfo;
  const resumeUrl = s.assets?.resumeUrl ?? "/resume.pdf";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800/60 bg-gray-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <HeaderLogo />
          <HeaderNav />
        </div>

        <div className="flex items-center gap-2">
          {/* Example CTA — download resume */}
          <HeaderButton href={resumeUrl} external variant="primary">
            Download Resume
          </HeaderButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
