import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Mail, Building, Youtube, Plus, X, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';

interface UserInfo {
  name: string;
  email: string;
  businessType: string;
  youtubeExperience: string;
}

interface PersonalityScores {
  educator: number;
  challenger: number;
  storyteller: number;
  analyst: number;
  entertainer: number;
  facilitator: number;
}

interface VideoIdea {
  id: string;
  style: string;
  title: string;
  description: string;
}

interface SavedData {
  userInfo: UserInfo;
  personalityScores: PersonalityScores;
  selectedVideos: string[];
  videoIdeas: VideoIdea[];
}

const videoTypes = [
  'Process walkthrough/deep dive',
  'Mini masterclass',
  'Belief shift/myth buster',
  'Framework breakdown',
  'Interview/Guest Expert',
  'Before X, do Y Pre-Frame',
  'Starting from scratch guide',
  'Core mistakes and lessons',
  'How to/tutorial',
  'Listicle',
  'Personal story',
  'Respond/react/commentary'
];

const structureSnippets = [
  {
    title: "Credibility Snap-In",
    purpose: "Drop trust without bragging",
    usage: "After intro or pre-framework",
    text: "I've worked with [type of clients or result] over the last X years, and this always shows up…"
  },
  {
    title: "Belief Reframe",
    purpose: "Instantly challenge viewer assumptions", 
    usage: "Before a framework or tip",
    text: "Most people think the problem is ___. But the truth is ___."
  },
  {
    title: "Proof",
    purpose: "Slip in a client result without breaking flow",
    usage: "Mid-story or lesson",
    text: "Last month, one of our clients went from ___ to ___ by applying this exact thing."
  },
  {
    title: "Internal Language Builder",
    purpose: "Seed language your audience will repeat to build culture",
    usage: "After a key concept", 
    text: "In our world, we call this the ___ Effect. And it's a game-changer."
  },
  {
    title: "The 'Why I Made This'",
    purpose: "Create emotional alignment",
    usage: "Before the CTA or after first hook",
    text: "I made this because too many people like [ideal client] were struggling with ___, and it's totally avoidable."
  },
  {
    title: "Pre CTA Story",
    purpose: "Transition into a subtle CTA with relevance",
    usage: "Before asking for comment/subscribe/download",
    text: "When I first learned this, I remember wishing someone would just give me a playbook. That's why I put together ___."
  },
  {
    title: "Content Pathway",
    purpose: "Keep the viewer engaged by previewing what's ahead",
    usage: "After hook",
    text: "Here's what we'll cover: First ___, then ___, and finally I'll show you ___."
  },
  {
    title: "Anti Hero Disclaimer",
    purpose: "Build trust through humility or relatability",
    usage: "Mid framework or before sharing a big insight",
    text: "I used to do x constantly until I finally figured out ___."
  },
  {
    title: "Bridge to Email or Funnel",
    purpose: "Drive traffic from YouTube to deeper content",
    usage: "At the end or middle of educational vid",
    text: "I break this down in more depth in a private breakdown I only send via email - link's in the description."
  },
  {
    title: "Pattern Interrupt Cliffhanger",
    purpose: "Regrab attention mid-video",
    usage: "Right before key insight",
    text: "But before I tell you that — let me show you the mistake 90% of people make here…"
  }
];

