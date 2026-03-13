import type { ContentFormat } from '../types/contentAssessment';

export const contentFormats: ContentFormat[] = [
  {
    id: 1,
    name: "Tactical Breakdown",
    type: "Short-Form",
    trustTransferStyle: "Clarity & Utility",
    archetypeFit: ["Architect", "Technician", "Strategist"],
    description: "Problem → Insight → CTA",
    idealFor: "Teaching frameworks quickly"
  },
  {
    id: 2,
    name: "Belief Breaker",
    type: "Short-Form", 
    trustTransferStyle: "Authority via Reframe",
    archetypeFit: ["Firestarter", "Messenger", "Instigator"],
    description: "Challenge a norm with conviction",
    idealFor: "Bold positioning"
  },
  {
    id: 3,
    name: "Founder Story Arc",
    type: "Long Form / Series",
    trustTransferStyle: "Connection via Journey", 
    archetypeFit: ["Mirror", "Messenger", "Companion"],
    description: "Origin → Struggle → Shift → Now",
    idealFor: "Emotional resonance"
  },
  {
    id: 4,
    name: "Framework Explainer",
    type: "Long Form Video",
    trustTransferStyle: "Clarity & Strategic Trust",
    archetypeFit: ["Architect", "Strategist"],
    description: "Diagram or whiteboard breakdown",
    idealFor: "Educational YouTube"
  },
  {
    id: 5,
    name: "Complete Riff",
    type: "Audio / Reel",
    trustTransferStyle: "Raw, Relational Trust",
    archetypeFit: ["Messenger", "Mirror", "Guide"],
    description: "Stream-of-consciousness share",
    idealFor: "Real-time relevance"
  },
  {
    id: 6,
    name: "Tactical Carousel",
    type: "Static / Slide",
    trustTransferStyle: "Utility & Step-by-Step",
    archetypeFit: ["Architect", "Technician", "Strategist"],
    description: "Visual SOP or how to in 5-7 panels",
    idealFor: "Clear process builders"
  },
  {
    id: 7,
    name: "Hot Take Reel",
    type: "Short-Form",
    trustTransferStyle: "Polarising Credibility",
    archetypeFit: ["Firestarter", "Instigator"],
    description: "Bold POV, emotion-driven rant",
    idealFor: "Trend surfing"
  },
  {
    id: 8,
    name: "Story Based Content",
    type: "Short / Long",
    trustTransferStyle: "Conceptual Clarity",
    archetypeFit: ["Creative", "Architect", "Mirror"],
    description: "Pull on stories to share via analogy or metaphor",
    idealFor: "Mental model mapping"
  },
  {
    id: 9,
    name: "Client Result Riff",
    type: "Static / Carousel / Video",
    trustTransferStyle: "Social Proof & Results",
    archetypeFit: ["Guide", "Strategist", "Technician"],
    description: "Highlight insights, not being the hero",
    idealFor: "Case study trust"
  },
  {
    id: 10,
    name: "Behind The Scenes",
    type: "Reel / Story",
    trustTransferStyle: "Relational Access",
    archetypeFit: ["Companion", "Creative", "Mirror"],
    description: "Show process, team, day-to-day",
    idealFor: "Humanizing brand"
  },
  {
    id: 11,
    name: "Earned Truth Video",
    type: "Video / Audio",
    trustTransferStyle: "Vulnerable Authority",
    archetypeFit: ["Mirror", "Guide", "Messenger"],
    description: "Share lesson from lived experience",
    idealFor: "Founder authenticity"
  },
  {
    id: 12,
    name: "Why I Refuse to... Piece",
    type: "Text or Video",
    trustTransferStyle: "Belief Based Trust",
    archetypeFit: ["Firestarter", "Instigator", "Strategist"],
    description: "Reveal what you reject",
    idealFor: "Stand positioning"
  },
  {
    id: 13,
    name: "Q&A Response Clip",
    type: "Short-Form",
    trustTransferStyle: "Empathy + Utility",
    archetypeFit: ["Guide", "Companion"],
    description: "Clip of answering a real question",
    idealFor: "Service & relevance"
  },
  {
    id: 14,
    name: "Signature Series",
    type: "Long-Form or Multi-Reel",
    trustTransferStyle: "Systematic Authority",
    archetypeFit: ["Architect", "Strategist", "Technician"],
    description: "Weekly or episodic system",
    idealFor: "Structured thinkers"
  },
  {
    id: 15,
    name: "Swipe Breakdown",
    type: "Carousel / Video",
    trustTransferStyle: "Insight + Utility",
    archetypeFit: ["Strategist", "Architect", "Guide"],
    description: "Deconstruct something that works",
    idealFor: "Smart brand positioning"
  },
  {
    id: 16,
    name: "1 Idea That Changed Everything",
    type: "Video / Text",
    trustTransferStyle: "Story + Insight",
    archetypeFit: ["Mirror", "Firestarter", "Messenger"],
    description: "Share a core realisation",
    idealFor: "Authority via evolution"
  },
  {
    id: 17,
    name: "Movement CTA Post",
    type: "Text / Story / Video",
    trustTransferStyle: "Identity Belonging",
    archetypeFit: ["Instigator", "Guide", "Firestarter"],
    description: "This is for people who... rally call",
    idealFor: "Culture-building"
  },
  {
    id: 18,
    name: "Objection Annihilator",
    type: "Carousel / Reel",
    trustTransferStyle: "Trust via Anticipation",
    archetypeFit: ["Strategist", "Architect", "Technician"],
    description: "Flip a client objection",
    idealFor: "Pre-framing sales"
  },
  {
    id: 19,
    name: "Visual Concept Reel",
    type: "Short-Form",
    trustTransferStyle: "Clarity + Creative",
    archetypeFit: ["Creative", "Architect"],
    description: "Turn a big idea into a visual hook",
    idealFor: "Explaining via motion"
  },
  {
    id: 20,
    name: "Long form idea dump",
    type: "Written / Video",
    trustTransferStyle: "Conceptual Authority",
    archetypeFit: ["Guide", "Messenger", "Mirror"],
    description: "Founder POV piece",
    idealFor: "Internal audience building"
  }
];

export function getRecommendedFormats(archetypes: string[]): ContentFormat[] {
  return contentFormats.filter(format => 
    format.archetypeFit.some(fit => archetypes.includes(fit))
  ).slice(0, 6);
}