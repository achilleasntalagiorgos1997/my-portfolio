import React from "react";

type Props = { tech?: string[] };

const CardBadges: React.FC<Props> = ({ tech }) => {
  if (!tech || tech.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-[var(--border)]/80 bg-[var(--bg)]/60 px-3 py-1"
        >
          {t}
        </li>
      ))}
    </ul>
  );
};

export default CardBadges;
