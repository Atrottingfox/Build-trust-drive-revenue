export interface ArchetypeCTA {
  watch: string;
  download: string;
  apply: string;
}

export interface Archetype {
  title: string;
  subtitle: string;
  description: string;
  avatar: string;
  trustSignal: string;
  creationStyle: string;
  influenceStyle: string;
  bottleneck: string;
  contentGoal: string;
  growthEdge: string;
  contentFormats: string[];
  messagingFocus: string[];
  rhythmSystem: string[];
  teamSuggestion: string[];
  tags: string[];
  cta: ArchetypeCTA;
  closingStatement: string;
}