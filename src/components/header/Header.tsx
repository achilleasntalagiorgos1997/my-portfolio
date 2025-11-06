import React from "react";
import resumePdf from "../../assets/AchilleasNtalagiorgosCV.pdf";

import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderButton from "./HeaderButton";

const Header: React.FC = () => {
  const resumeUrl = resumePdf; // ✅ This points to the bundled file

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)]/60 bg-[var(--bg)]/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <HeaderLogo />
          <HeaderNav />
        </div>

        <div className="flex items-center gap-2">
          <HeaderButton href={resumeUrl} external variant="primary" download>
            Download Resume
          </HeaderButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
