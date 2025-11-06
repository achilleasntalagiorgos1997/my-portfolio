import React from "react";
import { motion } from "framer-motion";

type SkillsView = "hard" | "soft";
const viewTitle: Record<SkillsView, string> = {
  hard: "Hard Skills",
  soft: "Soft Skills",
};

const SegmentedToggle: React.FC<{
  active: SkillsView;
  onChange: (v: SkillsView) => void;
}> = ({ active, onChange }) => {
  return (
    <div className="relative inline-flex rounded-xl bg-[var(--surface)] p-1 shadow-inner">
      {(["hard", "soft"] as SkillsView[]).map((v) => {
        const isActive = active === v;
        return (
          <button
            key={v}
            type="button"
            className={`relative z-10 px-4 py-2 text-sm md:text-base rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
              isActive
                ? "text-[var(--toggle-active-fg)]"
                : "text-[var(--toggle-inactive-fg)] hover:text-[var(--text)]"
            }`}
            aria-pressed={isActive}
            onClick={() => onChange(v)}
          >
            {viewTitle[v]}
          </button>
        );
      })}
      {/* animated background pill */}
      <span className="absolute inset-1 grid grid-cols-2" aria-hidden="true">
        <motion.span
          className="col-span-1 rounded-lg bg-[var(--toggle-active-bg)]"
          animate={{ x: active === "hard" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        />
      </span>
    </div>
  );
};

export default SegmentedToggle;
