// Browser-safe helpers shared by the side-rail

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const getHeaderOffset = () => {
  if (typeof document === "undefined") return 0;
  const header = document.querySelector("header") as HTMLElement | null;
  return header?.offsetHeight ?? 0;
};

export const smoothScrollTo = (el: HTMLElement) => {
  const y =
    el.getBoundingClientRect().top + window.scrollY - (getHeaderOffset() + 12);
  if (prefersReducedMotion()) {
    window.scrollTo(0, y);
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
