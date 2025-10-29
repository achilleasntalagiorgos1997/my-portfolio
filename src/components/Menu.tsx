import React, { useEffect, useMemo, useRef, useState } from "react";
import navigation from "../content/navigation.json";

// Types for content file
type NavItem = { id: string; label: string; href?: string; hidden?: boolean };

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getHeaderOffset = () => {
  if (typeof document === "undefined") return 0;
  const header = document.querySelector("header");
  return (header as HTMLElement)?.offsetHeight ?? 0;
};

const smoothScrollTo = (el: HTMLElement) => {
  const y =
    el.getBoundingClientRect().top + window.scrollY - (getHeaderOffset() + 12);
  if (prefersReducedMotion()) {
    window.scrollTo(0, y);
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Menu: React.FC = () => {
  const items = useMemo(
    () => (navigation as NavItem[]).filter((i) => !i.hidden),
    []
  );

  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "home");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemHeightRef = useRef<number>(40); // default fallback

  // Measure item height once mounted for the sliding indicator
  useEffect(() => {
    const first = listRef.current?.querySelector(
      "li[data-menu-item]"
    ) as HTMLLIElement | null;
    if (first) itemHeightRef.current = first.offsetHeight + 12; // include gap (mt-3)
  }, []);

  // IntersectionObserver scroll-spy
  useEffect(() => {
    const sectionEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    const opts: IntersectionObserverInit = {
      root: null,
      // highlight when section takes the middle of the viewport
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      // Choose the entry with the highest intersection ratio
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const id = visible.target.id;
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) return;

      setActiveId(id);
      setActiveIndex(index);

      // Update URL hash without jumping
      if (history.replaceState) {
        history.replaceState(null, "", `#${id}`);
      }
    }, opts);

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Keyboard navigation inside the menu
  const onKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    const currentIdx = items.findIndex((i) => i.id === activeId);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(currentIdx + 1, items.length - 1);
      const el = document.getElementById(items[next].id);
      if (el) smoothScrollTo(el);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(currentIdx - 1, 0);
      const el = document.getElementById(items[prev].id);
      if (el) smoothScrollTo(el);
    } else if (/^[1-9]$/.test(e.key)) {
      const n = Number(e.key) - 1;
      if (n >= 0 && n < items.length) {
        const el = document.getElementById(items[n].id);
        if (el) smoothScrollTo(el);
      }
    }
  };

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) smoothScrollTo(section);
  };

  return (
    <nav aria-label="Section navigation" className="md:w-1/3 md:pl-12 w-full">
      <div className="relative rounded-2xl border border-gray-800/80 bg-gray-900/40 p-4 backdrop-blur-sm">
        <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
          Menu
        </h2>

        {/* Sliding amber indicator */}
        <div
          aria-hidden
          className="absolute left-0 top-[4.25rem] h-10 w-[3px] rounded-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.35)] transition-transform duration-300"
          style={{
            transform: `translateY(${activeIndex * itemHeightRef.current}px)`,
          }}
        />

        <ul
          ref={listRef}
          className="relative mt-1 flex flex-col gap-3 text-gray-300"
          role="listbox"
          onKeyDown={onKeyDown}
        >
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            const displayNumber = (idx + 1).toString().padStart(2, "0");
            return (
              <li key={item.id} data-menu-item className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.id);
                  }}
                  className={`group flex h-10 items-center gap-3 rounded-lg px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 ${
                    isActive
                      ? "text-amber-300"
                      : "text-gray-300 hover:text-amber-200"
                  }`}
                >
                  <span className="text-xs tabular-nums text-gray-500 group-hover:text-amber-200 w-8">
                    {displayNumber}
                  </span>
                  <span className="font-medium tracking-tight">
                    {item.label}
                  </span>
                </a>

                {/* Hairline divider for rhythm */}
                <div className="absolute -bottom-1 left-4 right-0 h-px bg-gradient-to-r from-gray-800/70 to-transparent" />
              </li>
            );
          })}
        </ul>

        {/* You are here caption */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span className="h-px w-6 bg-gray-700" />
          <span>You are here:</span>
          <span className="text-amber-300">{items[activeIndex]?.label}</span>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
