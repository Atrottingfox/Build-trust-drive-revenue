import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const DFY = React.lazy(() => import('./pages/DFY'));
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
const CongruenceAudit = React.lazy(() => import('./pages/CongruenceAudit'));
const BrandDay = React.lazy(() => import('./pages/BrandDay'));
const Advisory = React.lazy(() => import('./pages/Advisory'));
const BusinessMap = React.lazy(() => import('./pages/BusinessMap'));
const TheEngine = React.lazy(() => import('./pages/TheEngine'));
const NinetyDayProgram = React.lazy(() => import('./pages/NinetyDayProgram'));
const ThirtyDaySprint = React.lazy(() => import('./pages/ThirtyDaySprint'));
const Apply = React.lazy(() => import('./pages/Apply'));
const Calvin = React.lazy(() => import('./pages/Calvin'));
const CalvinOriginal = React.lazy(() => import('./pages/CalvinOriginal'));
const Undeniable = React.lazy(() => import('./pages/Undeniable'));
const UndeniableNotes = React.lazy(() => import('./pages/UndeniableNotes'));
const UndeniableNextSteps = React.lazy(() => import('./pages/UndeniableNextSteps'));
const UndeniableContentSystem = React.lazy(() => import('./pages/UndeniableContentSystem'));
const UndeniableHooks = React.lazy(() => import('./pages/UndeniableHooks'));
const UndeniableAdGold = React.lazy(() => import('./pages/UndeniableAdGold'));
const UndeniableShootCard = React.lazy(() => import('./pages/UndeniableShootCard'));
const TheUndeniablePlan = React.lazy(() => import('./pages/TheUndeniablePlan'));
const LinkNinja = React.lazy(() => import('./pages/LinkNinja'));
const ProfitAnalyst = React.lazy(() => import('./pages/ProfitAnalyst'));
const TheNextStage = React.lazy(() => import('./pages/TheNextStage'));


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
          <Route path="/congruence" element={<CongruenceAudit />} />
          <Route path="/brand-day" element={<BrandDay />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/map" element={<BusinessMap />} />
          <Route path="/engine" element={<TheEngine />} />
          <Route path="/90dayprogram" element={<NinetyDayProgram />} />
          <Route path="/30-day-sprint" element={<ThirtyDaySprint />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/calvin" element={<Calvin />} />
          <Route path="/brandin48hours" element={<Calvin />} />
          <Route path="/calvincoyles" element={<CalvinOriginal />} />
          <Route path="/undeniable" element={<Undeniable />} />
          <Route path="/undeniable-notes" element={<UndeniableNotes />} />
          <Route path="/undeniablenextsteps" element={<UndeniableNextSteps />} />
          <Route path="/undeniablenextsteps/content-system" element={<UndeniableContentSystem />} />
          <Route path="/undeniablenextsteps/hooks" element={<UndeniableHooks />} />
          <Route path="/undeniablenextsteps/ad-gold" element={<UndeniableAdGold />} />
          <Route path="/undeniablenextsteps/shoot-card" element={<UndeniableShootCard />} />
          <Route path="/theundeniableplan" element={<TheUndeniablePlan />} />
          <Route path="/linkninja" element={<LinkNinja />} />
          <Route path="/theprofitanalyst" element={<ProfitAnalyst />} />
          <Route path="/thenextstage" element={<TheNextStage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
