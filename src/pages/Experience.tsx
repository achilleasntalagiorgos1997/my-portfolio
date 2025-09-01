import React from "react";

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center bg-gray-900 text-gray-200 px-8 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-yellow-400">Experience</h2>

        {/* Pfizer */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold">Software Engineer</h3>
          <p className="text-sm text-gray-400 mb-2">
            September 2024 – Present | Pfizer, Thessaloniki, Greece
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Developed and maintained software solutions using PHP (Laravel)
              and JavaScript (VueJS), ensuring robust performance and
              scalability.
            </li>
            <li>
              Diagnosed and resolved critical bugs in production-level
              applications, enhancing system reliability and user experience.
            </li>
            <li>
              Acted as the Subject Matter Expert for complex web applications,
              delivering in-depth technical analysis, conducting code reviews,
              and mentoring other team members.
            </li>
            <li>
              Collaborated with cross-functional teams to design and implement
              innovative software solutions, contributing to architectural
              decisions for optimal performance.
            </li>
            <li>
              Coordinated with business managers and stakeholders to align
              technical support efforts, ensuring timely resolution and
              continuous service improvement.
            </li>
          </ul>
        </div>

        {/* Ontovisual */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold">Full Stack Developer</h3>
          <p className="text-sm text-gray-400 mb-2">
            February 2023 – July 2024 | Ontovisual IKE, Ioannina, Greece
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Developed a comprehensive Full-REST-API using Node.js and Strapi,
              integrating with SQL and NoSQL databases.
            </li>
            <li>
              Designed and developed web applications for cultural institutions
              using React and React-Three-Fiber, creating immersive experiences
              with advanced 3D graphics.
            </li>
            <li>
              Utilized React and associated libraries with PostgreSQL to
              implement real-time data visualization from sensor metrics,
              enhancing user engagement and functionality.
            </li>
          </ul>
        </div>

        {/* Terracom */}
        <div>
          <h3 className="text-2xl font-semibold">Full Stack Developer</h3>
          <p className="text-sm text-gray-400 mb-2">
            February 2023 – July 2024 | Ontovisual IKE, Ioannina, Greece
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Gained hands-on experience in web development and contributed to
              real-world projects.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
