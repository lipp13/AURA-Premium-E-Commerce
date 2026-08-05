import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CuratedCollections = () => {
  const collections = [
    {
      title: 'Gaming & Work Setup',
      subtitle: 'Precision Mechanical Keyboards, Trackpads & Displays',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      link: '/shop?category=gaming',
      span: 'col-span-1 lg:col-span-2'
    },
    {
      title: 'Luxury Furniture',
      subtitle: 'Architectural Bouclé Armchairs & Solid Oak Desks',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      link: '/shop?category=furniture',
      span: 'col-span-1'
    },
    {
      title: 'Minimalist Apparel',
      subtitle: 'Heavyweight Cotton Tees & Italian Cashmere',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
      link: '/shop?category=fashion',
      span: 'col-span-1'
    },
    {
      title: 'Audiophile Sound',
      subtitle: 'Bang & Olufsen Soundbars & Studio Headphones',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      link: '/shop?category=music',
      span: 'col-span-1 lg:col-span-2'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Curated Series</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
          Designed for Distinct Environments
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {collections.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className={`relative rounded-3xl overflow-hidden min-h-[340px] group border border-neutral-200 dark:border-neutral-800 shadow-apple-md ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-1">
                Collection
              </span>
              <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
              <p className="text-xs text-neutral-300 mb-4 max-w-md">{item.subtitle}</p>
              <Link to={item.link}>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:underline">
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
