import React from "react";

type Item = { label: React.ReactNode };

type Props = {
  items: Item[];
  title?: string;
};

const StudiesCertificationList: React.FC<Props> = ({
  items,
  title = "Certifications & Additional Learning",
}) => (
  <div>
    <h3 className="text-2xl font-semibold text-[var(--text)] mb-4">{title}</h3>
    <ul className="list-disc list-inside space-y-2 text-[var(--text-muted)]">
      {items.map((it, i) => (
        <li key={i}>{it.label}</li>
      ))}
    </ul>
  </div>
);

export default StudiesCertificationList;
