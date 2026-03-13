export interface PricingPlan {
  name: string;
  description: string;
  requirements: string[];
  features: string[];
  cta: string;
  featured?: boolean;
  disabled?: boolean;
  forText: string;
  typeformUrl?: string;
}