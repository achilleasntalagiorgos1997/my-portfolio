import React from "react";
import { YM_REGEX } from "../../../lib/date";

type Props = {
  id: string;
  role: string;
  company: string;
  location?: string | null;
  start?: string;
  end?: string | null;
  startLabel?: string | null;
  endLabel?: string | null;
  tenure?: string | null;
};

const CardHeader: React.FC<Props> = ({
  id,
  role,
  company,
  location,
  start,
  end,
  startLabel,
  endLabel,
  tenure,
}) => (
  <header className="flex items-start justify-between gap-6">
    <div>
      <h3
        id={id}
        className="text-2xl font-semibold tracking-tight text-[var(--text)]"
      >
        {role}
      </h3>
      <p className="text-sm text-[var(--muted)]">
        {company}
        {location ? <span> • {location}</span> : null}
      </p>
    </div>

    <div className="text-right">
      <div className="text-xs uppercase tracking-wider text-[var(--muted)]">
        {startLabel && (
          <time dateTime={start && YM_REGEX.test(start) ? start : undefined}>
            {startLabel}
          </time>
        )}{" "}
        —{" "}
        {endLabel && (
          <time dateTime={end && YM_REGEX.test(end) ? end! : undefined}>
            {endLabel}
          </time>
        )}
      </div>

      {tenure && (
        <div className="mt-1 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg)]/60 px-2 py-0.5 text-[11px] text-[var(--muted)]">
          {tenure}
        </div>
      )}
    </div>
  </header>
);

export default CardHeader;
