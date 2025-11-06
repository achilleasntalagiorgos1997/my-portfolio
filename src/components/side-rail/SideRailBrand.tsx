import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

type Props = {
  setActiveId: (id: string) => void;
};

const SideRailBrand: React.FC<Props> = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="relative flex h-8 w-8 items-center justify-center rounded-[var(--radius-2xl)] bg-gradient-to-tr from-[var(--primary)]/25 via-[var(--primary)]/20 to-[var(--primary)]/25 ring-1 ring-inset ring-[var(--primary)]/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] focus-visible:ring-offset-2 transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[var(--text)]" />
      ) : (
        <Moon className="h-4 w-4 text-[var(--text)]" />
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-[var(--primary)]/10"
        aria-hidden
      />
    </button>
  );
};

export default SideRailBrand;
