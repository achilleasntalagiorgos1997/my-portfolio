import React from "react";
import type { CtaVariant, HeroContent } from "../../types/content";

type Props = {
  ctas: HeroContent["ctas"];
  resumeUrl: string;
};

const variantClasses: Record<CtaVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-gray-900 font-semibold shadow-sm shadow-amber-400/20 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 motion-reduce:transform-none",
  secondary:
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-gray-700 text-gray-200/90 backdrop-blur-sm hover:bg-gray-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
  link: "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-gray-300 border border-transparent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
};

const CtaButtons: React.FC<Props> = ({ ctas, resumeUrl }) => (
  <div className="flex flex-wrap items-center gap-3 mb-10">
    {ctas.map(({ label, href, external, variant }) => {
      const finalHref = label.toLowerCase().includes("download")
        ? resumeUrl
        : href;
      const rel = external ? "noreferrer noopener" : undefined;
      const target = external ? "_blank" : undefined;

      return (
        <a
          key={label}
          href={finalHref}
          target={target}
          rel={rel}
          className={variantClasses[variant]}
        >
          {label}
        </a>
      );
    })}
  </div>
);

export default CtaButtons;