const personalityQuestions = [
  {
    id: 'content_creation',
    text: "When creating content, you naturally:",
    options: [
      { text: "Break down complex topics into clear, actionable steps", type: 'educator' },
      { text: "Challenge conventional thinking and provoke new perspectives", type: 'challenger' },
      { text: "Share personal experiences and emotional journeys", type: 'storyteller' },
      { text: "Present data, research, and logical frameworks", type: 'analyst' },
      { text: "Use humor, energy, and engaging presentation styles", type: 'entertainer' },
      { text: "Guide discussions and bring different viewpoints together", type: 'facilitator' }
    ]
  },
  {
    id: 'audience_connection',
    text: "You connect best with your audience by:",
    options: [
      { text: "Teaching them practical skills they can immediately apply", type: 'educator' },
      { text: "Pushing them to question their assumptions and think differently", type: 'challenger' },
      { text: "Sharing vulnerable stories that create emotional resonance", type: 'storyteller' },
      { text: "Providing well-researched insights and proven methodologies", type: 'analyst' },
      { text: "Making learning fun and keeping them engaged throughout", type: 'entertainer' },
      { text: "Creating safe spaces for open dialogue and exploration", type: 'facilitator' }
    ]
  },
  {
    id: 'problem_solving',
    text: "When helping others solve problems, you:",
    options: [
      { text: "Create step-by-step systems and frameworks", type: 'educator' },
      { text: "Challenge them to see the problem from a completely new angle", type: 'challenger' },
      { text: "Help them understand the emotional journey of transformation", type: 'storyteller' },
      { text: "Analyze the root causes with data and evidence", type: 'analyst' },
      { text: "Make the problem-solving process enjoyable and memorable", type: 'entertainer' },
      { text: "Guide them to discover their own solutions through questioning", type: 'facilitator' }
    ]
  },
  {
    id: 'content_style',
    text: "Your natural content style tends to be:",
    options: [
      { text: "Structured, informative, and highly practical", type: 'educator' },
      { text: "Bold, contrarian, and thought-provoking", type: 'challenger' },
      { text: "Personal, authentic, and emotionally compelling", type: 'storyteller' },
      { text: "Research-backed, logical, and comprehensive", type: 'analyst' },
      { text: "Dynamic, entertaining, and highly engaging", type: 'entertainer' },
      { text: "Collaborative, inclusive, and discussion-focused", type: 'facilitator' }
    ]
  },
  {
    id: 'expertise_sharing',
    text: "When sharing your expertise, you prefer to:",
    options: [
      { text: "Create comprehensive guides and tutorials", type: 'educator' },
      { text: "Disrupt industry norms and conventional wisdom", type: 'challenger' },
      { text: "Share the human side of your professional journey", type: 'storyteller' },
      { text: "Present case studies and data-driven insights", type: 'analyst' },
      { text: "Make complex topics accessible through creative presentation", type: 'entertainer' },
      { text: "Foster community discussions and peer learning", type: 'facilitator' }
    ]
  }
];

