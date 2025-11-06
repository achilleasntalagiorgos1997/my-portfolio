import React from "react";
import Menu from "../components/Menu";

// content
import hero from "../content/hero.json";
import site from "../content/site.json";

// types
import type { HeroContent, SiteInfo } from "../types/content";

// pieces
import HeroBackground from "../components/hero/HeroBackground";
import HeroIntro from "../components/hero/HeroIntro";
import CtaButtons from "../components/hero/CtaButtons";
import TechBadges from "../components/hero/TechBadges";
import ScrollHint from "../components/hero/ScrollHint";

const Home: React.FC = () => {
  const h = hero as HeroContent;
  const resumeUrl = (site as SiteInfo).assets?.resumeUrl ?? "/resume.pdf";

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]"
      aria-label="Hero section"
    >
      <HeroBackground />

      {/* Left: Intro */}
      <div className="w-full md:w-2/3 px-8 md:px-12 py-24 md:py-0 max-w-3xl">
        <HeroIntro h={h} />
        <CtaButtons ctas={h.ctas} resumeUrl={resumeUrl} />
        <TechBadges badges={h.badges} />
        <ScrollHint
          text={h.microcopy.scrollHint}
          symbol={h.microcopy.scrollSymbol}
        />
      </div>

      {/* Right: Vertical Menu */}
      <Menu />
    </section>
  );
};

export default Home;
