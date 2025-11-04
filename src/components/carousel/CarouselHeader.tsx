import React from "react";

type Props = {
  title: string;
  subtitle?: string;
};

const CarouselHeader: React.FC<Props> = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
      {title}
    </h2>
    {subtitle && <p className="mt-3 text-gray-300 max-w-2xl">{subtitle}</p>}
  </div>
);

export default CarouselHeader;
