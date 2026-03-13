import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const DFY = React.lazy(() => import('./pages/DFY'));
const Assessment = React.lazy(() => import('./pages/Assessment'));
const Accelerator = React.lazy(() => import('./pages/Accelerator'));
const ContentArchetypeAssessment = React.lazy(() => import('./pages/ContentArchetypeAssessment'));
const EditorApplication = React.lazy(() => import('./pages/EditorApplication'));
const AuthorityAccelerator = React.lazy(() => import('./pages/AuthorityAccelerator'));
const AuthorityBuilder = React.lazy(() => import('./pages/AuthorityBuilder'));
const BeliefMap = React.lazy(() => import('./pages/BeliefMap'));
const BeliefMapBuilder = React.lazy(() => import('./pages/BeliefMapBuilder'));
const TheBuilder = React.lazy(() => import('./pages/TheBuilder'));

import { Navigation } from './components/ui/Navigation';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div 
        className="cursor-glow"
        style={{ 
          left: mousePos.x,
          top: mousePos.y,
        }} 
      />
      <div className="huly-background" />
      <div className="huly-grid" />
      <Navigation />
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white text-xl">
          Loading...
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dfy" element={<DFY />} />
          <Route path="/accelerator" element={<Accelerator />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/content-archetype" element={<ContentArchetypeAssessment />} />
          <Route path="/editorapplication" element={<EditorApplication />} />
          <Route path="/authorityaccelerator" element={<AuthorityAccelerator />} />
          <Route path="/authoritybuilder" element={<AuthorityBuilder />} />
          <Route path="/beliefmap" element={<BeliefMap />} />
          <Route path="/beliefmapbuilder" element={<BeliefMapBuilder />} />
          <Route path="/thebuilder" element={<TheBuilder />} />
        </Routes>
      </Suspense>
    </Router>
  );
}