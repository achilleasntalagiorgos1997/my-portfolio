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

const AccordionItem: React.FC<Props> = ({
  open,
  onToggle,
  category,
  index,
  icon,
}) => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl bg-[var(--surface)]/60 border border-[var(--border)]/60 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5 text-left hover:bg-[var(--surface)]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        aria-expanded={open}
        aria-controls={`accordion-panel-${category.id}`}
        id={`accordion-header-${category.id}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-[var(--text)]/80">{icon}</span>
          <span className="text-base md:text-lg font-semibold text-[var(--text)]">
            {index + 1}. {category.title}
          </span>
        </div>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="text-[var(--muted)]"
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
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              {category.description && (
                <p className="text-sm md:text-base text-[var(--muted)] mb-4">
                  {category.description}
                </p>
              )}
              <ul className="flex flex-wrap gap-2.5">
                {category.items.map((it: SkillItem) => (
                  <li key={it.label}>
                    <SkillChip
                      label={it.label}
                      icon={
                        it.iconKey
                          ? null
                          : null /* icon injected by parent if desired */
                      }
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
