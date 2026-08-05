import React from 'react';
import { testimonials } from '../../data/faqs';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-20 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Verified Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
            Loved by Architects & Designers Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 italic">
                  "{review.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{review.name}</h4>
                    {review.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <p className="text-xs text-neutral-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
