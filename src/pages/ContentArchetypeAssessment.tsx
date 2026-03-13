import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import { contentQuestions } from '../lib/contentQuestions';
import { contentArchetypes } from '../lib/contentArchetypes';
import { calculateArchetypeScores, saveContentAssessment } from '../lib/contentAssessment';
import { determinePersona } from '../lib/contentPersonas';
import { ContentArchetypeResult } from '../components/contentAssessment/ContentArchetypeResult';

export default function ContentArchetypeAssessment() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for welcome, 0+ for sections
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  // Group questions by section
  const questionSections = contentQuestions.reduce((acc, question) => {
    if (!acc[question.section]) {
      acc[question.section] = [];
    }
    acc[question.section].push(question);
    return acc;
  }, {} as Record<string, typeof contentQuestions>);

  const sectionNames = Object.keys(questionSections);
  const totalSections = sectionNames.length;
  const progress = ((currentStep + 1) / totalSections) * 100;

  const handleAnswerSelect = async (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
  };

  const handleSectionComplete = async () => {
    if (currentStep < totalSections - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results first
      const results = calculateArchetypeScores(answers, contentQuestions);
      const { archetypeScores, traitScores, dominantArchetype } = results;

      // Calculate confidence score
      const calculateConfidenceScore = () => {
        const scores = Object.values(archetypeScores).sort((a, b) => b - a);
        const topScore = scores[0];
        const secondScore = scores[1] || 0;
        const scoreGap = topScore - secondScore;
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        
        const gapConfidence = Math.min(scoreGap / topScore, 0.4) * 100;
        const engagementConfidence = Math.min(totalScore / 30, 1) * 60;
        
        return Math.round(gapConfidence + engagementConfidence);
      };

      const confidenceScore = calculateConfidenceScore();
      const persona = determinePersona(dominantArchetype, archetypeScores, traitScores);
      
      // Generate prescriptive outcomes based on archetype
      const getPrescriptiveOutcome = () => {
        const outcomes = {
          'Architect': {
            immediate: "Build 3 signature frameworks that become your IP moats",
            quarterly: "Create a systematic content engine that generates 50+ qualified leads monthly",
            annual: "Establish yourself as the definitive strategic authority in your space",
            impactTarget: "Scale strategic influence to drive $2M+ in business growth through framework licensing and consulting"
          },
          'Strategist': {
            immediate: "Develop 5 contrarian market insights that position you ahead of trends",
            quarterly: "Launch a strategic advisory practice generating $500K+ in high-margin revenue",
            annual: "Become the go-to strategic voice for 8-9 figure companies in your industry",
            impactTarget: "Build a $5M+ strategic consulting practice through thought leadership"
          },
          'Firestarter': {
            immediate: "Create a bold contrarian content series that disrupts industry thinking",
            quarterly: "Build a movement of 10,000+ engaged followers who advocate for your message",
            annual: "Establish yourself as the industry's most influential change catalyst",
            impactTarget: "Drive industry transformation while generating $1M+ through speaking, consulting, and transformation programs"
          },
          'Messenger': {
            immediate: "Document your transformation story into a signature content series",
            quarterly: "Build a community of 5,000+ engaged leaders who trust your journey",
            annual: "Become the authentic voice that other leaders turn to for guidance",
            impactTarget: "Scale authentic influence into $3M+ through coaching, courses, and community"
          },
          'Mirror': {
            immediate: "Create self-assessment tools that help leaders identify blind spots",
            quarterly: "Develop a leadership development practice serving 100+ executives",
            annual: "Become the trusted advisor for C-suite transformation and growth",
            impactTarget: "Build a $2M+ executive coaching practice through insight-driven content"
          },
          'Technician': {
            immediate: "Systematize your top 3 processes into implementable frameworks",
            quarterly: "Create operational excellence content that drives 200+ implementation inquiries",
            annual: "Become the definitive expert in operational scaling for growing companies",
            impactTarget: "Generate $1.5M+ through process optimization consulting and training"
          },
          'Guide': {
            immediate: "Map your mentorship methodology into a scalable guidance system",
            quarterly: "Launch a high-value mentorship program for 50+ emerging leaders",
            annual: "Establish yourself as the premier mentor for scaling entrepreneurs",
            impactTarget: "Build a $4M+ mentorship and advisory practice through wisdom-based content"
          },
          'Creative': {
            immediate: "Document your creative process into innovative business methodologies",
            quarterly: "Launch creative innovation consulting for 20+ forward-thinking companies",
            annual: "Become the go-to creative strategist for breakthrough business solutions",
            impactTarget: "Scale creative consulting into $2.5M+ through innovation and design thinking"
          },
          'Companion': {
            immediate: "Build a supportive community platform for peer-to-peer business growth",
            quarterly: "Create a thriving network of 1,000+ business leaders supporting each other",
            annual: "Become the central hub for business relationship building and collaboration",
            impactTarget: "Monetize community and relationships into $1.8M+ through networking and partnerships"
          },
          'Instigator': {
            immediate: "Launch action-driving challenges that create immediate business momentum",
            quarterly: "Build an accountability system serving 500+ action-oriented leaders",
            annual: "Become the catalyst that drives industry-wide transformation and action",
            impactTarget: "Generate $3.5M+ through momentum-building programs and transformation consulting"
          }
        };

        return outcomes[dominantArchetype as keyof typeof outcomes] || outcomes['Architect'];
      };
      // Calculate results and save
      const outcomeData = {
        prescriptiveOutcome: getPrescriptiveOutcome(),
        confidenceScore,
        persona: persona.name,
        strategicAdvantages: persona.contentStrengths,
        blindSpots: persona.blindSpots,
        tacticalPrescription: persona.tacticalPrescription,
        weeklyRhythm: persona.weeklyRhythm
      };

      setIsSubmitting(true);
      try {
        const assessment = await saveContentAssessment({
          name: userInfo.name,
          email: userInfo.email,
          answers: answers,
          traitScores: results.traitScores,
          archetypeScores: results.archetypeScores,
          dominantArchetype,
          personaProfile: persona,
          outcomeData,
          confidenceScore
        });

        setAssessmentId(assessment.id);
        setAssessmentResults(results);
        setShowResult(true);
      } catch (error) {
        console.error('Error saving assessment:', error);
        setError('Failed to save assessment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleStartAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setCurrentStep(0);
  };

  const goToPreviousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromSection = () => {
    if (currentStep < 0) return false;
    const currentSectionName = sectionNames[currentStep];
    const currentSectionQuestions = questionSections[currentSectionName];
    return currentSectionQuestions.every(question => 
      answers[question.id] !== undefined
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === -1 ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Content <GradientText>Archetype</GradientText> Assessment
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">
                    Discover your natural content creation style and get a personalized strategy
                  </p>
                  <div className="bg-blue-900/20 p-6 rounded-lg mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">What you'll discover:</h3>
                    <ul className="text-left text-gray-300 space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Your dominant content archetype and psychological drivers
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Ideal content formats and trust-building strategies
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Tactical implementation roadmap and workflow recommendations
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        Custom content prompts and repurposing strategies
                      </li>
                    </ul>
                  </div>
                </div>
                
                <form onSubmit={handleStartAssessment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => {
                          setUserInfo(prev => ({ ...prev, email: e.target.value }));
                          if (emailTouched) {
                            setError('');
                          }
                        }}
                        onBlur={() => setEmailTouched(true)}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          error ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full magnetic-glow flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </form>
              </motion.div>
            ) : !showResult ? (
              <motion.div
                key={`question-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-700 rounded-full mb-8 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                    initial={{ width: `${((currentStep) / totalSections) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Question Counter */}
                <div className="text-center mb-6">
                  <span className="text-blue-400 font-semibold">
                    Section {currentStep + 1} of {totalSections}
                  </span>
                </div>

                {/* Section Header */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-blue-400 mb-2">
                    {sectionNames[currentStep]}
                  </h2>
                </div>

                {/* Questions for Current Section */}
                <div className="space-y-8 mb-8">
                  {questionSections[sectionNames[currentStep]].map((question, questionIndex) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="text-xl font-bold text-white">
                        {questionIndex + 1}. {question.text}
                      </h3>
                      
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <motion.button
                            key={optionIndex}
                            className={`magnetic-glow w-full text-left p-4 rounded-xl transition-all ring-1 ${
                              answers[question.id] === option.value
                                ? 'bg-blue-600 text-white ring-blue-500/50'
                                : 'bg-gray-700/40 hover:bg-gray-700/60 text-white ring-white/10 hover:ring-blue-500/50'
                            }`}
                            onClick={() => handleAnswerSelect(question.id, option.value)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isSubmitting}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                                answers[question.id] === option.value ? 'bg-blue-800' : 'bg-blue-600'
                              }`}>
                                {option.value}
                              </div>
                              <div className="flex-1">
                                <p className="text-base">{option.text}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Button */}
                <div className="mb-8">
                  <motion.button
                    onClick={handleSectionComplete}
                    disabled={!canProceedFromSection() || isSubmitting}
                    className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentStep < totalSections - 1 ? (
                      <>
                        Continue to Next Section
                        <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                      </>
                    ) : (
                      'Complete Assessment'
                    )}
                    {isSubmitting && (
                      <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                    )}
                  </motion.button>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <motion.button
                    className="flex items-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    onClick={goToPreviousQuestion}
                    disabled={currentStep === 0 || isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Section
                  </motion.button>

                  {isSubmitting && (
                    <div className="flex items-center gap-2 text-blue-400">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      Calculating your archetype...
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <ContentArchetypeResult 
                  archetype={contentArchetypes[assessmentResults.dominantArchetype]}
                  archetypeScores={assessmentResults.archetypeScores}
                  traitScores={assessmentResults.traitScores}
                  assessmentId={assessmentId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}