// 30 deep assessment questions remapped from the Authority Accelerator's 8 archetypes to 4.
// Mapping: Strategic Planner + System Builder → Strategist
//          Methodical Expert + Visionary Leader → Educator
//          Authentic Connector + Strategic Influencer → Connector
//          Flow Creator + Spontaneous Storyteller → Creator

import type { TryArchetypeId, ArchetypeScores } from '../types/try';

interface DeepQuestionOption {
  label: string;
  weights: Partial<Record<TryArchetypeId, number>>;
}

export interface DeepQuestion {
  id: string;
  text: string;
  options: DeepQuestionOption[];
  section: string;
}

// Merge 8→4 archetype weights. Sum weights from paired archetypes.
function m(
  original: Record<string, number>
): Partial<Record<TryArchetypeId, number>> {
  const result: Partial<Record<TryArchetypeId, number>> = {};
  for (const [key, val] of Object.entries(original)) {
    let mapped: TryArchetypeId;
    switch (key) {
      case 'STRATEGIC_PLANNER':
      case 'SYSTEM_BUILDER':
        mapped = 'strategist';
        break;
      case 'METHODICAL_EXPERT':
      case 'VISIONARY_LEADER':
        mapped = 'educator';
        break;
      case 'AUTHENTIC_CONNECTOR':
      case 'STRATEGIC_INFLUENCER':
        mapped = 'connector';
        break;
      case 'FLOW_CREATOR':
      case 'SPONTANEOUS_STORYTELLER':
        mapped = 'creator';
        break;
      default:
        continue;
    }
    result[mapped] = (result[mapped] || 0) + val;
  }
  return result;
}

