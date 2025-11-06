import React from "react";

type Props = {
  title: string;
  institution: string;
  period: string;
  bullets: React.ReactNode[];
};

const StudiesDegreeItem: React.FC<Props> = ({
  title,
  institution,
  period,
  bullets,
}) => (
  <div className="mb-12">
    <h3 className="text-2xl font-semibold text-[var(--text)]">{title}</h3>
    <p className="text-sm text-[var(--muted)] mb-2">
      {institution} | {period}
    </p>

    <ul className="list-disc list-inside space-y-2 text-[var(--muted)] mt-4">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default StudiesDegreeItem;
