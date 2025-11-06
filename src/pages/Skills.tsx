import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Cpu,
  Layout,
  Server,
  GitBranch,
  Database,
  FlaskConical,
  MessageSquare,
  Users,
  Puzzle,
  Repeat,
  ShieldCheck,
  Sparkles,
  Box,
  Type as TypeIcon,
  FileCode2,
  Wrench,
  TerminalSquare,
} from "lucide-react";

import skillsData from "../content/skills.json"; // path alias as in your project
import type {
  SkillsContent,
  SkillCategory,
  SkillItem,
  IconKey,
  ProficiencyHint,
} from "../types/content";

// Map JSON iconKey -> actual icon component
const IconMap: Record<IconKey, React.ReactNode> = {
  layout: <Layout className="h-5 w-5" />,
  server: <Server className="h-5 w-5" />,
  gitBranch: <GitBranch className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  flask: <FlaskConical className="h-5 w-5" />,
  messageSquare: <MessageSquare className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  puzzle: <Puzzle className="h-5 w-5" />,
  repeat: <Repeat className="h-5 w-5" />,
  shieldCheck: <ShieldCheck className="h-5 w-5" />,
  box: <Box className="h-4 w-4" />,
  type: <TypeIcon className="h-4 w-4" />,
  fileCode: <FileCode2 className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
  wrench: <Wrench className="h-4 w-4" />,
  terminal: <TerminalSquare className="h-4 w-4" />,
  cpu: <Cpu className="h-4 w-4" />,
  none: null,
};

type SkillsView = "hard" | "soft";
const viewTitle: Record<SkillsView, string> = {
  hard: "Hard Skills",
  soft: "Soft Skills",
};

// Type-check JSON at import time
const skills = skillsData as SkillsContent;

const containerVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
    filter: "blur(6px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
    filter: "blur(6px)",
    transition: { duration: 0.25 },
  }),
};

const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
};

const hintClass = (hint?: ProficiencyHint) =>
  hint === "Proficient"
    ? "text-emerald-400"
    : hint === "Working"
    ? "text-sky-400"
    : "text-[var(--muted)]";

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
            className={`relative z-10 px-4 py-2 text-sm md:text-base rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70 ${
              isActive ? "text-gray-900" : "text-gray-300 hover:text-[var(--text)]"
            }`}
            aria-pressed={isActive}
            onClick={() => onChange(v)}
          >
            {viewTitle[v]}
          </button>
        );
      })}
      {/* Animated background pill */}
      <span className="absolute inset-1 grid grid-cols-2" aria-hidden="true">
        <motion.span
          className="col-span-1 rounded-lg bg-yellow-400"
          animate={{ x: active === "hard" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        />
      </span>
    </div>
  );
};

const AccordionItem: React.FC<{
  open: boolean;
  onToggle: () => void;
  category: SkillCategory;
  index: number;
}> = ({ open, onToggle, category, index }) => {
  const reduce = useReducedMotion();
  const catIcon = IconMap[category.iconKey] ?? null;

  return (
    <div className="rounded-2xl bg-[var(--surface)]/60 border border-[var(--border)]/60 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5 text-left hover:bg-[var(--surface)]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
        aria-expanded={open}
        aria-controls={`accordion-panel-${category.id}`}
        id={`accordion-header-${category.id}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-yellow-400">{catIcon}</span>
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
                <p className="text-sm md:text-base text-gray-300/90 mb-4">
                  {category.description}
                </p>
              )}
              <ul className="flex flex-wrap gap-2.5">
                {category.items.map((it: SkillItem) => {
                  const chipIcon =
                    it.iconKey && IconMap[it.iconKey]
                      ? IconMap[it.iconKey]
                      : null;
                  return (
                    <li key={it.label}>
                      <div className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/60 px-3 py-1.5 text-sm text-[var(--text)] hover:border-[var(--border)] hover:bg-[var(--bg)]">
                        {chipIcon && (
                          <span className="text-[var(--muted)] group-hover:text-gray-300">
                            {chipIcon}
                          </span>
                        )}
                        <span className="font-medium">{it.label}</span>
                        {it.hint && (
                          <span className={`text-xs ${hintClass(it.hint)}`}>
                            {it.hint}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Skills: React.FC = () => {
  const [activeView, setActiveView] = React.useState<SkillsView>("hard");
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const [direction, setDirection] = React.useState(1);
  const reduce = useReducedMotion();

  const categories: SkillCategory[] =
    activeView === "hard" ? skills.hard : skills.soft;

  // Auto-open first category on mount and on view switch
  React.useEffect(() => {
    setOpenCategory(categories[0]?.id ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  const handleViewChange = (v: SkillsView) => {
    if (v === activeView) return;
    setDirection(v === "soft" ? 1 : -1);
    setActiveView(v);
  };

  const toggleCategory = (id: string) =>
    setOpenCategory((curr) => (curr === id ? null : id));

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center bg-[var(--bg)] text-[var(--text)] px-6 py-16 md:px-8"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center gap-6 mb-10 md:mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-yellow-400">
            Skills
          </h2>
          <p className="text-center text-gray-300/90 max-w-2xl">
            Toggle between{" "}
            <span className="text-[var(--text)] font-medium">Hard</span> and{" "}
            <span className="text-[var(--text)] font-medium">Soft</span> skills.
            Click a category to expand—only one stays open at a time.
          </p>

          <SegmentedToggle active={activeView} onChange={handleViewChange} />
        </div>

        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeView}
              custom={direction}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={reduce ? { duration: 0 } : undefined}
              className="space-y-3 md:space-y-4"
            >
              {categories.map((cat, idx) => (
                <AccordionItem
                  key={cat.id}
                  category={cat}
                  index={idx}
                  open={openCategory === cat.id}
                  onToggle={() => toggleCategory(cat.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
