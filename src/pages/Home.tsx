import React from "react";
import Menu from "../components/Menu";
// Content imports (JSON modules)
import hero from "../content/hero.json";
import site from "../content/site.json";

type CtaVariant = "primary" | "secondary" | "link";

type HeroContent = {
  greeting: string;
  name: string;
  headline: { before: string; highlight: string; after: string };
  subheadline: string;
  badges: string[];
  ctas: {
    label: string;
    href: string;
    external?: boolean;
    variant: CtaVariant;
  }[];
  microcopy: { scrollHint: string; scrollSymbol: string };
};

const Home: React.FC = () => {
  const h = hero as HeroContent;
  const resumeUrl = (site as any)?.assets?.resumeUrl ?? "/resume.pdf";

  const variantClasses: Record<CtaVariant, string> = {
    primary:
      "inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-gray-900 font-semibold shadow-sm shadow-amber-400/20 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 motion-reduce:transform-none",
    secondary:
      "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-gray-700 text-gray-200/90 backdrop-blur-sm hover:bg-gray-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
    link: "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-gray-300 border border-transparent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden bg-gray-950 text-gray-100"
      aria-label="Hero section"
    >
      {/* Background identity motif */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft radial glow top-right */}
        <div className="absolute -top-40 -right-28 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-amber-400/15 via-cyan-400/10 to-transparent blur-3xl" />
        {/* Soft radial glow bottom-left */}
        <div className="absolute -bottom-48 -left-28 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-cyan-400/15 via-amber-400/10 to-transparent blur-3xl" />
        {/* Subtle grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:22px_22px] opacity-20"
        />
      </div>

      {/* Left: Intro */}
      <div className="w-full md:w-2/3 px-8 md:px-12 py-24 md:py-0 max-w-3xl">
        <p className="text-sm md:text-base text-gray-400 mb-4 tracking-wide uppercase">
          {h.greeting}{" "}
          <span className="text-gray-200 font-medium">{h.name}</span>
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          {h.headline.before}{" "}
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
            {h.headline.highlight}
          </span>{" "}
          {h.headline.after}
        </h1>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
          {h.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {h.ctas.map(({ label, href, external, variant }) => {
            const finalHref = label.toLowerCase().includes("download")
              ? resumeUrl
              : href;
            const className = variantClasses[variant];
            const rel = external ? "noreferrer noopener" : undefined;
            const target = external ? "_blank" : undefined;
            return (
              <a
                key={label}
                href={finalHref}
                target={target}
                rel={rel}
                className={className}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Quick tech badges */}
        <ul className="flex flex-wrap gap-2 text-xs text-gray-400">
          {h.badges.map((item) => (
            <li
              key={item}
              className="rounded-full border border-gray-800/80 bg-gray-900/60 px-3 py-1 backdrop-blur-sm"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Scroll hint */}
        <div className="mt-10 flex items-center gap-2 text-sm text-gray-500">
          <span className="h-px w-8 bg-gray-700" />
          <span>{h.microcopy.scrollHint}</span>
          <span aria-hidden className="animate-bounce">
            {h.microcopy.scrollSymbol}
          </span>
        </div>
      </div>

      {/* Right: Vertical Menu */}
      <Menu />
    </section>
  );
};

export default Home;
