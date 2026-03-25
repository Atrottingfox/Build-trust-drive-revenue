// Types for the /try diagnostic lead magnet page

export type TryArchetypeId = 'strategist' | 'educator' | 'connector' | 'creator';

export type ProblemArea = 'clarity' | 'visibility' | 'authority' | 'qualification';

export type WhichA = 'attention' | 'alignment' | 'authorship' | 'achievability';

export type Platform = 'instagram' | 'youtube' | 'linkedin' | 'tiktok';

export type PostingFrequency = 'not_posting' | '1-2x' | '3-4x' | '5+';

export type TeamSize = '1' | '2-5' | '6-15' | '15-30' | '30+';

export type ContentRole = 'primary' | 'secondary' | 'supplementary';

export type Industry = 'coaching' | 'agency' | 'software' | 'professional_services' | 'other';

export type ArchetypeMethod = 'quiz_8' | 'quiz_30' | 'picked';

export type ContentTypeId = 'story' | 'hot-take' | 'breakdown' | 'demonstration' | 'teach' | 'distill' | 'apply';

export type PrimaryGoal = 'grow_audience' | 'build_authority' | 'generate_leads' | 'build_community';

export interface TryArchetype {
  id: TryArchetypeId;
  title: string;
  subtitle: string;
  description: string;
  preferredContentTypes: ContentTypeId[];
  strengthAreas: WhichA[];
  creationStyle: string;
}

export interface QuizQuestion {
  id: number;
  statement: string;
  agreeWeights: Partial<Record<TryArchetypeId, number>>;
  disagreeWeights: Partial<Record<TryArchetypeId, number>>;
}

export interface ArchetypeScores {
  strategist: number;
  educator: number;
  connector: number;
  creator: number;
}

export interface ContentPiece {
  weekNumber: number;
  dayOfWeek: string;
  platform: Platform;
  contentType: ContentTypeId;
  variationName: string;
  topic: string;
  angle: string;
  whichA: WhichA;
  outline: string[];
}

export interface CadenceWeek {
  weekNumber: number;
  whichA: WhichA;
  label: string;
  description: string;
  isFocusWeek: boolean;
  pieces: ContentPiece[];
}

export interface GeneratedCadence {
  weeks: CadenceWeek[];
  archetype: TryArchetypeId;
  problemArea: ProblemArea;
  totalPieces: number;
}

export interface TryFormState {
  // Screen 1: Archetype
  archetypeMethod: ArchetypeMethod | null;
  quizResponses: Record<number, boolean>; // questionId -> agree (true) / disagree (false)
  archetypeScores: ArchetypeScores | null;
  archetype: TryArchetypeId | null;

  // Screen 2: Industry
  industry: Industry | null;

  // Screen 3: Problem
  problemArea: ProblemArea | null;

  // Screen 4: Platforms
  platforms: Platform[];

  // Screen 5: Posting Frequency
  postingFrequency: PostingFrequency | null;

  // Screen 6: Phone
  phone: string;

  // Screen 7: Team Size
  teamSize: TeamSize | null;

  // Screen 8: Content Role
  contentRole: ContentRole | null;

  // Screen 9: Results
  generatedCadence: GeneratedCadence | null;
}

export const INITIAL_FORM_STATE: TryFormState = {
  archetypeMethod: null,
  quizResponses: {},
  archetypeScores: null,
  archetype: null,
  industry: null,
  problemArea: null,
  platforms: [],
  postingFrequency: null,
  phone: '',
  teamSize: null,
  contentRole: null,
  generatedCadence: null,
};
