import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, AlertCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import { supabase } from '../lib/supabase';

export default function BeliefMap() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Save to contacts table for CRM tracking
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .upsert({
          name: userInfo.name,
          email: userInfo.email,
          lead_source: 'belief_map',
          status: 'new'
        }, {
          onConflict: 'email'
        })
        .select()
        .single();

      if (contactError) {
        console.error('Error saving contact:', contactError);
        // Continue anyway - don't block user experience
      }

      // Add interaction tracking
      if (contact) {
        await supabase
          .from('interactions')
          .insert({
            contact_id: contact.id,
            type: 'belief_map_access',
            description: 'Accessed Belief Map Builder tool'
          });
      }

      // Store user info and redirect to builder
      localStorage.setItem('beliefMapUser', JSON.stringify(userInfo));
      window.location.href = '/beliefmapbuilder';
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Belief Map <GradientText>Builder</GradientText>
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Turn your core ideas into repeatable content concepts
            </p>
            <div className="bg-blue-900/20 p-4 rounded-lg text-left">
              <h3 className="text-white font-semibold mb-2">What you'll create:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Map your core beliefs and concepts</li>
                <li>• Generate key messages for each concept</li>
                <li>• Build content ideas from your beliefs</li>
                <li>• Export everything to Notion for easy use</li>
              </ul>
            </div>
          </motion.div>

          {/* Access Form */}
          <motion.div 
            className="bg-gray-800/40 p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-center text-gray-300 mb-8">
              Enter your details to get started
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                      if (emailTouched) {
                        setError('');
                      }
                    }}
                    onBlur={() => setEmailTouched(true)}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      error ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !userInfo.name || !userInfo.email}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Getting Access...
                  </>
                ) : (
                  <>
                    Get Access
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                We'll save your progress so you can return anytime to continue building your belief map.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}