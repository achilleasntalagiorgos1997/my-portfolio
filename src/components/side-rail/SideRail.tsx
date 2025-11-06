import React, { useEffect, useMemo, useState } from "react";
import navigation from "../../content/navigation.json";
import site from "../../content/site.json";
import type { NavItem, SiteInfo } from "../../types/content";
import SideRailNav from "./SideRailNav";
import SideRailFooter from "./SideRailFooter";
import { getHeaderOffset } from "./utils";

const SideRail: React.FC = () => {
  const items = useMemo(
    () => (navigation as NavItem[]).filter((i) => !i.hidden),
    []
  );
  const email = (site as SiteInfo)?.social?.email ?? null;

  const [activeId, setActiveId] = useState<string>(
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace("#", "")
      : items[0]?.id ?? "home"
  );

  // Scroll spy (hash-aware)
  useEffect(() => {
    const sectionEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = (visible.target as HTMLElement).id;
        if (id !== activeId) {
          setActiveId(id);
          if (history.replaceState) history.replaceState(null, "", `#${id}`);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items, activeId]);

  // Sync if user changes hash
  useEffect(() => {
    const onHashChange = () =>
      setActiveId(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Inject scroll-margin-top for sticky header
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `section{scroll-margin-top:${getHeaderOffset() + 12}px}`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center justify-between py-4"
      aria-label="Site sections"
    >
      {/* Vertical gradient spine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--primary)]/40 to-transparent"
      />

      {/* Spacer (header now owns Home + theme) */}
      <div className="h-8" />

      <SideRailNav
        items={items}
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <SideRailFooter setActiveId={setActiveId} />
    </aside>
  );
};

export default SideRail;
