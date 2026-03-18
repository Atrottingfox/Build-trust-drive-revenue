// Content framework data extracted from the Authority Engine methodology.
// Duplicated client side to avoid extra API calls. Rarely changes.

export interface FrameworkStep {
  label: string;
  hint: string;
}

export interface FrameworkVariation {
  id: string;
  name: string;
  steps: FrameworkStep[];
}

export interface ContentType {
  id: string;
  name: string;
  purpose: string;
  color: { bg: string; text: string; border: string };
  variations: FrameworkVariation[];
}

export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'story',
    name: 'Story',
    purpose: 'Build connection through narrative and personal experience.',
    color: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
    variations: [
      {
        id: 'transformation',
        name: 'Transformation Story',
        steps: [
          { label: 'Old Self / Situation', hint: 'Where you were. Who you were.' },
          { label: 'Friction / Reaction', hint: 'What sucked. How you felt.' },
          { label: 'Realisation / Hidden Insight', hint: 'The "oh shit" moment.' },
          { label: 'New Self / New Lens', hint: 'How you see it now.' },
          { label: 'Invitation / Application', hint: 'What you now do differently.' },
        ],
      },
      {
        id: 'moment',
        name: 'Moment Story',
        steps: [
          { label: 'Moment / Disruption', hint: 'Specific incident. Pattern break.' },
          { label: 'Feeling / Meaning / Cost', hint: 'How it felt. Why it mattered.' },
          { label: 'Interpretation / Tension', hint: 'The question or confusion.' },
          { label: 'Reframe / Insight / Shift', hint: 'The new way you see it.' },
          { label: 'Takeaway / Closure', hint: 'The lesson. What the audience should change.' },
        ],
      },
      {
        id: 'curiosity',
        name: 'Curiosity',
        steps: [
          { label: 'Hook', hint: 'Context frame + aspirational goal + mistake that cost you.' },
          { label: 'Tease', hint: '"It was something I never saw coming."' },
          { label: 'Setup', hint: '"I thought I was doing everything right until..."' },
          { label: 'Mistake', hint: 'Where it all went wrong.' },
          { label: 'Lesson', hint: 'What you learned.' },
        ],
      },
      {
        id: 'vulnerability',
        name: 'Vulnerability',
        steps: [
          { label: 'Anchoring Frame', hint: '"I never thought I\'d share this, but..."' },
          { label: 'Building the Frame', hint: 'Describe the low moment.' },
          { label: 'Breaking Point', hint: 'When everything felt lost.' },
          { label: 'Change', hint: 'The breakthrough moment.' },
          { label: 'Lesson', hint: 'Relate to audience\'s struggle.' },
          { label: 'Empowerment', hint: '"You\'re not alone."' },
        ],
      },
      {
        id: 'familiarity',
        name: 'Familiarity',
        steps: [
          { label: 'Anchor', hint: '"Here\'s something that happened to me today..."' },
          { label: 'Relatable', hint: '"I was doing X when..."' },
          { label: 'Twist', hint: 'Something unexpected happened.' },
          { label: 'Lesson', hint: 'An important truth it reminded you of.' },
          { label: 'Takeaway', hint: 'Universal theme.' },
        ],
      },
      {
        id: 'empathy-bridge',
        name: 'Empathy Bridge',
        steps: [
          { label: 'Hook', hint: '"If you\'ve ever felt X, this is for you."' },
          { label: 'Mirror', hint: '"You\'re not alone. I\'ve been there."' },
          { label: 'Honesty', hint: '"I felt like..."' },
          { label: 'Turning Point', hint: 'The one thing that shifted everything.' },
          { label: 'Encouragement', hint: '"If I can move past this, so can you."' },
        ],
      },
    ],
  },
  {
    id: 'hot-take',
    name: 'Hot Take',
    purpose: 'Challenge conventional wisdom with bold perspectives.',
    color: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    variations: [
      {
        id: 'common-belief',
        name: 'Common Belief to Contradiction',
        steps: [
          { label: 'Common Belief', hint: 'What everyone thinks is true.' },
          { label: 'Contradiction', hint: 'Why that\'s wrong.' },
          { label: 'Explanation', hint: 'The real mechanism at play.' },
          { label: 'New Conclusion', hint: 'What to believe instead.' },
        ],
      },
      {
        id: 'accepted-rule',
        name: 'Accepted Rule to Better Rule',
        steps: [
          { label: 'Accepted Rule', hint: 'The conventional wisdom.' },
          { label: 'Why It Exists', hint: 'Why people believe it.' },
          { label: 'Why It Fails', hint: 'Where it breaks down.' },
          { label: 'Better Rule', hint: 'The superior alternative.' },
        ],
      },
      {
        id: 'pain-to-shift',
        name: 'Pain Point to Empowered Shift',
        steps: [
          { label: 'Pain Point', hint: 'The struggle they\'re experiencing.' },
          { label: 'Remove Self Blame', hint: 'Why it\'s not their fault.' },
          { label: 'Structural Cause', hint: 'The real systemic issue.' },
          { label: 'Empowered Shift', hint: 'How to take back control.' },
        ],
      },
      {
        id: 'belief-transformation',
        name: 'Belief Transformation',
        steps: [
          { label: 'Anchor', hint: '"Everything we\'re taught about X is a lie."' },
          { label: 'Tension', hint: 'State the widely accepted belief.' },
          { label: 'Personal Touch', hint: '"I thought X, and here\'s what it cost me."' },
          { label: 'Shift', hint: '"But here\'s the thing..." The new insight.' },
          { label: 'Practical Insight', hint: '"Here\'s what most people won\'t tell you."' },
        ],
      },
      {
        id: 'unexpected-truth',
        name: 'Unexpected Truth',
        steps: [
          { label: 'Hook', hint: '"The harder you do X, the worse it gets."' },
          { label: 'Misconception', hint: '"Most people think X."' },
          { label: 'Debunk', hint: '"But here\'s what\'s really happening."' },
          { label: 'Truth', hint: '"The truth is, Y."' },
          { label: 'Prove It', hint: '"Here\'s how I learned this the hard way."' },
        ],
      },
    ],
  },
  {
    id: 'breakdown',
    name: 'Breakdown',
    purpose: 'Reduce overwhelm through pattern recognition and education.',
    color: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    variations: [
      {
        id: 'hook-problem-steps',
        name: 'Hook to Problem to Steps to Reward',
        steps: [
          { label: 'Hook', hint: 'Grab attention with a compelling opening.' },
          { label: 'Problem', hint: 'What challenge are we addressing?' },
          { label: 'Steps', hint: 'The actionable steps to solve it.' },
          { label: 'Reward', hint: 'What they gain by following through.' },
        ],
      },
      {
        id: 'goal-bottleneck',
        name: 'Goal to Bottleneck to Lever',
        steps: [
          { label: 'Goal', hint: 'What are you trying to achieve?' },
          { label: 'Current Effort', hint: 'What are you currently doing?' },
          { label: 'Bottleneck', hint: 'What\'s slowing you down?' },
          { label: 'Lever', hint: 'The highest leverage change.' },
          { label: 'Reallocation', hint: 'Where effort should be redirected.' },
        ],
      },
      {
        id: 'belief-cost-truth',
        name: 'Belief to Cost to Truth',
        steps: [
          { label: 'Belief', hint: 'What do people commonly believe?' },
          { label: 'Cost', hint: 'What does this belief cost them?' },
          { label: 'Truth', hint: 'What\'s actually true?' },
          { label: 'Application', hint: 'What should they do instead?' },
        ],
      },
      {
        id: 'rapidfire',
        name: 'Rapidfire Authority',
        steps: [
          { label: 'Anchor', hint: '"Let me break X down for you in 60 seconds."' },
          { label: 'Context', hint: '"Here\'s why this is so important."' },
          { label: 'Step 1', hint: 'Quick, simple action step.' },
          { label: 'Step 2', hint: 'Build on it.' },
          { label: 'Step 3', hint: 'Most impactful point.' },
        ],
      },
      {
        id: 'micro-masterclass',
        name: 'Micro Masterclass',
        steps: [
          { label: 'Hook', hint: 'Context + interjection about a common mistake + snapback.' },
          { label: 'Point 1', hint: '"Most people think Y, but actually Z."' },
          { label: 'Point 2', hint: 'Relatable example with result.' },
          { label: 'Point 3', hint: 'Actionable insight they can implement today.' },
          { label: 'Summary', hint: '"These 3 tips alone can achieve X."' },
        ],
      },
    ],
  },
  {
    id: 'demonstration',
    name: 'Demonstration',
    purpose: 'Build trust through proof without claiming.',
    color: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    variations: [
      {
        id: 'hook-problem-demo',
        name: 'Hook to Problem to Steps/List/Story to Reward',
        steps: [
          { label: 'Hook', hint: 'Grab attention.' },
          { label: 'Problem', hint: 'What challenge are we addressing?' },
          { label: 'Steps / List / Story', hint: 'Show through demonstration.' },
          { label: 'Reward', hint: 'What they gain.' },
        ],
      },
      {
        id: 'constraint-ignore-do',
        name: 'Constraint to Ignore to Do',
        steps: [
          { label: 'Constraint', hint: 'What limitation are you working within?' },
          { label: 'Ignore', hint: 'What should they stop doing?' },
          { label: 'Do', hint: 'What should they do instead?' },
        ],
      },
      {
        id: 'looks-like-actually-is',
        name: 'Looks Like to Actually Is',
        steps: [
          { label: 'Looks Like', hint: 'What it appears to be on the surface.' },
          { label: 'Actually Is', hint: 'What it really is underneath.' },
          { label: 'Matters', hint: 'Why this distinction is important.' },
        ],
      },
      {
        id: 'credibility-builder',
        name: 'Credibility Builder',
        steps: [
          { label: 'Hook', hint: '"The number 1 mistake I see people make when X."' },
          { label: 'Validate', hint: '"If you\'re struggling with this, it\'s not your fault."' },
          { label: 'Credibility', hint: '"I\'ve worked with X, and here\'s what I\'ve learned."' },
          { label: 'Insight', hint: '"The real issue is..."' },
          { label: 'Step by Step Solution', hint: '"Here\'s exactly how we fixed it."' },
        ],
      },
    ],
  },
];

