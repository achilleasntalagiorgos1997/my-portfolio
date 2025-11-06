import React from "react";
import { FaArrowUp } from "react-icons/fa";
import SideRailIconButton from "./SideRailIconButton";
import { smoothScrollTo } from "./utils";

type Props = {
  setActiveId: (id: string) => void;
};

const SideRailFooter: React.FC<Props> = ({ setActiveId }) => (
  <div className="flex flex-col items-center gap-3">
    <SideRailIconButton
      title="Back to top"
      ariaLabel="Back to top"
      href="#home"
      onClick={(e) => {
        const el = document.getElementById("home");
        if (el) {
          e.preventDefault();
          smoothScrollTo(el);
          history.replaceState(null, "", `#home`);
          setActiveId("home");
        }
      }}
    >
      <FaArrowUp
        className="h-5 w-5 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors duration-200"
        aria-hidden
      />
    </SideRailIconButton>
  </div>
);

export default SideRailFooter;
