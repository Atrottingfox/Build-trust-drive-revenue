import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, X, Save, User, Mail, Building, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Lightbulb, Target, Info, HelpCircle, Download } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import { 
  saveCompleteBeliefMap, 
  getBeliefMapByEmail, 
  type FullBeliefMapData,
  trackBeliefMapExport,
  trackBeliefMapUsage
} from '../lib/beliefMapDatabase';

interface UserInfo {
  name: string;
  email: string;
  categoryOfOwnership: string;
  uniqueOffer: string;
}

interface Concept {
  id?: string;
  title: string;
  description: string;
  keyMessages: string[];
  contentIdeas: string[];
}

interface Stage1Data {
  traits: string;
  interests: string;
  values: string;
}

const conceptTemplates = [
  {
    title: "Content is the new sales team",
    description: "Traditional sales methods are becoming less effective. Conte...",
    category: "Content Strategy",
    fullExample: {
      title: "Content is the new sales team",
      description: "Traditional sales methods are becoming less effective as buyers become more informed and skeptical. Content marketing allows businesses to build trust, demonstrate expertise, and nurture relationships at scale.",
      keyMessages: [
        "Your content works 24/7 to qualify and educate prospects",
        "Trust-building happens before the sales call, not during it"
      ],
      contentIdeas: [
        "Case study: How one piece of content generated 50 qualified leads",
        "Framework breakdown: The Trust-First Sales Funnel"
      ]
    }
  },
  {
    title: "Systems beat motivation",
    description: "Relying on motivation alone leads to inconsistent results. B...",
    category: "Business Systems",
    fullExample: {
      title: "Systems beat motivation",
      description: "Relying on motivation alone leads to inconsistent results. Building systematic processes ensures consistent performance regardless of how you feel on any given day.",
      keyMessages: [
        "Motivation gets you started, systems keep you going",
        "Your business should run without you having to be 'on' all the time"
      ],
      contentIdeas: [
        "The 5 systems every business needs to scale",
        "How I automated 80% of my daily tasks"
      ]
    }
  },
  {
    title: "Authenticity drives authority",
    description: "In a world of polished facades, genuine authenticity cuts th...",
    category: "Personal Branding",
    fullExample: {
      title: "Authenticity drives authority",
      description: "In a world of polished facades, genuine authenticity cuts through the noise. People connect with real stories, struggles, and genuine expertise over perfect presentations.",
      keyMessages: [
        "Your struggles are your superpowers when shared authentically",
        "Perfect content doesn't exist - authentic content does"
      ],
      contentIdeas: [
        "The mistake that taught me everything about business",
        "Why I stopped trying to be perfect online"
      ]
    }
  }
];

const formatInspiration = [
  { type: "A belief or opinion", example: '"Perfect" content doesn\'t exist' },
  { type: "A client insight", example: "My best clients all ignore engagement metrics" },
  { type: "A process or framework", example: "We use a 3 part shoot system: Anchor lean-in deepen value" },
  { type: "A quote or tweet", example: "Content is a trust tool, not a lead tool" },
  { type: "A personal story", example: "When I was working with…" }
];

const contentFormats = [
  {
    title: "Belief - \"Belief Shift Builder\" (Contrarian)",
    points: [
      "Common assumption or accepted norm",
      "Why it's flawed",
      "Your belief",
      "Why it matters",
      "Real-world example or proof"
    ]
  },
  {
    title: "Story - \"Founder Story Format\" (Authenticity enhancer)",
    points: [
      "Set the scene (before)",
      "The moment of friction/failure",
      "The turning point",
      "What changed",
      "What others can take away"
    ]
  },
  {
    title: "Insight - \"Credibility Drop\"",
    points: [
      "Surprising/unassuming insight",
      "What most get wrong",
      "Why it matters",
      "Your proof (data, story, example)",
      "Reframe or takeaway"
    ]
  },
  {
    title: "Framework - \"Mini Masterclass\"",
    points: [
      "Problem they're facing",
      "Framework name or concept",
      "Step-by-step walk-through",
      "Common mistake",
      "Why your method works better"
    ]
  },
  {
    title: "Quote - \"Expand & Deepen\"",
    points: [
      "The quote (as a bold opener)",
      "The context or why it matters",
      "A story or example",
      "A deeper insight",
      "Invite reflection or next step"
    ]
  }
];

