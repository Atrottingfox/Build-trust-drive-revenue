import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';

const tiers = [
  {
    name: "Unedited",
    price: "$7,000/month",
    content: {
      title: "Content Creation",
      items: [
        "2x Content shoots",
        "20x Short form videos",
        "4x YouTube videos",
        "5-10x Candid images for static posts"
      ]
    },
    editing: {
      title: "Editing",
      items: [
        "Overseeing editing operations"
      ]
    }
  },
  {
    name: "Edited",
    price: "$12,000/month",
    content: {
      title: "Content Creation",
      items: [
        "2x Content shoots",
        "20x Edited short form videos",
        "4x Edited YouTube videos",
        "5-10x Candid images for static posts"
      ]
    },
    editing: {
      title: "Editing",
      items: [
        "Platform optimised videos",
        "Captions and grading",
        "Youtube thumbnails"
      ]
    }
  }
];

// Rest of the component remains the same
export default function DWY() {
  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Done With You
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

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-blue-900/20 to-gray-900/40 p-8 rounded-xl ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-xl font-semibold text-blue-400 mb-8">{tier.price}</p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">{tier.content.title}</h4>
                  <ul className="space-y-3">
                    {tier.content.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">{tier.editing.title}</h4>
                  <ul className="space-y-3">
                    {tier.editing.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.a
                href="https://nktgf7e00ss.typeform.com/to/iZDyg7w8"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-glow block w-full py-3 px-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-500 transition-colors mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
                <ArrowRight className="ml-2 -mr-1 h-5 w-5 inline-block" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}