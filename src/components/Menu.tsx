import React, { useEffect, useMemo, useRef, useState } from "react";
import navigation from "../content/navigation.json";

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
  const itemHeightRef = useRef<number>(40);

  useEffect(() => {
    const first = listRef.current?.querySelector(
      "li[data-menu-item]"
    ) as HTMLLIElement | null;
    if (first) itemHeightRef.current = first.offsetHeight + 12;
  }, []);

  useEffect(() => {
    const sectionEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (sectionEls.length === 0) return;

    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) return;

      setActiveId(id);
      setActiveIndex(index);

      if (history.replaceState) {
        history.replaceState(null, "", `#${id}`);
      }
    }, opts);

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

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
      <div className="relative rounded-2xl border border-[var(--border)]/80 bg-[var(--bg)]/40 p-4 backdrop-blur-sm">
        <h2 className="text-sm uppercase tracking-wider text-[var(--muted)] mb-3">
          Menu
        </h2>

        {/* Sliding indicator */}
        <div
          aria-hidden
          className="absolute left-0 top-[4.25rem] h-10 w-[3px] rounded-full bg-gradient-to-b from-[var(--menu-indicator-from)] to-[var(--menu-indicator-to)] shadow-[0_0_12px_rgba(255,255,255,0.18)] transition-transform duration-300"
          style={{
            transform: `translateY(${activeIndex * itemHeightRef.current}px)`,
          }}
        />

        <ul
          ref={listRef}
          className="relative mt-1 flex flex-col gap-3 text-[var(--muted)]"
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
                  className={`group flex h-10 items-center gap-3 rounded-lg px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
                    isActive
                      ? "text-[var(--primary)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--primary)]"
                  }`}
                >
                  <span
                    className={`text-xs tabular-nums w-8 transition-colors ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-[var(--muted)] group-hover:text-[var(--primary)]"
                    }`}
                  >
                    {displayNumber}
                  </span>
                  <span className="font-medium tracking-tight">
                    {item.label}
                  </span>
                </a>

                {/* Divider */}
                <div className="absolute -bottom-1 left-4 right-0 h-px bg-gradient-to-r from-[var(--border)]/70 to-transparent" />
              </li>
            );
          })}
        </ul>

        {/* You are here caption */}
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="h-px w-6 bg-[var(--surface)]" />
          <span>You are here:</span>
          <span className="text-[var(--primary)] font-medium">
            {items[activeIndex]?.label}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
