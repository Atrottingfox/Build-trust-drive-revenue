import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft, CheckCircle2, X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  contentShoots: string;
  shortFormVideos: string;
  youtubeVideos: string;
  editing: string[];
  strategy: string[];
  support: string[];
  cta: string;
}

const tiers: Tier[] = [
  {
    name: "Impact",
    price: "$8,000/month",
    description: "For founders looking for consistent, streamlined assistance for accountability with content creation",
    features: [],
    contentShoots: "1x Content shoot/month",
    shortFormVideos: "20x Edited short form videos",
    youtubeVideos: "2x YouTube videos",
    editing: [
      "Basic visual enhancements",
      "Captions, graphics, and grading"
    ],
    strategy: [
      "Monthly content calendar",
      "Content to align with strategy"
    ],
    support: [
      "Dedicated support"
    ],
    cta: "Apply Now"
  },
  {
    name: "Influence",
    price: "$15,000/month",
    description: "For founders seeking consistent, high quality content and a comprehensive service.",
    features: [],
    contentShoots: "2x Half day content shoots",
    shortFormVideos: "30x Edited short form videos",
    youtubeVideos: "4x YouTube videos",
    editing: [
      "Platform-optimised videos",
      "Graphics, captions and grading"
    ],
    strategy: [
      "Monthly strategy session",
      "2x creative alignment calls p/month"
    ],
    support: [
      "Access to personal editor"
    ],
    cta: "Apply Now"
  },
  {
    name: "Authority",
    price: "$25,000/month",
    description: "For founders committed to dominating their niche, building undeniable authority and scaling their impact.",
    features: [],
    contentShoots: "2x Content shoots",
    shortFormVideos: "60x Edited short form videos",
    youtubeVideos: "6x YouTube videos",
    editing: [
      "Custom high quality editing",
      "Custom visuals & motion graphics"
    ],
    strategy: [
      "2x monthly strategy calls",
      "Quarterly creative ideation sessions"
    ],
    support: [
      "Full team of support"
    ],
    cta: "Apply Now"
  }
];

const comparisons = [
  {
    before: "Occasional online presence",
    after: "An omnichannel powerhouse"
  },
  {
    before: "Fragmented efforts",
    after: "A cohesive, omnipresent strategy"
  },
  {
    before: "Time consuming content creation",
    after: "Delegated and done with you production"
  },
  {
    before: "Reactive marketing",
    after: "Proactive, strategy-first campaigns"
  },
  {
    before: "Inconsistent content creation",
    after: "Predictable, high-performing output"
  },
  {
    before: "Limited organic market visibility",
    after: "A magnetic & cohesive brand presence"
  }
];

interface PricingTierProps {
  tier: Tier;
}

