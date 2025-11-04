import React from "react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  disabledPrev: boolean;
  disabledNext: boolean;
};

const btnClass =
  "absolute z-10 -translate-y-1/2 rounded-2xl border border-gray-800/70 bg-gray-900/60 p-3 backdrop-blur-sm transition disabled:opacity-40 hover:border-amber-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-900";

const CarouselNavButtons: React.FC<Props> = ({
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
}) => (
  <>
    <button
      aria-label="Previous"
      onClick={onPrev}
      disabled={disabledPrev}
      className={`${btnClass} left-0 md:-left-2 top-1/2`}
    >
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
      onClick={onNext}
      disabled={disabledNext}
      className={`${btnClass} right-0 md:-right-2 top-1/2`}
    >
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
  </>
);

export default CarouselNavButtons;
