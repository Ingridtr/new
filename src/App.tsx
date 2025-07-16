import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Replace direct import with lazy loading

const Knowledge = lazy(() => import("./pages/Knowledge"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Management = lazy(() => import("./pages/Management"));
const Grade = lazy(() => import("./pages/Grade"));
const GameSelection = lazy(() => import("./pages/GameSelection"));
const InfoTask = lazy(() => import("./pages/InfoTask"));
const Competency = lazy(() => import("./pages/Competency"));
const LearningGoalsSelection = lazy(
  () => import("./pages/LearningGoalsSelection")
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/about" element={<About />} />
          <Route path="/management" element={<Management />} />
          <Route path="/info" element={<Knowledge />} />
          <Route path="/grade/learninggoals" element={<LearningGoalsSelection />} />
          <Route path="/grade" element={<Grade />} />
          <Route path="/gameSelection" element={<GameSelection />} />
          <Route path="/infoTask" element={<InfoTask />} />
          <Route path="/competency/:grade" element={<Competency />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
