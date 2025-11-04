import React from "react";

type Props = { text: string; symbol: string };

const ScrollHint: React.FC<Props> = ({ text, symbol }) => (
  <div className="mt-10 flex items-center gap-2 text-sm text-gray-500">
    <span className="h-px w-8 bg-gray-700" />
    <span>{text}</span>
    <span aria-hidden className="animate-bounce">
      {symbol}
    </span>
  </div>
);

export default ScrollHint;
