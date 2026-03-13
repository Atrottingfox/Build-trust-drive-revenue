import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Mail, AlertCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import { saveAssessment } from '../lib/assessment';
import { archetypes } from '../lib/archetypes';
import { ArchetypeResult } from '../components/assessment/ArchetypeResult';

interface Question {
  id: string;
  section: string;
  text: string;
  options: Array<{
    text: string;
    value: string;
  }>;
}

const assessmentQuestions: Question[] = [
  // SECTION 1: Position & Impact Alignment
  {
    id: 'Q1',
    section: 'Position & Impact Alignment',
    text: "What's most important right now?",
    options: [
      { text: "Articulating what makes my work different or valuable", value: 'A' },
      { text: "Reaching more of the right people consistently", value: 'B' }
    ]
  },
  {
    id: 'Q2',
    section: 'Position & Impact Alignment',
    text: "What's your best lever for growing authority?",
    options: [
      { text: "Teaching clearly and simplifying what I know", value: 'A' },
      { text: "Sharing bold ideas and beliefs that people rally behind", value: 'B' }
    ]
  },
  {
    id: 'Q3',
    section: 'Position & Impact Alignment',
    text: "What value should your content deliver?",
    options: [
      { text: "Clarity, strategy, and confidence", value: 'A' },
      { text: "Resonance, emotion, and belief shift", value: 'B' }
    ]
  },
  {
    id: 'Q4',
    section: 'Position & Impact Alignment',
    text: "What drives you to create content?",
    options: [
      { text: "To shape conversation and lead the narrative", value: 'A' },
      { text: "To build leverage and scale with aligned clients", value: 'B' }
    ]
  },
  {
    id: 'Q5',
    section: 'Position & Impact Alignment',
    text: "Which best describes your current state?",
    options: [
      { text: "I want my content to better reflect the full scope of what I do", value: 'A' },
      { text: "I'm looking to scale my impact with what's working", value: 'B' }
    ]
  },
  
  // SECTION 2: Style & Strategic Advantage
  {
    id: 'Q6',
    section: 'Style & Strategic Advantage',
    text: "How do you most naturally express yourself?",
    options: [
      { text: "With structure and examples", value: 'A' },
      { text: "With story and conviction", value: 'B' }
    ]
  },
  {
    id: 'Q7',
    section: 'Style & Strategic Advantage',
    text: "What kind of content do you enjoy making more?",
    options: [
      { text: "Breakdowns, walkthroughs, and frameworks", value: 'A' },
      { text: "Stories, insights, and perspective shifts", value: 'B' }
    ]
  },
  {
    id: 'Q8',
    section: 'Style & Strategic Advantage',
    text: "If someone compliments your content, what would mean more?",
    options: [
      { text: '"That made everything click for me."', value: 'A' },
      { text: '"That shifted how I think."', value: 'B' }
    ]
  },
  {
    id: 'Q9',
    section: 'Style & Strategic Advantage',
    text: "What's your preferred workflow?",
    options: [
      { text: "I create in batches with a clear plan", value: 'A' },
      { text: "I prefer creating in the moment when something feels relevant", value: 'B' }
    ]
  },
  {
    id: 'Q10',
    section: 'Style & Strategic Advantage',
    text: "Which outcome matters most when you post?",
    options: [
      { text: "It's actionable and clear", value: 'A' },
      { text: "It's powerful and human", value: 'B' }
    ]
  },
  
  // SECTION 3: Trust building behavior
  {
    id: 'Q11',
    section: 'Trust building behavior',
    text: "For your audience, what builds the most trust?",
    options: [
      { text: "Consistency, logic, and practical value", value: 'A' },
      { text: "Vulnerability, voice, and point of view", value: 'B' }
    ]
  },
  {
    id: 'Q12',
    section: 'Trust building behavior',
    text: "Which statement feels more aligned?",
    options: [
      { text: "People trust my ideas because they work", value: 'A' },
      { text: "People trust me because they believe in how I think", value: 'B' }
    ]
  },
  {
    id: 'Q13',
    section: 'Trust building behavior',
    text: "What do you want people to feel after your content?",
    options: [
      { text: "Confident and ready to take action", value: 'A' },
      { text: "Energised and emotionally connected", value: 'B' }
    ]
  },
  {
    id: 'Q14',
    section: 'Trust building behavior',
    text: "Your ideal positioning is:",
    options: [
      { text: '"The person who makes things simple and strategic"', value: 'A' },
      { text: '"The voice who says what needs to be said"', value: 'B' }
    ]
  },
  {
    id: 'Q15',
    section: 'Trust building behavior',
    text: "What's the opportunity you haven't fully leaned into yet?",
    options: [
      { text: "Content that reflects the depth of my work", value: 'A' },
      { text: "Content that leads at scale with boldness", value: 'B' }
    ]
  },
  
  // SECTION 4: Personality, planning & output
  {
    id: 'Q16',
    section: 'Personality, planning & output',
    text: "When you sit down to create, you usually…",
    options: [
      { text: "Start with a model, structure, or idea you've mapped", value: 'A' },
      { text: "Start with a phrase, story, or feeling you want to explore", value: 'B' }
    ]
  },
  {
    id: 'Q17',
    section: 'Personality, planning & output',
    text: "What's easier for you to generate?",
    options: [
      { text: "Tips, frameworks, and breakdowns", value: 'A' },
      { text: "Stories, bold takes, or beliefs", value: 'B' }
    ]
  },
  {
    id: 'Q18',
    section: 'Personality, planning & output',
    text: "Which type of trustbuilder are you?",
    options: [
      { text: "The reliable strategist", value: 'A' },
      { text: "The relatable leader", value: 'B' }
    ]
  },
  {
    id: 'Q19',
    section: 'Personality, planning & output',
    text: "When it comes to planning content…",
    options: [
      { text: "I prefer batching, templates, and pre-built structure", value: 'A' },
      { text: "I create fluidly and adapt to what's timely or alive", value: 'B' }
    ]
  },
  {
    id: 'Q20',
    section: 'Personality, planning & output',
    text: "If your content could only do one thing, what should it do?",
    options: [
      { text: "Educate people to take the right action", value: 'A' },
      { text: "Inspire people to believe something new", value: 'B' }
    ]
  },
  
  // SECTION 5: Conversion ready insights
  {
    id: 'Q21',
    section: 'Conversion ready insights',
    text: "What role does your content play in the business?",
    options: [
      { text: "Positioning, priming, and pre-selling what we offer", value: 'A' },
      { text: "Creating movement, belief, and organic pull", value: 'B' }
    ]
  },
  {
    id: 'Q22',
    section: 'Conversion ready insights',
    text: "If someone followed your content for 90 days, they'd say:",
    options: [
      { text: '"They gave me systems that changed how I do things."', value: 'A' },
      { text: '"They gave me perspective that changed how I see things."', value: 'B' }
    ]
  },
  {
    id: 'Q23',
    section: 'Conversion ready insights',
    text: "How do you want people to describe your brand?",
    options: [
      { text: "Practical, proven, results-focused", value: 'A' },
      { text: "Authentic, powerful, message-driven", value: 'B' }
    ]
  },
  {
    id: 'Q24',
    section: 'Conversion ready insights',
    text: "What kind of offers do you want to attract with your content?",
    options: [
      { text: "High-trust, strategic clients and consulting", value: 'A' },
      { text: "High-alignment brand deals, collaborations, or movement builders", value: 'B' }
    ]
  },
  {
    id: 'Q25',
    section: 'Conversion ready insights',
    text: "If content was easy, you'd be using it to…",
    options: [
      { text: "Scale what already works through systems", value: 'A' },
      { text: "Lead with belief, voice, and identity", value: 'B' }
    ]
  },
  {
    id: 'Q26',
    section: 'Conversion ready insights',
    text: "Who creates most of your content right now?",
    options: [
      { text: "I do - I'm the one producing and publishing", value: 'A' },
      { text: "I guide the vision, but someone else helps with execution", value: 'B' }
    ]
  },
  {
    id: 'Q27',
    section: 'Conversion ready insights',
    text: "What's your biggest bottleneck with content?",
    options: [
      { text: "Volume - we don't produce consistently enough", value: 'A' },
      { text: "Vision - I'm not sure what we should be saying", value: 'B' }
    ]
  },
  {
    id: 'Q28',
    section: 'Conversion ready insights',
    text: "Which outcome would have the biggest ROI for you?",
    options: [
      { text: "Getting more consistent high-quality inbound leads", value: 'A' },
      { text: "Elevating how my brand is perceived in the market", value: 'B' }
    ]
  },
  {
    id: 'Q29',
    section: 'Conversion ready insights',
    text: "Who are you trying to influence most right now?",
    options: [
      { text: "Buyers and decision-makers", value: 'A' },
      { text: "Collaborators, partners, or the broader community", value: 'B' }
    ]
  },
  {
    id: 'Q30',
    section: 'Conversion ready insights',
    text: "If your content nailed it over the next 6 months, what would change in your business?",
    options: [
      { text: "We'd attract higher-quality opportunities and offers", value: 'A' },
      { text: "We'd finally stop being the best-kept secret", value: 'B' }
    ]
  }
];

