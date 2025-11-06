import React from "react";
import type { CtaVariant } from "../../types/content";

type Props = React.PropsWithChildren<{
  href: string;
  external?: boolean;
  variant?: CtaVariant; // "primary" | "secondary" | "link"
  download?: boolean | string; // ✅ new prop
}>;

const classes: Record<CtaVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] font-semibold shadow-sm shadow-[var(--primary)]/20 hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] motion-reduce:transform-none",
  secondary:
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold border border-[var(--border)] text-[var(--text)]/90 backdrop-blur-sm hover:bg-[var(--surface)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]",
  link: "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-[var(--text)]/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]",
};

const HeaderButton: React.FC<Props> = ({
  href,
  external,
  variant = "secondary",
  download,
  children,
}) => {
  const rel = external ? "noreferrer noopener" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={classes[variant]}
      download={download}
    >
      {children}
    </a>
  );
};

export default HeaderButton;
