import React from "react";

const Resume: React.FC = () => {
  return (
    <section
      id="resume"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-200 px-8 py-16"
    >
      <div className="w-full h-[100vh] max-w-4xl">
        {/* Embed PDF */}
        <iframe
          src="/AchilleasNtalagiorgosCV.pdf"
          className="w-full h-full rounded-lg shadow-lg"
          title="Resume"
        />
      </div>
    </section>
  );
};

export default Resume;
