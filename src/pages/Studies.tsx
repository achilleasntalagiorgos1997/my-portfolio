import React from "react";
import SectionHeader from "../components/common/SectionHeader";
import {
  StudiesIntro,
  StudiesDegreeItem,
  StudiesCertificationList,
} from "../components/studies";
import studies from "../content/studies.json";

const Studies: React.FC = () => {
  return (
    <section
      id="studies"
      className="relative min-h-screen bg-[var(--bg)] text-[var(--text-muted)] px-6 md:px-8 py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeader
          title="Studies"
          subtitle="A solid academic foundation in computer science and engineering."
          align="left"
        />

        {/* --- Section Intro --- */}
        <StudiesIntro>{studies.intro}</StudiesIntro>

        {/* --- Degrees --- */}
        {studies.degrees.map((deg, i) => (
          <StudiesDegreeItem
            key={i}
            title={deg.title}
            institution={deg.institution}
            period={deg.period}
            bullets={deg.bullets.map((b) => (
              <>{b}</>
            ))}
          />
        ))}

        {/* --- Certifications --- */}
        <StudiesCertificationList
          items={studies.certifications.map((c) => ({
            label: <>{c}</>,
          }))}
        />
      </div>
    </section>
  );
};

export default Studies;
