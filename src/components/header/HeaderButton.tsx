import React from "react";
import type { CtaVariant } from "../../types/content";

type Props = React.PropsWithChildren<{
  href: string;
  external?: boolean;
  variant?: CtaVariant; // "primary" | "secondary" | "link"
}>;

const classes: Record<CtaVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-gray-900 font-semibold shadow-sm shadow-amber-400/20 hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 motion-reduce:transform-none",
  secondary:
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold border border-gray-700 text-gray-200/90 backdrop-blur-sm hover:bg-gray-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
  link: "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-gray-300 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 focus-visible:ring-offset-gray-950",
};

const HeaderButton: React.FC<Props> = ({
  href,
  external,
  variant = "secondary",
  children,
}) => {
  const rel = external ? "noreferrer noopener" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <a href={href} target={target} rel={rel} className={classes[variant]}>
      {children}
    </a>
  );
};

export default HeaderButton;
