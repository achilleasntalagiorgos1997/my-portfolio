import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
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

import skillsData from "../content/skills.json";
import type { SkillsContent, SkillCategory, IconKey } from "../types/content";

import SectionHeader from "../components/common/SectionHeader";
import { SegmentedToggle, AccordionItem } from "../components/skills";

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

const Skills: React.FC = () => {
  const [activeView, setActiveView] = React.useState<SkillsView>("hard");
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const [direction, setDirection] = React.useState(1);
  const reduce = useReducedMotion();

  const categories: SkillCategory[] =
    activeView === "hard" ? skills.hard : skills.soft;

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
      className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 md:px-8 py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeader
          title="Skills"
          subtitle="Toggle between Hard and Soft skills."
          align="left"
        />

        <div className="flex flex-col items-center gap-6 mb-10 md:mb-12">
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
                  icon={IconMap[cat.iconKey] ?? null}
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
