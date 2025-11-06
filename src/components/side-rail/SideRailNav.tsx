import React from "react";
import {
  FaHome,
  FaThLarge,
  FaBriefcase,
  FaBook,
  FaBrain,
} from "react-icons/fa";
import type { NavItem } from "../../types/content";
import SideRailIconButton from "./SideRailIconButton";
import { smoothScrollTo } from "./utils";

const iconForId = (id: string) => {
  switch (id) {
    case "home":
      return FaHome;
    case "experience":
      return FaBriefcase;
    case "studies":
      return FaBook;
    case "skills":
      return FaBrain;
    default:
      return FaThLarge;
  }
};

type Props = {
  items: NavItem[];
  activeId: string;
  setActiveId: (id: string) => void;
};

const SideRailNav: React.FC<Props> = ({ items, activeId, setActiveId }) => (
  <nav className="flex flex-col items-center gap-3" aria-label="Sections">
    {items.map((item) => {
      const Icon = iconForId(item.id);
      const isActive = activeId === item.id;
      return (
        <SideRailIconButton
          key={item.id}
          title={item.label}
          ariaLabel={item.label}
          active={isActive}
          href={`#${item.id}`}
          onClick={(e) => {
            const el = document.getElementById(item.id);
            if (el) {
              e.preventDefault();
              smoothScrollTo(el);
              history.replaceState(null, "", `#${item.id}`);
              setActiveId(item.id);
            }
          }}
        >
          <Icon
            className={`h-5 w-5 transition-colors ${
              isActive
                ? "text-[var(--text)]"
                : "text-[var(--muted)] group-hover:text-[var(--text)]"
            }`}
            aria-hidden
          />
          <span
            aria-hidden
            className={`absolute left-[-10px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] transition-all duration-300 ${
              isActive
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75 group-hover:opacity-70 group-hover:scale-100"
            }`}
          />
        </SideRailIconButton>
      );
    })}
  </nav>
);

export default SideRailNav;
