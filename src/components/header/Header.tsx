import React from "react";
import resumePdf from "../../assets/AchilleasNtalagiorgosCV.pdf";

import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderButton from "./HeaderButton";
import HomeLink from "./HomeLink";
import Theme from "./Theme";

const Header: React.FC = () => {
  const resumeUrl = resumePdf;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)]/60 bg-[var(--bg)]/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left cluster: home badge + site name + nav */}
        <div className="flex items-center gap-4 md:gap-6">
          <HomeLink />
          <HeaderLogo />
          <HeaderNav />
        </div>

        {/* Right cluster: resume + theme toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          <HeaderButton href={resumeUrl} external variant="primary" download>
            Download Resume
          </HeaderButton>
          <Theme />
        </div>
      </div>
    </header>
  );
};

export default Header;
