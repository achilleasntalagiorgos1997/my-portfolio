import React from "react";
import CarouselHeader from "./CarouselHeader";
import CarouselViewport from "./CarouselViewport";
import CarouselSlide from "./CarouselSlide";
import CarouselNavButtons from "./CarouselNavButtons";
import CarouselPagination from "./CarouselPagination";
import { useCarousel } from "../../hooks/useCarousel";

type Props<T> = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  slides: T[];
  renderSlide: (slide: T, index: number) => React.ReactNode;
};

function Carousel<T>({ title, subtitle, slides, renderSlide }: Props<T>) {
  const { index, next, prev, goTo, allowAnim, trackRef } = useCarousel(
    slides.length
  );

  return (
    <section className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 md:px-8 py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <CarouselHeader title={title} subtitle={subtitle} />

        <div className="relative">
          <CarouselNavButtons
            onPrev={prev}
            onNext={next}
            disabledPrev={index === 0}
            disabledNext={index === Math.max(slides.length - 1, 0)}
          />

          <CarouselViewport
            index={index}
            allowAnim={allowAnim}
            trackRef={trackRef}
          >
            {slides.map((s, i) => (
              <CarouselSlide key={i}>{renderSlide(s, i)}</CarouselSlide>
            ))}
          </CarouselViewport>

          <CarouselPagination
            count={slides.length}
            index={index}
            onGoTo={goTo}
          />
        </div>
      </div>
    </section>
  );
}

export default Carousel;
