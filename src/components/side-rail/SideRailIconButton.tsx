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
    className={[
      "group relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)]",
      "border border-[var(--border)]/60 bg-[var(--surface)]/60 backdrop-blur-sm",
      "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)] focus-visible:ring-offset-2",
      active
        ? "border-[var(--primary)]/70 bg-[var(--primary)]/15 ring-1 ring-[var(--primary)]/50 shadow-[0_0_10px_var(--primary)/40]"
        : "hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 hover:shadow-[0_0_6px_var(--primary)/30]",
    ].join(" ")}
  >
    <span
      className={[
        "transition-colors duration-200",
        active
          ? "text-[var(--primary)]"
          : "text-[var(--muted)] group-hover:text-[var(--primary)]",
      ].join(" ")}
    >
      {children}
    </span>

    {/* subtle glow backdrop for active state */}
    {active && (
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-[radial-gradient(circle_at_50%_50%,var(--primary)/20,transparent_70%)] blur-md opacity-80"
      />
    )}
  </a>
);

export default SideRailIconButton;
