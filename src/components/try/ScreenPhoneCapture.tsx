import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

interface ScreenPhoneCaptureProps {
  onSubmit: (phone: string) => void;
}

export function ScreenPhoneCapture({ onSubmit }: ScreenPhoneCaptureProps) {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 8) {
      onSubmit(phone.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        Where should we send your content plan?
      </h2>
      <p className="text-zinc-400 mb-6 text-sm">
        We'll text you your personalised 4 week posting cadence.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-4 bg-zinc-800/60 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-zinc-500"
            placeholder="Your phone number"
            autoFocus
          />
        </div>

        <motion.button
          type="submit"
          className={`w-full flex items-center justify-center px-8 py-4 font-semibold text-white rounded-xl transition-all ${
            phone.trim().length >= 8
              ? 'bg-blue-600 hover:bg-blue-500'
              : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
          }`}
          disabled={phone.trim().length < 8}
          whileHover={phone.trim().length >= 8 ? { scale: 1.02 } : {}}
          whileTap={phone.trim().length >= 8 ? { scale: 0.98 } : {}}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </form>

      <p className="mt-4 text-xs text-zinc-600 text-center">
        We respect your privacy. No spam, just your results.
      </p>
    </motion.div>
  );
}
