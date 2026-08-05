import React from 'react';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700',
    primary: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900',
    bestseller: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    new: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    sale: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    shipping: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
