import React from "react";

type Props = {
  count: number;
  index: number;
  onGoTo: (i: number) => void;
};

const CarouselPagination: React.FC<Props> = ({ count, index, onGoTo }) => (
  <div className="mt-8 flex items-center justify-center gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        aria-label={`Go to slide ${i + 1}`}
        onClick={() => onGoTo(i)}
        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
          i === index
            ? "bg-[var(--primary)] shadow-[0_0_10px_var(--primary)/60] scale-110"
            : "bg-[var(--border)]/60 hover:bg-[var(--primary)]/60"
        }`}
      />
    ))}
  </div>
);

export default CarouselPagination;
