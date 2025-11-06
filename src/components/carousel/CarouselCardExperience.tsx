import React from "react";
import type { ExperienceItem } from "../../types/content";
import { fmtMonth, computeTenure } from "../../lib/date";
import {
  Card,
  CardHeader,
  CardHighlights,
  CardBullets,
  CardBadges,
} from "./card";

type Props = { item: ExperienceItem; idx: number };

const CarouselCardExperience: React.FC<Props> = ({ item: it, idx }) => {
  const startLabel = fmtMonth(it.start);
  const endLabel = fmtMonth(it.end);
  const tenure = computeTenure(it.start, it.end);

  return (
    <article aria-labelledby={`exp-${idx}-title`} className="mx-auto max-w-3xl">
      <Card>
        <CardHeader
          id={`exp-${idx}-title`}
          role={it.role}
          company={it.company}
          location={it.location}
          start={it.start}
          end={it.end ?? null}
          startLabel={startLabel}
          endLabel={endLabel}
          tenure={tenure}
        />

        <CardHighlights highlights={it.highlights ?? []} />
        <CardBullets bullets={it.bullets ?? []} />
        <CardBadges tech={it.tech ?? []} />
      </Card>
    </article>
  );
};

export default CarouselCardExperience;
