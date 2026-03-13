import type { PersonaProfile } from '../types/contentAssessment';

export const contentPersonas: Record<string, PersonaProfile> = {
  "Strategic Architect": {
    name: "Strategic Architect",
    primary: "Architect",
    secondary: "Strategist", 
    modifier: "Technician",
    traitBlend: ["System Thinking", "Strategic Planning", "Implementation Focus"],
    contentStrengths: [
      "Creates comprehensive frameworks that scale",
      "Builds systematic approaches to complex problems",
      "Delivers clear, actionable strategic guidance",
      "Develops repeatable processes and methodologies"
    ],
    blindSpots: [
      "May over-engineer simple solutions",
      "Can be too process-heavy for creative audiences",
      "Might lack emotional connection in messaging",
      "Could overwhelm with too much structure"
    ],
    tacticalPrescription: {
      formatFocus: [
        "Framework Explainer videos",
        "Strategic analysis content",
        "System walkthrough tutorials",
        "Process optimization guides"
      ],
      toneGuide: "Authoritative yet accessible, systematic but practical",
      executionStrategy: "Plan quarterly themes, batch monthly, delegate execution",
      repurposingPlay: "One strategic framework → 5 tactical breakdowns → 15 micro-tips"
    },
    weeklyRhythm: [
      "1x Strategic insight post (Monday)",
      "1x Framework breakdown (Wednesday)", 
      "1x Implementation guide (Friday)",
      "2x Micro-tips from main content"
    ]
  },
  "Authentic Challenger": {
    name: "Authentic Challenger",
    primary: "Firestarter",
    secondary: "Messenger",
    modifier: "Instigator",
    traitBlend: ["Bold Truth-telling", "Authentic Voice", "Action Catalyst"],
    contentStrengths: [
      "Challenges conventional thinking with conviction",
      "Builds trust through vulnerable authenticity",
      "Drives meaningful change and transformation",
      "Creates movement through passionate messaging"
    ],
    blindSpots: [
      "May alienate audiences with extreme positions",
      "Could lack systematic approach to content",
      "Might struggle with consistent messaging",
      "Risk of being controversial without purpose"
    ],
    tacticalPrescription: {
      formatFocus: [
        "Belief-breaking content series",
        "Authentic story sharing",
        "Challenge-based content",
        "Movement-building posts"
      ],
      toneGuide: "Bold, authentic, conviction-driven with emotional resonance",
      executionStrategy: "Capture inspiration moments, light structure, personal involvement",
      repurposingPlay: "One bold stance → Supporting stories → Action challenges → Community rallying"
    },
    weeklyRhythm: [
      "1x Belief challenge post (when inspired)",
      "1x Personal story/lesson (Tuesday)",
      "1x Action challenge (Thursday)",
      "Daily micro-content from inspiration bank"
    ]
  },
  "Empathetic Guide": {
    name: "Empathetic Guide", 
    primary: "Guide",
    secondary: "Mirror",
    modifier: "Companion",
    traitBlend: ["Wisdom Sharing", "Deep Empathy", "Community Building"],
    contentStrengths: [
      "Provides wise, experience-based guidance",
      "Creates deep emotional connection with audience",
      "Builds supportive, engaged communities",
      "Offers compassionate, insightful perspectives"
    ],
    blindSpots: [
      "May be too gentle or indirect in messaging",
      "Could lack bold positioning or differentiation",
      "Might not showcase expertise prominently enough",
      "Risk of being too supportive without driving action"
    ],
    tacticalPrescription: {
      formatFocus: [
        "Mentorship and guidance content",
        "Empathetic problem-solving",
        "Community Q&A responses",
        "Wisdom-sharing stories"
      ],
      toneGuide: "Wise, supportive, empathetic with quiet authority",
      executionStrategy: "Respond to community needs, share wisdom through stories",
      repurposingPlay: "One guidance insight → Multiple application scenarios → Community discussions"
    },
    weeklyRhythm: [
      "1x Wisdom/lesson post (Monday)",
      "1x Community Q&A response (Wednesday)",
      "1x Supportive guidance piece (Friday)",
      "Daily encouraging micro-content"
    ]
  },
  "Creative Innovator": {
    name: "Creative Innovator",
    primary: "Creative",
    secondary: "Firestarter", 
    modifier: "Messenger",
    traitBlend: ["Creative Innovation", "Bold Expression", "Authentic Storytelling"],
    contentStrengths: [
      "Brings fresh, innovative perspectives to content",
      "Creates visually stunning and engaging material",
      "Challenges norms through creative expression",
      "Inspires through artistic and aesthetic approaches"
    ],
    blindSpots: [
      "May prioritize style over substance",
      "Could be too abstract for practical application",
      "Might lack consistent strategic direction",
      "Risk of being too avant-garde for mainstream audience"
    ],
    tacticalPrescription: {
      formatFocus: [
        "Creative process documentation",
        "Innovative approach showcases",
        "Aesthetic inspiration content",
        "Behind-the-scenes creative work"
      ],
      toneGuide: "Creative, inspiring, aesthetically driven with innovative edge",
      executionStrategy: "Follow creative inspiration, document process, maintain visual consistency",
      repurposingPlay: "One creative concept → Process breakdown → Inspiration series → Tutorial content"
    },
    weeklyRhythm: [
      "1x Creative process share (Monday)",
      "1x Innovation showcase (Wednesday)",
      "1x Aesthetic inspiration (Friday)",
      "Daily creative micro-content"
    ]
  },
  "Systematic Implementer": {
    name: "Systematic Implementer",
    primary: "Technician",
    secondary: "Architect",
    modifier: "Guide", 
    traitBlend: ["Detailed Implementation", "System Building", "Skill Development"],
    contentStrengths: [
      "Provides detailed, actionable implementation guidance",
      "Creates comprehensive skill-building content",
      "Delivers practical, results-focused material",
      "Builds systematic approaches to learning"
    ],
    blindSpots: [
      "May get too detailed for broader audiences",
      "Could lack emotional connection or inspiration",
      "Might overwhelm with technical complexity",
      "Risk of being too focused on tactics vs. strategy"
    ],
    tacticalPrescription: {
      formatFocus: [
        "Step-by-step tutorials",
        "Skill development series",
        "Tool and process reviews",
        "Implementation case studies"
      ],
      toneGuide: "Clear, practical, detailed but accessible",
      executionStrategy: "Systematic content planning, batch creation, template-driven",
      repurposingPlay: "One detailed process → Multiple skill tutorials → Quick tip series → Tool reviews"
    },
    weeklyRhythm: [
      "1x Detailed tutorial (Monday)",
      "1x Skill development piece (Wednesday)",
      "1x Tool/process review (Friday)",
      "Daily implementation tips"
    ]
  },
  "Relational Connector": {
    name: "Relational Connector",
    primary: "Companion",
    secondary: "Mirror",
    modifier: "Messenger",
    traitBlend: ["Community Building", "Empathetic Understanding", "Authentic Connection"],
    contentStrengths: [
      "Builds genuine, lasting relationships with audience",
      "Creates strong sense of community and belonging",
      "Provides consistent, reliable presence and support",
      "Facilitates meaningful connections between community members"
    ],
    blindSpots: [
      "May lack clear expertise positioning",
      "Could be too casual for professional contexts",
      "Might not drive enough business results",
      "Risk of being too relationship-focused without value delivery"
    ],
    tacticalPrescription: {
      formatFocus: [
        "Community conversation starters",
        "Relatable experience sharing",
        "Supportive check-ins",
        "Connection-building content"
      ],
      toneGuide: "Friendly, relatable, consistently supportive",
      executionStrategy: "Regular community engagement, consistent presence, relationship-first approach",
      repurposingPlay: "One conversation topic → Multiple community touchpoints → Relationship building → Support content"
    },
    weeklyRhythm: [
      "1x Community conversation starter (Monday)",
      "1x Relatable experience share (Wednesday)",
      "1x Supportive check-in (Friday)",
      "Daily community engagement"
    ]
  }
};

