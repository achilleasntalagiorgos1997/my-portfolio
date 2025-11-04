import React, { useMemo } from "react";
import exp from "../content/experience.json";
import type { ExperienceContent, ExperienceItem } from "../types/content";
import { Carousel } from "../components/carousel";
import CarouselCardExperience from "../components/carousel/CarouselCardExperience";

const Experience: React.FC = () => {
  const data = exp as unknown as ExperienceContent;
  const items = useMemo(
    () => (data.items ?? []) as ExperienceItem[],
    [data.items]
  );

  return (
    <Carousel
      eyebrow={data.intro?.eyebrow}
      title={data.intro?.title || "Experience"}
      subtitle={data.intro?.subtitle}
      slides={items}
      renderSlide={(item, idx) => (
        <CarouselCardExperience item={item} idx={idx} />
      )}
    />
  );
};

export default Experience;
