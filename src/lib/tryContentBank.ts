import type { TryArchetypeId, Industry, WhichA, ContentTypeId } from '../types/try';

export interface TopicAngle {
  topic: string;
  angle: string;
  contentType: ContentTypeId;
  variationName: string;
  outline: string[];
}

type ContentBank = Record<TryArchetypeId, Record<Industry, Record<WhichA, TopicAngle[]>>>;

// ─── Outline Templates ───────────────────────────────────────────────

const OUTLINES: Record<string, string[]> = {
  // Short-form
  'story:transformation': ['Where you were', 'What created friction', 'The realisation', 'What you do now', 'The invitation'],
  'story:moment': ['The moment', 'How it felt', 'The question', 'The reframe', 'The takeaway'],
  'hot-take:common-belief': ['State the common belief', "Why that's wrong", 'The real mechanism', 'What to believe instead'],
  'hot-take:accepted-rule': ['The conventional wisdom', 'Why people believe it', 'Where it breaks down', 'The better rule'],
  'hot-take:pain-to-shift': ['The struggle', 'Remove self blame', 'The structural cause', 'How to take back control'],
  'breakdown:hook-problem-steps': ['Hook', 'The problem', 'The steps', 'The reward'],
  'breakdown:goal-bottleneck': ['The goal', 'Current effort', 'The bottleneck', 'The lever', 'Where to redirect'],
  'breakdown:belief-cost-truth': ['The belief', 'What it costs', 'The truth', 'What to do instead'],
  'demonstration:hook-problem-demo': ['Hook', 'The problem', 'Show through proof', 'The reward'],
  'demonstration:constraint-ignore-do': ['The constraint', 'What to stop', 'What to do instead'],
  'demonstration:looks-like-actually-is': ['What it looks like', 'What it actually is', 'Why it matters'],
  // Long-form
  'teach:standard': ['Introduce concept', 'Signal experience', 'Authority anchor', 'Learning outcome', 'Teaching map', 'Pattern 1', 'Why it matters', 'What to do', 'Pattern 2', 'Why it matters', 'What to do', 'Pattern 3', 'Why it matters', 'What to do'],
  'distill:standard': ['Introduce concept', 'Signal experience', 'Authority anchor', 'Learning outcome', 'Teaching map', 'Pattern 1', 'Why it matters', 'What to do', 'Pattern 2', 'Why it matters', 'What to do', 'Pattern 3', 'Why it matters', 'What to do'],
  'apply:standard': ['Introduce what you\'re analysing', 'Your proof', 'What they\'ll see', 'What you\'ll do', 'Observation 1', 'Decision 1', 'Reasoning 1', 'Implication 1', 'Observation 2', 'Decision 2', 'Reasoning 2', 'Implication 2', 'Observation 3', 'Decision 3', 'Reasoning 3', 'Implication 3'],
};

function o(key: string): string[] {
  return [...OUTLINES[key]];
}

// ─── The Content Bank ────────────────────────────────────────────────

