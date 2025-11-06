import React from "react";
import type { HeroContent } from "../../types/content";

type Props = { h: HeroContent };

const HeroIntro: React.FC<Props> = ({ h }) => (
  <>
    <p className="text-sm md:text-base text-[var(--muted)] mb-4 tracking-wide uppercase">
      {h.greeting}{" "}
      <span className="text-[var(--text)] font-medium">{h.name}</span>
    </p>
    <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6 text-[var(--text)]">
      {h.headline.before}{" "}
      <span
        className="bg-gradient-to-r
             from-[var(--hero-from)]
             via-[var(--hero-via)]
             to-[var(--hero-to)]
             bg-clip-text text-transparent"
      >
        {h.headline.highlight}
      </span>
    </h1>
    <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-2xl">
      {h.subheadline}
    </p>
  </>
);

export default HeroIntro;
