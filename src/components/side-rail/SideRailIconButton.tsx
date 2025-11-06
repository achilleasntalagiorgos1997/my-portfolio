import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  ariaLabel?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
}>;

const SideRailIconButton: React.FC<Props> = ({
  title,
  ariaLabel,
  active,
  onClick,
  href = "#",
  children,
}) => (
  <a
    href={href}
    title={title}
    aria-label={ariaLabel ?? title}
    aria-current={active ? "true" : undefined}
    onClick={onClick}
    className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)]/70 bg-[var(--bg)]/40 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 hover:border-amber-400/50 hover:bg-[var(--bg)]/70 ${
      active ? "ring-1 ring-amber-400/40" : ""
    }`}
  >
    {children}
  </a>
);

export default SideRailIconButton;
