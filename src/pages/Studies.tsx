import React from "react";

const Studies: React.FC = () => {
  return (
    <section
      id="studies"
      className="min-h-screen flex flex-col justify-center bg-gray-900 text-gray-200 px-8 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-yellow-400">Education</h2>

        {/* --- Section Intro --- */}
        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          My academic journey provided the technical depth and analytical
          mindset that shaped my approach to problem-solving and software
          design. Through a mix of theoretical study and hands-on projects, I
          developed strong foundations in algorithms, programming, and systems
          engineering — skills that continue to guide my professional work
          today.
        </p>

        {/* --- University of Ioannina --- */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-100">
            BSc in Computer Science & Engineering
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            University of Ioannina | October 2015 – September 2021
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4">
            <li>
              <strong>5-year integrated master’s program</strong> focused on
              algorithms, data structures, and system design.
            </li>
            <li>
              <strong>Thesis:</strong> Multi-criteria shortest path algorithms —
              researched and implemented two algorithmic approaches in C,
              evaluating performance across diverse datasets.
            </li>
            <li>
              Collaborated on multiple Java, Python, and C projects, gaining
              experience in teamwork and agile development.
            </li>
            <li>
              Studied topics including database systems, operating systems,
              computer networks, and artificial intelligence.
            </li>
          </ul>
        </div>

        {/* --- Certifications --- */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-100 mb-4">
            Certifications & Additional Learning
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Earned <strong>Computer Science teacher certification</strong>{" "}
              (Greek Ministry of Education).
            </li>
            <li>
              <strong>Software Engineering Virtual Experience</strong> –
              JPMorgan Chase & Co. (Forage)
            </li>
            <li>
              <strong>Introduction to Machine Learning</strong> – Coursera (by
              Andrew Ng, Stanford University)
            </li>
            <li>
              <strong>Version Control with Git</strong> – Udacity
            </li>
            <li>
              <strong>Responsive Web Design</strong> – freeCodeCamp
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Studies;
