import Header from "./components/Header.js";
import Experience from "./pages/Experience.js";
import Home from "./pages/Home.js";
import Resume from "./pages/Resume.js";
import Studies from "./pages/Studies.js";
import SideRail from "./components/SideRail";

function App() {
  return (
    <>
      <Header />
      <SideRail />
      <main>
        <Home />
        <Experience />
        <Studies />
        <Resume />
      </main>
    </>
  );
}

export default App;
