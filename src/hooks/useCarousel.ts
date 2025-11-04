import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/a11y";

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null!); // non-null assertion
  const allowAnim = !prefersReducedMotion();

  const clamp = useCallback(
    (n: number) => Math.min(Math.max(n, 0), Math.max(length - 1, 0)),
    [length]
  );

  const goTo = useCallback((n: number) => setIndex(() => clamp(n)), [clamp]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // touch
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

  return { index, next, prev, goTo, allowAnim, trackRef };
}
