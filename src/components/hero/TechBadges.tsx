import React from "react";

type Props = { badges: string[] };

const TechBadges: React.FC<Props> = ({ badges }) => (
  <ul className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
    {badges.map((item) => (
      <li
        key={item}
        className="rounded-full border border-[var(--border)]/80 bg-[var(--bg)]/60 px-3 py-1 backdrop-blur-sm"
      >
        {item}
      </li>
    ))}
  </ul>
);

export default TechBadges;
