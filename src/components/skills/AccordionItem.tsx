import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { SkillCategory, SkillItem } from "../../types/content";
import SkillChip from "./SkillChip";

type Props = {
  open: boolean;
  onToggle: () => void;
  category: SkillCategory;
  index: number;
  icon: React.ReactNode | null;
};

const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
};

// Helper: highlight words like “Proficient” or “Working”
const highlightProficiency = (text: string) => {
  const regex =
    /\b(Proficient|Working|Intermediate|Expert|Advanced|Beginner)\b/gi;
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-[var(--primary)] font-medium">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const AccordionItem: React.FC<Props> = ({
  open,
  onToggle,
  category,
  index,
  icon,
}) => {
  const reduce = useReducedMotion();

  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border bg-[var(--surface)]/70",
        "border-[var(--border)]/70",
        open ? "ring-1 ring-[var(--primary)]/40" : "",
      ].join(" ")}
    >
      {/* subtle left accent */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] bg-[var(--primary)]/50"
        initial={false}
        animate={{ opacity: open ? 1 : 0.15 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
      />

      <button
        type="button"
        onClick={onToggle}
        className={[
          "w-full flex items-center justify-between gap-3",
          "px-5 py-3 md:px-6 md:py-4",
          "text-left transition-colors",
          "hover:bg-[var(--surface)]/85",
          "focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        ].join(" ")}
        aria-expanded={open}
        aria-controls={`accordion-panel-${category.id}`}
        id={`accordion-header-${category.id}`}
      >
        <div className="flex items-center gap-3">
          {icon ? <span className="text-[var(--muted)]">{icon}</span> : null}
          <span
            className={[
              "text-sm md:text-base font-semibold",
              open
                ? "text-[var(--primary)]"
                : "text-[var(--text)] hover:text-[var(--primary)]",
            ].join(" ")}
          >
            {index + 1}. {category.title}
          </span>
        </div>

        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className={open ? "text-[var(--primary)]" : "text-[var(--muted)]"}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={`accordion-panel-${category.id}`}
            role="region"
            aria-labelledby={`accordion-header-${category.id}`}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionVariants}
            transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 md:px-6 md:pb-5">
              {category.description && (
                <p className="mb-3 text-sm text-[var(--text-muted)] leading-relaxed">
                  {highlightProficiency(category.description)}
                </p>
              )}
              <ul className="flex flex-wrap gap-2.5">
                {category.items.map((it: SkillItem) => (
                  <li key={it.label}>
                    <SkillChip
                      label={it.label}
                      icon={it.iconKey ? null : null}
                      hint={it.hint}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
