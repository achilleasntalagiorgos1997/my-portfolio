import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Theme: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="ui-chip group"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[var(--on-primary)] group-hover:rotate-6 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-[var(--on-primary)] group-hover:-rotate-6 transition-transform duration-300" />
      )}
      <div className="ui-chip-glow" aria-hidden />
    </button>
  );
};

export default Theme;
