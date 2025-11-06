import React from "react";
import { smoothScrollTo } from "./utils";

type Props = {
  setActiveId: (id: string) => void;
};

const HomeLink: React.FC<Props> = ({ setActiveId }) => (
  <a
    href="#home"
    className="relative flex h-8 w-8 items-center justify-center rounded-[var(--radius-2xl)] bg-gradient-to-tr from-[var(--primary)]/25 via-[var(--primary)]/20 to-[var(--primary)]/25 ring-1 ring-inset ring-[var(--primary)]/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] focus-visible:ring-offset-2 transition-colors"
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
    <span className="font-bold text-[var(--text)] tracking-wide select-none">
      AN
    </span>
    <div
      className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-[var(--primary)]/10"
      aria-hidden
    />
  </a>
);

export default HomeLink;
