import React from "react";
import type { ProficiencyHint } from "../../types/content";

type Props = {
  label: string;
  icon?: React.ReactNode;
  hint?: ProficiencyHint;
};

const hintClass = (hint?: ProficiencyHint) =>
  hint === "Proficient"
    ? "text-[var(--hint-strong)]"
    : hint === "Working"
    ? "text-[var(--hint-medium)]"
    : "text-[var(--hint-weak)]";

const SkillChip: React.FC<Props> = ({ label, icon, hint }) => (
  <div className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/60 px-3 py-1.5 text-sm text-[var(--text)] hover:border-[var(--border)] hover:bg-[var(--bg)]">
    {icon && (
      <span className="text-[var(--muted)] group-hover:text-[var(--text)]">
        {icon}
      </span>
    )}
    <span className="font-medium">{label}</span>
    {hint && <span className={`text-xs ${hintClass(hint)}`}>{hint}</span>}
  </div>
);
export default SkillChip;
