import React from "react";
import {
  FaHome,
  FaThLarge,
  FaBriefcase,
  FaBook,
  FaFileAlt,
} from "react-icons/fa";
import type { NavItem } from "../../types/content";
import SideRailIconButton from "./SideRailIconButton";
import { smoothScrollTo } from "./utils";

const iconForId = (id: string) => {
  switch (id) {
    case "home":
      return FaHome;
    case "projects":
      return FaThLarge;
    case "experience":
      return FaBriefcase;
    case "studies":
      return FaBook;
    case "resume":
      return FaFileAlt;
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
            className={`h-5 w-5 ${
              isActive
                ? "text-amber-300"
                : "text-gray-300 group-hover:text-amber-200"
            }`}
            aria-hidden
          />
          <span
            aria-hidden
            className={`absolute -left-3 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-opacity ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
            }`}
          />
        </SideRailIconButton>
      );
    })}
  </nav>
);

export default SideRailNav;
