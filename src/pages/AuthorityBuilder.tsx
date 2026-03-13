import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, Target, Zap, Award, Clock, Shield, TrendingUp } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';

export default function AuthorityBuilder() {
  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <Container>
        {/* Hero Section */}
        <section>
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              THE <GradientText>AUTHORITY BUILDER</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Build a revenue generating content engine that positions you as the market leader and scales without relying on an agency.
            </p>
            
            <div className="mb-12">
              <p className="text-2xl text-white mb-8 font-semibold">A done with you system that:</p>
              <div className="space-y-4 max-w-2xl mx-auto">
                {[
                  "Turns content into qualified leads on autopilot",
                  "Makes your name synonymous with your niche", 
                  "Trains your team to run it without bottlenecks",
                  "Installs in under 90 days backed by our performance guarantee"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-lg text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <p className="text-xl text-gray-300 mb-6">
                No more agency hand holding.<br />
                No more content confusion.<br />
                <span className="text-blue-400 font-semibold">Just results.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://form.typeform.com/to/S2rogsdT"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://calendly.com/sean-authorityengine/90-minute-scale-session-clone"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition-all ring-1 ring-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Why This Matters */}
        <section className="py-20 bg-gray-900/40 rounded-xl mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">WHY THIS MATTERS</h2>
            <p className="text-2xl text-blue-400 font-semibold mb-12">Your brand should be your biggest growth channel.</p>
            <p className="text-xl text-gray-300 mb-8">But right now:</p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
            {[
              "Competitors with less to offer are more visible",
              "Your audience can't see your expertise",
              "You're sitting on content gold without the tools to mine it",
              "Your team is busy but not compounding effort into growth"
            ].map((problem, index) => (
              <motion.div
                key={index}
                className="bg-red-900/20 p-8 rounded-xl ring-1 ring-red-500/30 hover:bg-red-900/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{problem}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-3xl text-blue-400 font-bold">Let's change that.</p>
          </div>
        </section>

        {/* Qualification Section */}
        <section className="py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* This is for you */}
            <div className="bg-green-900/20 p-8 rounded-xl ring-1 ring-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                THIS IS FOR YOU IF YOU:
              </h3>
              <div className="space-y-4">
                {[
                  "Run a $3M+ business",
                  "Want to be the go to expert in your category",
                  "Have (or are building) a team ready to scale your message"
                ].map((criteria, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {criteria}
                  </div>
                ))}
              </div>
            </div>

            {/* Not for you */}
            <div className="bg-red-900/20 p-8 rounded-xl ring-1 ring-red-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Not for you if:</h3>
              <div className="space-y-4">
                {[
                  "You're still testing product/market fit",
                  "You expect content to work without your input",
                  "You've cycled through 6 teams and blame them all"
                ].map((criteria, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    {criteria}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Build Together */}
        <motion.section 
          className="py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              WHAT WE BUILD TOGETHER
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Target,
                title: "Content Engine, Installed",
                description: "We help you create and capture your first batch of long-form and short-form content - so you leave with a library"
              },
              {
                icon: Zap,
                title: "Messaging & Brand Voice, Locked In",
                description: "We clarify your positioning, sharpen your tone, and craft your core beliefs mapped to where your audience is - then install them across your content."
              },
              {
                icon: Award,
                title: "Sales assets, done with you",
                description: "Together we build trust building content that converts - including your Value based VSL"
              },
              {
                icon: Users,
                title: "System That You Can Run",
                description: "You get a ready to run framework - with formats, workflows, and templates ready to implement."
              },
              {
                icon: Star,
                title: "Team Ready to Execute",
                description: "We train your operator or in-house team during the build - so they can confidently take the wheel, and know why."
              },
              {
                icon: TrendingUp,
                title: "Strategy that grows with you",
                description: "You walk away with a long-term roadmap and decision making filters - so you never wonder what to post or why."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/40 p-8 rounded-xl ring-1 ring-white/10 hover:ring-blue-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Build Process */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">THE BUILD PROCESS</h2>
          </div>

          <div className="space-y-12">
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
                className="bg-gray-800/40 p-8 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4">{phase.phase}</h3>
                <p className="text-lg text-gray-300">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* By The End You'll Have */}
        <section className="py-20 bg-gray-900/40 rounded-xl mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">BY THE END YOU'LL HAVE:</h2>
          </div>

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
                className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-300">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">WHY US?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Helped Taki Moore generate $1M+ from YouTube in 8 weeks",
              "Scaled Jay Wright's inbound system: 49k ➔ 90k+ followers in 10 months",
              "Endorsed by Klaviyo's Head of Brand: \"One of the rare creatives who truly gets it.\""
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="p-6 bg-blue-900/20 rounded-xl ring-1 ring-blue-500/30 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Star className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-300">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Guarantee */}
        <section className="py-20 bg-green-900/20 rounded-xl mb-20 ring-1 ring-green-500/30">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-green-500" />
              OUR GUARANTEE
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300">
              <p>
                If after two shoots either of us decide it's not a fit - you receive your full money back, 
                and I'll personally direct you to somebody better suited to your needs.
              </p>
              <p>
                At the end of your program, if you haven't got a complete, repeatable system - 
                we'll work with you until you do.
              </p>
            </div>
          </div>
        </section>

        {/* Spots Are Limited */}
        <section className="py-20 text-center">
          <div className="bg-red-900/20 p-8 rounded-xl ring-1 ring-red-500/30 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8 text-red-500" />
              SPOTS ARE LIMITED
            </h2>
            <p className="text-xl text-gray-300 mb-2">Only 5 founders per quarter.</p>
            <p className="text-lg text-gray-400">Next cohort begins Q4 2025, starting at $25,000</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://form.typeform.com/to/S2rogsdT"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://calendly.com/sean-authorityengine/90-minute-scale-session-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-700 transition-all ring-1 ring-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.a>
          </div>
        </section>

        {/* Two Paths to Authority */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">TWO PATHS TO AUTHORITY</h2>
            <p className="text-xl text-gray-300">Pick the program that matches your ambition:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-gray-800/40 p-8 rounded-xl ring-1 ring-white/10 hover:ring-blue-500/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">YouTube Accelerator</h3>
              <p className="text-gray-300 mb-6">Leverage longform as your go to nurturing platform to accelerate trust and transform followers to advocates.</p>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">6 weeks + 2 bonus weeks</p>
                <p className="text-3xl font-bold text-white mb-2">$20,000</p>
                <p className="text-gray-400">or 3 payments of $8,000</p>
              </div>

              <div className="mb-8 space-y-4">
                <h4 className="text-blue-400 font-semibold mb-3">What you'll achieve:</h4>
                <ul className="space-y-2">
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Transform your expertise into 8+ professional videos that build trust and convert viewers into high-value prospects</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Develop a confident team that can execute your content strategy without bottlenecking on you</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Establish yourself as the go-to authority in your niche through strategic positioning and consistent messaging</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Create a scalable content system with templates and workflows that work even when you're not</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Build a professional brand environment that reinforces your expertise and accelerates trust-building</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <h5 className="text-gray-400 font-medium mb-2 text-sm">Program includes:</h5>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 8+ professional videos filmed and optimised</p>
                    <p>• 3x in person professional grade shoots</p>
                    <p>• Team empowerment and training systems</p>
                    <p>• 2x weekly one to one content strategy consulting sessions</p>
                    <p>• Access to tools, templates, and guidance library</p>
                    <p>• In-person environment & set design session</p>
                    <p>• Early access to core Authority Engine beta program</p>
                  </div>
                </div>
              </div>

              <motion.a
                href="https://form.typeform.com/to/S2rogsdT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-xl ring-2 ring-blue-500/50 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute -top-2 -right-2">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Authority Accelerator</h3>
              <p className="text-gray-300 mb-6">Grow a content ecosystem that exists everywhere your audience needs you.</p>
              
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">10 weeks + 2 bonus weeks</p>
                <p className="text-3xl font-bold text-white mb-2">$35,000</p>
                <p className="text-gray-400">or 6 payments of $8,000</p>
              </div>

              <div className="mb-8 space-y-4">
                <h4 className="text-blue-400 font-semibold mb-3">What you'll achieve:</h4>
                <ul className="space-y-2">
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Dominate your market with 12+ professional videos and 40+ short-form assets that capture attention everywhere</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Build an omnipresent brand that your audience encounters at every touchpoint in their buyer journey</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Develop a fully empowered team that executes your content strategy with confidence and consistency</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Establish market leadership through refined brand design and strategic long-term roadmap</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Create a content ecosystem that converts prospects at every stage of awareness into qualified leads</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Position yourself as the undisputed authority with a brand that builds trust and drives qualified demand</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <h5 className="text-gray-400 font-medium mb-2 text-sm">Program includes:</h5>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 12+ professional videos filmed and optimised</p>
                    <p>• 40+ short form videos created and optimised</p>
                    <p>• Team empowerment and training systems</p>
                    <p>• 2x weekly one to one content strategy consulting sessions</p>
                    <p>• Access to tools, templates, and guidance library</p>
                    <p>• Longterm roadmap & strategy refinement</p>
                    <p>• Brand design refinement + personalised content templates</p>
                    <p>• In-person environment & set design session</p>
                    <p>• Early access to core Authority Engine beta program</p>
                  </div>
                </div>
              </div>

              <motion.a
                href="https://form.typeform.com/to/S2rogsdT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer Description */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto text-sm text-gray-400 space-y-4">
            <p>
              The Authority Engine is a consulting and implementation company that helps high-growth founders 
              install content systems that scale trust, build reputation, and generate demand — without the founder doing all the work.
            </p>
            <p>
              We're the team behind the content engines of some of the world's top coaches and consultants. 
              Our approach combines strategy, production, and team enablement - so your content keeps working even when you're not.
            </p>
            <p>
              We don't just help you post.<br />
              <span className="text-blue-400 font-semibold">We help you build the system that makes you impossible to replace.</span>
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}