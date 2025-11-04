import React from "react";
import type { ExperienceItem } from "../../types/content";
import { YM_REGEX, fmtMonth, computeTenure } from "../../lib/date";

type Props = { item: ExperienceItem; idx: number };

const CarouselCardExperience: React.FC<Props> = ({ item: it, idx }) => {
  const start = fmtMonth(it.start);
  const end = fmtMonth(it.end);
  const tenure = computeTenure(it.start, it.end);

  return (
    <article aria-labelledby={`exp-${idx}-title`} className="mx-auto max-w-3xl">
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
              {it.location ? <span> • {it.location}</span> : null}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-gray-400">
              {start && (
                <time dateTime={YM_REGEX.test(it.start) ? it.start : undefined}>
                  {start}
                </time>
              )}{" "}
              —{" "}
              {end && (
                <time
                  dateTime={
                    YM_REGEX.test(it.end ?? "") ? (it.end as string) : undefined
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
            {it.highlights.slice(0, 6).map((h, i) => (
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
            {it.bullets.map((b, i) => (
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
      </div>
    </article>
  );
};

export default CarouselCardExperience;
