import { PricingPlan } from '../types/pricing';

export const pricingPlans: PricingPlan[] = [
  {
    name: "Your revenue roadmap",
    description: "Build credibility & trust to lay the groundwork for growth",
    requirements: [
      "1M+ Revenue",
      "3,000+ audience"
    ],
    features: [
      "Find your authentic voice",
      "Amplify your authority",
      "Scale your profit"
    ],
    cta: "Apply now",
    typeformUrl: "https://form.typeform.com/to/S2rogsdT",
    forText: "Founders eager to scale their influence with a proven system"
  },
  {
    name: "The Authority Engine",
    description: "We empower you to install our guided system to accelerate your impact.",
    requirements: [
      "3M+ revenue",
      "20,000+ audience"
    ],
    features: [
      "Scale your influence",
      "Dominate your niche",
      "Turn content into cashflow"
    ],
    cta: "Apply now",
    featured: true,
    typeformUrl: "https://form.typeform.com/to/S2rogsdT",
    forText: "Founders looking to go pro with personal brand"
  },
  {
    name: "Market domination",
    description: "We craft you a powerhouse team for undeniable market influence.",
    requirements: [
      "10M+ revenue",
      "50,000+ audience"
    ],
    features: [
      "Direct 1:1 team training & guidance",
      "Industry shaping authority",
      "Exponential revenue growth"
    ],
    cta: "Applications closed",
    disabled: true,
    forText: "Founders ready to dominate their market"
  }
];