// Scoring matrix based on the CSV file
const scoringMatrix: Record<string, Record<string, Array<{ archetype: string; weight: number }>>> = {
  'Q1': {
    'A': [{ archetype: 'Relatable Strategist', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Engaging Entertainer', weight: 1.5 }]
  },
  'Q2': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q3': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q4': {
    'A': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }],
    'B': [{ archetype: 'Relatable Strategist', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }]
  },
  'Q5': {
    'A': [{ archetype: 'Inspirational Storyteller', weight: 1.5 }, { archetype: 'Relatable Strategist', weight: 1.5 }],
    'B': [{ archetype: 'Data-Driven Analyst', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }]
  },
  'Q6': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q7': {
    'A': [{ archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q8': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Relatable Strategist', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q9': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Engaging Entertainer', weight: 2.0 }]
  },
  'Q10': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q11': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q12': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Relatable Strategist', weight: 2.0 }]
  },
  'Q13': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q14': {
    'A': [{ archetype: 'Relatable Strategist', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q15': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }]
  },
  'Q16': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q17': {
    'A': [{ archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q18': {
    'A': [{ archetype: 'Relatable Strategist', weight: 2.0 }],
    'B': [{ archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q19': {
    'A': [{ archetype: 'Relatable Strategist', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Engaging Entertainer', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q20': {
    'A': [{ archetype: 'Relatable Strategist', weight: 2.0 }, { archetype: 'Tactical Educator', weight: 2.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 2.0 }, { archetype: 'Inspirational Storyteller', weight: 2.0 }]
  },
  'Q21': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q22': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Relatable Strategist', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q23': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 1.5 }, { archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q24': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Engaging Entertainer', weight: 1.5 }]
  },
  'Q25': {
    'A': [{ archetype: 'Tactical Educator', weight: 1.5 }],
    'B': [{ archetype: 'Bold Challenger', weight: 1.5 }, { archetype: 'Inspirational Storyteller', weight: 1.5 }]
  },
  'Q26': {
    'A': [{ archetype: 'Relatable Strategist', weight: 0.0 }, { archetype: 'Tactical Educator', weight: 0.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 0.0 }, { archetype: 'Relatable Strategist', weight: 0.0 }]
  },
  'Q27': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 0.0 }, { archetype: 'Tactical Educator', weight: 0.0 }],
    'B': [{ archetype: 'Inspirational Storyteller', weight: 0.0 }, { archetype: 'Relatable Strategist', weight: 0.0 }]
  },
  'Q28': {
    'A': [{ archetype: 'Relatable Strategist', weight: 0.0 }, { archetype: 'Tactical Educator', weight: 0.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 0.0 }, { archetype: 'Inspirational Storyteller', weight: 0.0 }]
  },
  'Q29': {
    'A': [{ archetype: 'Data-Driven Analyst', weight: 0.0 }, { archetype: 'Tactical Educator', weight: 0.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 0.0 }, { archetype: 'Inspirational Storyteller', weight: 0.0 }]
  },
  'Q30': {
    'A': [{ archetype: 'Relatable Strategist', weight: 0.0 }, { archetype: 'Tactical Educator', weight: 0.0 }],
    'B': [{ archetype: 'Bold Challenger', weight: 0.0 }, { archetype: 'Inspirational Storyteller', weight: 0.0 }]
  }
};

const Assessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for welcome, 0+ for questions
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const calculateArchetype = () => {
    const archetypeScores: Record<string, number> = {
      'Tactical Educator': 0,
      'Relatable Strategist': 0,
      'Inspirational Storyteller': 0,
      'Data-Driven Analyst': 0,
      'Engaging Entertainer': 0,
      'Bold Challenger': 0
    };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const scoring = scoringMatrix[questionId]?.[answer];
      if (scoring) {
        scoring.forEach(({ archetype, weight }) => {
          archetypeScores[archetype] += weight;
        });
      }
    });

    let dominantArchetype = 'Tactical Educator';
    let highestScore = -1;

    Object.entries(archetypeScores).forEach(([archetype, score]) => {
      if (score > highestScore) {
        highestScore = score;
        dominantArchetype = archetype;
      }
    });

    return dominantArchetype;
  };

  const progress = ((currentStep + 1) / assessmentQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === -1 ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                  Discover Your <GradientText>Content Archetype</GradientText>
                </h1>
                <p className="text-gray-300 mb-8 text-center">
                  Let's uncover your natural content style and the best way for you to build authority online.
                </p>

                <div className="bg-gray-700/30 p-6 rounded-lg mb-8">
                  <p className="text-xl text-white mb-4">
                    You already know what you do is valuable.
                    <br />
                    The question is: does your content reflect that?
                  </p>
                  <p className="text-gray-300">
                    This isn't a quiz to tell you what you lack.
                    <br />
                    It's a tool to show you what's most natural to you - and how to finally make your content reflect that.
                  </p>
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setCurrentStep(0);
                }} className="space-y-6">
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
                      <p className="mt-2 text-sm text-red-500">
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
                <div className="w-full h-1 bg-gray-700 rounded-full mb-12 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: `${((currentStep) / assessmentQuestions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="mb-8">
                  <h2 className="text-sm font-medium text-blue-400 mb-2">
                    {assessmentQuestions[currentStep].section}
                  </h2>
                  <h3 className="text-2xl font-bold text-white mb-8">
                    {assessmentQuestions[currentStep].text}
                  </h3>

                  <div className="space-y-4">
                    {assessmentQuestions[currentStep].options.map((option, index) => (
                      <motion.button
                        key={index}
                        className="magnetic-glow w-full text-left p-6 rounded-xl bg-gray-700/40 hover:bg-gray-700/60 text-white transition-all ring-1 ring-white/10 hover:ring-blue-500/50"
                        onClick={() => {
                          const newAnswers = { ...answers, [assessmentQuestions[currentStep].id]: option.value };
                          setAnswers(newAnswers);
                          
                          if (currentStep < assessmentQuestions.length - 1) {
                            setCurrentStep(currentStep + 1);
                          } else {
                            setShowResult(true);
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option.text}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                  onClick={() => {
                    if (currentStep > 0) {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <ArchetypeResult archetype={archetypes[calculateArchetype()]} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

export default Assessment;