import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { Search, X, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { categories } from '../../data/categories';

export const SearchModal = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const [query, setQuery] = useState('');

  const trendingSearches = ['Headphones', 'OLED Display', 'Ergonomic Chair', 'Keyboard', 'Cashmere', 'Bang & Olufsen'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Search input field */}
        <div className="relative flex items-center border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <Search className="w-6 h-6 text-neutral-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, category, or brand..."
            autoFocus
            className="w-full bg-transparent text-lg sm:text-xl font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {query ? (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Search Results ({results.length})
            </h4>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex-shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="text-sm font-semibold text-neutral-900 dark:text-white truncate group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                        {product.title}
                      </h5>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
                        <span>{product.brand}</span>
                        <span className="font-bold text-neutral-900 dark:text-white">${product.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 py-6 text-center">
                No matching products found for "{query}". Try a different keyword.
              </p>
            )}
          </div>
        ) : (
          /* Popular & Category Quick Shortcuts */
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Top Categories
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.id}`}
                    onClick={onClose}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
