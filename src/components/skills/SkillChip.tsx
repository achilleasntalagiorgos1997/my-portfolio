import React from "react";
import type { ProficiencyHint } from "../../types/content";

type Props = {
  label: string;
  icon?: React.ReactNode;
  hint?: ProficiencyHint;
};

// Hint color → always blue but with varied opacity for nuance
const hintClass = (hint?: ProficiencyHint) =>
  hint === "Proficient"
    ? "text-[var(--primary)] font-semibold"
    : hint === "Skilled"
    ? "text-[var(--primary)]/80 font-medium"
    : "text-[var(--primary)]/60";

const SkillChip: React.FC<Props> = ({ label, icon, hint }) => (
  <div
    className="
      group inline-flex items-center gap-2
      rounded-full border border-[var(--border)]/70 
      bg-[var(--surface)]/70 px-3 py-1.5
      text-sm text-[var(--muted)] backdrop-blur-sm
      hover:border-[var(--primary)]/50 hover:bg-[var(--surface)]/90
      transition-colors duration-200
    "
  >
    {icon && (
      <span className="text-[var(--primary)]/70 group-hover:text-[var(--primary)]">
        {icon}
      </span>
    )}
    <span className="font-medium text-[var(--text)]">{label}</span>
    {hint && <span className={`text-xs ${hintClass(hint)}`}>{hint}</span>}
  </div>
);

export default SkillChip;
