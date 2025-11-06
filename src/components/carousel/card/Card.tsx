import React from "react";

type Props = { children: React.ReactNode };

const Card: React.FC<Props> = ({ children }) => (
  <div className="rounded-2xl border border-[var(--border)]/70 bg-[var(--bg)]/60 p-6 backdrop-blur-sm">
    {children}
  </div>
);

export default Card;
