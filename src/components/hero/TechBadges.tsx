import React from "react";

type Props = { badges: string[] };

const TechBadges: React.FC<Props> = ({ badges }) => (
  <ul className="flex flex-wrap gap-2 text-xs text-gray-400">
    {badges.map((item) => (
      <li
        key={item}
        className="rounded-full border border-gray-800/80 bg-gray-900/60 px-3 py-1 backdrop-blur-sm"
      >
        {item}
      </li>
    ))}
  </ul>
);

export default TechBadges;
