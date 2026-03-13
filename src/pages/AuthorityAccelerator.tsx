import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Users, TrendingUp, Target, Zap, Shield, Clock, Award, Rocket, Camera, Video, MessageSquare, BarChart3, Gift } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';

export default function AuthorityAccelerator() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const weeklyProgram = [
    {
      week: 1,
      title: "Positioning & Strategy Foundation",
      description: "Deep dive strategy and content planning",
      tasks: [
        "Complete psychometric archetype quiz",
        "Submit audience insights + inspiration",
        "Build visual style and brand identity",
        "Audience belief map and messaging framework",
        "Plan your first 15 video ideas and content calendar"
      ],
      outcome: "Complete strategy, visual identity, and content roadmap locked in"
    },
    {
      week: 2,
      title: "First Shoot & Brand Voice System",
      description: "Film 2 videos + build brand voice system",
      tasks: [
        "First in-person content shoot (2 videos)",
        "Design repeatable thumbnail templates",
        "Build your brand voice system",
        "Set up content distribution workflow"
      ],
      outcome: "First 2 flagship videos filmed + brand voice system established"
    },
    {
      week: 3,
      title: "Hidden VSL & Script Refinement",
      description: "Build hidden VSL + deep analysis from shoot",
      tasks: [
        "Create your hidden VSL (Value-based Sales Letter)",
        "Deep analysis and feedback from first shoot",
        "Script refinement and delivery coaching",
        "Messaging optimisation based on performance"
      ],
      outcome: "Hidden VSL created, delivery style refined, scripts optimised"
    },
    {
      week: 4,
      title: "Second Shoot & YouTube Launch",
      description: "Film 2 more videos + launch first YouTube content",
      tasks: [
        "Second in-person content shoot (2 videos)",
        "Post your first YouTube videos + promotion strategy",
        "Analyse performance and audience feedback",
        "Implement repurposing workflow"
      ],
      outcome: "4 total videos filmed, YouTube presence launched, feedback loop established"
    },
    {
      week: 5,
      title: "Authority Content & Systems",
      description: "Advanced content + team delegation",
      tasks: [
        "Develop authority-building content series",
        "Create lead magnets and conversion content",
        "Build team SOPs and delegation systems",
        "Optimise content performance"
      ],
      outcome: "Authority content strategy deployed, team systems operational"
    },
    {
      week: 6,
      title: "Third Shoot & VSL Launch",
      description: "Film 2 more videos + launch VSL",
      tasks: [
        "Third in-person content shoot (2 videos)",
        "Launch your VSL (Value-based YouTube video)",
        "Complete brand voice system (v2)",
        "Finalise all content templates and workflows"
      ],
      outcome: "6 total videos filmed, VSL live, complete system handoff ready"
    }
  ];

  const bonusWeeks = [
    {
      week: 7,
      title: "Remote Shoot & Guidance",
      description: "You shoot with remote support",
      tasks: [
        "Remote-guided content shoot (2 videos)",
        "Real-time coaching and direction",
        "Content review and optimisation",
        "Troubleshoot any production challenges"
      ],
      outcome: "Independent shooting confidence built with support"
    },
    {
      week: 8,
      title: "Final Mastery & System Handoff",
      description: "Complete system mastery and independence",
      tasks: [
        "Complete system documentation and handoff",
        "Build next 90-day content roadmap",
        "Final strategy review and optimisation",
        "Team training and delegation setup"
      ],
      outcome: "Complete independence achieved, 8+ videos total, full system mastery"
    }
  ];

  const pricingOptions = [
    {
      title: "The Strategy",
      subtitle: "For founders with in-house teams - you shoot, we guide.",
      price: "$12,000",
      features: [
        "Strategic consulting (6 weeks + 2 bonus)",
        "3 in-person shoots + 1 remote-guided shoot",
        "Custom content strategy, cadence map, video structures",
        "Brand voice system + brand style guidance",
        "Final handoff: SOPs, calendar, and full video library"
      ],
      description: "You leave with 8+ filmed videos and the full system - ready to hand off to your team."
    },
    {
      title: "The Engine",
      subtitle: "We guide, film, and professionally edit long-form assets for YouTube.",
      price: "$20,000",
      features: [
        "Includes everything in The Strategy",
        "3 in-person shoots + 1 remote shoot",
        "Full longform video editing for all content",
        "YouTube thumbnails, titles, and optimisation templates",
        "Publishing assistance + creative review"
      ],
      description: "A complete longform YouTube engine - strategy, production, and output handled."
    },
    {
      title: "The Authority",
      subtitle: "You walk away with longform + 40 short-form clips - edited, optimised, and systemised.",
      price: "$30,000",
      features: [
        "Includes everything in The Engine",
        "40 short-form content pieces created from your long-form videos",
        "Complete short form consulting, refinement and assistance",
        "Short-form strategy development and platform optimisation",
        "Testing + performance review across all content formats",
        "Repurposing strategy + automated posting system",
        "Optional team training or dedicated content delegation setup"
      ],
      description: "You become the go-to in your space - with a content system that works while you sleep.",
      featured: true
    }
  ];

  const handleSelectOption = (optionTitle: string) => {
    // Create a form that opens in a new tab
    const formHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authority Accelerator Application - ${optionTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #0f172a; color: white; }
          .form-container { background: #1e293b; padding: 30px; border-radius: 12px; }
          h1 { color: #3b82f6; margin-bottom: 20px; }
          .selected-option { background: #1e40af; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          label { display: block; margin-bottom: 5px; font-weight: bold; }
          input, textarea { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #374151; border-radius: 6px; background: #374151; color: white; }
          button { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
          button:hover { background: #2563eb; }
        </style>
      </head>
      <body>
        <div class="form-container">
          <h1>Authority Accelerator Application</h1>
          <div class="selected-option">
            <strong>Selected Option: ${optionTitle} - ${pricingOptions.find(opt => opt.title === optionTitle)?.price}</strong>
          </div>
          <form action="mailto:sean@authorityengine.com.au" method="post" enctype="text/plain">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required>
            
            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="company">Company/Business:</label>
            <input type="text" id="company" name="company">
            
            <label for="message">Tell us about your business and goals:</label>
            <textarea id="message" name="message" rows="5" placeholder="Please share details about your business, current content efforts, and what you hope to achieve with ${optionTitle}..."></textarea>
            
            <input type="hidden" name="subject" value="Authority Accelerator Application - ${optionTitle}">
            
            <button type="submit">Submit Application</button>
          </form>
        </div>
      </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(formHtml);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <Container>
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.h1 
              className="text-5xl sm:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">THE </span>
              <GradientText>AUTHORITY</GradientText>
              <br />
              <span className="text-white">ACCELERATOR</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Build a longform system that positions you as the category leader, turns views into leads, and gives your team the tools to scale.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={scrollToPricing}
                className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Secure your spot
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.button>
              
              <motion.a
                href="#learn-more"
                className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all ring-1 ring-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </Container>

        {/* Background Animation */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 30%, transparent 70%)',
              'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 30%, transparent 70%)',
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 30%, transparent 70%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </section>

      {/* Problem Section */}
      <section id="learn-more" className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                The <GradientText>Gap</GradientText>
              </h2>
              <div className="space-y-4">
                <p className="text-2xl text-gray-300 font-medium">
                  Your ideal audience is begging for more content.
                </p>
                <p className="text-xl text-blue-400">
                  You need to help them to make a purchase & get them what they need.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Competitors with less to offer who you help are winning because they're more visible",
                "Ideal clients are going elsewhere because they can't see your expertise",
                "Invisible authority costs you opportunities, trust, and millions in pipeline revenue",
                "Your team's effort is wasted without a repeatable system that compounds over time."
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  className="magnetic-glow bg-gray-800/40 p-6 rounded-xl ring-1 ring-white/10 hover:ring-red-500/50 transition-all group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 group-hover:scale-125 transition-transform" />
                    <p className="text-gray-300 group-hover:text-white transition-colors">{problem}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Solution Overview */}
      <section className="py-24 bg-gray-900/50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                The <GradientText>Authority Engine</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Build unshakeable authority, drive consistent leads, and position yourself as the go to expert in your field.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Authority Foundation",
                  description: "Refine your positioning, build your environment, bulletproof your messaging and your layers of authority that set you apart from the rest."
                },
                {
                  icon: Rocket,
                  title: "Content Acceleration",
                  description: "Deploy high-impact content that build trust, demonstrate expertise, and drive consistent engagement."
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Integration",
                  description: "Connect your authority building directly to revenue generation through strategic lead magnets and conversion systems."
                }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  className="magnetic-glow bg-gray-800/40 p-8 rounded-xl ring-1 ring-white/10 hover:ring-blue-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <pillar.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6-Week Program Timeline */}
      <section className="py-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Your 6-Week <GradientText>Transformation</GradientText>
              </h2>
              <p className="text-xl text-gray-400">
                An intensive program that delivers measurable authority and revenue growth
              </p>
            </motion.div>

            <div className="grid gap-6">
              {weeklyProgram.map((week, index) => (
                <motion.div
                  key={index}
                  className="magnetic-glow bg-gray-800/40 p-6 rounded-xl ring-1 ring-white/10 hover:ring-blue-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {week.week}
                        </div>
                        <span className="text-blue-400 font-semibold">Week {week.week}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {week.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{week.description}</p>
                    </div>

                    <div className="md:col-span-2">
                      <ul className="space-y-2">
                        {week.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-1">
                      <div className="bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-xs text-blue-400 font-semibold mb-1">Outcome:</p>
                        <p className="text-sm text-gray-300">{week.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Weeks Section */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  2 Additional Weeks of <GradientText>Remote Support</GradientText>
                </h3>
                <p className="text-gray-400">
                  Remote-guided shoots and complete system mastery
                </p>
              </div>

              <div className="grid gap-6">
                {bonusWeeks.map((week, index) => (
                  <motion.div
                    key={index}
                    className="magnetic-glow bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-xl ring-1 ring-blue-500/30 hover:ring-blue-500/50 transition-all group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="grid md:grid-cols-4 gap-6 items-start">
                      <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {week.week}
                          </div>
                          <span className="text-blue-400 font-semibold">Week {week.week}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {week.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{week.description}</p>
                      </div>

                      <div className="md:col-span-2">
                        <ul className="space-y-2">
                          {week.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-1">
                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg">
                          <p className="text-xs text-purple-400 font-semibold mb-1">Outcome:</p>
                          <p className="text-sm text-gray-300">{week.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Pricing Options */}
      <section id="pricing-section" className="py-24 bg-gray-900/50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Build Your Authority, <GradientText>Your Way</GradientText>
              </h2>
              <p className="text-xl text-gray-400">
                Choose the setup that matches your vision and level of support.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pricingOptions.map((option, index) => (
                <motion.div
                  key={index}
                  className="magnetic-glow p-8 rounded-xl ring-1 ring-blue-500/30 hover:ring-blue-500/50 transition-all group relative overflow-hidden bg-gradient-to-b from-blue-900/20 to-gray-900/40"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {option.featured && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Star className="w-6 h-6 text-blue-400" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                    <p className="text-gray-400 text-sm mb-6">{option.subtitle}</p>
                    
                    <div className="mb-6">
                      <p className="text-2xl font-semibold text-blue-400">{option.price}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-900/20 p-4 rounded-lg mb-6">
                      <p className="text-sm text-gray-300">{option.description}</p>
                    </div>

                    <motion.button
                      onClick={() => handleSelectOption(option.title)}
                      className="block w-full py-3 px-4 rounded-lg font-semibold text-center transition-all bg-blue-600 text-white hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Select Option
                    </motion.button>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Investment & Application */}
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Accelerate Your <GradientText>Authority</GradientText>?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                This intensive 6-week program is designed for serious business leaders ready to dominate their market.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800/40 p-8 rounded-xl ring-1 ring-white/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Limited Spots Available
              </h3>
              <p className="text-gray-300 mb-8">
                We currently only work with 5 founders per quarter to ensure exceptional results and personal attention.
              </p>

              <div className="space-y-6">
                <motion.a
                  href="https://form.typeform.com/to/PDtwasIb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-glow block w-full py-4 px-8 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Secure your spot
                  <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.a>

                <p className="text-sm text-gray-400">
                  Next cohort starts in Q2 2025. Applications close when spots are filled.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Frequently Asked <GradientText>Questions</GradientText>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  question: "Who is this program for?",
                  answer: "The Authority Accelerator is designed for established business leaders, founders, and industry experts who have results but lack the systematic authority-building approach to scale their influence and revenue."
                },
                {
                  question: "What makes this different from other content programs?",
                  answer: "This isn't just about strategy or creation. It's the entire thing - My goal is to get you everything you need with personalised attention that builds systematic authority to directly drive revenue into your company."
                },
                {
                  question: "How much time commitment is required?",
                  answer: "Expect 5-10 hours per week including strategy sessions, content creation, and implementation. We provide frameworks and systems to maximise efficiency and minimise time investment."
                },
                {
                  question: "What results can I expect in 6 weeks?",
                  answer: "You'll have 6+ professional videos filmed, a complete content system, brand voice system, team SOPs, and the confidence to create content independently. With 2 additional remote weeks, you'll have 8+ videos total and complete system mastery."
                },
                {
                  question: "Do you guarantee results?",
                  answer: "We guarantee you'll have a complete authority system in place with 8+ videos and all supporting materials. Revenue results depend on your market, implementation, and business model. We provide the framework and direct support for success."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="magnetic-glow bg-gray-800/40 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                      <div className="relative ml-4 flex-shrink-0">
                        <div className="transition duration-200 group-open:rotate-180">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"/>
                          </svg>
                        </div>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}