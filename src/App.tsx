import Header from "./components/header/Header";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Studies from "./pages/Studies";
import Skills from "./pages/Skills";
import SideRail from "./components/side-rail/SideRail";

import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <SideRail />
      <main>
        <Home />
        <Experience />
        <Studies />
        <Skills />
      </main>
    </ThemeProvider>
  );
}

export default App;