export default function TheBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    businessType: '',
    youtubeExperience: ''
  });
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string[]>>({});
  const [personalityScores, setPersonalityScores] = useState<PersonalityScores>({
    educator: 0,
    challenger: 0,
    storyteller: 0,
    analyst: 0,
    entertainer: 0,
    facilitator: 0
  });
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [videoIdeas, setVideoIdeas] = useState<VideoIdea[]>([]);
  const [showStructureHelp, setShowStructureHelp] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Load saved data on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('builderEmail');
    if (savedEmail) {
      const savedData = localStorage.getItem(`builderData_${savedEmail}`);
      if (savedData) {
        const parsed: SavedData = JSON.parse(savedData);
        setUserInfo(parsed.userInfo);
        setPersonalityScores(parsed.personalityScores);
        setSelectedVideos(parsed.selectedVideos);
        setVideoIdeas(parsed.videoIdeas);
        
        // Skip to video ideas if they have completed previous steps
        if (parsed.selectedVideos.length > 0) {
          setCurrentStep(5);
        } else if (Object.keys(parsed.personalityScores).some(key => parsed.personalityScores[key as keyof PersonalityScores] > 0)) {
          setCurrentStep(4);
        } else if (parsed.userInfo.email) {
          setCurrentStep(3);
        }
      }
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (userInfo.email) {
      localStorage.setItem('builderEmail', userInfo.email);
      const dataToSave: SavedData = {
        userInfo,
        personalityScores,
        selectedVideos,
        videoIdeas
      };
      localStorage.setItem(`builderData_${userInfo.email}`, JSON.stringify(dataToSave));
    }
  }, [userInfo, personalityScores, selectedVideos, videoIdeas]);

  const calculatePersonalityScores = () => {
    const scores: PersonalityScores = {
      educator: 0,
      challenger: 0,
      storyteller: 0,
      analyst: 0,
      entertainer: 0,
      facilitator: 0
    };

    Object.values(personalityAnswers).forEach(answers => {
      answers.forEach(answer => {
        personalityQuestions.forEach(question => {
          const option = question.options.find(opt => opt.text === answer);
          if (option) {
            scores[option.type as keyof PersonalityScores]++;
          }
        });
      });
    });

    setPersonalityScores(scores);
  };

  const getDominantPersonality = () => {
    const maxScore = Math.max(...Object.values(personalityScores));
    const dominant = Object.entries(personalityScores).find(([_, score]) => score === maxScore);
    return dominant ? dominant[0] : 'educator';
  };

  const getPersonalityDescription = (type: string) => {
    const descriptions = {
      educator: "You excel at breaking down complex concepts into digestible, actionable content. Your strength lies in systematic teaching and practical application.",
      challenger: "You thrive on disrupting conventional thinking and pushing boundaries. Your content challenges assumptions and provokes meaningful change.",
      storyteller: "You connect through authentic narratives and emotional resonance. Your personal experiences become powerful teaching tools.",
      analyst: "You build credibility through research, data, and logical frameworks. Your content is thorough, well-researched, and evidence-based.",
      entertainer: "You make learning enjoyable and memorable through dynamic presentation. Your energy and creativity keep audiences engaged.",
      facilitator: "You excel at bringing people together and fostering meaningful discussions. Your content creates community and collaborative learning."
    };
    return descriptions[type as keyof typeof descriptions] || descriptions.educator;
  };

  const handleVideoSelection = (videoType: string) => {
    if (selectedVideos.length < 4) {
      setSelectedVideos([...selectedVideos, videoType]);
    }
  };

  const removeVideo = (index: number) => {
    const newVideos = selectedVideos.filter((_, i) => i !== index);
    setSelectedVideos(newVideos);
  };

  const addVideoIdea = () => {
    if (selectedVideos.length === 0) return;
    
    const newIdea: VideoIdea = {
      id: Date.now().toString(),
      style: selectedVideos[0], // Default to first selected style
      title: '',
      description: ''
    };
    setVideoIdeas([...videoIdeas, newIdea]);
  };

  const updateVideoIdea = (id: string, field: keyof VideoIdea, value: string) => {
    setVideoIdeas(videoIdeas.map(idea => 
      idea.id === id ? { ...idea, [field]: value } : idea
    ));
  };

  const removeVideoIdea = (id: string) => {
    setVideoIdeas(videoIdeas.filter(idea => idea.id !== id));
  };

  const insertStructureSnippet = (snippet: typeof structureSnippets[0]) => {
    if (!activeVideoId) return;
    
    const currentIdea = videoIdeas.find(idea => idea.id === activeVideoId);
    if (currentIdea) {
      const newDescription = currentIdea.description + 
        (currentIdea.description ? '\n\n' : '') + 
        `**${snippet.title}:** ${snippet.text}`;
      updateVideoIdea(activeVideoId, 'description', newDescription);
    }
    setShowStructureHelp(false);
  };

  const handlePersonalityAnswer = (questionId: string, answer: string) => {
    const currentAnswers = personalityAnswers[questionId] || [];
    const isSelected = currentAnswers.includes(answer);
    
    let newAnswers;
    if (isSelected) {
      newAnswers = currentAnswers.filter(a => a !== answer);
    } else {
      newAnswers = [...currentAnswers, answer];
    }
    
    setPersonalityAnswers({
      ...personalityAnswers,
      [questionId]: newAnswers
    });
  };

  const canProceedFromPersonality = () => {
    return Object.keys(personalityAnswers).length >= personalityQuestions.length &&
           Object.values(personalityAnswers).every(answers => answers.length > 0);
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep || (step === 2 && userInfo.email) || (step === 3 && canProceedFromPersonality()) || (step === 4 && selectedVideos.length > 0)) {
      setCurrentStep(step);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <motion.button
            key={step}
            onClick={() => handleStepClick(step)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              step === currentStep
                ? 'bg-blue-600 text-white'
                : step < currentStep || (step === 2 && userInfo.email) || (step === 3 && canProceedFromPersonality()) || (step === 4 && selectedVideos.length > 0)
                ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={step <= currentStep ? { scale: 1.1 } : {}}
            disabled={step > currentStep && !(step === 2 && userInfo.email) && !(step === 3 && canProceedFromPersonality()) && !(step === 4 && selectedVideos.length > 0)}
          >
            {step}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              The <GradientText>Builder</GradientText>
            </h1>
            <p className="text-xl text-gray-400">
              Build your personalized YouTube strategy in 6 simple steps
            </p>
          </motion.div>

          {renderStepIndicator()}

          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Let's get to know you</h2>
                
                <div className="space-y-6">
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
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type of Business
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={userInfo.businessType}
                        onChange={(e) => setUserInfo({ ...userInfo, businessType: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Business coaching, Fitness training, Marketing consultancy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      YouTube Experience
                    </label>
                    <div className="relative">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select
                        value={userInfo.youtubeExperience}
                        onChange={(e) => setUserInfo({ ...userInfo, youtubeExperience: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select your experience level</option>
                        <option value="complete-beginner">Complete beginner</option>
                        <option value="some-videos">Posted a few videos</option>
                        <option value="regular-poster">Regular poster (10+ videos)</option>
                        <option value="experienced">Experienced (50+ videos)</option>
                        <option value="advanced">Advanced (100+ videos)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={() => setCurrentStep(2)}
                  disabled={!userInfo.name || !userInfo.email || !userInfo.businessType || !userInfo.youtubeExperience}
                  className="w-full mt-8 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Personality Assessment
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Personality Assessment */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Personality Assessment</h2>
                <p className="text-gray-400 mb-8">Select all options that resonate with you for each question.</p>

                <div className="space-y-8">
                  {personalityQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">
                        {index + 1}. {question.text}
                      </h3>
                      <div className="grid gap-3">
                        {question.options.map((option) => (
                          <motion.button
                            key={option.text}
                            onClick={() => handlePersonalityAnswer(question.id, option.text)}
                            className={`text-left p-4 rounded-lg transition-all ${
                              personalityAnswers[question.id]?.includes(option.text)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {option.text}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={() => setCurrentStep(1)}
                    className="py-4 px-6 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 inline-block" />
                    Back
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      calculatePersonalityScores();
                      setCurrentStep(3);
                    }}
                    disabled={!canProceedFromPersonality()}
                    className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Results
                    <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personality Results */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Your Content Personality</h2>
                
                <div className="bg-blue-900/20 p-6 rounded-xl mb-8">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4 capitalize">
                    Primary Type: {getDominantPersonality()}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {getPersonalityDescription(getDominantPersonality())}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {Object.entries(personalityScores).map(([type, score]) => (
                    <div key={type} className="bg-gray-700/40 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white capitalize font-semibold">{type}</span>
                        <span className="text-blue-400 font-bold">{score}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(score / Math.max(...Object.values(personalityScores))) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setCurrentStep(2)}
                    className="py-4 px-6 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 inline-block" />
                    Back
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Choose Your Video Styles
                    <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Video Selection */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Choose Your Core Video Styles</h2>
                <p className="text-gray-400 mb-2">
                  These should be based on your core truths and specific mistakes you see people making constantly.
                </p>
                <p className="text-gray-400 mb-8">
                  These should be relatively easy to film, as they're entangled in your core beliefs and trainings.
                </p>
                
                {/* Selected Videos Display */}
                {selectedVideos.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Selected Videos ({selectedVideos.length}/4):</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideos.map((video, index) => (
                        <motion.div
                          key={index}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">{index + 1}</span>
                          {video}
                          <button
                            onClick={() => removeVideo(index)}
                            className="text-blue-200 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {videoTypes.map((videoType) => {
                    const count = selectedVideos.filter(v => v === videoType).length;
                    return (
                      <motion.button
                        key={videoType}
                        onClick={() => handleVideoSelection(videoType)}
                        disabled={selectedVideos.length >= 4}
                        className={`text-left p-4 rounded-lg transition-all relative ${
                          selectedVideos.length >= 4 && count === 0
                            ? 'bg-gray-700/20 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700/40 text-gray-300 hover:bg-gray-700/60 hover:text-white'
                        }`}
                        whileHover={selectedVideos.length < 4 || count > 0 ? { scale: 1.02 } : {}}
                        whileTap={selectedVideos.length < 4 || count > 0 ? { scale: 0.98 } : {}}
                      >
                        {count > 0 && (
                          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {count}
                          </span>
                        )}
                        {videoType}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setCurrentStep(3)}
                    className="py-4 px-6 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 inline-block" />
                    Back
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setCurrentStep(5)}
                    disabled={selectedVideos.length === 0}
                    className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Your Video Ideas
                    <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Video Ideas */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Add Your Video Ideas</h2>
                  <motion.button
                    onClick={() => setShowStructureHelp(!showStructureHelp)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Info className="w-4 h-4" />
                    Structure Help
                    {showStructureHelp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </motion.button>
                </div>

                {/* Structure Help Panel */}
                <AnimatePresence>
                  {showStructureHelp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-700/40 p-6 rounded-xl mb-8 overflow-hidden"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Structure Snippets</h3>
                      <p className="text-gray-400 mb-4">Click any snippet to add it to your active video description:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {structureSnippets.map((snippet, index) => (
                          <motion.button
                            key={index}
                            onClick={() => insertStructureSnippet(snippet)}
                            disabled={!activeVideoId}
                            className="text-left p-4 bg-gray-600/40 rounded-lg hover:bg-gray-600/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <h4 className="font-semibold text-blue-400 mb-1">{snippet.title}</h4>
                            <p className="text-xs text-gray-400 mb-2">{snippet.purpose} • {snippet.usage}</p>
                            <p className="text-sm text-gray-300">{snippet.text}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Ideas List */}
                <div className="space-y-6 mb-8">
                  {videoIdeas.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      className="bg-gray-700/40 p-6 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">Video Idea #{index + 1}</h3>
                        <button
                          onClick={() => removeVideoIdea(idea.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Style
                          </label>
                          <select
                            value={idea.style}
                            onChange={(e) => updateVideoIdea(idea.id, 'style', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {selectedVideos.map((video, idx) => (
                              <option key={idx} value={video}>{video}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Video Title
                          </label>
                          <input
                            type="text"
                            value={idea.title}
                            onChange={(e) => updateVideoIdea(idea.id, 'title', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="The 5 Mistakes Every New Coach Makes (And How to Avoid Them)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description/Structure
                          </label>
                          <textarea
                            value={idea.description}
                            onChange={(e) => updateVideoIdea(idea.id, 'description', e.target.value)}
                            onFocus={() => setActiveVideoId(idea.id)}
                            onBlur={() => setActiveVideoId(null)}
                            className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                            placeholder="Hook: Most new coaches think they need to be perfect before they start...

Main Points:
1. Mistake #1: Waiting for perfection
2. Mistake #2: Underpricing services
3. Mistake #3: Not niching down

CTA: If you're ready to avoid these mistakes and fast-track your coaching success..."
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={addVideoIdea}
                  className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  Add Video Idea
                </motion.button>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setCurrentStep(4)}
                    className="py-4 px-6 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5 inline-block" />
                    Back
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setCurrentStep(6)}
                    className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Complete Your Strategy
                    <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Completion */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/40 p-8 rounded-xl text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Your YouTube Strategy is Ready!</h2>
                
                <div className="bg-blue-900/20 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">What happens next:</h3>
                  <ul className="text-left text-gray-300 space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      We'll review your personalized strategy and video ideas
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      You'll receive detailed feedback and optimization suggestions
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Get access to our exclusive YouTube growth resources
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-700/40 p-4 rounded-lg mb-8">
                  <p className="text-gray-400 text-sm">
                    Your email ({userInfo.email}) has been saved. You can return anytime to add more video ideas or update your strategy.
                  </p>
                </div>

                <motion.a
                  href="https://form.typeform.com/to/PDtwasIb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Your Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}