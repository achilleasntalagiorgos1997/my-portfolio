import React from "react";

type Props = { text: string; symbol: string };

const ScrollHint: React.FC<Props> = ({ text, symbol }) => (
  <div className="mt-10 flex items-center gap-2 text-sm text-[var(--muted)]">
    <span className="h-px w-8 bg-[var(--primary)]" />
    <span className="font-bold text-[var(--primary)]">{text}</span>
    <span
      aria-hidden
      className="animate-bounce font-bold text-[var(--primary)] "
    >
      {symbol}
    </span>
  </div>
);

export default ScrollHint;
