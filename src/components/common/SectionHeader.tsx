import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

const SectionHeader: React.FC<Props> = ({
  title,
  subtitle,
  align = "left",
}) => {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} mb-12`}>
      <h2
        className="
          text-4xl md:text-5xl font-bold tracking-tight
          bg-gradient-to-r
          from-[var(--hero-from)]
          via-[var(--hero-via)]
          to-[var(--hero-to)]
          bg-clip-text text-transparent
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
