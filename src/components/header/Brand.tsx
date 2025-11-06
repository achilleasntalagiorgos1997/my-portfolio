import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const SideRailBrand: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="group relative flex h-10 w-10 items-center justify-center rounded-2xl
                 bg-gradient-to-tr from-[var(--primary)]/60 via-[var(--primary)]/40 to-[var(--primary)]/60
                 shadow-[0_0_10px_var(--primary)/30]
                 ring-1 ring-inset ring-[var(--primary)]/40
                 backdrop-blur-md
                 transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_18px_var(--primary)/40]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] focus-visible:ring-offset-2"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[var(--on-primary)] group-hover:rotate-6 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-[var(--on-primary)] group-hover:-rotate-6 transition-transform duration-300" />
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl 
                   bg-[radial-gradient(circle_at_30%_30%,var(--primary)/20,transparent_70%)] 
                   blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      />
    </button>
  );
};

export default SideRailBrand;
