import React from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

const CarouselHeader: React.FC<Props> = ({ eyebrow, title, subtitle }) => (
  <div className="mb-10">
    {eyebrow && (
      <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
        <span className="h-px w-6 bg-gray-700" />
        {eyebrow}
      </div>
    )}
    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
      {title}
    </h2>
    {subtitle && <p className="mt-3 text-gray-300 max-w-2xl">{subtitle}</p>}
  </div>
);

export default CarouselHeader;
