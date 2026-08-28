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
const OfferLadder = React.lazy(() => import('./pages/OfferLadder'));
const OperatorIntensive = React.lazy(() => import('./pages/OperatorIntensive'));
const ApplyOperatorIntensive = React.lazy(() => import('./pages/ApplyOperatorIntensive'));
const TheEngine = React.lazy(() => import('./pages/TheEngine'));
const NinetyDayProgram = React.lazy(() => import('./pages/NinetyDayProgram'));
const ThirtyDaySprint = React.lazy(() => import('./pages/ThirtyDaySprint'));
const Apply = React.lazy(() => import('./pages/Apply'));
const Calvin = React.lazy(() => import('./pages/Calvin'));
const CalvinOriginal = React.lazy(() => import('./pages/CalvinOriginal'));
const Undeniable = React.lazy(() => import('./pages/Undeniable'));
const UndeniableNotes = React.lazy(() => import('./pages/UndeniableNotes'));
const UndeniableNextSteps = React.lazy(() => import('./pages/UndeniableNextSteps'));
const UndeniableMap = React.lazy(() => import('./pages/UndeniableMap'));
const UndeniableChannels = React.lazy(() => import('./pages/UndeniableChannels'));
const UndeniableContentSystem = React.lazy(() => import('./pages/UndeniableContentSystem'));
const UndeniableHooks = React.lazy(() => import('./pages/UndeniableHooks'));
const UndeniableAdGold = React.lazy(() => import('./pages/UndeniableAdGold'));
const UndeniableShootCard = React.lazy(() => import('./pages/UndeniableShootCard'));
const TheUndeniablePlan = React.lazy(() => import('./pages/TheUndeniablePlan'));
const ThePlan = React.lazy(() => import('./pages/ThePlan'));
const TheRunSheet = React.lazy(() => import('./pages/TheRunSheet'));
const UndeniableBrand = React.lazy(() => import('./pages/UndeniableBrand'));
const UndeniableLeadMagnets = React.lazy(() => import('./pages/UndeniableLeadMagnets'));
const UndeniableContent = React.lazy(() => import('./pages/UndeniableContent'));
const UndeniableContentFoundation = React.lazy(() => import('./pages/UndeniableContentFoundation'));
const UndeniableContentShortForm = React.lazy(() => import('./pages/UndeniableContentShortForm'));
const UndeniableContentLongForm = React.lazy(() => import('./pages/UndeniableContentLongForm'));
const UndeniableContentData = React.lazy(() => import('./pages/UndeniableContentData'));
const UndeniableOps = React.lazy(() => import('./pages/UndeniableOps'));
const LinkNinja = React.lazy(() => import('./pages/LinkNinja'));
const ProfitAnalyst = React.lazy(() => import('./pages/ProfitAnalyst'));
const TheNextStage = React.lazy(() => import('./pages/TheNextStage'));
const Offer = React.lazy(() => import('./pages/Offer'));
const LockIn = React.lazy(() => import('./pages/LockIn'));
const Booked = React.lazy(() => import('./pages/Booked'));
const Install = React.lazy(() => import('./pages/Install'));
const Prep = React.lazy(() => import('./pages/Prep'));
const Health = React.lazy(() => import('./pages/Health'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Geronimo = React.lazy(() => import('./pages/Geronimo'));
const GeronimoNextSteps = React.lazy(() => import('./pages/GeronimoNextSteps'));
const TheGeronimoPlan = React.lazy(() => import('./pages/TheGeronimoPlan'));
const Operations = React.lazy(() => import('./pages/Operations'));


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
          <Route path="/ladder" element={<OfferLadder />} />
          <Route path="/operatorintensive" element={<OperatorIntensive />} />
          <Route path="/operator" element={<OperatorIntensive />} />
          <Route path="/applyforoperatorintensive" element={<ApplyOperatorIntensive />} />
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
          <Route path="/undeniablenextsteps/map" element={<UndeniableMap />} />
          <Route path="/undeniablenextsteps/channels" element={<UndeniableChannels />} />
          <Route path="/undeniablenextsteps/content-system" element={<UndeniableContentSystem />} />
          <Route path="/undeniablenextsteps/hooks" element={<UndeniableHooks />} />
          <Route path="/undeniablenextsteps/ad-gold" element={<UndeniableAdGold />} />
          <Route path="/undeniablenextsteps/shoot-card" element={<UndeniableShootCard />} />
          <Route path="/undeniablenextsteps/brand" element={<UndeniableBrand />} />
          <Route path="/undeniablenextsteps/lead-magnets" element={<UndeniableLeadMagnets />} />
          <Route path="/undeniablenextsteps/content" element={<UndeniableContent />} />
          <Route path="/undeniablenextsteps/content/foundation" element={<UndeniableContentFoundation />} />
          <Route path="/undeniablenextsteps/content/short-form" element={<UndeniableContentShortForm />} />
          <Route path="/undeniablenextsteps/content/long-form" element={<UndeniableContentLongForm />} />
          <Route path="/undeniablenextsteps/content/data" element={<UndeniableContentData />} />
          <Route path="/undeniablenextsteps/ops" element={<UndeniableOps />} />
          <Route path="/theundeniableplan" element={<TheUndeniablePlan />} />
          <Route path="/theplan" element={<ThePlan />} />
          <Route path="/Theplan" element={<ThePlan />} />
          <Route path="/runsheet" element={<TheRunSheet />} />
          <Route path="/run-sheet" element={<TheRunSheet />} />
          <Route path="/linkninja" element={<LinkNinja />} />
          <Route path="/theprofitanalyst" element={<ProfitAnalyst />} />
          <Route path="/thenextstage" element={<TheNextStage />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/lock-in" element={<LockIn />} />
          <Route path="/lock-in/:contactId" element={<LockIn />} />
          <Route path="/booked" element={<Booked />} />
          <Route path="/install" element={<Install />} />
          {/* The prep call, with the contact id so the booking comes back attached
              to a person. Both link shapes, same as the others. */}
          <Route path="/prep" element={<Prep />} />
          <Route path="/prep/:contactId" element={<Prep />} />
          {/* The invitation email uses /install/<id>. Both shapes must work. */}
          <Route path="/install/:contactId" element={<Install />} />
          <Route path="/health" element={<Health />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/geronimo" element={<Geronimo />} />
          <Route path="/geronimonextsteps" element={<GeronimoNextSteps />} />
          <Route path="/thegeronimoplan" element={<TheGeronimoPlan />} />
          <Route path="/geronimo-theplan" element={<TheGeronimoPlan />} />
          <Route path="/geronimotheplan" element={<TheGeronimoPlan />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
