import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from '../common/Button';

export const ConsentBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('aura_privacy_accepted');
      if (!accepted) {
        const timer = setTimeout(() => setShow(true), 2500);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('aura_privacy_accepted', 'true');
    } catch (e) {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-40 max-w-md w-full p-6 glass-panel rounded-3xl shadow-apple-lg border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Privacy & Preferences</h4>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 leading-relaxed">
            We use essential preferences to personalize your shopping experience, remember settings, and maintain secure session state.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <Button size="sm" onClick={handleAccept} fullWidth>
              Accept All
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShow(false)} fullWidth>
              Essential Only
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
