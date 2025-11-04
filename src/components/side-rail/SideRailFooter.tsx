import React from "react";
import { FaArrowUp, FaEnvelope } from "react-icons/fa";
import SideRailIconButton from "./SideRailIconButton";
import { smoothScrollTo } from "./utils";

type Props = {
  email: string | null;
  setActiveId: (id: string) => void;
};

const SideRailFooter: React.FC<Props> = ({ email, setActiveId }) => (
  <div className="flex flex-col items-center gap-3">
    {email && (
      <SideRailIconButton
        title="Email"
        ariaLabel="Email"
        href={`mailto:${email}`}
      >
        <FaEnvelope
          className="h-5 w-5 text-gray-300 group-hover:text-amber-200"
          aria-hidden
        />
      </SideRailIconButton>
    )}

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
        className="h-5 w-5 text-gray-300 group-hover:text-amber-200"
        aria-hidden
      />
    </SideRailIconButton>
  </div>
);

export default SideRailFooter;
