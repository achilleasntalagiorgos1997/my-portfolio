import React from "react";
import { smoothScrollTo } from "./utils";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

type Props = {
  setActiveId: (id: string) => void;
};

const SideRailBrand: React.FC<Props> = ({ setActiveId }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400/25 via-amber-300/20 to-cyan-300/25 ring-1 ring-inset ring-amber-400/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-200" />
      ) : (
        <Moon className="h-4 w-4 text-gray-800" />
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-[var(--primary)]/10"
        aria-hidden
      />
    </button>
  );
};

export default SideRailBrand;