export const TRUST_LAYERS = [
  { id: 'competency', name: 'Competency', description: '"He gets it." Big truths + patterns.' },
  { id: 'identity', name: 'Identity', description: '"He\'s like me." Vulnerability + founder empathy.' },
  { id: 'relatability', name: 'Relatability', description: '"He sees me." Casual stories + real moments.' },
  { id: 'movement', name: 'Movement', description: '"I feel that." Emotional rants + urgency.' },
  { id: 'authority', name: 'Authority', description: '"He\'s the guide." Strategic frameworks + clarity.' },
];

export const HOOK_TYPES = [
  { name: 'Pattern Interrupt', formula: 'State something that breaks expectations.', example: '"The harder you work on content, the worse it performs."' },
  { name: 'Vulnerability', formula: 'Open with something personal and real.', example: '"I almost quit last Tuesday."' },
  { name: 'Curiosity Gap', formula: 'Tease information without revealing it.', example: '"There\'s one thing every 7 figure founder does that nobody talks about."' },
  { name: 'Direct Challenge', formula: 'Call out a behaviour or belief.', example: '"Stop posting tips. Nobody cares."' },
  { name: 'Specificity', formula: 'Use a specific number, date, or detail.', example: '"In 6 months, we added $5M in revenue from content alone."' },
];

export const VALUE_LENSES = [
  { name: 'Actionable', description: 'They can do something immediately.' },
  { name: 'Implementable', description: 'Step by step, they can follow along.' },
  { name: 'Educational', description: 'New perspective or knowledge.' },
  { name: 'Insightful', description: 'Breaks a belief or shifts thinking.' },
  { name: 'Aspirational', description: 'Shows what\'s possible.' },
];

export function getTypeByName(name: string): ContentType | undefined {
  return CONTENT_TYPES.find(t => t.name === name);
}

export function getVariationById(typeId: string, variationId: string): FrameworkVariation | undefined {
  const type = CONTENT_TYPES.find(t => t.id === typeId);
  return type?.variations.find(v => v.id === variationId);
}
