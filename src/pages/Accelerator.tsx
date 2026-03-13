import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Users, Target, Zap, ChevronUp, ChevronDown } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';

export default function Accelerator() {
  const [openFAQ, setOpenFAQ] = React.useState(null);
  
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-950 to-purple-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>
        
        <Container className="relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Build a revenue generating{' '}
              <GradientText>content engine</GradientText>{' '}
              that positions you as the market leader
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              A done with you system that helps you scale without relying on an agency
            </p>

            {/* System Benefits */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {[
                {
                  text: "Turns content into qualified leads on autopilot",
                  gradient: "from-blue-500/20 to-indigo-500/20",
                  border: "border-blue-500/30",
                  iconBg: "bg-blue-500/20",
                  iconColor: "text-blue-400"
                },
                {
                  text: "Makes your name synonymous with your niche",
                  gradient: "from-blue-900/30 to-blue-800/30", 
                  border: "border-blue-600/40",
                  iconBg: "bg-blue-800/40",
                  iconColor: "text-blue-300"
                },
                {
                  text: "Trains your team to run it without bottlenecks",
                  gradient: "from-blue-900/30 to-blue-800/30",
                  border: "border-blue-600/40", 
                  iconBg: "bg-blue-800/40",
                  iconColor: "text-blue-300"
                },
                {
                  text: "Installs in under 90 days backed by our performance guarantee",
                  gradient: "from-blue-900/30 to-blue-800/30",
                  border: "border-blue-600/40",
                  iconBg: "bg-blue-800/40",
                  iconColor: "text-blue-300"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className={`relative group p-6 bg-gradient-to-br ${benefit.gradient} backdrop-blur-sm rounded-xl border ${benefit.border} hover:border-opacity-80 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Enhanced background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`w-12 h-12 ${benefit.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`w-6 h-6 ${benefit.iconColor} rounded-md bg-current opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-200 text-base font-semibold group-hover:text-white transition-colors duration-300 leading-relaxed block">
                        {benefit.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${benefit.gradient} rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* What We Build Section */}
      <section className="py-24 bg-gray-950">
        <Container>
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              WHAT WE <GradientText>BUILD TOGETHER</GradientText>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Content Engine, Installed",
                  description: "We help you create and capture your first batch of long-form and short-form content - so you leave with a library"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Messaging & Brand Voice, Locked In", 
                  description: "We clarify your positioning, sharpen your tone, and craft your core beliefs mapped to where your audience is - then install them across your content."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Sales assets, done with you",
                  description: "Together we build trust building content that converts - including your Value based VSL"
                },
                {
                  icon: <Check className="w-8 h-8" />,
                  title: "System That You Can Run",
                  description: "You get a ready to run framework - with formats, workflows, and templates ready to implement."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Team Ready to Execute",
                  description: "We train your operator or in-house team during the build - so they can confidently take the wheel, and know why."
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Strategy that grows with you",
                  description: "You walk away with a long-term roadmap and decision making filters - so you never wonder what to post or why."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-8 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              THE <GradientText>BUILD PROCESS</GradientText>
            </h2>

            <div className="space-y-8">
              {[
                {
                  phase: "Phase 1: Ignition",
                  description: "Clarify your IP. Define positioning. Design your brand system."
                },
                {
                  phase: "Phase 2: Transmission", 
                  description: "We shoot. We train. We implement. Your content system gets installed to scale"
                },
                {
                  phase: "Phase 3: Flywheel",
                  description: "Apply to access to our exclusive flagship Authority Engine beta program"
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-8 p-8 bg-gray-800/40 border border-gray-700/50 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-blue-400">{phase.phase}</h3>
                    <p className="text-gray-300 text-lg">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Outcomes Section */}
      <section className="py-24 bg-gray-900">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-16">
              BY THE END <GradientText>YOU'LL HAVE</GradientText>:
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "6-12 long-form videos, each with purpose",
                "40+ short form assets (Authority Accelerator only)",
                "A trained team executing independently", 
                "Clarity on what to say, how to say it, and where to show up as yourself",
                "A brand that builds trust and drives qualified demand",
                "A content system that becomes your #1 salesperson"
              ].map((outcome, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Check className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-200 text-lg text-left">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-gray-950">
        <Container>
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              TWO PATHS TO <GradientText>AUTHORITY</GradientText>
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-xl font-semibold text-red-400 mb-2">4 spots left</p>
              <p className="text-lg text-gray-300">Applications close August 1st 11:59pm</p>
            </div>
            
            <p className="text-xl text-gray-300 text-center mb-16">Pick the program that matches your ambition:</p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* YouTube Accelerator */}
              <motion.div
                className="p-8 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-white">YouTube Accelerator</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Leverage longform as your go to nurturing platform to accelerate trust and transform followers to advocates.
                  </p>
                  <div className="mb-6">
                    <p className="text-gray-400 mb-2">6 weeks + 2 bonus weeks</p>
                    <p className="text-4xl font-bold text-white mb-2">$20,000</p>
                    <p className="text-gray-400">or 3 payments of $8,000</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-blue-400">What you'll achieve:</h4>
                  <ul className="space-y-3">
                    {[
                      "Transform your expertise into 8+ professional videos that build trust and convert viewers into high-value prospects",
                      "Develop a confident team that can execute your content strategy without bottlenecking on you",
                      "Establish yourself as the go-to authority in your niche through strategic positioning and consistent messaging",
                      "Create a scalable content system with templates and workflows that work even when you're not",
                      "Build a professional brand environment that reinforces your expertise and accelerates trust-building"
                    ].map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-400">Program includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {[
                      "8+ professional videos filmed and optimised",
                      "3x in person professional grade shoots", 
                      "Team empowerment and training systems",
                      "2x weekly one to one content strategy consulting sessions",
                      "Access to tools, templates, and guidance library",
                      "In-person environment & set design session",
                      "Early access to core Authority Engine beta program"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <motion.a
                    href="https://form.typeform.com/to/S2rogsdT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-glow block w-full text-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Now
                  </motion.a>
                </div>
              </motion.div>

              {/* Authority Accelerator */}
              <motion.div
                className="p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/50 rounded-xl h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8 flex-grow">
                  <h3 className="text-3xl font-bold mb-4 text-white">Authority Accelerator</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Grow a content ecosystem that exists everywhere your audience needs you.
                  </p>
                  <div className="mb-6">
                    <p className="text-gray-400 mb-2">10 weeks + 2 bonus weeks</p>
                    <p className="text-4xl font-bold text-white mb-2">$35,000</p>
                    <p className="text-gray-400">or 6 payments of $8,000</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-blue-400">What you'll achieve:</h4>
                  <ul className="space-y-3">
                    {[
                      "Dominate your market with 12+ professional videos and 40+ short-form assets that capture attention everywhere",
                      "Build an omnipresent brand that your audience encounters at every touchpoint in their buyer journey",
                      "Develop a fully empowered team that executes your content strategy with confidence and consistency",
                      "Establish market leadership through refined brand design and strategic long-term roadmap",
                      "Create a content ecosystem that converts prospects at every stage of awareness into qualified leads",
                      "Position yourself as the undisputed authority with a brand that builds trust and drives qualified demand"
                    ].map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-400">Program includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {[
                      "12+ professional videos filmed and optimised",
                      "40+ short form videos created and optimised",
                      "Team empowerment and training systems",
                      "2x weekly one to one content strategy consulting sessions",
                      "Access to tools, templates, and guidance library",
                      "Longterm roadmap & strategy refinement",
                      "Brand design refinement + personalised content templates",
                      "In-person environment & set design session",
                      "Early access to core Authority Engine beta program"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <motion.a
                    href="https://form.typeform.com/to/S2rogsdT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-glow block w-full text-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Now
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Fit Section */}
      <section className="py-24 bg-gray-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              IS THIS <GradientText>FOR YOU?</GradientText>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Perfect For You */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
                  <Check className="w-8 h-8" />
                  Perfect For You If:
                </h3>
                {[
                  "Want to solidify your authority as the leader in your industry",
                  "Are done with reactive push marketing and ready to scale visibility",
                  "Are ready to scale your brand and know content should be doing more",
                  "Have a team or are prepared to build one and are ready to take the reins"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-green-900/20 border border-green-500/30 rounded-xl hover:bg-green-900/30 transition-all">
                    <Check className="w-7 h-7 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 text-xl leading-relaxed">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Not For You */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-red-400 mb-8 flex items-center gap-3">
                  <span className="text-4xl">✗</span>
                  Not For You If:
                </h3>
                {[
                  "You're under $3M and still testing product to market fit",
                  "You've bounced between 6 content teams and blame them all",
                  "You want content that looks good, but doesn't convert",
                  "You want to outsource everything and stay uninvolved (we can help you find another solution)"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-red-900/20 border border-red-500/30 rounded-xl hover:bg-red-900/30 transition-all">
                    <div className="w-7 h-7 flex items-center justify-center text-red-400 flex-shrink-0 text-2xl font-bold mt-1">✗</div>
                    <span className="text-gray-200 text-xl leading-relaxed">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-gray-950">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-16">
              WHY <GradientText>US?</GradientText>
            </h2>

            <div className="space-y-6 mb-16">
              <p className="text-xl text-gray-200 leading-relaxed">
                The Authority Engine is a consulting and implementation company that helps high growth founders 
                install content systems that scale trust, build reputation, and generate demand - without the founder doing all the work.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We've been behind the scenes working on content engines for some of the world's top coaches and consultants. 
                Our approach has evolved to combine strategy, production, and team enablement - so your content keeps working even when you're not.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Helped Taki Moore generate $1M+ from YouTube in 8 weeks",
                "Scaled Jay Wright's inbound system: 49k ➔ 90k+ followers in 10 months", 
                'Endorsed by Klaviyo\'s Head of Brand: "One of the rare creatives who truly gets it."'
              ].map((proof, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:border-blue-500/50 transition-all"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <p className="text-lg text-gray-200">{proof}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Guarantee Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-16">
              OUR <GradientText>GUARANTEE</GradientText>
            </h2>

            <div className="text-xl text-gray-200 leading-relaxed space-y-6">
              <p>
                If after two shoots either of us decide it's not a fit - you receive your full money back, 
                and I'll personally direct you to somebody better suited to your needs.
              </p>
              
              <p>
                At the end of your program, if you haven't got a complete, repeatable system - 
                we'll work with you until you do.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="relative p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-600/50 text-center group hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/30 transition-all">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">YouTube Accelerator</h3>
                  <p className="text-gray-300 mb-6 text-sm">Build authority through long-form content</p>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-white mb-2">$20,000</p>
                    <p className="text-gray-400 text-sm">or 3 payments of $8,000</p>
                  </div>
                  <motion.a
                    href="https://form.typeform.com/to/S2rogsdT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all w-full relative overflow-hidden group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Now
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div 
                className="relative p-8 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl border-2 border-blue-500/60 text-center group hover:border-blue-400/80 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600/40 group-hover:to-purple-600/40 transition-all">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">Authority Accelerator</h3>
                  <p className="text-gray-300 mb-6 text-sm">Dominate all platforms with comprehensive content</p>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-white mb-2">$35,000</p>
                    <p className="text-gray-400 text-sm">or 6 payments of $8,000</p>
                  </div>
                  <motion.a
                    href="https://form.typeform.com/to/S2rogsdT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all w-full relative overflow-hidden group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Now
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Which program should I choose?",
                  answer: "Choose the YouTube Accelerator if you want to focus specifically on building authority through long form content and YouTube optimisation. Choose the Authority Accelerator if you want to dominate all platforms with both YouTube and short form content, plus advanced automation and exclusive beta group access."
                },
                {
                  question: "What's the difference in outcomes between the programs?",
                  answer: "The YouTube Accelerator delivers 8+ professional videos with 3x in person shoots, team empowerment, personal editor, and 2x weekly strategy consulting. The Authority Accelerator delivers 12+ YouTube videos PLUS 40+ short form videos with multi platform optimisation, early access to the Authority Engine program, and exclusive 6 month beta group access."
                },
                {
                  question: "How much time commitment is required?",
                  answer: "Both programs require 5 to 10 hours per week including strategy sessions, content creation, and implementation. The Authority Accelerator includes additional platform optimisation and automation setup, but we provide frameworks and systems to maximise efficiency."
                },
                {
                  question: "What about the payment options?",
                  answer: "YouTube Accelerator: $20,000 or 3 payments of $8,000. Authority Accelerator: $35,000 or 6 payments of $8,000. Both programs include 2 additional bonus weeks of remote support."
                },
                {
                  question: "Do you guarantee results?",
                  answer: "We guarantee you'll have a complete authority system in place with all videos and supporting materials as outlined in your chosen program. Revenue results depend on your market, implementation, and business model. We provide the framework and direct support for success."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left hover:bg-gray-700/20 transition-all"
                  >
                    <h3 className="text-xl font-semibold text-white flex items-center justify-between">
                      {faq.question}
                      {openFAQ === index ? (
                        <ChevronUp className="w-6 h-6 text-blue-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-blue-400" />
                      )}
                    </h3>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === index ? "auto" : 0,
                      opacity: openFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Footer Section */}
      <section className="py-24 bg-gray-950">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </Container>
      </section>
    </div>
  );
}