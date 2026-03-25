import type { TryArchetype, QuizQuestion, TryArchetypeId, ArchetypeScores } from '../types/try';

export const TRY_ARCHETYPES: TryArchetype[] = [
  {
    id: 'strategist',
    title: 'The Strategist',
    subtitle: 'Plans + Systems',
    description: 'You think in frameworks. Your content works best when it breaks things down, shows the system, and gives people a clear path forward. You plan before you create.',
    preferredContentTypes: ['breakdown', 'teach', 'demonstration', 'distill'],
    strengthAreas: ['achievability', 'authorship'],
    creationStyle: 'Structured and planned. You batch, outline, and optimise.',
  },
  {
    id: 'educator',
    title: 'The Educator',
    subtitle: 'Deep Knowledge + Vision',
    description: 'You go deep. Your content works best when it teaches something others can\'t, distils complex patterns into clarity, and positions you as the one who\'s seen it all before.',
    preferredContentTypes: ['teach', 'distill', 'breakdown', 'apply'],
    strengthAreas: ['authorship', 'alignment'],
    creationStyle: 'Research and depth. You study, synthesise, and articulate.',
  },
  {
    id: 'connector',
    title: 'The Connector',
    subtitle: 'Relationships + Influence',
    description: 'You build trust through stories. Your content works best when it\'s personal, vulnerable, and makes people feel seen. You connect before you convert.',
    preferredContentTypes: ['story', 'apply', 'demonstration', 'hot-take'],
    strengthAreas: ['alignment', 'attention'],
    creationStyle: 'Conversational and reactive. You riff, respond, and relate.',
  },
  {
    id: 'creator',
    title: 'The Creator',
    subtitle: 'Intuition + Boldness',
    description: 'You create in the moment. Your content works best when it\'s raw, bold, and challenges what everyone else is saying. You trust your instincts and press record.',
    preferredContentTypes: ['hot-take', 'story', 'apply', 'demonstration'],
    strengthAreas: ['attention', 'achievability'],
    creationStyle: 'Spontaneous and instinctive. You feel it, film it, ship it.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: 'I plan my content before I create it.',
    agreeWeights: { strategist: 2, educator: 1 },
    disagreeWeights: { creator: 2, connector: 1 },
  },
  {
    id: 2,
    statement: "I'd rather teach something than tell a personal story.",
    agreeWeights: { educator: 2, strategist: 1 },
    disagreeWeights: { connector: 2, creator: 1 },
  },
  {
    id: 3,
    statement: 'I naturally see everything as a system that can be improved.',
    agreeWeights: { strategist: 2 },
    disagreeWeights: { connector: 2 },
  },
  {
    id: 4,
    statement: 'I prefer going deep on one topic over covering many.',
    agreeWeights: { educator: 2 },
    disagreeWeights: { creator: 2 },
  },
  {
    id: 5,
    statement: "My best ideas come when I'm not trying to create.",
    agreeWeights: { creator: 2, connector: 1 },
    disagreeWeights: { strategist: 2, educator: 1 },
  },
  {
    id: 6,
    statement: "I share what I've learned more than who I am.",
    agreeWeights: { educator: 2, strategist: 1 },
    disagreeWeights: { connector: 2, creator: 1 },
  },
  {
    id: 7,
    statement: 'Building a process excites me more than hosting a conversation.',
    agreeWeights: { strategist: 2 },
    disagreeWeights: { connector: 2 },
  },
  {
    id: 8,
    statement: "I'd rather press record than write a script.",
    agreeWeights: { creator: 2 },
    disagreeWeights: { educator: 2, strategist: 1 },
  },
];

export function calculateArchetype(responses: Record<number, boolean>): {
  archetype: TryArchetypeId;
  scores: ArchetypeScores;
} {
  const scores: ArchetypeScores = {
    strategist: 0,
    educator: 0,
    connector: 0,
    creator: 0,
  };

  for (const question of QUIZ_QUESTIONS) {
    const agreed = responses[question.id];
    if (agreed === undefined) continue;

    const weights = agreed ? question.agreeWeights : question.disagreeWeights;
    for (const [archetype, weight] of Object.entries(weights)) {
      scores[archetype as TryArchetypeId] += weight;
    }
  }

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const archetype = sorted[0][0] as TryArchetypeId;

  return { archetype, scores };
}

export function getArchetype(id: TryArchetypeId): TryArchetype {
  return TRY_ARCHETYPES.find(a => a.id === id)!;
}
