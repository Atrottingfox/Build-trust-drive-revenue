import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Target, Lightbulb, Zap, Users, BarChart3, Calendar, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import type { ContentArchetype } from '../../types/contentAssessment';
import { GradientText } from '../ui/GradientText';
import { determinePersona } from '../../lib/contentPersonas';
import { getRecommendedFormats } from '../../lib/contentFormats';
import { contentArchetypes } from '../../lib/contentArchetypes';
import { ArchetypeDetailModal } from './ArchetypeDetailModal';
import { FeedbackSection } from './FeedbackSection';
import { checkExistingFeedback } from '../../lib/contentAssessment';

interface ContentArchetypeResultProps {
  archetype: ContentArchetype;
  archetypeScores: Record<string, number>;
  traitScores: Record<string, number>;
  assessmentId?: string;
}

export function ContentArchetypeResult({ 
  archetype, 
  archetypeScores, 
  traitScores,
  assessmentId
}: ContentArchetypeResultProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalArchetype, setModalArchetype] = React.useState<ContentArchetype | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(true);

  // Check if feedback already exists for this assessment
  React.useEffect(() => {
    const checkFeedback = async () => {
      if (!assessmentId) {
        setShowFeedback(false);
        return;
      }
      
      try {
        const feedbackExists = await checkExistingFeedback(assessmentId);
        setShowFeedback(!feedbackExists);
      } catch (error) {
        console.error('Error checking feedback:', error);
        // Show feedback section by default if there's an error
        setShowFeedback(true);
      }
    };

    checkFeedback();
  }, [assessmentId]);

  const topArchetypes = Object.entries(archetypeScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const topTraits = Object.entries(traitScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Calculate confidence score based on score distribution
  const calculateConfidenceScore = () => {
    const scores = Object.values(archetypeScores).sort((a, b) => b - a);
    const topScore = scores[0];
    const secondScore = scores[1] || 0;
    const scoreGap = topScore - secondScore;
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    
    // Higher confidence when there's a clear leader and good total engagement
    const gapConfidence = Math.min(scoreGap / topScore, 0.4) * 100;
    const engagementConfidence = Math.min(totalScore / 30, 1) * 60;
    
    return Math.round(gapConfidence + engagementConfidence);
  };

  const confidenceScore = calculateConfidenceScore();

  const handleArchetypeClick = (archetypeName: string) => {
    const archetypeData = contentArchetypes[archetypeName];
    if (archetypeData) {
      setModalArchetype(archetypeData);
      setIsModalOpen(true);
    }
  };

  // Determine persona
  const persona = determinePersona(archetype.title, archetypeScores, traitScores);
  
  // Get recommended content formats
  const recommendedFormats = getRecommendedFormats([persona.primary, persona.secondary, persona.modifier]);

  // Calculate meta traits for strategic insights
  const metaTraits = {
    structure: (traitScores['Strategic Planning'] || 0) + (traitScores['Structured Thinking'] || 0) + (traitScores['System Reliance'] || 0),
    expression: (traitScores['Creative Flow'] || 0) + (traitScores['Intuitive Expression'] || 0) + (traitScores['Emotional Impact'] || 0),
    connection: (traitScores['Authentic Connection'] || 0) + (traitScores['Relational Trust'] || 0) + (traitScores['Community Focus'] || 0)
  };

  // Generate specific prescriptive outcomes based on archetype
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

    return outcomes[archetype.title as keyof typeof outcomes] || outcomes['Architect'];
  };

  const prescriptiveOutcome = getPrescriptiveOutcome();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{archetype.avatar}</div>
        <h2 className="text-4xl font-bold text-white mb-4">
          You're <GradientText>{archetype.title}</GradientText>
        </h2>
        <p className="text-2xl text-blue-400 font-semibold mb-6">"{archetype.subtitle}"</p>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/20 rounded-full">
            <div className={`w-3 h-3 rounded-full ${
              confidenceScore >= 80 ? 'bg-green-500' : 
              confidenceScore >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
            }`} />
            <span className="text-sm text-gray-300">
              {confidenceScore}% confidence match
            </span>
          </div>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">{archetype.description}</p>
      </div>

      {/* Persona-Based Strategic Analysis */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-xl ring-1 ring-blue-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />
          Your Strategic Content Profile: <GradientText>{persona.name}</GradientText>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Your Archetype Blend:</h4>
              <div className="space-y-2 text-gray-300">
                <p><strong>Primary:</strong> {persona.primary} (Your core strength)</p>
                <p><strong>Secondary:</strong> {persona.secondary} (Your supporting style)</p>
                <p><strong>Modifier:</strong> {persona.modifier} (Your unique edge)</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Strategic Advantages:</h4>
              <div className="flex flex-wrap gap-2">
                {persona.traitBlend.map((trait, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-blue-400 font-semibold mb-2">Strategic Intelligence:</h4>
            <div className="space-y-2 text-gray-300">
              <p><strong>You excel when:</strong> {metaTraits.expression > metaTraits.structure ? 'Leading with emotion and authenticity' : 'Building systems and strategic frameworks'}</p>
              <p><strong>Your blind spot:</strong> {persona.blindSpots[0]}</p>
              <p><strong>Trust builder:</strong> {archetype.trustBuildingStyle}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-6 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-3">Your Content Strategy Blueprint:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p><strong>Format Focus:</strong> {persona.tacticalPrescription.formatFocus.join(', ')}</p>
              <p><strong>Tone Guide:</strong> {persona.tacticalPrescription.toneGuide}</p>
            </div>
            <div>
              <p><strong>Execution Strategy:</strong> {persona.tacticalPrescription.executionStrategy}</p>
              <p><strong>Repurposing System:</strong> {persona.tacticalPrescription.repurposingPlay}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Playbook */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-xl ring-1 ring-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-400" />
          Your <GradientText>Content Playbook</GradientText>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-purple-900/20 p-4 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                Your Optimal Tone:
              </h4>
              <div className="space-y-2">
                {archetype.contentRecommendations.tone.map((tone, index) => (
                  <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    {tone}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Your Content Style:
              </h4>
              <div className="space-y-2">
                {archetype.contentRecommendations.style.map((style, index) => (
                  <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    {style}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-900/20 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                High-Impact Formats:
              </h4>
              <div className="space-y-2">
                {archetype.contentRecommendations.formats.map((format, index) => (
                  <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    {format}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                Strategic Positioning:
              </h4>
              <div className="space-y-2">
                {archetype.contentRecommendations.positioning.map((position, index) => (
                  <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    {position}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-800/40 p-6 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-3">Implementation Priority:</h4>
          <div className="grid md:grid-cols-3 gap-4 text-gray-300 text-sm">
            <div>
              <p><strong>Week 1:</strong> Establish your tone and voice</p>
            </div>
            <div>
              <p><strong>Week 2-3:</strong> Test top 3 content formats</p>
            </div>
            <div>
              <p><strong>Week 4+:</strong> Double down on what resonates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Content Strengths & Blind Spots */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-700/40 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Strategic Advantages
          </h3>
          <ul className="space-y-3">
            {persona.contentStrengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-700/40 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Strategic Blind Spots
          </h3>
          <ul className="space-y-3">
            {persona.blindSpots.map((blindSpot, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                {blindSpot}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Content Formats */}
      <div className="bg-gray-700/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          High-ROI Content Formats for Your Archetype
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedFormats.map((format) => (
            <div key={format.id} className="bg-gray-600/40 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold text-sm mb-1">{format.name}</h4>
              <p className="text-gray-400 text-xs mb-2">{format.type} • {format.trustTransferStyle}</p>
              <p className="text-gray-300 text-xs">{format.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Execution Rhythm */}
      <div className="bg-gray-700/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Your Optimized Weekly Content Rhythm
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {persona.weeklyRhythm.map((item, index) => (
            <div key={index} className="bg-gray-600/40 p-4 rounded-lg">
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Archetype Score Breakdown */}
      <div className="bg-gray-700/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          Your Complete Archetype Analysis
        </h3>
        <div className="mb-6 space-y-2">
          <p className="text-sm text-gray-400">
            Understanding your full archetype blend enables more sophisticated content strategies.
          </p>
          <p className="text-xs text-blue-400">
            💡 Click on any archetype name below to see detailed content recommendations and strategies.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {topArchetypes.map(([archetype, score], index) => (
            <div key={archetype} className="bg-gray-600/40 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => handleArchetypeClick(archetype)}
                  className="text-white font-semibold hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  {archetype}
                </button>
                <span className="text-blue-400 font-bold">{score.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-500 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : 'bg-blue-300'
                  }`}
                  style={{ width: `${(score / Math.max(...Object.values(archetypeScores))) * 100}%` }}
                />
              </div>
              {index === 0 && (
                <div className="mt-2 text-xs text-green-400">Primary Archetype</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Feedback Section */}
      {showFeedback && assessmentId && (
        <FeedbackSection
          assessmentId={assessmentId}
          onFeedbackSubmitted={() => setShowFeedback(false)}
        />
      )}

      {/* Call to Action */}
      <div className="space-y-6">
        <motion.a
          href="https://form.typeform.com/to/S2rogsdT"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-glow block w-full text-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Your Custom Implementation Strategy
          <ArrowRight className="ml-2 h-5 w-5 inline-block" />
        </motion.a>

        <div className="text-center">
          <p className="text-gray-400 italic">
            Ready to transform your {persona.name} approach into a systematic revenue engine? Let's build your authority system together.
          </p>
        </div>
      </div>

      <ArchetypeDetailModal
        archetype={modalArchetype}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}