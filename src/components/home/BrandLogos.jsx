import React from 'react';
import { brands } from '../../data/brands';

export const BrandLogos = () => {
  return (
    <section className="py-12 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 overflow-hidden">
      <div className="relative flex overflow-x-hidden no-scrollbar">
        <div className="flex gap-12 sm:gap-16 items-center whitespace-nowrap animate-marquee">
          {brands.concat(brands).map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer"
            >
              <span className="text-lg sm:text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
