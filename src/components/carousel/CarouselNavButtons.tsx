import React from "react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  disabledPrev: boolean;
  disabledNext: boolean;
};

/* Base button style */
const baseBtn =
  "group absolute z-10 -translate-y-1/2 rounded-2xl p-3.5 " +
  "border border-[var(--border)]/70 bg-[var(--bg)]/60 backdrop-blur-md " +
  "shadow-[0_6px_20px_rgba(0,0,0,0.15)] " +
  "transition-all duration-300 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] " +
  /* Hover states */
  "hover:border-[var(--primary)]/60 hover:bg-[var(--surface)]/70 hover:shadow-[0_0_16px_var(--primary)/40] " +
  /* Disabled override (no motion, no glow) */
  "disabled:opacity-50 disabled:pointer-events-none disabled:transform-none " +
  "disabled:shadow-none disabled:border-[var(--border)]/70 disabled:bg-[var(--bg)]/60";

/* Icon style */
const iconCls =
  "h-5 w-5 text-[var(--text)]/85 transition-colors duration-300 " +
  "group-hover:text-[var(--primary)] group-disabled:text-[var(--text)]/60";

/* Directional glow */
const Glow: React.FC<{ dir: "left" | "right" }> = ({ dir }) => (
  <span
    aria-hidden
    className={
      "pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-all duration-300 " +
      (dir === "left"
        ? "bg-[radial-gradient(120%_60%_at_120%_50%,var(--primary)/18,transparent_60%)] group-hover:opacity-100 group-disabled:opacity-0"
        : "bg-[radial-gradient(120%_60%_at_-20%_50%,var(--primary)/18,transparent_60%)] group-hover:opacity-100 group-disabled:opacity-0")
    }
  />
);

const CarouselNavButtons: React.FC<Props> = ({
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
}) => (
  <>
    {/* Previous button */}
    <button
      aria-label="Previous"
      onClick={onPrev}
      disabled={disabledPrev}
      className={`${baseBtn} left-0 md:-left-2 top-[45%] ${
        disabledPrev ? "" : "hover:-translate-x-0.5"
      }`}
      style={{ cursor: disabledPrev ? "default" : "pointer" }}
    >
      <Glow dir="left" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className={iconCls}
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

    {/* Next button */}
    <button
      aria-label="Next"
      onClick={onNext}
      disabled={disabledNext}
      className={`${baseBtn} right-0 md:-right-2 top-[45%] ${
        disabledNext ? "" : "hover:translate-x-0.5"
      }`}
      style={{ cursor: disabledNext ? "default" : "pointer" }}
    >
      <Glow dir="right" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className={iconCls}
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
  </>
);

export default CarouselNavButtons;