export const CONTENT_BANK: ContentBank = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STRATEGIST
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  strategist: {
    // ── Coaching ──────────────────────────────────────────────────────
    coaching: {
      attention: [
        {
          topic: 'Why most coaches sound identical online',
          angle: 'The market is flooded with the same "I help X achieve Y" positioning. Break down why it fails and what pattern interrupts actually look like.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
        {
          topic: 'The coaching industry has a messaging crisis',
          angle: 'Everyone is saying the same thing. Show three examples of generic coach content vs content that actually stops the scroll.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
        {
          topic: 'The first 3 seconds decide everything',
          angle: 'Diagnose why coaching content gets scrolled past. The hook is not your intro. It is your argument compressed into one line.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      alignment: [
        {
          topic: 'Your methodology is your moat',
          angle: 'Coaches who name their process attract believers. Coaches who describe outcomes attract price shoppers. Show how to signal philosophy through content.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
        {
          topic: 'Stop selling coaching. Start selling the system.',
          angle: 'The audience does not want more calls. They want speed and certainty. Reframe what you are actually selling.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'Belief before tactics in every piece of content',
          angle: 'Most coaching content jumps to "here is how." The audience has not bought into "why this matters" yet. Map the belief sequence.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      authorship: [
        {
          topic: 'Break down a real client transformation',
          angle: 'Walk through before, during, and after. Not the testimonial version. The diagnostic version. What you saw, what you changed, why it worked.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'Three patterns you see in every stuck coaching client',
          angle: 'Demonstrate expertise by naming the invisible patterns. Diagnostic selling. Show the audience you see what they cannot.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'The framework behind your best client results',
          angle: 'Reveal the structure. Not the whole process. Enough to prove you have a repeatable system, not a personality dependent service.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      achievability: [
        {
          topic: 'The 30 minute weekly content system for coaches',
          angle: 'Give the exact steps. Capture, structure, post. No editing team required. Show the constraint based system that actually gets content out the door.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'How to turn one coaching call into five pieces of content',
          angle: 'The waterfall method. Record, extract, repurpose. Walk through the exact process.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Build your content bank in one afternoon',
          angle: 'Audit every question your clients ask. Every objection. Every transformation story. That is your content library. Here is the system.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
      ],
    },
    // ── Agency ──────────────────────────────────────────────────────
    agency: {
      attention: [
        {
          topic: 'Why your agency looks like every other agency online',
          angle: 'Same portfolio layout, same "we deliver results" headline. Break down the pattern and show what differentiation actually looks like in agency content.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
        {
          topic: 'The death of the agency pitch deck',
          angle: 'Prospects do not read decks anymore. They watch your content and decide before the call. Show what replaces the pitch.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
        {
          topic: 'How to position your agency as the only option',
          angle: 'Category design for agencies. Name your method, own the frame, make comparison irrelevant.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      alignment: [
        {
          topic: 'Stop competing on deliverables. Compete on diagnosis.',
          angle: 'Agencies that list services get compared on price. Agencies that diagnose problems get hired on trust. Show the shift.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
        {
          topic: 'Why most agencies attract the wrong clients',
          angle: 'Your content is attracting people who want cheap execution. Reframe your messaging to attract people who want strategic partnership.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'The founder led content advantage for agencies',
          angle: 'Clients buy the person behind the agency. Map the belief sequence that turns a founder into a trusted advisor through content.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      authorship: [
        {
          topic: 'Tear down a real client campaign',
          angle: 'Walk through the strategy, execution, and results. Show your thinking, not just the outcome. Demonstrate decision making.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'Three red flags you see in every underperforming account',
          angle: 'Use diagnostic content to demonstrate pattern recognition. Name what others miss. Build authority through specificity.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'The system behind your agency results',
          angle: 'Show the repeatable process, not the one off win. Frameworks beat case studies for building trust at scale.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      achievability: [
        {
          topic: 'The weekly content rhythm for agency founders',
          angle: 'You do not have time to create daily. Here is the system that gets you 3 high quality pieces per week from work you are already doing.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn every client kickoff into a content asset',
          angle: 'The questions you ask in discovery calls are gold. Here is how to repurpose them into authority content without revealing client details.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Build a retainer proposal that sells itself',
          angle: 'Use content to pre sell the retainer. By the time they see the proposal, belief is already built. Walk through the content to proposal pipeline.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
      ],
    },
    // ── Software ──────────────────────────────────────────────────────
    software: {
      attention: [
        {
          topic: 'Why nobody cares about your feature launch',
          angle: 'Features do not stop the scroll. Problems do. Break down how to reframe product updates as market insights.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
        {
          topic: 'The SaaS content trap',
          angle: 'Your content sounds like documentation. Show the difference between product content and thought leadership that drives demand.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
        {
          topic: 'How founder led content drives SaaS growth',
          angle: 'The best SaaS companies have a face. Map the content strategy that turns a technical founder into a category voice.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      alignment: [
        {
          topic: 'Your product is not your positioning',
          angle: 'The market does not buy features. It buys a worldview. Show how to build content that aligns people with your philosophy before they ever see the product.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
        {
          topic: 'Stop educating the market. Start filtering it.',
          angle: 'Most SaaS content tries to explain the category. The better play is to repel the wrong users and magnetise the right ones.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'The belief stack behind every successful SaaS brand',
          angle: 'Map the five beliefs your ideal user needs to hold before they will ever consider switching. Then build content for each one.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      authorship: [
        {
          topic: 'Tear down a competitor feature and show your thinking',
          angle: 'Not to trash them. To demonstrate how you think about the problem differently. Authority through contrast.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'Three metrics most SaaS founders track wrong',
          angle: 'Demonstrate expertise by challenging conventional wisdom on growth metrics. Name the pattern. Show the better frame.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'The decision framework behind your product roadmap',
          angle: 'Show the system. How you decide what to build. This builds trust in your judgment, which is what enterprise buyers actually purchase.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      achievability: [
        {
          topic: 'The content system for technical founders who hate creating',
          angle: 'You are already writing Slack messages, internal docs, and feature specs. Here is how to turn those into published content in 20 minutes.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn your changelog into a content engine',
          angle: 'Every update is a story about a problem you solved. Walk through the extraction process that turns shipping into thought leadership.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Build a 90 day thought leadership calendar from your roadmap',
          angle: 'Align content themes with product milestones. Every launch has a content warmup, a demo, and a lesson. Here is the system.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
      ],
    },
    // ── Professional Services ────────────────────────────────────────
    professional_services: {
      attention: [
        {
          topic: 'Why being the best kept secret in your industry is killing your pipeline',
          angle: 'Referrals are not a growth strategy. They are a survival strategy. Break down what visibility actually looks like for professional services.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
        {
          topic: 'The invisible expert problem',
          angle: 'You have 20 years of expertise and 200 followers. Show the disconnect between competence and visibility and how to close it.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
        {
          topic: 'How to create content that earns trust from senior decision makers',
          angle: 'Your audience is not scrolling for entertainment. They are scanning for competence signals. Map the content types that earn executive attention.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      alignment: [
        {
          topic: 'Your credentials are not your positioning',
          angle: 'Every firm in your space has similar qualifications. The differentiator is your philosophy on how the work should be done. Show how to surface that.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
        {
          topic: 'Stop posting insights. Start posting convictions.',
          angle: 'Professional services content is polite and forgettable. The firms that grow have a point of view. Show the difference.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How to build a belief system around your expertise',
          angle: 'Map the five beliefs your ideal client needs before they will hire you. Then build content that installs each one.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      authorship: [
        {
          topic: 'Diagnose a common industry problem live',
          angle: 'Take a real scenario (anonymised) and walk through your diagnostic process. Show how you think, not just what you know.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'Three mistakes companies make when hiring in your space',
          angle: 'Diagnostic selling at its best. Name the patterns. Show the cost. Position yourself as the one who sees what others miss.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'The framework behind your advisory process',
          angle: 'Reveal the structure. Not the full methodology. Enough to prove there is a system behind your expertise.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      achievability: [
        {
          topic: 'The weekly LinkedIn system for busy professionals',
          angle: 'Two posts a week. One insight, one story. Here is exactly how to pull them from work you are already doing.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn client conversations into authority content',
          angle: 'Every advisory session contains a content goldmine. Here is the extraction system that turns expertise into published thinking.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Build a referral engine through content',
          angle: 'When your content does the credentialing, referrals convert faster. Map the system that turns content into warm introductions.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
      ],
    },
    // ── Other ────────────────────────────────────────────────────────
    other: {
      attention: [
        {
          topic: 'Why your content sounds like everyone else in your space',
          angle: 'Generic positioning creates invisible content. Break down the three things that actually make someone stop scrolling.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
        {
          topic: 'The attention crisis nobody talks about',
          angle: 'It is not that people do not have attention spans. It is that your content does not earn the first three seconds. Show the real problem.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
        {
          topic: 'How to build a pattern interrupt library',
          angle: 'Map the hooks that work in your space. Study what stops the scroll. Build a bank you can pull from every week.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      alignment: [
        {
          topic: 'Your audience does not need more tips',
          angle: 'They need to believe something different. Content that shifts belief outperforms content that shares tactics every single time.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
        {
          topic: 'Stop trying to appeal to everyone',
          angle: 'The fastest way to grow is to repel the wrong people loudly. Show how polarisation builds a real audience.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'Build a belief sequence for your content',
          angle: 'Map what your audience needs to believe before they will buy. Then create content for each belief in order.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
      ],
      authorship: [
        {
          topic: 'Show your process, not just your results',
          angle: 'Demonstrate expertise by revealing how you think. Walk through a real decision and show the reasoning behind it.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'Three patterns you see that your audience cannot',
          angle: 'Name the invisible patterns in your space. This is diagnostic selling. It builds authority faster than any tip thread.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Name your framework and own the conversation',
          angle: 'When you name your process, you create a category of one. Show how to extract and name the system already inside your expertise.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      achievability: [
        {
          topic: 'The minimum viable content system',
          angle: 'You do not need to post daily. You need to post consistently with a system. Here is the simplest version that works.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Capture then create. The content production system.',
          angle: 'Stop staring at blank screens. Build a capture habit. Then assemble content from what you have already said. Walk through the full system.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The one afternoon content sprint',
          angle: 'Batch your creation. Here is the exact system for producing a week of content in one focused session.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
      ],
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EDUCATOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  educator: {
    // ── Coaching ──────────────────────────────────────────────────────
    coaching: {
      attention: [
        {
          topic: 'The coaching model that is quietly replacing 1 on 1',
          angle: 'Teach the shift from selling time to selling a system. Use the paradox to hook. Everybody thinks 1 on 1 is premium. It is a trap.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Why your free content is better than most paid courses',
          angle: 'Show how giving away the "what" actually drives demand for the "how." Education as a growth engine.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Stop teaching frameworks. Start teaching decisions.',
          angle: 'Break down why "educational" content fails to convert and what to teach instead. Decisions build trust. Frameworks build comparison.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      alignment: [
        {
          topic: 'Education without inspiration is not at all impactful',
          angle: 'Most coaches teach tactics and wonder why nobody implements. Map the sequence. Belief, then capability, then action.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The difference between a teacher and a thought leader',
          angle: 'Teachers share information. Thought leaders install beliefs. Show how to make the shift in your content.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Your philosophy is more valuable than your process',
          angle: 'Coaches who lead with philosophy attract committed clients. Coaches who lead with process attract tyre kickers. Show the content shift.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
      ],
      authorship: [
        {
          topic: 'Teach one concept from three different angles',
          angle: 'Demonstrate depth of expertise by teaching the same idea at beginner, intermediate, and advanced levels. This is how you prove mastery.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Apply your framework to a public example',
          angle: 'Take a well known case study and run your methodology against it. Show the audience your thinking in real time.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'The three coaching patterns nobody talks about',
          angle: 'Distill patterns from hundreds of client conversations. Name them. This kind of specificity builds instant credibility.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
      ],
      achievability: [
        {
          topic: 'How to structure a coaching module that people actually complete',
          angle: 'Walk through the exact architecture. Short, sequential, outcome driven. Not a content dump. A guided experience.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The "teach in public" system for coaches',
          angle: 'Post the lesson. Get feedback. Refine. Now you have battle tested curriculum and content at the same time.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn your intellectual property into a content calendar',
          angle: 'Map your frameworks, principles, and stories. Each one is a week of content. Here is the extraction process.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
      ],
    },
    // ── Agency ──────────────────────────────────────────────────────
    agency: {
      attention: [
        {
          topic: 'What agencies get wrong about thought leadership content',
          angle: 'Most agency content is a thinly veiled sales pitch. Teach the difference between education that builds trust and content that repels.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The real reason agencies struggle to create content consistently',
          angle: 'It is not time. It is that every piece feels like it needs to be a case study. Distill the simpler approach that actually works.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'How to teach your way to inbound leads',
          angle: 'Education based marketing for agencies. Break down why giving away your methodology actually builds a pipeline.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      alignment: [
        {
          topic: 'Why "results focused" is not a positioning strategy',
          angle: 'Every agency claims results. The ones that win teach a different way of thinking about the problem. Show how to build that into content.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The agency that teaches wins the client',
          angle: 'When you educate your prospect before the call, they arrive pre sold. Map the belief sequence for agency content.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Stop hiding your methodology behind NDAs',
          angle: 'The more you share your process, the more people trust it. Show how transparency in agency content builds alignment.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
      ],
      authorship: [
        {
          topic: 'Teach the principles behind a successful campaign',
          angle: 'Do not just show the results. Teach the thinking. Walk through the decisions you made and why each one mattered.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Apply your agency framework to a public brand',
          angle: 'Analyse a well known brand through your lens. Show the audience what you would change and why. Authority through application.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Distill the three principles that drive all your best work',
          angle: 'Compress hundreds of campaigns into three core truths. This kind of pattern recognition is impossible to fake.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
      ],
      achievability: [
        {
          topic: 'The client education system that reduces scope creep',
          angle: 'Teach clients what good looks like before you start. Walk through the exact onboarding content that sets expectations.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'How to build a content library from work you have already done',
          angle: 'Every project contains lessons. Here is the system for extracting publishable insights from completed client work.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn your proposal process into a content funnel',
          angle: 'Map each stage of your sales process. Show what content supports each stage. Walk through a real example.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
      ],
    },
    // ── Software ──────────────────────────────────────────────────────
    software: {
      attention: [
        {
          topic: 'Why developer docs are your best marketing channel',
          angle: 'Teach the counterintuitive truth. The companies that invest in education outgrow the ones that invest in ads. Show the data.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The SaaS founder who teaches beats the one who sells',
          angle: 'Distill the pattern across successful SaaS brands. Education drives trust. Trust drives adoption. Adoption drives growth.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Stop marketing features. Start teaching the problem.',
          angle: 'Break down why problem focused education converts better than product focused content for software companies.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      alignment: [
        {
          topic: 'Your product philosophy is your content strategy',
          angle: 'The beliefs behind your product decisions are your most powerful content. Teach people to see the world the way you see it.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Build a category by teaching a new way of thinking',
          angle: 'The best SaaS companies do not sell a product. They sell a worldview. Distill how to build content that changes how your market thinks.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Why "easy to use" is the worst positioning for software',
          angle: 'Everyone claims ease of use. The companies that win teach a philosophy about how work should be done. Show the belief shift.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
      ],
      authorship: [
        {
          topic: 'Teach the architecture decisions behind your product',
          angle: 'Show the reasoning. Not the features. When founders understand your decisions, they trust your product.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Apply your framework to a competitor workflow',
          angle: 'Show how your way of thinking produces different outcomes. Not a trash talk. A teaching moment.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'The three patterns killing SaaS content',
          angle: 'Distill what you have observed across the industry. Name the patterns. Prove you see what others cannot.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
      ],
      achievability: [
        {
          topic: 'The technical founder content system',
          angle: 'You already think in systems. Here is how to turn that into a content machine. Walk through the exact weekly process.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'How to build a content flywheel from your support tickets',
          angle: 'Every question a user asks is content waiting to be published. Here is the system for turning support into thought leadership.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn your product updates into educational content',
          angle: 'Map each feature release to the problem it solves. Then teach the problem, not the feature. Walk through real examples.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
      ],
    },
    // ── Professional Services ────────────────────────────────────────
    professional_services: {
      attention: [
        {
          topic: 'Why the smartest professionals are invisible online',
          angle: 'Expertise does not equal visibility. Teach the gap between knowing and being known. Show what bridges it.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The thought leadership trap in professional services',
          angle: 'Most firms publish white papers nobody reads. Distill what actually earns attention from high value prospects.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'How to turn industry knowledge into scroll stopping content',
          angle: 'Your expertise is not boring. Your packaging is. Break down the translation layer between knowledge and attention.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      alignment: [
        {
          topic: 'Credentials do not create trust. Conviction does.',
          angle: 'In professional services, everyone has the qualifications. Teach how to use content to show your point of view, not your CV.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'How to position yourself as the trusted advisor through content',
          angle: 'The advisor who teaches earns the relationship before the engagement starts. Distill the belief sequence for B2B trust building.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'Your methodology is your marketing',
          angle: 'When you share your approach, you attract people who resonate with it. Show how philosophical alignment drives client quality.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
      ],
      authorship: [
        {
          topic: 'Teach the diagnostic process behind your expertise',
          angle: 'Walk through how you assess a situation. The thinking is more impressive than the answer. Show the framework.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Apply your advisory lens to a public business scenario',
          angle: 'Analyse a real situation through your expertise. Show the audience what you would do and why. Demonstrate thinking depth.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Three principles that separate great advisory from good advisory',
          angle: 'Distill the difference. Name the patterns. The specificity of your observations proves the depth of your experience.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
      ],
      achievability: [
        {
          topic: 'The 2 post per week system for busy professionals',
          angle: 'One insight from client work. One philosophical position. That is it. Walk through the exact process to make it sustainable.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'How to extract content from every client engagement',
          angle: 'You are already doing the thinking. Here is how to capture it and turn it into published authority. Without extra time.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Build a speaking pipeline through content',
          angle: 'Your content is your audition tape. Map the system that turns LinkedIn posts into speaking invitations and referral conversations.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
      ],
    },
    // ── Other ────────────────────────────────────────────────────────
    other: {
      attention: [
        {
          topic: 'Why expertise alone does not earn attention',
          angle: 'Being great at what you do is table stakes. Teach the translation layer that turns expertise into content that stops the scroll.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'The attention problem is not what you think it is',
          angle: 'People have attention. They just do not have patience for content that does not earn it in the first three seconds. Distill the real issue.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'How to build hooks that reflect your actual expertise',
          angle: 'Stop using generic hooks. Break down how to create pattern interrupts that are native to your knowledge and experience.',
          contentType: 'breakdown',
          variationName: 'hook-problem-steps',
          outline: o('breakdown:hook-problem-steps'),
        },
      ],
      alignment: [
        {
          topic: 'Content does not sell. It dissolves resistance.',
          angle: 'Teach the reframe. Most people use content to push. The better approach is to use it to remove objections before they form.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Belief shifting content outperforms educational content every time',
          angle: 'Distill why. When someone changes what they believe, they change what they buy. Map the mechanism.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
        {
          topic: 'How to find your contrarian angle',
          angle: 'Every expert has a belief that goes against the mainstream. Finding it and building content around it is the fastest path to alignment.',
          contentType: 'breakdown',
          variationName: 'belief-cost-truth',
          outline: o('breakdown:belief-cost-truth'),
        },
      ],
      authorship: [
        {
          topic: 'Demonstrate your expertise by teaching your thinking',
          angle: 'Walk through a real decision or diagnosis. Show the reasoning. This is the fastest way to build authority.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Apply your framework to a real world example',
          angle: 'Take something public and run your methodology against it. The audience watches you think and trusts you more.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Distill the core patterns in your field',
          angle: 'Name three patterns that repeat across your experience. This kind of compression is impossible to fake. It proves mastery.',
          contentType: 'distill',
          variationName: 'standard',
          outline: o('distill:standard'),
        },
      ],
      achievability: [
        {
          topic: 'The simplest content system that builds authority',
          angle: 'One insight. One story. One framework. Per week. Walk through exactly how to pull each from work you already do.',
          contentType: 'teach',
          variationName: 'standard',
          outline: o('teach:standard'),
        },
        {
          topic: 'Capture then create. Stop starting from scratch.',
          angle: 'Build a capture system. Then assemble content from what you have already thought and said. The bottleneck is extraction, not ideation.',
          contentType: 'breakdown',
          variationName: 'goal-bottleneck',
          outline: o('breakdown:goal-bottleneck'),
        },
        {
          topic: 'Turn your IP into a content calendar',
          angle: 'Map every framework, story, and principle you own. Each one is a pillar. Walk through the process of building 90 days of content from what you already know.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
      ],
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONNECTOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  connector: {
    // ── Coaching ──────────────────────────────────────────────────────
    coaching: {
      attention: [
        {
          topic: 'The conversation that changed how I coach',
          angle: 'Share the real moment a client said something that rewired your approach. Vulnerability hooks harder than tactics.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'Why the best coaches I know stopped posting tips',
          angle: 'The shift from information to identity. Take the accepted rule (post tips to grow) and break it.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
        {
          topic: 'What my worst client taught me about my best content',
          angle: 'Connect through a story of failure. The misalignment that revealed what your content should actually do.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
      alignment: [
        {
          topic: 'I stopped trying to be the expert. Here is what happened.',
          angle: 'The shift from proving to connecting. Share the story and the philosophy behind it. Alignment through vulnerability.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'Coaching is not advice. It is creating conditions for change.',
          angle: 'Challenge the common belief that coaches are advisors. Reframe it. This is how you attract aligned clients.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'Why I only work with people who challenge me',
          angle: 'Share your ICP through a story. Not through a checklist. Show who you are for through who you choose.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      authorship: [
        {
          topic: 'How one client went from invisible to unavoidable',
          angle: 'Tell the full story. Not the testimonial version. The real version with the messy middle.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'What I actually do in a coaching session',
          angle: 'Show the process live (or recreated). Demystify the black box. Connection through transparency.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The pattern I see in every coach who is stuck at the same revenue',
          angle: 'Use a hot take to demonstrate authority. Name the pattern nobody is willing to name.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      achievability: [
        {
          topic: 'The DM strategy that fills my coaching practice',
          angle: 'Show the exact approach. Not sleazy outreach. Genuine connection that leads to enrolment. Walk through a real example.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How I build content from conversations, not from a calendar',
          angle: 'The connector approach to content. Talk to people. Capture what comes up. Publish the insight. Show the system.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'The three questions I ask every new client that generate a month of content',
          angle: 'Share the questions. Show what they reveal. Give the audience something they can use today.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
    },
    // ── Agency ──────────────────────────────────────────────────────
    agency: {
      attention: [
        {
          topic: 'The client call that made me rethink everything about agency growth',
          angle: 'A story about a pivotal moment. Share the real interaction that changed your approach to business development.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'Why cold outreach is dead for agencies',
          angle: 'Take the hot take. The agencies winning right now are building relationships in public, not sending cold emails.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
        {
          topic: 'What happened when I started sharing our failures publicly',
          angle: 'Vulnerability in agency world. Share the story of posting a failure and what it did for trust and inbound.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
      alignment: [
        {
          topic: 'I fired our best paying client. Here is why.',
          angle: 'Values alignment over revenue. Share the story that shows what you stand for. This content self selects the right clients.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'Agencies do not have a lead problem. They have a trust problem.',
          angle: 'Reframe the common complaint. Challenge the belief that more leads equals more growth.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'Why I stopped pitching and started teaching',
          angle: 'The shift from sales to education. Share the story and the result. Show your philosophy through experience.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      authorship: [
        {
          topic: 'Behind the scenes of a six figure retainer win',
          angle: 'Tell the full story. The relationship, the trust building, the moment it clicked. Not a case study. A human story.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'How we diagnose a brand in the first 30 minutes',
          angle: 'Show the real process. Pull back the curtain. Connection through competence.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The uncomfortable truth about why agencies lose clients',
          angle: 'Name the pattern. It is not about results. It is about communication. A hot take that demonstrates you have seen the pattern.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      achievability: [
        {
          topic: 'The referral system that replaced our sales team',
          angle: 'Show the actual approach. Content plus relationships plus systems. Walk through what you did and what anyone can replicate.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How I use LinkedIn conversations to generate content ideas',
          angle: 'The connector approach. DMs, comments, and calls are your content research. Show the extraction system.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'One introduction that changed my agency trajectory',
          angle: 'Share the story. Show the system behind building the kind of network that generates those introductions.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
    },
    // ── Software ──────────────────────────────────────────────────────
    software: {
      attention: [
        {
          topic: 'The customer feedback call that changed our entire product direction',
          angle: 'Share the moment. One conversation that revealed a blind spot. This hooks because it is real.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'Why building in public is the best GTM strategy nobody uses properly',
          angle: 'The accepted rule is to build in stealth. Challenge it. Show why transparency creates demand.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
        {
          topic: 'What happened when we shipped our worst feature ever',
          angle: 'Vulnerability in software. Share the failure story. Connect through honesty. The audience relates to the struggle.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
      alignment: [
        {
          topic: 'We stopped building what users asked for. Our growth tripled.',
          angle: 'The counterintuitive story. Share the philosophy behind product decisions. This attracts people who think like you.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'Software companies do not have a product problem. They have a positioning problem.',
          angle: 'Challenge the default belief. The product is fine. The messaging is invisible. Reframe the conversation.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'Why I believe the founder should be the face of the brand',
          angle: 'Share your philosophy. Not a tactic. A conviction. This creates alignment with other founders who feel the same.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      authorship: [
        {
          topic: 'The journey from idea to 1000 users',
          angle: 'Tell the real story. The decisions, the pivots, the luck. Authority through narrative, not metrics.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'How we onboard power users without a single sales call',
          angle: 'Show the system. Community, content, and product experience. Demonstrate what self serve trust building looks like.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'Why most SaaS marketing feels soulless',
          angle: 'Name the pattern. It is all features and no philosophy. A hot take that positions you as different.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      achievability: [
        {
          topic: 'The community led content engine',
          angle: 'Show how to turn user conversations into content. Comments, support threads, and community posts are all source material.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How we built a content flywheel from customer stories',
          angle: 'The connector approach to SaaS content. Talk to users, capture their words, publish their insights (with permission).',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'The one meeting that generates all our content for the month',
          angle: 'Share the system. A monthly team session that extracts insights, stories, and ideas. Give the exact agenda.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
    },
    // ── Professional Services ────────────────────────────────────────
    professional_services: {
      attention: [
        {
          topic: 'The referral conversation that changed my entire business model',
          angle: 'Share the real moment. One conversation that showed you the gap between how you were known and how you wanted to be known.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'Why networking events are a waste of time for senior professionals',
          angle: 'Challenge the accepted wisdom. The best relationships are built through content, not cocktails. Show why.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
        {
          topic: 'What happened when I started posting my real opinions online',
          angle: 'The vulnerability story. Share what changed when you stopped being "professional" and started being real.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
      alignment: [
        {
          topic: 'I turned down a major engagement because the values did not align',
          angle: 'Show what you stand for through what you refuse. This story self selects the right clients.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'Professional services firms do not have a marketing problem. They have a personality problem.',
          angle: 'Challenge the belief. The work is excellent. The firm has no identity. Reframe what needs to change.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'Why I share everything I know for free',
          angle: 'The philosophy of radical generosity in professional services. Share why it works and what it attracts.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      authorship: [
        {
          topic: 'How I helped a client avoid a decision that would have cost them millions',
          angle: 'Tell the story. Not a case study. A narrative. Show the thinking, the relationship, the trust that made it possible.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'What the first 10 minutes of an advisory meeting actually look like',
          angle: 'Pull back the curtain. Show the diagnostic process. Connection through competence and transparency.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The pattern nobody in my industry wants to admit',
          angle: 'Name the uncomfortable truth. This kind of honesty builds authority faster than any credential.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      achievability: [
        {
          topic: 'The relationship system that generates 80% of my revenue',
          angle: 'Show the real approach. Content, conversations, and follow up. Not a CRM hack. A human system.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How I turn every coffee meeting into a piece of content',
          angle: 'The connector approach to content creation. Every conversation has a lesson. Here is how to capture and publish it.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'The introduction template that rebuilt my referral pipeline',
          angle: 'Share the actual system. How to make introductions that create value for everyone. Give the exact framework.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
    },
    // ── Other ────────────────────────────────────────────────────────
    other: {
      attention: [
        {
          topic: 'The conversation that made me rethink my entire approach',
          angle: 'Share a real moment. One interaction that shifted everything. Vulnerability is the fastest hook for connectors.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'Why the "build an audience first" advice is backwards',
          angle: 'Challenge the accepted rule. You do not build an audience then connect. You connect then the audience forms around the connection.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
        {
          topic: 'What happened when I stopped trying to look like an expert',
          angle: 'The transformation from performing to being real. Share the before, the shift, and what changed in your results.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
      alignment: [
        {
          topic: 'I believe relationships are the most undervalued asset in business',
          angle: 'Share the philosophy. Not a tactic. A worldview. This content attracts people who operate the same way.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'Your audience does not want another expert. They want someone real.',
          angle: 'Challenge the belief that authority requires perfection. Reframe what people actually trust.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'Why I share the process, not just the results',
          angle: 'Share the philosophy of transparency. The messy middle is where connection lives. Show why it matters.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      authorship: [
        {
          topic: 'The real story behind my biggest result',
          angle: 'Not the LinkedIn version. The real version. With the doubts, the detours, and the decisions that actually mattered.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Show how you actually solve a problem, live',
          angle: 'Pull back the curtain. Demonstrate your process. Not polished. Real. This builds more authority than any credential.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The uncomfortable truth nobody in your industry wants to say',
          angle: 'Name it. Be specific. This kind of honesty builds trust faster than any case study.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      achievability: [
        {
          topic: 'The 3 conversations per week system',
          angle: 'Connectors create through conversation. Here is the exact system for turning weekly interactions into content and relationships.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How to build content from conversations, not from a blank page',
          angle: 'The capture system for connectors. Every call, every DM, every voice memo is raw material. Show how to assemble it.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'The relationship content calendar',
          angle: 'Map your network. Each relationship has a story, a lesson, and a principle. That is your content library. Show the system.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
      ],
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CREATOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  creator: {
    // ── Coaching ──────────────────────────────────────────────────────
    coaching: {
      attention: [
        {
          topic: 'The coaching industry is full of people who have never done the thing they coach',
          angle: 'Take the hot take. Name the elephant. This creates instant pattern interrupt because everybody thinks it but nobody says it.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'I spent $50k on coaching before I realised the real problem',
          angle: 'The personal story that hooks through relatability. Share the moment. The audience has felt this same thing.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'What "premium" coaching actually looks like vs what gets sold',
          angle: 'Show the gap. What it looks like versus what it actually is. Visual contrast drives attention.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
      ],
      alignment: [
        {
          topic: 'Nobody wants to buy coaching. They want speed.',
          angle: 'Challenge the core belief. Reframe what coaching actually provides. Speed and security, not more calls.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The moment I stopped being a coach and became a system builder',
          angle: 'The transformation story that shows your philosophy. Alignment through identity shift.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'If your content sounds like every other coach, your business will perform like every other coach',
          angle: 'The hot take that names the pattern. Harsh but true. This repels the wrong people and attracts the right ones.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      authorship: [
        {
          topic: 'Audit a coaching program landing page live',
          angle: 'Take something public and tear it down. Show what works, what does not, and what you would change. Authority through application.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'What a real coaching transformation looks like (not the testimonial)',
          angle: 'Show the messy middle. The real before, the ugly during, the honest after. Proof through narrative.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The three things I look for in 60 seconds that tell me a coach is going to fail',
          angle: 'Diagnostic selling through story. Name the patterns. Be specific. The specificity is what builds trust.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      achievability: [
        {
          topic: 'The voice memo to published content pipeline',
          angle: 'Show the exact system. Talk into your phone, extract the gold, publish. No writing required. Walk through a real example.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How I create a week of content in 45 minutes',
          angle: 'The batch creation system for coaches who hate content creation. Show the process, the tools, and the result.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Stop planning content. Start capturing it.',
          angle: 'The hot take that reframes the approach. Planning is procrastination. Capturing is production. Show the system.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
      ],
    },
    // ── Agency ──────────────────────────────────────────────────────
    agency: {
      attention: [
        {
          topic: 'Most agencies are commodity service providers pretending to be strategic partners',
          angle: 'The hot take that names the pattern everyone sees but nobody says. This stops the scroll because it is provocative and true.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'I lost my biggest client and it was the best thing that happened',
          angle: 'The story that hooks through vulnerability. Share the moment, the feeling, and the transformation that followed.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'What agency "strategy" actually looks like vs what gets presented',
          angle: 'Show the contrast. The polished deck vs the messy whiteboard. Real vs performed. Visual tension drives attention.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
      ],
      alignment: [
        {
          topic: 'Agencies are the wrong choice for most founders between 1 and 50M',
          angle: 'The contrarian take. Not anti agency. Anti default agency. Reframe when and why agencies make sense.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The day I stopped chasing retainers and started building partnerships',
          angle: 'The transformation story. Show the philosophy shift through a specific moment. Alignment through conviction.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'If you are competing on price, your content already lost',
          angle: 'Name the pain. Remove the self blame. Show the structural cause. This positions you above the noise.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      authorship: [
        {
          topic: 'Tear down a brand campaign and show what you would do differently',
          angle: 'Take something public. Apply your thinking. Show the decisions you would make and why. Authority through application.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'What really happens in the first 30 days of a retainer',
          angle: 'Show the real process. Not the proposal version. The honest one with the chaos and the decisions.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The red flag I see on every agency website that tells me they are going to struggle',
          angle: 'Specific diagnostic. Name the pattern. Be concrete. The specificity is what makes it believable.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      achievability: [
        {
          topic: 'The loom video system that replaced our proposals',
          angle: 'Show the actual system. Record a five minute walkthrough instead of a 20 page deck. Show a before and after.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How we turned case studies into a 12 month content engine',
          angle: 'Walk through the system. One case study becomes 20 pieces. Show the extraction and distribution process.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Stop creating content from scratch. Start documenting the work.',
          angle: 'The reframe. Your daily work IS the content. You just need to capture it. Show the system.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
      ],
    },
    // ── Software ──────────────────────────────────────────────────────
    software: {
      attention: [
        {
          topic: 'Your product demo is boring everyone',
          angle: 'The hot take that names the problem. Feature walkthroughs do not convert. Problem narratives do. Challenge the default.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The feature nobody used that taught us everything about product market fit',
          angle: 'The story that hooks through honesty. Share the failure, the insight, and the pivot.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'What "product led growth" actually looks like vs what gets evangelised',
          angle: 'Show the messy reality. The slide deck version vs the real version. Visual contrast creates attention.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
      ],
      alignment: [
        {
          topic: 'Your competitor is not another product. It is the spreadsheet.',
          angle: 'Reframe the competitive landscape. Challenge the default framing. This attracts founders who think differently.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The moment I stopped building features and started building a movement',
          angle: 'The transformation story. Philosophy over functionality. Show the shift that changed everything.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'If your onboarding takes more than 5 minutes, your messaging failed',
          angle: 'Provocative and specific. Name the problem. Remove the self blame from the user. Show the real cause.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      authorship: [
        {
          topic: 'Tear down a competitor onboarding flow',
          angle: 'Apply your thinking to a real example. Show what works, what does not, and what you would change. Not a hit piece. A teaching moment.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'How we built a feature from a single support ticket',
          angle: 'Show the real process. From frustration to solution. Demonstrate product thinking through narrative.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The metric that actually predicts churn (and it is not what you track)',
          angle: 'Specific diagnostic. Name the pattern. Be contrarian with data, not just opinion.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      achievability: [
        {
          topic: 'The 5 minute product update that drives more signups than any ad',
          angle: 'Show the system. Quick screen recording plus narration. Not polished. Real. Walk through the exact process.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How we turned our Slack community into a content machine',
          angle: 'Walk through the system. User questions become content. Community insights become thought leadership. Show the extraction process.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Stop creating marketing content. Start shipping in public.',
          angle: 'The reframe. Documentation is content. Changelogs are narratives. Show the system that turns building into publishing.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
      ],
    },
    // ── Professional Services ────────────────────────────────────────
    professional_services: {
      attention: [
        {
          topic: 'The professional services industry has a personality crisis',
          angle: 'Every firm sounds the same. Same language, same promises, same invisible presence. Name the problem. This hooks because it is true.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'I went from partner track to personal brand. Here is what nobody tells you.',
          angle: 'The story that hooks through courage. Share the moment, the fear, and the result.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'What "thought leadership" in professional services actually looks like vs what gets published',
          angle: 'Show the contrast. White papers nobody reads vs content that earns attention. Visual contrast hooks.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
      ],
      alignment: [
        {
          topic: 'Your firm does not need marketing. It needs a point of view.',
          angle: 'Challenge the default approach. Most professional services marketing is just noise. What is missing is conviction.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The day I stopped hiding behind the firm and started speaking as myself',
          angle: 'The transformation story. From corporate voice to personal conviction. Show what changed.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'If your content could be written by anyone in your industry, it is not working',
          angle: 'Name the pain. The generic trap. Show why specificity of philosophy is the unlock.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      authorship: [
        {
          topic: 'Audit a professional services website and show what you would change',
          angle: 'Take a public example and apply your expertise. Show your diagnostic process in real time.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'How I built a reputation that outperforms the firm brand',
          angle: 'Show the real journey. The content, the consistency, the moments that mattered. Authority through narrative.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The one thing I look for that tells me a professional is going to struggle with content',
          angle: 'Specific diagnostic. Name the pattern. Connectors and creators can name what others miss.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
      ],
      achievability: [
        {
          topic: 'The phone video system that outperforms polished content every time',
          angle: 'Show the approach. Raw, real, direct to camera. Walk through why it works and how to start today.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How I repurpose one keynote into 30 days of content',
          angle: 'Walk through the extraction system. One talk becomes posts, stories, clips, and articles. Show the full process.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Stop waiting for perfection. Start publishing raw expertise.',
          angle: 'The reframe. Perfectionism is not quality. It is fear. Show the system that gets content out the door.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
      ],
    },
    // ── Other ────────────────────────────────────────────────────────
    other: {
      attention: [
        {
          topic: 'The content you are afraid to post is the content that will grow your brand',
          angle: 'The hot take that names the fear. The safe content is invisible. The risky content is memorable. Challenge the instinct.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The post that changed everything for me (and why I almost did not publish it)',
          angle: 'The story that hooks through vulnerability and suspense. Share the moment, the fear, and the result.',
          contentType: 'story',
          variationName: 'moment',
          outline: o('story:moment'),
        },
        {
          topic: 'What "viral content" actually is vs what you think it is',
          angle: 'Show the contrast. Virality is not luck. It is architecture. Show what most people miss.',
          contentType: 'demonstration',
          variationName: 'looks-like-actually-is',
          outline: o('demonstration:looks-like-actually-is'),
        },
      ],
      alignment: [
        {
          topic: 'Not everybody should have a personal brand',
          angle: 'The contrarian take that filters hard. If you do not have real expertise, you are wasting your time. Show why.',
          contentType: 'hot-take',
          variationName: 'common-belief',
          outline: o('hot-take:common-belief'),
        },
        {
          topic: 'The moment I stopped creating for the algorithm and started creating for my people',
          angle: 'The transformation story. From chasing metrics to building meaning. Show the philosophy shift.',
          contentType: 'story',
          variationName: 'transformation',
          outline: o('story:transformation'),
        },
        {
          topic: 'Volume is the wrong play. Here is what to do instead.',
          angle: 'Challenge the growth hack. Value over volume. Every time. Show the evidence from experience.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
      ],
      authorship: [
        {
          topic: 'Audit a piece of content in your space and show what you would change',
          angle: 'Take something public and apply your lens. Not mean. Specific. Show the craft and the thinking behind better content.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Show the real creation process, not the highlight reel',
          angle: 'Pull back the curtain. The drafts, the deletions, the decisions. Authority through transparency.',
          contentType: 'demonstration',
          variationName: 'hook-problem-demo',
          outline: o('demonstration:hook-problem-demo'),
        },
        {
          topic: 'The uncomfortable truth about why your content is not working',
          angle: 'Name the pattern. Be specific. It is not the algorithm. It is the content. Diagnostic selling through a hot take.',
          contentType: 'hot-take',
          variationName: 'pain-to-shift',
          outline: o('hot-take:pain-to-shift'),
        },
      ],
      achievability: [
        {
          topic: 'The voice note to published content pipeline',
          angle: 'Show the exact system. Capture raw thinking, extract the core, publish. No writing required. Demonstrate it live.',
          contentType: 'demonstration',
          variationName: 'constraint-ignore-do',
          outline: o('demonstration:constraint-ignore-do'),
        },
        {
          topic: 'How to create a week of content from one idea',
          angle: 'Walk through the waterfall. One idea becomes five pieces. Different formats, same core. Show the full extraction.',
          contentType: 'apply',
          variationName: 'standard',
          outline: o('apply:standard'),
        },
        {
          topic: 'Capture then create. The system that ends blank page syndrome.',
          angle: 'The reframe that changes everything. You do not have a content problem. You have a capture problem. Show the fix.',
          contentType: 'hot-take',
          variationName: 'accepted-rule',
          outline: o('hot-take:accepted-rule'),
        },
      ],
    },
  },
};

// ─── Helper ──────────────────────────────────────────────────────────

export function getContentForBucket(
  archetype: TryArchetypeId,
  industry: Industry,
  whichA: WhichA,
): TopicAngle[] {
  return CONTENT_BANK[archetype]?.[industry]?.[whichA] ?? [];
}