function PricingTier({ tier }: PricingTierProps) {
  return (
    <motion.div 
      className="pricing-card bg-gradient-to-b from-blue-900/20 to-gray-900/40 p-8 rounded-xl ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ translateY: -5 }}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
        <p className="text-xl font-semibold text-blue-400 mb-4">{tier.price}</p>
        <p className="text-gray-400 mb-8">{tier.description}</p>

        <div className="space-y-6 mb-8">
          {/* Content Creation */}
          <div className="feature-section">
            <h4 className="text-lg font-semibold text-white mb-3">Content Creation</h4>
            <div className="space-y-2">
              <div className="feature-item">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <span className="text-gray-300">{tier.contentShoots}</span>
              </div>
              <div className="feature-item">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <span className="text-gray-300">{tier.shortFormVideos}</span>
              </div>
              <div className="feature-item">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <span className="text-gray-300">{tier.youtubeVideos}</span>
              </div>
            </div>
          </div>

          {/* Editing */}
          <div className="feature-section">
            <h4 className="text-lg font-semibold text-white mb-3">Editing</h4>
            <div className="space-y-2">
              {tier.editing.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy */}
          <div className="feature-section">
            <h4 className="text-lg font-semibold text-white mb-3">Strategy</h4>
            <div className="space-y-2">
              {tier.strategy.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="feature-section">
            <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
            <div className="space-y-2">
              {tier.support.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.a
          href="https://nktgf7e00ss.typeform.com/to/S2rogsdT"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-500 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {tier.cta}
        </motion.a>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
    </motion.div>
  );
}

export default function DFY() {
  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Choose your path to <GradientText>authority</GradientText>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Select the tier that best aligns with your vision and goals
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {tiers.map((tier, index) => (
            <PricingTier key={index} tier={tier} />
          ))}
        </div>

        {/* Transformation Section */}
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GradientText>Transformation</GradientText>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 mb-32">
            {comparisons.map((comparison, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-blue-900/20 to-gray-900/40 p-6 rounded-xl ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-b from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                <div className="relative flex items-center justify-center gap-4">
                  <div className="flex-1 text-center">
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{comparison.before}</p>
                  </div>
                  <ArrowRightLeft className="w-6 h-6 text-blue-500 flex-shrink-0 transform group-hover:rotate-180 transition-transform duration-500" />
                  <div className="flex-1 text-center">
                    <p className="text-blue-400 group-hover:text-blue-300 transition-colors">{comparison.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Services Section */}
          <motion.h2 
            className="text-4xl font-bold text-white mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Additional Services
          </motion.h2>

          <div className="grid gap-8 mb-32">
            {[
              {
                category: "Accelerator",
                title: "Personal Brand Launch",
                price: "$8,000",
                description: "We spend 1/2 day building a strategy with you and your team on site, then spend 1/2 day shooting with you.",
                emailSubject: "Personal Brand Launch Enquiry"
              },
              {
                category: "Consulting",
                title: "1-on-1 Strategic Consulting",
                price: "$4,000/month",
                description: "Attack your specific challenges with 2 dedicated strategy calls per month.",
                emailSubject: "1-on-1 Strategic Consulting Enquiry"
              },
              {
                category: "Capture",
                title: "Half-Day Content Creation",
                price: "$4,000",
                description: "Professional content capture session tailored to your brand needs.",
                emailSubject: "Half-Day Content Creation Enquiry"
              },
              {
                category: "Event Coverage",
                title: "Professional Event Documentation",
                options: [
                  { name: "Team Coverage", price: "Starting at $10,000/day" },
                  { name: "Individual Coverage", price: "Starting at $6,000/day" }
                ],
                description: "Comprehensive event documentation and content creation.",
                emailSubject: "Professional Event Documentation Enquiry"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="magnetic-glow bg-gray-800/40 p-8 rounded-xl ring-1 ring-white/10 hover:ring-blue-500/50 transition-all relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative z-10">
                  <span className="text-blue-400 text-sm font-semibold mb-2 block">
                    {service.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  {service.options ? (
                    <div className="space-y-2 mb-4">
                      {service.options.map((option, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-gray-300">{option.name}</span>
                          <span className="text-xl font-semibold text-blue-400">
                            {option.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xl font-semibold text-blue-400 mb-4">
                      {service.price}
                    </p>
                  )}
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  <motion.a
                    href={`mailto:sean@authorityengine.com.au?subject=${encodeURIComponent(service.emailSubject)}`}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enquire Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.a>
                </div>

                {/* Gradient hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-500/20">
                  <th className="py-4 px-6 text-left text-lg font-semibold text-white">Feature</th>
                  <th className="py-4 px-6 text-center text-lg font-semibold text-white">Impact</th>
                  <th className="py-4 px-6 text-center text-lg font-semibold text-white">Influence</th>
                  <th className="py-4 px-6 text-center text-lg font-semibold text-white">Authority</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-500/10">
                  <td className="py-4 px-6 text-gray-300">Content Shoots</td>
                  <td className="py-4 px-6 text-center text-gray-400">1x/month</td>
                  <td className="py-4 px-6 text-center text-gray-400">2x half day</td>
                  <td className="py-4 px-6 text-center text-gray-400">2x full day</td>
                </tr>
                <tr className="border-b border-blue-500/10">
                  <td className="py-4 px-6 text-gray-300">Short Form Videos</td>
                  <td className="py-4 px-6 text-center text-gray-400">20</td>
                  <td className="py-4 px-6 text-center text-gray-400">30</td>
                  <td className="py-4 px-6 text-center text-gray-400">60</td>
                </tr>
                <tr className="border-b border-blue-500/10">
                  <td className="py-4 px-6 text-gray-300">YouTube Videos</td>
                  <td className="py-4 px-6 text-center text-gray-400">2</td>
                  <td className="py-4 px-6 text-center text-gray-400">4</td>
                  <td className="py-4 px-6 text-center text-gray-400">6</td>
                </tr>
                <tr className="border-b border-blue-500/10">
                  <td className="py-4 px-6 text-gray-300">Strategy Sessions</td>
                  <td className="py-4 px-6 text-center text-gray-400">Monthly</td>
                  <td className="py-4 px-6 text-center text-gray-400">Monthly + Bi-weekly</td>
                  <td className="py-4 px-6 text-center text-gray-400">Monthly + Quarterly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}