import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BrandLogos } from '../components/home/BrandLogos';
import { TrendingCategories } from '../components/home/TrendingCategories';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { CuratedCollections } from '../components/home/CuratedCollections';
import { Testimonials } from '../components/home/Testimonials';
import { FAQSection } from '../components/home/FAQSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomePage = () => {
  const { products, loading } = useProducts();
  const [tab, setTab] = useState('featured');

  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  const topRated = products.filter(p => p.rating >= 4.8).slice(0, 8);

  const activeProducts = tab === 'featured' ? featuredProducts : tab === 'new' ? newArrivals : topRated;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <HeroSection />

      {/* Brand Logos Marquee */}
      <BrandLogos />

      {/* Trending Categories */}
      <TrendingCategories />

      {/* Featured Products Tabbed Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Handpicked Products</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Curated Showcase
            </h2>
          </div>

          {/* Tab switches */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 self-start sm:self-auto">
            <button
              onClick={() => setTab('featured')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                tab === 'featured'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-apple-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setTab('new')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                tab === 'new'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-apple-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setTab('top')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                tab === 'top'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-apple-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Top Rated (4.8+)
            </button>
          </div>
        </div>

        <ProductGrid products={activeProducts} />

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Explore Full 120+ Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Flash Sale Event */}
      <FlashSaleSection />

      {/* Curated Collections */}
      <CuratedCollections />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};
