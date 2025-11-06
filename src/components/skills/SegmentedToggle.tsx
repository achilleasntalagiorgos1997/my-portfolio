import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type SkillsView = "hard" | "soft";
const viewTitle: Record<SkillsView, string> = {
  hard: "Hard Skills",
  soft: "Soft Skills",
};

const SegmentedToggle: React.FC<{
  active: SkillsView;
  onChange: (v: SkillsView) => void;
}> = ({ active, onChange }) => {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="
        relative inline-flex items-center
        rounded-xl border border-[var(--border)]/70
        bg-[var(--surface)]/70 p-1
        backdrop-blur-sm shadow-[0_1px_6px_rgba(0,0,0,0.08)]
      "
      role="tablist"
      aria-label="Skills view"
    >
      {(["hard", "soft"] as SkillsView[]).map((v) => {
        const isActive = active === v;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[
              "relative z-10 basis-1/2 rounded-lg px-3 py-1.5",
              "text-sm font-medium transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
              isActive
                ? "text-[var(--on-primary)]"
                : "text-[var(--muted)] hover:text-[var(--text)]",
            ].join(" ")}
            onClick={() => onChange(v)}
          >
            {viewTitle[v]}
          </button>
        );
      })}

      {/* Animated active background pill */}
      <span
        className="pointer-events-none absolute inset-1 grid grid-cols-2 rounded-lg"
        aria-hidden="true"
      >
        <motion.span
          className="
            col-span-1 rounded-lg
            bg-[var(--primary)]
            shadow-[0_0_6px_var(--primary)/35]
          "
          animate={{ x: active === "hard" ? "0%" : "100%" }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 25 }
          }
        />
      </span>
    </div>
  );
};

export default SegmentedToggle;
