import React from "react";

const CarouselSlide: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="w-full shrink-0 px-1">{children}</div>
);

export default CarouselSlide;
