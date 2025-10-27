import React from "react";
import type { IconType } from "react-icons";

type HeaderButtonProps = {
  icon: IconType;
  label: string;
  href: string;
  external?: boolean;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon: Icon, label, href, external }) => {
  const rel = external ? "noreferrer noopener" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      title={label}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800/70 bg-gray-900/40 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 focus-visible:ring-offset-gray-950 hover:border-amber-400/50 hover:bg-gray-900/70"
    >
      <Icon
        className="h-5 w-5 text-gray-300 transition-transform duration-150 group-hover:scale-110 group-hover:text-amber-300"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </a>
  );
};

export default HeaderButton;
