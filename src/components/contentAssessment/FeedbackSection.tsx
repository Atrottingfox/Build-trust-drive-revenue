import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquare, CheckCircle2 } from 'lucide-react';
import { saveUserFeedback } from '../../lib/supabase';

interface FeedbackSectionProps {
  assessmentId: string;
  onFeedbackSubmitted: () => void;
}

export function FeedbackSection({ assessmentId, onFeedbackSubmitted }: FeedbackSectionProps) {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [comments, setComments] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackClick = (isAccurate: boolean) => {
    setFeedbackGiven(isAccurate);
    if (!isAccurate) {
      setShowComments(true);
    }
  };

  const handleSubmit = async () => {
    if (feedbackGiven === null) return;

    setIsSubmitting(true);
    try {
      await saveUserFeedback(assessmentId, feedbackGiven, comments);
      setIsSubmitted(true);
      onFeedbackSubmitted();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-900/20 p-6 rounded-xl ring-1 ring-green-500/30"
      >
        <div className="flex items-center gap-3 text-green-400">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold">Thank you for your feedback!</h3>
            <p className="text-green-300 text-sm">
              Your input helps us improve the assessment for everyone.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/40 p-6 rounded-xl ring-1 ring-white/10"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        How accurate was this assessment for you?
      </h3>
      <p className="text-gray-400 mb-6 text-sm">
        Your feedback helps us improve the assessment accuracy for everyone.
      </p>

      <div className="space-y-4">
        <div className="flex gap-4">
          <motion.button
            onClick={() => handleFeedbackClick(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              feedbackGiven === true
                ? 'bg-green-600 text-white ring-2 ring-green-400'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ThumbsUp className="w-5 h-5" />
            Very Accurate
          </motion.button>

          <motion.button
            onClick={() => handleFeedbackClick(false)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              feedbackGiven === false
                ? 'bg-red-600 text-white ring-2 ring-red-400'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ThumbsDown className="w-5 h-5" />
            Not Quite Right
          </motion.button>
        </div>

        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">
                What would make this assessment more accurate? (Optional)
              </span>
            </div>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share what felt off or what archetype you think fits better..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
          </motion.div>
        )}

        {feedbackGiven !== null && (
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}