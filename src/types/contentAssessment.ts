export interface ContentArchetype {
  title: string;
  subtitle: string;
  description: string;
  avatar: string;
  psychologicalDrivers: string[];
  trustBuildingStyle: string;
  idealContentFormats: string[];
  pitfallsToAvoid: string[];
  tacticalStrategy: {
    contentTone: string;
    workflowStyle: string;
    coreBeliefs: string[];
    startHereMap: string[];
  };
  repurposingApproach: string;
  shortFormPrompts: string[];
  youtubeFormats: string[];
  contentRecommendations: ContentRecommendations;
}

export interface ContentQuestion {
  id: string;
  section: string;
  text: string;
  options: Array<{
    text: string;
    value: string;
    traits: Array<{
      name: string;
      score: number;
    }>;
    archetypes: Array<{
      name: string;
      score: number;
    }>;
    recommendation: string;
  }>;
}

export interface ContentAssessmentResponse {
  id: string;
  name: string;
  email: string;
  answers: Record<string, string>;
  traitScores: Record<string, number>;
  archetypeScores: Record<string, number>;
  dominantArchetype: string;
  created_at: string;
}

export interface PersonaProfile {
  name: string;
  primary: string;
  secondary: string;
  modifier: string;
  traitBlend: string[];
  contentStrengths: string[];
  blindSpots: string[];
  tacticalPrescription: {
    formatFocus: string[];
    toneGuide: string;
    executionStrategy: string;
    repurposingPlay: string;
  };
  weeklyRhythm: string[];
}

export interface ContentRecommendations {
  tone: string[];
  style: string[];
  formats: string[];
  positioning: string[];
}

export interface ContentFormat {
  id: number;
  name: string;
  type: string;
  trustTransferStyle: string;
  archetypeFit: string[];
  description: string;
  idealFor: string;
}