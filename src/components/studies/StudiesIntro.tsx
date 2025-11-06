import React from "react";

type Props = { children: React.ReactNode };

const Intro: React.FC<Props> = ({ children }) => (
  <p className="text-lg text-[var(--muted)] mb-10 leading-relaxed">
    {children}
  </p>
);

export default Intro;
