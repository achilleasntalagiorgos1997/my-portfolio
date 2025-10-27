import React, { useEffect, useMemo, useState } from "react";
import {
  FaHome,
  FaThLarge,
  FaBriefcase,
  FaBook,
  FaFileAlt,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";
import navigation from "../content/navigation.json";
import site from "../content/site.json";

// ----- Types from content files -----
type NavItem = { id: string; label: string; href?: string; hidden?: boolean };
type Site = { social?: { email?: string | null } };

// ----- Helpers -----
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

// Map section id -> icon
const iconForId = (id: string) => {
  switch (id) {
    case "home":
      return FaHome;
    case "projects":
      return FaThLarge;
    case "experience":
      return FaBriefcase;
    case "studies":
      return FaBook;
    case "resume":
      return FaFileAlt;
    default:
      return FaThLarge;
  }
};

const SideRail: React.FC = () => {
  const items = useMemo(
    () => (navigation as NavItem[]).filter((i) => !i.hidden),
    []
  );

  const email = (site as Site)?.social?.email ?? null;

  const [activeId, setActiveId] = useState<string>(
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace("#", "")
      : items[0]?.id ?? "home"
  );

  // LIGHTWEIGHT SCROLL-SPY (hash-aware)
  useEffect(() => {
    const sectionEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible entry intersecting the root
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const id = visible.target.id;
        if (id !== activeId) {
          setActiveId(id);
          // Update the URL hash without jumping
          if (history.replaceState) {
            history.replaceState(null, "", `#${id}`);
          }
        }
      },
      {
        root: null,
        // Activate a section when it passes roughly through the center window band
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items, activeId]);

  // Keep state in sync if user changes the hash (e.g., back/forward)
  useEffect(() => {
    const onHashChange = () =>
      setActiveId(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Inject scroll-margin-top to account for sticky header
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
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"
      />

      {/* Top: Brand tile */}
      <a
        href="#home"
        className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400/25 via-amber-300/20 to-cyan-300/25 ring-1 ring-inset ring-amber-400/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950"
        title="Home"
        aria-label="Go to Home"
        onClick={(e) => {
          const el = document.getElementById("home");
          if (el) {
            e.preventDefault();
            smoothScrollTo(el);
            history.replaceState(null, "", `#home`);
            setActiveId("home");
          }
        }}
      >
        <span className="font-bold text-amber-200 tracking-wide select-none">
          AN
        </span>
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-amber-400/10"
          aria-hidden
        />
      </a>

      {/* Middle: Icon stack */}
      <nav className="flex flex-col items-center gap-3" aria-label="Sections">
        {items.map((item) => {
          const Icon = iconForId(item.id);
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => {
                const el = document.getElementById(item.id);
                if (el) {
                  e.preventDefault();
                  smoothScrollTo(el);
                  history.replaceState(null, "", `#${item.id}`);
                  setActiveId(item.id);
                }
              }}
              className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800/70 bg-gray-900/40 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 hover:border-amber-400/50 hover:bg-gray-900/70 ${
                isActive ? "ring-1 ring-amber-400/40" : ""
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive
                    ? "text-amber-300"
                    : "text-gray-300 group-hover:text-amber-200"
                }`}
                aria-hidden
              />
              {/* tiny active dot */}
              <span
                aria-hidden
                className={`absolute -left-3 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Bottom: Footer actions */}
      <div className="flex flex-col items-center gap-3">
        {email && (
          <a
            href={`mailto:${email}`}
            title="Email"
            aria-label="Email"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800/70 bg-gray-900/40 backdrop-blur-sm transition-all hover:border-amber-400/50 hover:bg-gray-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950"
          >
            <FaEnvelope
              className="h-5 w-5 text-gray-300 group-hover:text-amber-200"
              aria-hidden
            />
          </a>
        )}
        <a
          href="#home"
          title="Back to top"
          aria-label="Back to top"
          onClick={(e) => {
            const el = document.getElementById("home");
            if (el) {
              e.preventDefault();
              smoothScrollTo(el);
              history.replaceState(null, "", `#home`);
              setActiveId("home");
            }
          }}
          className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800/70 bg-gray-900/40 backdrop-blur-sm transition-all hover:border-amber-400/50 hover:bg-gray-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950"
        >
          <FaArrowUp
            className="h-5 w-5 text-gray-300 group-hover:text-amber-200"
            aria-hidden
          />
        </a>
      </div>
    </aside>
  );
};

export default SideRail;
