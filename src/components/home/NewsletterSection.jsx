import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast('Thank you for subscribing to AURA Journal!', 'success');
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="p-8 sm:p-16 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center max-w-4xl mx-auto relative overflow-hidden shadow-apple-lg">
        <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
          Join the AURA Journal
        </h2>

        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-8 leading-relaxed">
          Receive exclusive early access to hardware drops, architectural design stories, and 10% off your initial purchase.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm py-3">
            <CheckCircle2 className="w-5 h-5" /> You are subscribed. Welcome to the circle.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-5 py-3 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
            <Button type="submit" size="md" className="w-full sm:w-auto flex-shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
