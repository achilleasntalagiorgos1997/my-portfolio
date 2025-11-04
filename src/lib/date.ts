export const YM_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

export const fmtMonth = (isoYm: string | null): string => {
  if (isoYm === null) return "Present";
  if (!isoYm || !YM_REGEX.test(isoYm)) return "";
  const [y, m] = isoYm.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, 1));
};

export const computeTenure = (start: string, end: string | null): string => {
  if (!YM_REGEX.test(start)) return "";
  const [ys, ms] = start.split("-").map(Number);
  const s = new Date(ys, ms - 1, 1);
  const e =
    end && YM_REGEX.test(end)
      ? new Date(Number(end.split("-")[0]), Number(end.split("-")[1]) - 1, 1)
      : new Date();
  let months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  months = Math.max(0, months);
  const y = Math.floor(months / 12),
    m = months % 12;
  return (
    [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`]
      .filter(Boolean)
      .join(" ") || "<1 mo"
  );
};