export const DEEP_QUESTIONS: DeepQuestion[] = [
  // Section 1: Communication Style (1-5) — Binary A/B
  {
    id: 'q1', text: 'When sharing ideas, you prefer to:',
    section: 'Communication Style',
    options: [
      { label: 'Think it through completely first', weights: m({ STRATEGIC_PLANNER: 2, METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 1 }) },
      { label: 'Talk it out as you think', weights: m({ SPONTANEOUS_STORYTELLER: 2, FLOW_CREATOR: 2, VISIONARY_LEADER: 1 }) },
    ],
  },
  {
    id: 'q2', text: 'In conversations, you tend to:',
    section: 'Communication Style',
    options: [
      { label: 'Listen more than you speak', weights: m({ AUTHENTIC_CONNECTOR: 2, METHODICAL_EXPERT: 2, STRATEGIC_PLANNER: 1 }) },
      { label: 'Share stories and experiences', weights: m({ SPONTANEOUS_STORYTELLER: 2, VISIONARY_LEADER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
  {
    id: 'q3', text: 'When explaining something, you naturally:',
    section: 'Communication Style',
    options: [
      { label: 'Use step-by-step logic', weights: m({ METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 2, STRATEGIC_PLANNER: 1 }) },
      { label: 'Paint the big picture first', weights: m({ VISIONARY_LEADER: 2, STRATEGIC_INFLUENCER: 2, SPONTANEOUS_STORYTELLER: 1 }) },
    ],
  },
  {
    id: 'q4', text: 'People come to you for:',
    section: 'Communication Style',
    options: [
      { label: 'Practical advice and solutions', weights: m({ METHODICAL_EXPERT: 2, AUTHENTIC_CONNECTOR: 2, STRATEGIC_PLANNER: 1 }) },
      { label: 'Inspiration and encouragement', weights: m({ VISIONARY_LEADER: 2, FLOW_CREATOR: 2, STRATEGIC_INFLUENCER: 1 }) },
    ],
  },
  {
    id: 'q5', text: 'When facing disagreement, you:',
    section: 'Communication Style',
    options: [
      { label: 'Present facts and evidence', weights: m({ STRATEGIC_INFLUENCER: 2, METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 1 }) },
      { label: 'Seek to understand their perspective', weights: m({ AUTHENTIC_CONNECTOR: 2, FLOW_CREATOR: 2, VISIONARY_LEADER: 1 }) },
    ],
  },

  // Section 2: Work Preferences (6-10) — Binary A/B
  {
    id: 'q6', text: 'You work best with:',
    section: 'Work Preferences',
    options: [
      { label: 'Clear structure and plans', weights: m({ SYSTEM_BUILDER: 2, STRATEGIC_PLANNER: 2, METHODICAL_EXPERT: 1 }) },
      { label: 'Flexibility and freedom', weights: m({ FLOW_CREATOR: 2, SPONTANEOUS_STORYTELLER: 2, AUTHENTIC_CONNECTOR: 1 }) },
    ],
  },
  {
    id: 'q7', text: 'Starting new projects, you prefer to:',
    section: 'Work Preferences',
    options: [
      { label: 'Plan thoroughly first', weights: m({ STRATEGIC_PLANNER: 2, METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 1 }) },
      { label: 'Learn by doing', weights: m({ SPONTANEOUS_STORYTELLER: 2, FLOW_CREATOR: 2, VISIONARY_LEADER: 1 }) },
    ],
  },
  {
    id: 'q8', text: 'Your ideal workspace is:',
    section: 'Work Preferences',
    options: [
      { label: 'Organised and systematic', weights: m({ SYSTEM_BUILDER: 2, METHODICAL_EXPERT: 2, STRATEGIC_PLANNER: 1 }) },
      { label: 'Creative and inspiring', weights: m({ FLOW_CREATOR: 2, VISIONARY_LEADER: 2, SPONTANEOUS_STORYTELLER: 1 }) },
    ],
  },
  {
    id: 'q9', text: 'Under pressure, you:',
    section: 'Work Preferences',
    options: [
      { label: 'Stay calm and systematic', weights: m({ METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 2, STRATEGIC_PLANNER: 1 }) },
      { label: 'Get energised and creative', weights: m({ FLOW_CREATOR: 2, SPONTANEOUS_STORYTELLER: 2, STRATEGIC_INFLUENCER: 1 }) },
    ],
  },
  {
    id: 'q10', text: 'You prefer tasks with:',
    section: 'Work Preferences',
    options: [
      { label: 'Clear expectations and metrics', weights: m({ METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 2, STRATEGIC_INFLUENCER: 1 }) },
      { label: 'Room for creativity and expression', weights: m({ FLOW_CREATOR: 2, VISIONARY_LEADER: 2, SPONTANEOUS_STORYTELLER: 1 }) },
    ],
  },

  // Section 3: Social Energy (11-15) — Binary A/B
  {
    id: 'q11', text: 'At social events, you prefer:',
    section: 'Social Energy',
    options: [
      { label: 'Deep conversations with few people', weights: m({ AUTHENTIC_CONNECTOR: 2, METHODICAL_EXPERT: 2, FLOW_CREATOR: 1 }) },
      { label: 'Meeting many different people', weights: m({ STRATEGIC_INFLUENCER: 2, VISIONARY_LEADER: 2, SPONTANEOUS_STORYTELLER: 1 }) },
    ],
  },
  {
    id: 'q12', text: 'When sharing experiences, you focus on:',
    section: 'Social Energy',
    options: [
      { label: 'The practical lessons learned', weights: m({ METHODICAL_EXPERT: 2, STRATEGIC_PLANNER: 2, AUTHENTIC_CONNECTOR: 1 }) },
      { label: 'The emotions and story', weights: m({ SPONTANEOUS_STORYTELLER: 2, VISIONARY_LEADER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
  {
    id: 'q13', text: 'People seek you out because you:',
    section: 'Social Energy',
    options: [
      { label: 'Listen and understand deeply', weights: m({ AUTHENTIC_CONNECTOR: 2, FLOW_CREATOR: 2, METHODICAL_EXPERT: 1 }) },
      { label: 'Inspire and motivate them', weights: m({ VISIONARY_LEADER: 2, STRATEGIC_INFLUENCER: 2, SPONTANEOUS_STORYTELLER: 1 }) },
    ],
  },
  {
    id: 'q14', text: 'In groups, you naturally:',
    section: 'Social Energy',
    options: [
      { label: 'Listen and ask thoughtful questions', weights: m({ AUTHENTIC_CONNECTOR: 2, METHODICAL_EXPERT: 2, FLOW_CREATOR: 1 }) },
      { label: 'Share ideas and rally the group', weights: m({ VISIONARY_LEADER: 2, STRATEGIC_INFLUENCER: 2, STRATEGIC_PLANNER: 1 }) },
    ],
  },
  {
    id: 'q15', text: 'When helping others, you prefer to:',
    section: 'Social Energy',
    options: [
      { label: 'Give practical tools and guidance', weights: m({ METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 2, STRATEGIC_PLANNER: 1 }) },
      { label: 'Help them discover their own path', weights: m({ AUTHENTIC_CONNECTOR: 2, VISIONARY_LEADER: 2, FLOW_CREATOR: 1 }) },
    ],
  },

  // Section 4: Decision Making (16-20) — Three options A/B/C
  {
    id: 'q16', text: 'When something big goes wrong with your content, you:',
    section: 'Decision Making',
    options: [
      { label: 'Research what worked for others and make a plan', weights: m({ STRATEGIC_PLANNER: 3, METHODICAL_EXPERT: 2 }) },
      { label: 'Get your team together to figure it out', weights: m({ SYSTEM_BUILDER: 3, VISIONARY_LEADER: 2 }) },
      { label: 'Trust your gut and fix it fast', weights: m({ STRATEGIC_INFLUENCER: 3, FLOW_CREATOR: 2, AUTHENTIC_CONNECTOR: 2, SPONTANEOUS_STORYTELLER: 2 }) },
    ],
  },
  {
    id: 'q17', text: 'If something goes wrong mid-shoot, you:',
    section: 'Decision Making',
    options: [
      { label: 'Step in and lead', weights: m({ STRATEGIC_INFLUENCER: 3, VISIONARY_LEADER: 2 }) },
      { label: 'Keep the vibe calm', weights: m({ AUTHENTIC_CONNECTOR: 3, FLOW_CREATOR: 2 }) },
      { label: 'Improvise and roll with it', weights: m({ SPONTANEOUS_STORYTELLER: 3, STRATEGIC_PLANNER: 2, SYSTEM_BUILDER: 2, METHODICAL_EXPERT: 2 }) },
    ],
  },
  {
    id: 'q18', text: 'When you get a big exciting idea that could change things, you think about:',
    section: 'Decision Making',
    options: [
      { label: 'What are the odds this actually works?', weights: m({ METHODICAL_EXPERT: 3, STRATEGIC_PLANNER: 2, STRATEGIC_INFLUENCER: 1 }) },
      { label: 'Does this fit where I\'m heading long-term?', weights: m({ VISIONARY_LEADER: 3, SYSTEM_BUILDER: 2, FLOW_CREATOR: 1 }) },
      { label: 'How will this affect my people?', weights: m({ AUTHENTIC_CONNECTOR: 3, SPONTANEOUS_STORYTELLER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
  {
    id: 'q19', text: 'When a friend comes to you with a problem, you usually:',
    section: 'Decision Making',
    options: [
      { label: 'Ask lots of questions to get to the real issue', weights: m({ AUTHENTIC_CONNECTOR: 3, METHODICAL_EXPERT: 2 }) },
      { label: 'Share something similar that happened to you', weights: m({ SPONTANEOUS_STORYTELLER: 3, FLOW_CREATOR: 2 }) },
      { label: 'Help them see the bigger picture', weights: m({ VISIONARY_LEADER: 3, STRATEGIC_PLANNER: 2, SYSTEM_BUILDER: 2, STRATEGIC_INFLUENCER: 2 }) },
    ],
  },
  {
    id: 'q20', text: 'When making big decisions, you:',
    section: 'Decision Making',
    options: [
      { label: 'Look at the data first, then see how it feels', weights: m({ STRATEGIC_PLANNER: 3, METHODICAL_EXPERT: 2, STRATEGIC_INFLUENCER: 1 }) },
      { label: 'Go with your gut, then check the facts', weights: m({ FLOW_CREATOR: 3, SPONTANEOUS_STORYTELLER: 2, VISIONARY_LEADER: 1 }) },
      { label: 'Think about both the business and the people equally', weights: m({ AUTHENTIC_CONNECTOR: 3, SYSTEM_BUILDER: 2, VISIONARY_LEADER: 1 }) },
    ],
  },

  // Section 5: Leadership Style (21-25) — Three options
  {
    id: 'q21', text: 'When launching something new, you focus on:',
    section: 'Leadership Style',
    options: [
      { label: 'Clear goals and tracking progress', weights: m({ STRATEGIC_INFLUENCER: 3, SYSTEM_BUILDER: 2, METHODICAL_EXPERT: 2 }) },
      { label: 'Getting everyone excited about the vision', weights: m({ VISIONARY_LEADER: 3, STRATEGIC_PLANNER: 2, FLOW_CREATOR: 2 }) },
      { label: 'Making sure everyone feels included', weights: m({ AUTHENTIC_CONNECTOR: 3, SPONTANEOUS_STORYTELLER: 2, FLOW_CREATOR: 2 }) },
    ],
  },
  {
    id: 'q22', text: 'People trust you because you:',
    section: 'Leadership Style',
    options: [
      { label: 'Always deliver and know your stuff', weights: m({ METHODICAL_EXPERT: 3, STRATEGIC_INFLUENCER: 2, SYSTEM_BUILDER: 2 }) },
      { label: 'Share real stories and admit when you mess up', weights: m({ AUTHENTIC_CONNECTOR: 3, SPONTANEOUS_STORYTELLER: 2, FLOW_CREATOR: 2 }) },
      { label: 'Come up with creative solutions nobody else thinks of', weights: m({ VISIONARY_LEADER: 3, FLOW_CREATOR: 2, STRATEGIC_PLANNER: 2 }) },
    ],
  },
  {
    id: 'q23', text: 'When team members clash, you:',
    section: 'Leadership Style',
    options: [
      { label: 'Set clear expectations about behaviour', weights: m({ STRATEGIC_INFLUENCER: 3, SYSTEM_BUILDER: 2, METHODICAL_EXPERT: 2 }) },
      { label: 'Help them talk it out and understand each other', weights: m({ AUTHENTIC_CONNECTOR: 3, FLOW_CREATOR: 2, SPONTANEOUS_STORYTELLER: 2 }) },
      { label: 'Refocus them on the bigger mission', weights: m({ VISIONARY_LEADER: 3, STRATEGIC_PLANNER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
  {
    id: 'q24', text: 'When trying to convince people, you:',
    section: 'Leadership Style',
    options: [
      { label: 'Show them the facts and data', weights: m({ STRATEGIC_INFLUENCER: 3, METHODICAL_EXPERT: 2, STRATEGIC_PLANNER: 2 }) },
      { label: 'Tell stories that help them relate', weights: m({ SPONTANEOUS_STORYTELLER: 3, AUTHENTIC_CONNECTOR: 2, VISIONARY_LEADER: 2 }) },
      { label: 'Ask questions and build the idea together', weights: m({ FLOW_CREATOR: 3, SYSTEM_BUILDER: 2, AUTHENTIC_CONNECTOR: 2 }) },
    ],
  },
  {
    id: 'q25', text: 'When helping someone grow, you:',
    section: 'Leadership Style',
    options: [
      { label: 'Give them clear steps and feedback', weights: m({ METHODICAL_EXPERT: 3, SYSTEM_BUILDER: 2, STRATEGIC_INFLUENCER: 2 }) },
      { label: 'Help them find their own strengths and voice', weights: m({ AUTHENTIC_CONNECTOR: 3, FLOW_CREATOR: 2, SPONTANEOUS_STORYTELLER: 2 }) },
      { label: 'Challenge them with new perspectives', weights: m({ VISIONARY_LEADER: 3, STRATEGIC_PLANNER: 2, FLOW_CREATOR: 1 }) },
    ],
  },

  // Section 6: Vision & Impact (26-30) — Three options
  {
    id: 'q26', text: 'Your dream impact would be:',
    section: 'Vision & Impact',
    options: [
      { label: 'Building systems that work for everyone', weights: m({ SYSTEM_BUILDER: 3, STRATEGIC_PLANNER: 2, METHODICAL_EXPERT: 2 }) },
      { label: 'Inspiring people to reach their potential', weights: m({ VISIONARY_LEADER: 3, AUTHENTIC_CONNECTOR: 2, FLOW_CREATOR: 2 }) },
      { label: 'Creating breakthrough ideas that change the game', weights: m({ STRATEGIC_INFLUENCER: 3, FLOW_CREATOR: 2, SPONTANEOUS_STORYTELLER: 2 }) },
    ],
  },
  {
    id: 'q27', text: 'What keeps you motivated long-term:',
    section: 'Vision & Impact',
    options: [
      { label: 'Hitting milestones and seeing real progress', weights: m({ STRATEGIC_PLANNER: 3, METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 2 }) },
      { label: 'The relationships and growth along the way', weights: m({ AUTHENTIC_CONNECTOR: 3, FLOW_CREATOR: 2, SPONTANEOUS_STORYTELLER: 2 }) },
      { label: 'Breaking through barriers and pioneering new stuff', weights: m({ VISIONARY_LEADER: 3, STRATEGIC_INFLUENCER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
  {
    id: 'q28', text: 'Your ideal legacy would be:',
    section: 'Vision & Impact',
    options: [
      { label: 'Systems that keep helping people long after you\'re gone', weights: m({ SYSTEM_BUILDER: 3, STRATEGIC_PLANNER: 2, METHODICAL_EXPERT: 2 }) },
      { label: 'People who found their authentic voice because of you', weights: m({ FLOW_CREATOR: 3, VISIONARY_LEADER: 2, AUTHENTIC_CONNECTOR: 2 }) },
      { label: 'Ideas that opened up new possibilities for everyone', weights: m({ STRATEGIC_INFLUENCER: 3, VISIONARY_LEADER: 2, SPONTANEOUS_STORYTELLER: 2 }) },
    ],
  },
  {
    id: 'q29', text: 'When learning new things, you\'re drawn to:',
    section: 'Vision & Impact',
    options: [
      { label: 'Proven frameworks you can master deeply', weights: m({ METHODICAL_EXPERT: 3, STRATEGIC_PLANNER: 2, SYSTEM_BUILDER: 2 }) },
      { label: 'Cutting-edge trends you can experiment with', weights: m({ FLOW_CREATOR: 3, VISIONARY_LEADER: 2, STRATEGIC_INFLUENCER: 2 }) },
      { label: 'Understanding people and what makes them tick', weights: m({ AUTHENTIC_CONNECTOR: 3, SPONTANEOUS_STORYTELLER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
  {
    id: 'q30', text: 'Your approach to growth is:',
    section: 'Vision & Impact',
    options: [
      { label: 'Step by step improvement with clear metrics', weights: m({ STRATEGIC_PLANNER: 3, METHODICAL_EXPERT: 2, SYSTEM_BUILDER: 2 }) },
      { label: 'Natural evolution that feels right', weights: m({ FLOW_CREATOR: 3, AUTHENTIC_CONNECTOR: 2, SPONTANEOUS_STORYTELLER: 2 }) },
      { label: 'Bold moves that create breakthrough moments', weights: m({ VISIONARY_LEADER: 3, STRATEGIC_INFLUENCER: 2, FLOW_CREATOR: 1 }) },
    ],
  },
];

export function calculateDeepArchetype(responses: Record<string, number>): {
  archetype: TryArchetypeId;
  scores: ArchetypeScores;
} {
  const scores: ArchetypeScores = {
    strategist: 0,
    educator: 0,
    connector: 0,
    creator: 0,
  };

  for (const question of DEEP_QUESTIONS) {
    const selectedIndex = responses[question.id];
    if (selectedIndex === undefined) continue;

    const option = question.options[selectedIndex];
    if (!option) continue;

    for (const [archetype, weight] of Object.entries(option.weights)) {
      scores[archetype as TryArchetypeId] += weight;
    }
  }

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const archetype = sorted[0][0] as TryArchetypeId;

  return { archetype, scores };
}
