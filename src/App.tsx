import Header from "./components/header/Header";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Studies from "./pages/Studies";
import Resume from "./pages/Resume";
import SideRail from "./components/side-rail/SideRail";

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
