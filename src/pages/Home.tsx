import Menu from "../components/Menu";

const Home: React.FC = () => {
  return (
    <section
      id="home"
      className="h-screen flex flex-col md:flex-row justify-center items-center bg-gray-900 text-gray-200 px-8"
    >
      {/* Left Side - Intro */}
      <div className="md:w-2/3 mb-12 md:mb-0">
        <h1 className="text-6xl font-light mb-6">
          Welcome<span className="text-yellow-400">.</span>
        </h1>
        <p className="text-lg max-w-2xl mb-4 leading-relaxed text-gray-300">
          My name is Achilleas Ntalagiorgos, I'm a full-stack engineer based in
          Thessaloniki, Greece. Experienced in several programming languages and
          frameworks, able to deliver full-stack solutions across enterprise and
          startup environments. Proven ability to maintain and enhance complex
          systems while ensuring reliability and performance. Enthusiastic about
          clean and well-documented code, system architecture and
          cross-functional collaboration. Fast learner that continuously evolves
          through challenges in both agile startups and global corporate
          ecosystems.
        </p>
      </div>

      {/* Right Side - Menu */}
      <Menu />
    </section>
  );
};

export default Home;
