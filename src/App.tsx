import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
const Diagnostic = React.lazy(() => import('./pages/Diagnostic'));
const BeliefShift = React.lazy(() => import('./pages/BeliefShift'));
const BeliefBuilder = React.lazy(() => import('./pages/BeliefBuilder'));
const BeliefBridge = React.lazy(() => import('./pages/BeliefBridge'));
const Resources = React.lazy(() => import('./pages/Resources'));
const ContentEngine = React.lazy(() => import('./pages/ContentEngine'));
const Builder = React.lazy(() => import('./pages/Builder'));
const DiagnosticTool = React.lazy(() => import('./pages/DiagnosticTool'));
const Quiz = React.lazy(() => import('./pages/Quiz'));

import { Navigation } from './components/ui/Navigation';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navigation />
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen bg-base text-white text-xl">
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
          <Route path="/belief-shift" element={<BeliefShift />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/belief-builder" element={<BeliefBuilder />} />
          <Route path="/belief-bridge" element={<BeliefBridge />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/content-engine" element={<ContentEngine />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/diagnostic-tool" element={<DiagnosticTool />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
