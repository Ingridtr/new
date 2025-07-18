import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy loading for better performance
const Knowledge = lazy(() => import("./pages/Knowledge"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Management = lazy(() => import("./pages/Management"));
const Grade = lazy(() => import("./pages/Grade"));
const GameSelection = lazy(() => import("./pages/GameSelection"));
const InfoTask = lazy(() => import("./pages/InfoTask"));
const LearningGoalsSelection = lazy(
  () => import("./pages/LearningGoalsSelection")
);
//const Testfile = lazy(() => import("./pages/Testfile"));
// Accessible loading component
const LoadingSpinner = () => (
  <div 
    className="flex items-center justify-center min-h-screen"
    role="status" 
    aria-live="polite"
    aria-label="Laster siden"
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-lg text-gray-600">Laster...</span>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/about" element={<About />} />
            <Route path="/management" element={<Management />} />
            <Route path="/info" element={<Knowledge />} />
            <Route
              path="/grade/learninggoals"
              element={<LearningGoalsSelection />}
            />
            <Route path="/grade" element={<Grade />} />
            <Route path="/gameSelection" element={<GameSelection />} />
            <Route path="/infoTask" element={<InfoTask />} />
            
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

//<Route path="/testFile" element={<Testfile />} />