export default function BeliefMapBuilder() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    categoryOfOwnership: '',
    uniqueOffer: ''
  });
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingConceptIndex, setEditingConceptIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentConcept, setCurrentConcept] = useState<Concept>({
    title: '',
    description: '',
    keyMessages: [''],
    contentIdeas: ['']
  });
  const [showContentInspiration, setShowContentInspiration] = useState(true);
  const [expandedFormat, setExpandedFormat] = useState<string | null>(null);
  const [stage1Data, setStage1Data] = useState<Stage1Data>({
    traits: '',
    interests: '',
    values: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState<typeof conceptTemplates[0] | null>(null);

  // Load existing data when component mounts
  useEffect(() => {
    const loadData = async () => {
      const savedEmail = localStorage.getItem('beliefMapUser');
      if (savedEmail) {
        const userData = JSON.parse(savedEmail);
        setUserInfo(userData);
        
        // Track that user accessed the builder
        await trackBeliefMapUsage(userData.email, {
          access_method: 'direct_link',
          completion_status: 'started'
        });
        
        try {
          const existingData = await getBeliefMapByEmail(userData.email);
          if (existingData) {
            setUserInfo({
              name: existingData.entry.name,
              email: existingData.entry.email,
              categoryOfOwnership: existingData.entry.category_of_ownership || '',
              uniqueOffer: existingData.entry.unique_offer || ''
            });
            
            setStage1Data({
              traits: existingData.entry.traits || '',
              interests: existingData.entry.interests || '',
              values: existingData.entry.values || ''
            });
            
            const loadedConcepts: Concept[] = existingData.concepts.map(conceptData => ({
              id: conceptData.concept.id,
              title: conceptData.concept.title,
              description: conceptData.concept.description || '',
              keyMessages: conceptData.messages.map(m => m.message),
              contentIdeas: conceptData.content_ideas.map(c => c.idea)
            }));
            
            setConcepts(loadedConcepts);
          }
        } catch (error) {
          console.error('Error loading existing data:', error);
        }
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  const saveBeliefMap = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.categoryOfOwnership) {
      setSaveStatus('error');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const mapData = {
        name: userInfo.name,
        email: userInfo.email,
        categoryOfOwnership: userInfo.categoryOfOwnership,
        uniqueOffer: userInfo.uniqueOffer,
        traits: stage1Data.traits,
        interests: stage1Data.interests,
        values: stage1Data.values,
        concepts: concepts.filter(concept => concept.title.trim()).map(concept => ({
          id: concept.id,
          title: concept.title,
          description: concept.description,
          keyMessages: concept.keyMessages.filter(msg => msg.trim()),
          contentIdeas: concept.contentIdeas.filter(idea => idea.trim())
        }))
      };

      await saveCompleteBeliefMap(mapData);
      setSaveStatus('success');
      
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving belief map:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const openAddForm = () => {
    setEditingConceptIndex(null);
    setCurrentConcept({
      title: '',
      description: '',
      keyMessages: [''],
      contentIdeas: ['']
    });
    setSelectedTemplate(null);
    setShowAddForm(true);
  };

  const selectTemplate = (template: typeof conceptTemplates[0]) => {
    setSelectedTemplate(template);
    setCurrentConcept({
      title: template.fullExample.title,
      description: template.fullExample.description,
      keyMessages: [...template.fullExample.keyMessages],
      contentIdeas: [...template.fullExample.contentIdeas]
    });
  };

  const editConcept = (conceptIndex: number) => {
    setEditingConceptIndex(conceptIndex);
    setCurrentConcept({ ...concepts[conceptIndex] });
    setSelectedTemplate(null);
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setEditingConceptIndex(null);
    setSelectedTemplate(null);
    setShowContentInspiration(true);
    setExpandedFormat(null);
  };

  const saveConcept = () => {
    if (!currentConcept.title.trim()) return;

    if (editingConceptIndex !== null) {
      const updatedConcepts = [...concepts];
      updatedConcepts[editingConceptIndex] = currentConcept;
      setConcepts(updatedConcepts);
    } else {
      setConcepts([...concepts, currentConcept]);
    }
    
    closeAddForm();
  };

  const deleteConcept = (index: number) => {
    setConcepts(concepts.filter((_, i) => i !== index));
  };

  const addMessage = () => {
    setCurrentConcept({
      ...currentConcept,
      keyMessages: [...currentConcept.keyMessages, '']
    });
  };

  const updateMessage = (index: number, value: string) => {
    const updatedMessages = [...currentConcept.keyMessages];
    updatedMessages[index] = value;
    setCurrentConcept({
      ...currentConcept,
      keyMessages: updatedMessages
    });
  };

  const removeMessage = (index: number) => {
    setCurrentConcept({
      ...currentConcept,
      keyMessages: currentConcept.keyMessages.filter((_, i) => i !== index)
    });
  };

  const addContentIdea = () => {
    setCurrentConcept({
      ...currentConcept,
      contentIdeas: [...currentConcept.contentIdeas, '']
    });
  };

  const updateContentIdea = (index: number, value: string) => {
    const updatedIdeas = [...currentConcept.contentIdeas];
    updatedIdeas[index] = value;
    setCurrentConcept({
      ...currentConcept,
      contentIdeas: updatedIdeas
    });
  };

  const removeContentIdea = (index: number) => {
    setCurrentConcept({
      ...currentConcept,
      contentIdeas: currentConcept.contentIdeas.filter((_, i) => i !== index)
    });
  };

  const clearPlaceholder = (field: 'title' | 'description') => {
    if (selectedTemplate) {
      if (field === 'title' && currentConcept.title === selectedTemplate.fullExample.title) {
        setCurrentConcept({ ...currentConcept, title: '' });
      } else if (field === 'description' && currentConcept.description === selectedTemplate.fullExample.description) {
        setCurrentConcept({ ...currentConcept, description: '' });
      }
    }
  };

  const clearMessagePlaceholder = (index: number) => {
    if (selectedTemplate && currentConcept.keyMessages[index] === selectedTemplate.fullExample.keyMessages[index]) {
      updateMessage(index, '');
    }
  };

  const clearIdeaPlaceholder = (index: number) => {
    if (selectedTemplate && currentConcept.contentIdeas[index] === selectedTemplate.fullExample.contentIdeas[index]) {
      updateContentIdea(index, '');
    }
  };

  const toggleFormat = (formatTitle: string) => {
    setExpandedFormat(expandedFormat === formatTitle ? null : formatTitle);
  };

  const generateNotionTemplate = () => {
    // Track export
    trackBeliefMapExport(userInfo.email, 'worksheet');
    
    const template = `# Stage 1 Worksheet - ${userInfo.name}

## Your Traits
${stage1Data.traits || 'Not filled out yet'}

## Your Interests  
${stage1Data.interests || 'Not filled out yet'}

## Your Values
${stage1Data.values || 'Not filled out yet'}

## Category of Ownership
${userInfo.categoryOfOwnership || 'Not filled out yet'}

## Unique Offer
${userInfo.uniqueOffer || 'Not filled out yet'}

---

# Belief Map Concepts

${concepts.map((concept, index) => `
## Concept ${index + 1}: ${concept.title}

**Description:** ${concept.description}

**Key Messages:**
${concept.keyMessages.filter(msg => msg.trim()).map(msg => `- ${msg}`).join('\n')}

**Content Ideas:**
${concept.contentIdeas.filter(idea => idea.trim()).map(idea => `- ${idea}`).join('\n')}

---
`).join('')}

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userInfo.name.replace(/\s+/g, '_')}_belief_map_worksheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateBeliefMapExport = () => {
    // Track export
    trackBeliefMapExport(userInfo.email, 'belief_map');
    
    const template = `# Belief Map Export - ${userInfo.name}

## Basic Information
- **Name/Brand:** ${userInfo.name}
- **Email:** ${userInfo.email}
- **Category of Ownership:** ${userInfo.categoryOfOwnership}
- **Unique Offer:** ${userInfo.uniqueOffer}

---

# Core Concepts

${concepts.map((concept, index) => `
## ${index + 1}. ${concept.title}

### Description
${concept.description || 'No description provided'}

### Key Messages
${concept.keyMessages.filter(msg => msg.trim()).length > 0 
  ? concept.keyMessages.filter(msg => msg.trim()).map(msg => `- ${msg}`).join('\n')
  : 'No key messages added'
}

### Content Ideas
${concept.contentIdeas.filter(idea => idea.trim()).length > 0
  ? concept.contentIdeas.filter(idea => idea.trim()).map(idea => `- ${idea}`).join('\n')
  : 'No content ideas added'
}

---
`).join('')}

## Content Opportunities

Transform each concept into multiple content pieces:

${concepts.map((concept, index) => `
### ${concept.title} - Content Opportunities

**Blog Posts:**
- "Why ${concept.title} Matters More Than You Think"
- "The Complete Guide to ${concept.title}"
- "5 Common Mistakes with ${concept.title}"

**Social Media:**
- Quote cards with key messages
- Behind-the-scenes stories
- Quick tips and insights

**Video Content:**
- Educational tutorials
- Personal story sharing
- Q&A sessions

**Email Content:**
- Newsletter series
- Case studies
- Personal reflections

---
`).join('')}

**Next Steps:**
1. Copy this content into your Notion workspace
2. Create a content calendar based on these concepts
3. Start with one concept and create 3-5 pieces of content
4. Track which concepts resonate most with your audience

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userInfo.name.replace(/\s+/g, '_')}_belief_map_export.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Track when user leaves (for session duration)
  useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      if (userInfo.email) {
        const sessionDuration = Math.round((Date.now() - startTime) / 1000 / 60); // minutes
        trackBeliefMapUsage(userInfo.email, {
          session_duration: sessionDuration,
          concepts_created: concepts.length,
          completion_status: concepts.length > 0 ? 
            (concepts.length >= 3 ? 'completed' : 'partial') : 'started'
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [userInfo.email, concepts.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container className="max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Belief Map <GradientText>Builder</GradientText>
          </h1>
          <p className="text-lg text-gray-400">
            Map out your core beliefs and concepts, then transform them into content your audience will actually resonate with.
          </p>
        </div>

        {/* Top Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {/* Hide "start here" arrow on mobile */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-blue-400">start here</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </div>
          <a
            href="https://drive.google.com/file/d/1RO62PywFoBwtqJVLv0dAlPvDuwIwTPNv/view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            📊 Stage 2 Worksheet
          </a>
          <a
            href="https://drive.google.com/file/d/1mJcuR7jBy_o2MvJFpicd21wuI2vMptHG/view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            📋 Stage 1 Worksheet
          </a>
          <a
            href="https://chatgpt.com/g/g-6858a5d273988191856173b9f7db2cae-personal-brand-mirror"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
          >
            🤖 Personal Brand Mirror GPT
          </a>
        </div>

        {/* Save Status */}
        {saveStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${
              saveStatus === 'success' 
                ? 'bg-green-900/20 text-green-400 ring-1 ring-green-500/20' 
                : 'bg-red-900/20 text-red-400 ring-1 ring-red-500/20'
            }`}
          >
            {saveStatus === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>
              {saveStatus === 'success' 
                ? 'Belief map saved successfully!' 
                : 'Error saving belief map. Please check all required fields.'}
            </span>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-800/40 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name / Brand
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="sean"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  Category of Ownership
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      What is your audience going to relate to you on?
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={userInfo.categoryOfOwnership}
                  onChange={(e) => setUserInfo({ ...userInfo, categoryOfOwnership: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Content marketing, Ecommerce, Business coaching"
                />
              </div>
            </div>
          </div>

          {/* Core Concepts Section */}
          <div className="bg-gray-800/40 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Core Concepts</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
                >
                  🎯
                </button>
                <button 
                  onClick={openAddForm}
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Templates Section */}
            <AnimatePresence>
              {showTemplates && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <h3 className="text-sm font-medium text-purple-400 mb-3">Concept Starter Templates</h3>
                  <div className="space-y-2">
                    {conceptTemplates.map((template, index) => (
                      <motion.button
                        key={index}
                        onClick={() => selectTemplate(template)}
                        className="w-full text-left p-3 bg-purple-900/20 rounded-lg border border-purple-500/20 hover:bg-purple-900/30 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h4 className="text-white font-medium text-sm">{template.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{template.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Existing Concepts */}
            {concepts.length > 0 && (
              <div className="space-y-3 mb-6">
                {concepts.map((concept, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-700/40 rounded-lg group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 cursor-pointer" onClick={() => editConcept(index)}>
                        <h3 className="text-white font-semibold">{concept.title}</h3>
                        {concept.description && (
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{concept.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteConcept(index)}
                        className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add/Edit Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-600 pt-6 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">
                      {editingConceptIndex !== null ? 'Edit Core Concept' : 'Add New Core Concept'}
                    </h3>
                    <button
                      onClick={closeAddForm}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column - Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={currentConcept.title}
                          onChange={(e) => setCurrentConcept({ ...currentConcept, title: e.target.value })}
                          onFocus={() => clearPlaceholder('title')}
                          className={`w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            selectedTemplate && currentConcept.title === selectedTemplate.fullExample.title ? 'text-gray-500' : 'text-white'
                          }`}
                          placeholder="Content is the new sales team"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          value={currentConcept.description}
                          onChange={(e) => setCurrentConcept({ ...currentConcept, description: e.target.value })}
                          onFocus={() => clearPlaceholder('description')}
                          className={`w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none ${
                            selectedTemplate && currentConcept.description === selectedTemplate.fullExample.description ? 'text-gray-500' : 'text-white'
                          }`}
                          placeholder="Traditional sales methods are becoming less effective as buyers become more informed and skeptical..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Key Messages
                        </label>
                        <div className="space-y-2">
                          {currentConcept.keyMessages.map((message, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={message}
                                onChange={(e) => updateMessage(index, e.target.value)}
                                onFocus={() => clearMessagePlaceholder(index)}
                                className={`flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  selectedTemplate && message === selectedTemplate.fullExample.keyMessages[index] ? 'text-gray-500' : 'text-white'
                                }`}
                                placeholder="Your content works 24/7 to qualify and educate prospects"
                              />
                              <button
                                onClick={() => removeMessage(index)}
                                className="text-red-400 hover:text-red-300 p-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={addMessage}
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add Message
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Content Ideas
                        </label>
                        <div className="space-y-2">
                          {currentConcept.contentIdeas.map((idea, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={idea}
                                onChange={(e) => updateContentIdea(index, e.target.value)}
                                onFocus={() => clearIdeaPlaceholder(index)}
                                className={`flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  selectedTemplate && idea === selectedTemplate.fullExample.contentIdeas[index] ? 'text-gray-500' : 'text-white'
                                }`}
                                placeholder="Case study: How one piece of content generated 50 qualified leads"
                              />
                              <button
                                onClick={() => removeContentIdea(index)}
                                className="text-red-400 hover:text-red-300 p-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={addContentIdea}
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add Content Idea
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Content Inspiration */}
                    <div className="bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="text-blue-400 font-semibold flex items-center gap-2 mb-4">
                        💡 Content Inspiration
                      </h4>
                      
                      <div className="mb-4">
                        <h5 className="text-blue-300 font-medium mb-2">Content Inspiration</h5>
                        <div className="bg-gray-800/50 p-3 rounded text-sm">
                          <table className="w-full text-gray-300">
                            <thead>
                              <tr className="border-b border-gray-600">
                                <th className="text-left py-2 text-blue-300">Concept Type</th>
                                <th className="text-left py-2 text-blue-300">Example</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formatInspiration.map((item, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                  <td className="py-2">{item.type}</td>
                                  <td className="py-2">{item.example}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-blue-300 font-medium mb-3">Concepts</h5>
                        <div className="space-y-2">
                          {contentFormats.map((format, index) => (
                            <div key={index} className="bg-gray-800/50 rounded">
                              <button
                                onClick={() => toggleFormat(format.title)}
                                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-700/50 transition-colors"
                              >
                                <h6 className="text-blue-300 font-medium text-sm">{format.title}</h6>
                                {expandedFormat === format.title ? 
                                  <ChevronUp className="w-4 h-4 text-blue-400" /> : 
                                  <ChevronDown className="w-4 h-4 text-blue-400" />
                                }
                              </button>
                              <AnimatePresence>
                                {expandedFormat === format.title && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-3 pb-3">
                                      <ul className="text-gray-300 text-sm space-y-1">
                                        {format.points.map((point, i) => (
                                          <li key={i}>• {point}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <motion.button
                      onClick={closeAddForm}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      onClick={saveConcept}
                      disabled={!currentConcept.title.trim()}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      📋 Save & Add Another
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {concepts.length === 0 && !showAddForm && (
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No core concepts added yet</p>
                <p className="text-gray-500 text-sm">Click the + button to add your first concept</p>
              </div>
            )}
          </div>

          {/* Save Button and Export Belief Map */}
          {concepts.length > 0 && (
            <div className="space-y-4">
              <motion.button
                onClick={saveBeliefMap}
                disabled={isSaving || !userInfo.name || !userInfo.email || !userInfo.categoryOfOwnership}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Saving...' : 'Save Belief Map'}
              </motion.button>

              <motion.button
                onClick={generateBeliefMapExport}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Export Belief Map for Notion
              </motion.button>
            </div>
          )}

          {/* How to Use Your Belief Map */}
          <div className="bg-gray-800/40 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">How to Use Your Belief Map</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Identify Core Concepts</h3>
                  <p className="text-gray-400 text-sm">
                    Start with 3-5 fundamental concepts that drive your business philosophy and differentiate you from competitors.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Develop Messaging</h3>
                  <p className="text-gray-400 text-sm">
                    For each concept, create key messages that explain why it matters and how it benefits your audience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Create Content</h3>
                  <p className="text-gray-400 text-sm">
                    Transform each concept into multiple content opportunities, then export & copy the file into your notion doc for future use.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 1 Worksheet Section - Always Open */}
          <div className="bg-gray-800/40 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">
              Stage 1 Worksheet - Complete this to strengthen your foundation
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Traits
                  </label>
                  <textarea
                    value={stage1Data.traits}
                    onChange={(e) => setStage1Data({ ...stage1Data, traits: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    placeholder="List your key personal and professional traits..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Interests
                  </label>
                  <textarea
                    value={stage1Data.interests}
                    onChange={(e) => setStage1Data({ ...stage1Data, interests: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    placeholder="What are you interested in and passionate about..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Values
                  </label>
                  <textarea
                    value={stage1Data.values}
                    onChange={(e) => setStage1Data({ ...stage1Data, values: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    placeholder="What values and principles do you hold dear..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    Your Unique Offer
                    <div className="relative group">
                      <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 max-w-xs">
                        Based on all your information you've put in here and your category of ownership, what is your unique positioning in the market?
                      </div>
                    </div>
                  </label>
                  <textarea
                    value={userInfo.uniqueOffer}
                    onChange={(e) => setUserInfo({ ...userInfo, uniqueOffer: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    placeholder="What makes your approach unique? What's your positioning in the market?"
                  />
                </div>
              </div>
            </div>

            {/* Export Worksheet Button */}
            <div className="mt-6">
              <motion.button
                onClick={generateNotionTemplate}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Export Worksheet for Notion
              </motion.button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}