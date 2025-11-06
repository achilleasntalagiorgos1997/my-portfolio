import React from "react";

type Highlight = { label: string; value: string | number };
type Props = { highlights: Highlight[] };

const CardHighlights: React.FC<Props> = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <ul className="mt-4 grid grid-cols-3 gap-2">
      {highlights.slice(0, 6).map((h, i) => (
        <li
          key={i}
          className="rounded-lg border border-[var(--border)]/70 bg-[var(--bg)]/40 px-3 py-2 text-center"
        >
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {h.label}
          </div>
          <div className="text-sm font-semibold text-[var(--primary)]">
            {h.value}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardHighlights;
