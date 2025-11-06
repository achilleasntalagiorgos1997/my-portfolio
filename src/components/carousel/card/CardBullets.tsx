import React from "react";

type Props = { bullets?: string[] };

const CardBullets: React.FC<Props> = ({ bullets }) => {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className="mt-5 space-y-2 text-[var(--text-muted)]">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2">
          <span
            className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]/70"
            aria-hidden
          />
          <p className="leading-relaxed ">{b}</p>
        </li>
      ))}
    </ul>
  );
};

export default CardBullets;
