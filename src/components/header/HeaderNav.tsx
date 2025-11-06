import React from "react";
import navigation from "../../content/navigation.json";
import type { NavItem } from "../../types/content";

const HeaderNav: React.FC = () => {
  const items = (navigation as NavItem[]).filter((n) => !n.hidden);

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm text-[var(--text)]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href ?? `#${item.id}`}
              className="transition-colors text-[var(--text)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]"
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
