import React from "react";
import type { CtaVariant, HeroContent } from "../../types/content";
import resumePdf from "../../assets/AchilleasNtalagiorgosCV.pdf";

type Props = {
  ctas: HeroContent["ctas"];
};

const variantClasses: Record<CtaVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-[var(--primary-fg)] font-semibold shadow-sm shadow-[var(--primary)]/20 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] motion-reduce:transform-none",
  secondary:
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-[var(--border)] text-[var(--text)]/90 backdrop-blur-sm hover:bg-[var(--surface)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
  link: "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[var(--text)]/80 border border-transparent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]",
};

const CtaButtons: React.FC<Props> = ({ ctas }) => (
  <div className="flex flex-wrap items-center gap-3 mb-10">
    {ctas.map(({ label, href, external, variant }) => {
      const lowerLabel = label.toLowerCase();

      const isResume =
        lowerLabel.includes("open") || lowerLabel.includes("resume");
      const isTalk =
        lowerLabel.includes("let's talk") || lowerLabel.includes("lets talk");

      let finalHref = href;
      if (isResume) finalHref = resumePdf;
      if (isTalk) finalHref = "https://github.com/AchilleasNtalagiorgos"; // <-- your GitHub profile

      const isExternal = external || isResume || isTalk;
      const rel = isExternal ? "noreferrer noopener" : undefined;
      const target = isExternal ? "_blank" : undefined;

      // 🔹 If it's the "Open CV" link, give it a blue hover color
      const extraHover =
        isResume && variant === "link"
          ? "hover:text-[var(--primary)] hover:no-underline"
          : "";

      return (
        <a
          key={label}
          href={finalHref}
          target={target}
          rel={rel}
          className={`${variantClasses[variant]} ${extraHover}`}
        >
          {label}
        </a>
      );
    })}
  </div>
);

export default CtaButtons;
