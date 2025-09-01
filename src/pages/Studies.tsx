import React from "react";

const Studies: React.FC = () => {
  return (
    <section
      id="studies"
      className="min-h-screen flex flex-col justify-center bg-gray-900 text-gray-200 px-8 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-yellow-400">Education</h2>

        {/* University of Ioannina */}
        <div>
          <h3 className="text-2xl font-semibold">
            BSc Computer Science and Engineering
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            October 2015 – September 2021 | University of Ioannina
          </p>
          <p className="mb-4 text-gray-300">
            5-year integrated master’s degree (7.24/10).
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Thesis:</strong> multi-criteria shortest path algorithms –
              conducted research, implemented and compared two approaches in C,
              and evaluated performance across datasets.
            </li>
            <li>
              Completed multiple personal and group projects in Java, Python,
              and C.
            </li>
            <li>Earned Computer Science teacher certificate.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Studies;
