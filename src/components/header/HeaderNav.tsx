import React from "react";
import navigation from "../../content/navigation.json";
import type { NavItem } from "../../types/content";

const HeaderNav: React.FC = () => {
  const items = (navigation as NavItem[]).filter((n) => !n.hidden);

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm text-gray-300">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href ?? `#${item.id}`}
              className="hover:text-amber-300 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
