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
          <Route path="/About" element={<About />} />
          <Route path="/Info" element={<Knowledge />} />
          <Route path="/Management" element={<Management />} />
        </Routes>
      </Suspense>
    </Router>
  );
}