import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Replace direct import with lazy loading
const Knowledge = lazy(() => import('./pages/Knowledge'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Management = lazy(() => import('./pages/Management'));


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
          <Route path="Grade" element={<Grade />} />
        </Routes>
      </Suspense>

    </Router>
  );
}
