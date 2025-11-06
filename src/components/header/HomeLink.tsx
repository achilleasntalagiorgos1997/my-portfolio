import React from "react";
import { smoothScrollTo } from "../side-rail/utils";

const HomeLink: React.FC = () => (
  <a
    href="#home"
    className="ui-chip group"
    title="Home"
    aria-label="Go to Home"
    onClick={(e) => {
      const el = document.getElementById("home");
      if (el) {
        e.preventDefault();
        smoothScrollTo(el);
        history.replaceState(null, "", "#home");
      }
    }}
  >
    <span className="select-none font-extrabold text-[var(--on-primary)] text-sm tracking-wide group-hover:tracking-[0.05em] transition-all duration-300">
      AN
    </span>
    <div className="ui-chip-glow" aria-hidden />
  </a>
);

export default HomeLink;
