import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';
import { ArrowUpRight } from 'lucide-react';

export const TrendingCategories = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Curated Spaces</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
            Explore Categories
          </h2>
        </div>
        <Link
          to="/shop?view=categories"
          className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:opacity-75 transition-opacity flex items-center gap-1"
        >
          View All 20 Categories <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(0, 12).map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              to={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all text-center h-full justify-between shadow-apple-sm hover:shadow-apple-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white shadow-apple-sm group-hover:scale-110 transition-transform mb-3">
                <span className="text-sm font-bold">{cat.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">{cat.count} Items</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
