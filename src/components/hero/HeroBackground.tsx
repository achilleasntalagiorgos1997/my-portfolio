import React from "react";

const HeroBackground: React.FC = () => (
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
);

export default HeroBackground;
