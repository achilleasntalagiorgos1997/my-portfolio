import React from "react";

type Props = React.PropsWithChildren<{
  index: number;
  allowAnim: boolean;
  trackRef: React.RefObject<HTMLDivElement>;
}>;

const CarouselViewport: React.FC<Props> = ({
  index,
  allowAnim,
  trackRef,
  children,
}) => (
  <div className="relative">
    {/* Horizontal spine under the card */}
    <div
      aria-hidden
      className="absolute left-0 right-0 -bottom-6 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
    />
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: allowAnim
            ? "transform 450ms cubic-bezier(.2,.8,.2,1)"
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

export default CarouselViewport;
