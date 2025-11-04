import React from "react";
import { smoothScrollTo } from "./utils";

type Props = {
  setActiveId: (id: string) => void;
};

const SideRailBrand: React.FC<Props> = ({ setActiveId }) => (
  <a
    href="#home"
    className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400/25 via-amber-300/20 to-cyan-300/25 ring-1 ring-inset ring-amber-400/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950"
    title="Home"
    aria-label="Go to Home"
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
    <span className="font-bold text-amber-200 tracking-wide select-none">
      AN
    </span>
    <div
      className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-amber-400/10"
      aria-hidden
    />
  </a>
);

export default SideRailBrand;
