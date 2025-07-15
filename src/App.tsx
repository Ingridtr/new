import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Info from "./pages/Info.tsx";
import Management from "./pages/Management.tsx";
import Grade from "./pages/Grade.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Management" element={<Management />} />
        <Route path="Grade" element={<Grade />} />
      </Routes>
    </Router>
  );
}