export function determinePersona(
  dominantArchetype: string,
  archetypeScores: Record<string, number>,
  traitScores: Record<string, number>
): PersonaProfile {
  // Get top 3 archetypes
  const sortedArchetypes = Object.entries(archetypeScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const [primary] = sortedArchetypes[0];
  const [secondary] = sortedArchetypes[1] || [primary, 0];
  const [modifier] = sortedArchetypes[2] || [secondary, 0];

  // Analyze trait patterns for more nuanced persona determination
  const structuralTraits = ['System Thinking', 'Strategic Preparation', 'Operational Thinking'];
  const expressiveTraits = ['Expressive Flow', 'Direct Expression', 'Emotional Expression'];
  const relationalTraits = ['Relational Insight', 'Empathy Mapping', 'Community Focus'];
  
  const structuralScore = structuralTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);
  const expressiveScore = expressiveTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);
  const relationalScore = relationalTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);

  // Determine persona based on archetype combination and trait patterns
  if ((primary === 'Architect' || primary === 'Strategist') && structuralScore > expressiveScore) {
    return contentPersonas["Strategic Architect"];
  }
  
  if ((primary === 'Firestarter' || primary === 'Instigator') && expressiveScore > structuralScore) {
    return contentPersonas["Authentic Challenger"];
  }
  
  if ((primary === 'Guide' || primary === 'Mirror') && relationalScore > expressiveScore) {
    return contentPersonas["Empathetic Guide"];
  }
  
  if (primary === 'Creative' && (secondary === 'Firestarter' || secondary === 'Messenger')) {
    return contentPersonas["Creative Innovator"];
  }
  
  if ((primary === 'Technician' || primary === 'Architect') && structuralScore > relationalScore) {
    return contentPersonas["Systematic Implementer"];
  }
  
  if ((primary === 'Companion' || primary === 'Mirror') && relationalScore > structuralScore) {
    return contentPersonas["Relational Connector"];
  }

  // Default fallback based on primary archetype and trait dominance
  if (structuralScore > expressiveScore && structuralScore > relationalScore) {
    return contentPersonas["Strategic Architect"];
  } else if (expressiveScore > relationalScore) {
    return contentPersonas["Authentic Challenger"];
  } else {
    return contentPersonas["Empathetic Guide"];
  }
}