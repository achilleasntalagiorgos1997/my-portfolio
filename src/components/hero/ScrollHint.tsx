import React from "react";

type Props = { text: string; symbol: string };

const ScrollHint: React.FC<Props> = ({ text, symbol }) => (
  <div className="mt-10 flex items-center gap-2 text-sm text-[var(--muted)]">
    <span className="h-px w-8 bg-[var(--surface)]" />
    <span>{text}</span>
    <span aria-hidden className="animate-bounce">
      {symbol}
    </span>
  </div>
);

export default ScrollHint;
