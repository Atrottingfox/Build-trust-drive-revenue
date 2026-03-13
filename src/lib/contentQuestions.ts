import type { ContentQuestion } from '../types/contentAssessment';

export const contentQuestions: ContentQuestion[] = [
  {
    id: 'Q1',
    section: 'Content Creation Style',
    text: "What feels more like your default content style?",
    options: [
      {
        text: "Think first, then create.",
        value: 'A',
        traits: [
          { name: 'Strategic Planning', score: 2 },
          { name: 'Structured Thinking', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Strategist', score: 1.5 },
          { name: 'Technician', score: 1.0 }
        ],
        recommendation: "Build content frameworks and templates for consistent output"
      },
      {
        text: "Create first, then refine.",
        value: 'B',
        traits: [
          { name: 'Creative Flow', score: 2 },
          { name: 'Intuitive Expression', score: 2 }
        ],
        archetypes: [
          { name: 'Creative', score: 2.0 },
          { name: 'Firestarter', score: 1.5 },
          { name: 'Messenger', score: 1.0 }
        ],
        recommendation: "Capture raw content then polish with editing systems"
      }
    ]
  },
  {
    id: 'Q2',
    section: 'Content Creation Style',
    text: "When you create your best content, you typically:",
    options: [
      {
        text: "Follow a proven system or framework",
        value: 'A',
        traits: [
          { name: 'System Reliance', score: 2 },
          { name: 'Process Optimization', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Technician', score: 1.5 },
          { name: 'Strategist', score: 1.0 }
        ],
        recommendation: "Document and systematize your best-performing content approaches"
      },
      {
        text: "Trust your instincts and creative impulses",
        value: 'B',
        traits: [
          { name: 'Intuitive Creation', score: 2 },
          { name: 'Spontaneous Expression', score: 2 }
        ],
        archetypes: [
          { name: 'Creative', score: 2.0 },
          { name: 'Firestarter', score: 1.5 },
          { name: 'Instigator', score: 1.0 }
        ],
        recommendation: "Create inspiration capture systems for peak creative moments"
      }
    ]
  },
  {
    id: 'Q3',
    section: 'Content Creation Style',
    text: "Your content performs best when it:",
    options: [
      {
        text: "Provides clear, actionable frameworks people can implement",
        value: 'A',
        traits: [
          { name: 'Practical Value', score: 2 },
          { name: 'Implementation Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Technician', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Guide', score: 1.0 }
        ],
        recommendation: "Build step-by-step implementation guides and toolkits"
      },
      {
        text: "Challenges thinking and sparks emotional responses",
        value: 'B',
        traits: [
          { name: 'Thought Provocation', score: 2 },
          { name: 'Emotional Impact', score: 2 }
        ],
        archetypes: [
          { name: 'Firestarter', score: 2.0 },
          { name: 'Instigator', score: 1.5 },
          { name: 'Mirror', score: 1.0 }
        ],
        recommendation: "Create belief-challenging content series with strong POV"
      }
    ]
  },
  {
    id: 'Q4',
    section: 'Trust Building',
    text: "People trust you most because of your:",
    options: [
      {
        text: "Proven systems and consistent results",
        value: 'A',
        traits: [
          { name: 'Results Credibility', score: 2 },
          { name: 'System Reliability', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Technician', score: 1.0 }
        ],
        recommendation: "Showcase case studies and systematic approaches prominently"
      },
      {
        text: "Authentic voice and genuine connection",
        value: 'B',
        traits: [
          { name: 'Authentic Connection', score: 2 },
          { name: 'Relational Trust', score: 2 }
        ],
        archetypes: [
          { name: 'Messenger', score: 2.0 },
          { name: 'Companion', score: 1.5 },
          { name: 'Mirror', score: 1.0 }
        ],
        recommendation: "Share personal stories and behind-the-scenes content regularly"
      }
    ]
  },
  {
    id: 'Q5',
    section: 'Trust Building',
    text: "Your audience values you most for:",
    options: [
      {
        text: "Breaking down complex concepts into simple steps",
        value: 'A',
        traits: [
          { name: 'Clarity Creation', score: 2 },
          { name: 'Educational Value', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Guide', score: 1.5 },
          { name: 'Technician', score: 1.0 }
        ],
        recommendation: "Create educational content series with clear learning outcomes"
      },
      {
        text: "Inspiring them to think differently and take bold action",
        value: 'B',
        traits: [
          { name: 'Inspirational Impact', score: 2 },
          { name: 'Action Catalyst', score: 2 }
        ],
        archetypes: [
          { name: 'Instigator', score: 2.0 },
          { name: 'Firestarter', score: 1.5 },
          { name: 'Creative', score: 1.0 }
        ],
        recommendation: "Build challenge-based content that drives immediate action"
      }
    ]
  },
  {
    id: 'Q6',
    section: 'Trust Building',
    text: "When building authority, you prefer to:",
    options: [
      {
        text: "Demonstrate expertise through detailed analysis and insights",
        value: 'A',
        traits: [
          { name: 'Analytical Authority', score: 2 },
          { name: 'Deep Expertise', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Guide', score: 1.0 }
        ],
        recommendation: "Publish in-depth analysis and strategic insights regularly"
      },
      {
        text: "Share personal experiences and vulnerable truths",
        value: 'B',
        traits: [
          { name: 'Vulnerable Authority', score: 2 },
          { name: 'Experience-Based Trust', score: 2 }
        ],
        archetypes: [
          { name: 'Mirror', score: 2.0 },
          { name: 'Messenger', score: 1.5 },
          { name: 'Companion', score: 1.0 }
        ],
        recommendation: "Create authentic storytelling content about your journey"
      }
    ]
  },
  {
    id: 'Q7',
    section: 'Workflow Preferences',
    text: "Your ideal content creation workflow involves:",
    options: [
      {
        text: "Planned batching with systematic execution",
        value: 'A',
        traits: [
          { name: 'Systematic Workflow', score: 2 },
          { name: 'Batch Efficiency', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Technician', score: 1.5 },
          { name: 'Strategist', score: 1.0 }
        ],
        recommendation: "Build quarterly content themes with monthly batch sessions"
      },
      {
        text: "Responsive creation based on inspiration and timing",
        value: 'B',
        traits: [
          { name: 'Responsive Creation', score: 2 },
          { name: 'Inspiration-Driven', score: 2 }
        ],
        archetypes: [
          { name: 'Creative', score: 2.0 },
          { name: 'Firestarter', score: 1.5 },
          { name: 'Instigator', score: 1.0 }
        ],
        recommendation: "Create rapid-response content systems for trending topics"
      }
    ]
  },
  {
    id: 'Q8',
    section: 'Workflow Preferences',
    text: "When scaling content, you would rather:",
    options: [
      {
        text: "Build systems that others can execute consistently",
        value: 'A',
        traits: [
          { name: 'Scalable Systems', score: 2 },
          { name: 'Delegation Ready', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Technician', score: 1.0 }
        ],
        recommendation: "Create SOPs and templates for team-based content production"
      },
      {
        text: "Maintain personal involvement to preserve authenticity",
        value: 'B',
        traits: [
          { name: 'Personal Involvement', score: 2 },
          { name: 'Authenticity Preservation', score: 2 }
        ],
        archetypes: [
          { name: 'Messenger', score: 2.0 },
          { name: 'Creative', score: 1.5 },
          { name: 'Mirror', score: 1.0 }
        ],
        recommendation: "Design hybrid systems with personal touch points"
      }
    ]
  },
  {
    id: 'Q9',
    section: 'Workflow Preferences',
    text: "Your biggest content bottleneck is usually:",
    options: [
      {
        text: "Finding time to plan and organize content strategically",
        value: 'A',
        traits: [
          { name: 'Strategic Planning Need', score: 2 },
          { name: 'Organization Challenge', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Guide', score: 1.0 }
        ],
        recommendation: "Implement quarterly strategic planning sessions with team support"
      },
      {
        text: "Maintaining consistency while preserving creative quality",
        value: 'B',
        traits: [
          { name: 'Creative Consistency', score: 2 },
          { name: 'Quality Maintenance', score: 2 }
        ],
        archetypes: [
          { name: 'Creative', score: 2.0 },
          { name: 'Mirror', score: 1.5 },
          { name: 'Companion', score: 1.0 }
        ],
        recommendation: "Create flexible frameworks that support creative expression"
      }
    ]
  },
  {
    id: 'Q10',
    section: 'Business Integration',
    text: "Content should primarily drive:",
    options: [
      {
        text: "Qualified leads and strategic business outcomes",
        value: 'A',
        traits: [
          { name: 'Business Focus', score: 2 },
          { name: 'Lead Generation', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Technician', score: 1.0 }
        ],
        recommendation: "Build content funnels directly tied to revenue objectives"
      },
      {
        text: "Brand awareness and community engagement",
        value: 'B',
        traits: [
          { name: 'Brand Building', score: 2 },
          { name: 'Community Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Companion', score: 2.0 },
          { name: 'Messenger', score: 1.5 },
          { name: 'Mirror', score: 1.0 }
        ],
        recommendation: "Focus on community-building content with long-term brand value"
      }
    ]
  },
  {
    id: 'Q11',
    section: 'Business Integration',
    text: "Your content strategy should emphasize:",
    options: [
      {
        text: "Demonstrating ROI and measurable business impact",
        value: 'A',
        traits: [
          { name: 'ROI Focus', score: 2 },
          { name: 'Measurable Impact', score: 2 }
        ],
        archetypes: [
          { name: 'Technician', score: 2.0 },
          { name: 'Strategist', score: 1.5 },
          { name: 'Architect', score: 1.0 }
        ],
        recommendation: "Create content with clear metrics and conversion tracking"
      },
      {
        text: "Building emotional connection and brand loyalty",
        value: 'B',
        traits: [
          { name: 'Emotional Connection', score: 2 },
          { name: 'Brand Loyalty', score: 2 }
        ],
        archetypes: [
          { name: 'Mirror', score: 2.0 },
          { name: 'Companion', score: 1.5 },
          { name: 'Messenger', score: 1.0 }
        ],
        recommendation: "Develop relationship-focused content that builds lifetime value"
      }
    ]
  },
  {
    id: 'Q12',
    section: 'Business Integration',
    text: "Success for your content means:",
    options: [
      {
        text: "Consistent pipeline of high-value opportunities",
        value: 'A',
        traits: [
          { name: 'Pipeline Generation', score: 2 },
          { name: 'High-Value Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Guide', score: 1.0 }
        ],
        recommendation: "Build premium content that attracts enterprise-level prospects"
      },
      {
        text: "Meaningful impact and transformation in your audience",
        value: 'B',
        traits: [
          { name: 'Transformational Impact', score: 2 },
          { name: 'Audience Development', score: 2 }
        ],
        archetypes: [
          { name: 'Guide', score: 2.0 },
          { name: 'Mirror', score: 1.5 },
          { name: 'Instigator', score: 1.0 }
        ],
        recommendation: "Create transformation-focused content with clear before/after outcomes"
      }
    ]
  },
  {
    id: 'Q13',
    section: 'Leadership Style',
    text: "As a leader, you prefer to:",
    options: [
      {
        text: "Provide clear direction and proven methodologies",
        value: 'A',
        traits: [
          { name: 'Directive Leadership', score: 2 },
          { name: 'Methodology Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Technician', score: 1.5 },
          { name: 'Strategist', score: 1.0 }
        ],
        recommendation: "Create authoritative content that positions you as the definitive expert"
      },
      {
        text: "Inspire and empower others to find their own path",
        value: 'B',
        traits: [
          { name: 'Inspirational Leadership', score: 2 },
          { name: 'Empowerment Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Guide', score: 2.0 },
          { name: 'Instigator', score: 1.5 },
          { name: 'Mirror', score: 1.0 }
        ],
        recommendation: "Build empowerment-focused content that develops other leaders"
      }
    ]
  },
  {
    id: 'Q14',
    section: 'Leadership Style',
    text: "Your natural communication style is:",
    options: [
      {
        text: "Structured, logical, and detail-oriented",
        value: 'A',
        traits: [
          { name: 'Structured Communication', score: 2 },
          { name: 'Logical Presentation', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Technician', score: 1.5 },
          { name: 'Strategist', score: 1.0 }
        ],
        recommendation: "Leverage detailed analysis and structured presentations"
      },
      {
        text: "Intuitive, emotional, and story-driven",
        value: 'B',
        traits: [
          { name: 'Intuitive Communication', score: 2 },
          { name: 'Story-Driven', score: 2 }
        ],
        archetypes: [
          { name: 'Messenger', score: 2.0 },
          { name: 'Creative', score: 1.5 },
          { name: 'Mirror', score: 1.0 }
        ],
        recommendation: "Focus on narrative-driven content with emotional resonance"
      }
    ]
  },
  {
    id: 'Q15',
    section: 'Leadership Style',
    text: "People seek you out primarily for:",
    options: [
      {
        text: "Strategic insights and systematic solutions",
        value: 'A',
        traits: [
          { name: 'Strategic Authority', score: 2 },
          { name: 'Solution Provider', score: 2 }
        ],
        archetypes: [
          { name: 'Strategist', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Guide', score: 1.0 }
        ],
        recommendation: "Position yourself as the go-to strategic advisor in your space"
      },
      {
        text: "Inspiration and perspective shifts",
        value: 'B',
        traits: [
          { name: 'Inspirational Authority', score: 2 },
          { name: 'Perspective Shifter', score: 2 }
        ],
        archetypes: [
          { name: 'Firestarter', score: 2.0 },
          { name: 'Instigator', score: 1.5 },
          { name: 'Creative', score: 1.0 }
        ],
        recommendation: "Create thought-leadership content that challenges industry norms"
      }
    ]
  },
  {
    id: 'Q16',
    section: 'Innovation Approach',
    text: "When introducing new ideas, you:",
    options: [
      {
        text: "Build comprehensive frameworks with proven validation",
        value: 'A',
        traits: [
          { name: 'Framework Building', score: 2 },
          { name: 'Validation Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Architect', score: 2.0 },
          { name: 'Strategist', score: 1.5 },
          { name: 'Technician', score: 1.0 }
        ],
        recommendation: "Develop signature methodologies that become industry standards"
      },
      {
        text: "Challenge conventional thinking with bold perspectives",
        value: 'B',
        traits: [
          { name: 'Conventional Challenge', score: 2 },
          { name: 'Bold Perspective', score: 2 }
        ],
        archetypes: [
          { name: 'Firestarter', score: 2.0 },
          { name: 'Creative', score: 1.5 },
          { name: 'Instigator', score: 1.0 }
        ],
        recommendation: "Lead industry conversations with contrarian viewpoints"
      }
    ]
  },
  {
    id: 'Q17',
    section: 'Innovation Approach',
    text: "Your approach to problem-solving is:",
    options: [
      {
        text: "Systematic analysis leading to optimized solutions",
        value: 'A',
        traits: [
          { name: 'Systematic Analysis', score: 2 },
          { name: 'Solution Optimization', score: 2 }
        ],
        archetypes: [
          { name: 'Technician', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Strategist', score: 1.0 }
        ],
        recommendation: "Create detailed problem-solving frameworks and toolkits"
      },
      {
        text: "Creative exploration leading to breakthrough insights",
        value: 'B',
        traits: [
          { name: 'Creative Exploration', score: 2 },
          { name: 'Breakthrough Insights', score: 2 }
        ],
        archetypes: [
          { name: 'Creative', score: 2.0 },
          { name: 'Mirror', score: 1.5 },
          { name: 'Guide', score: 1.0 }
        ],
        recommendation: "Share your creative process and breakthrough moments"
      }
    ]
  },
  {
    id: 'Q18',
    section: 'Innovation Approach',
    text: "You create the most value when you:",
    options: [
      {
        text: "Optimize existing systems for maximum efficiency",
        value: 'A',
        traits: [
          { name: 'System Optimization', score: 2 },
          { name: 'Efficiency Focus', score: 2 }
        ],
        archetypes: [
          { name: 'Technician', score: 2.0 },
          { name: 'Architect', score: 1.5 },
          { name: 'Strategist', score: 1.0 }
        ],
        recommendation: "Focus on optimization and efficiency-driven content"
      },
      {
        text: "Help others see possibilities they hadn't considered",
        value: 'B',
        traits: [
          { name: 'Possibility Expansion', score: 2 },
          { name: 'Vision Catalyst', score: 2 }
        ],
        archetypes: [
          { name: 'Guide', score: 2.0 },
          { name: 'Mirror', score: 1.5 },
          { name: 'Companion', score: 1.0 }
        ],
        recommendation: "Create visionary content that expands thinking"
      }
    ]
  }
];