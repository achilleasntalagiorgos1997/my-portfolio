import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import exp from "../content/experience.json";

// ---------- Types (keep in sync with content/experience.json) ----------
type Highlight = { label: string; value: string };
type Link = { label: string; href: string; type?: "primary" | "secondary" };

type ExperienceItem = {
  role: string;
  company: string;
  location?: string;
  start: string; // YYYY-MM
  end: string | null; // YYYY-MM or null (current)
  highlights?: Highlight[];
  bullets: string[];
  tech?: string[];
  links?: Link[];
};

type ExperienceContent = {
  intro: { eyebrow?: string; title: string; subtitle?: string };
  items: ExperienceItem[];
};

// ---------- Robust date helpers ----------
const YM_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

const fmtMonth = (isoYm: string | null): string => {
  if (isoYm === null) return "Present";
  if (!isoYm || !YM_REGEX.test(isoYm)) return "";
  const [y, m] = isoYm.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, 1));
};

const computeTenure = (start: string, end: string | null): string => {
  if (!YM_REGEX.test(start)) return "";
  const [ys, ms] = start.split("-").map(Number);
  const s = new Date(ys, ms - 1, 1);
  const e =
    end && YM_REGEX.test(end)
      ? new Date(Number(end.split("-")[0]), Number(end.split("-")[1]) - 1, 1)
      : new Date();
  let months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  months = Math.max(0, months);
  const y = Math.floor(months / 12),
    m = months % 12;
  return (
    [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`]
      .filter(Boolean)
      .join(" ") || "<1 mo"
  );
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Component (Horizontal timeline with carousel) ----------
const Experience: React.FC = () => {
  const data = exp as unknown as ExperienceContent;
  const items = useMemo(() => data.items ?? [], [data.items]);

  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const allowAnim = !prefersReducedMotion();

  const clamp = (n: number) =>
    Math.min(Math.max(n, 0), Math.max(items.length - 1, 0));
  const goTo = useCallback(
    (n: number) => setIndex(() => clamp(n)),
    [items.length]
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Keyboard navigation (← →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe (basic)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    let dx = 0;
    const down = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      dx = 0;
    };
    const move = (e: TouchEvent) => {
      dx = e.touches[0].clientX - startX;
    };
    const up = () => {
      if (dx < -50) next();
      else if (dx > 50) prev();
    };
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", up);
    return () => {
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", up);
    };
  }, [next, prev]);

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-gray-900 text-gray-100 px-6 md:px-8 py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10">
          {data.intro?.eyebrow && (
            <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
              <span className="h-px w-6 bg-gray-700" />
              {data.intro.eyebrow}
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
            {data.intro?.title || "Experience"}
          </h2>
          {data.intro?.subtitle && (
            <p className="mt-3 text-gray-300 max-w-2xl">
              {data.intro.subtitle}
            </p>
          )}
        </div>

        {/* Carousel viewport */}
        <div className="relative">
          {/* Horizontal spine under the card */}
          <div
            aria-hidden
            className="absolute left-0 right-0 -bottom-6 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
          />

          {/* Buttons */}
          <button
            aria-label="Previous"
            onClick={prev}
            disabled={index === 0}
            className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-gray-800/70 bg-gray-900/60 p-3 backdrop-blur-sm transition disabled:opacity-40 hover:border-amber-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-900"
          >
            <span className="sr-only">Previous</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-200"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={next}
            disabled={index === Math.max(items.length - 1, 0)}
            className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-gray-800/70 bg-gray-900/60 p-3 backdrop-blur-sm transition disabled:opacity-40 hover:border-amber-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-900"
          >
            <span className="sr-only">Next</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-200"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Track */}
          <div ref={trackRef} className="overflow-hidden">
            <div
              className="flex w-full"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: allowAnim
                  ? "transform 450ms cubic-bezier(.2,.8,.2,1)"
                  : undefined,
              }}
            >
              {items.map((it, idx) => {
                const start = fmtMonth(it.start);
                const end = fmtMonth(it.end);
                const tenure = computeTenure(it.start, it.end);
                return (
                  <div
                    key={`${it.company}-${it.role}-${idx}`}
                    className="w-full shrink-0 px-1"
                  >
                    <article
                      aria-labelledby={`exp-${idx}-title`}
                      className="mx-auto max-w-3xl"
                    >
                      <div className="rounded-2xl border border-gray-800/70 bg-gray-900/60 p-6 backdrop-blur-sm">
                        {/* Header */}
                        <header className="flex items-start justify-between gap-6">
                          <div>
                            <h3
                              id={`exp-${idx}-title`}
                              className="text-2xl font-semibold tracking-tight text-gray-100"
                            >
                              {it.role}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {it.company}
                              {it.location ? (
                                <span> • {it.location}</span>
                              ) : null}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs uppercase tracking-wider text-gray-400">
                              {start && (
                                <time
                                  dateTime={
                                    YM_REGEX.test(it.start)
                                      ? it.start
                                      : undefined
                                  }
                                >
                                  {start}
                                </time>
                              )}{" "}
                              —{" "}
                              {end && (
                                <time
                                  dateTime={
                                    YM_REGEX.test(it.end ?? "")
                                      ? (it.end as string)
                                      : undefined
                                  }
                                >
                                  {end}
                                </time>
                              )}
                            </div>
                            {tenure && (
                              <div className="mt-1 inline-flex items-center rounded-full border border-gray-800 bg-gray-900/60 px-2 py-0.5 text-[11px] text-gray-300">
                                {tenure}
                              </div>
                            )}
                          </div>
                        </header>

                        {/* Highlights */}
                        {it.highlights && it.highlights.length > 0 && (
                          <ul className="mt-4 grid grid-cols-3 gap-2">
                            {it.highlights.slice(0, 3).map((h, i) => (
                              <li
                                key={i}
                                className="rounded-lg border border-gray-800/70 bg-gray-900/40 px-3 py-2 text-center"
                              >
                                <div className="text-[10px] uppercase tracking-wide text-gray-500">
                                  {h.label}
                                </div>
                                <div className="text-sm font-semibold text-amber-300">
                                  {h.value}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Bullets */}
                        {it.bullets && it.bullets.length > 0 && (
                          <ul className="mt-5 space-y-2 text-gray-300">
                            {it.bullets.slice(0, 4).map((b, i) => (
                              <li key={i} className="flex gap-2">
                                <span
                                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/70"
                                  aria-hidden
                                />
                                <p className="leading-relaxed">{b}</p>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Tech badges */}
                        {it.tech && it.tech.length > 0 && (
                          <ul className="mt-5 flex flex-wrap gap-2 text-xs text-gray-400">
                            {it.tech.map((t) => (
                              <li
                                key={t}
                                className="rounded-full border border-gray-800/80 bg-gray-900/60 px-3 py-1"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Links */}
                        {it.links && it.links.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {it.links.map((l, i) => (
                              <a
                                key={i}
                                href={l.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                className={`${
                                  l.type === "primary"
                                    ? "rounded-xl bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-200 border border-amber-400/30 hover:bg-amber-400/20"
                                    : "rounded-xl border border-gray-800/70 px-3 py-1.5 text-sm font-semibold text-gray-200 hover:bg-gray-900/60"
                                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-900`}
                              >
                                {l.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
