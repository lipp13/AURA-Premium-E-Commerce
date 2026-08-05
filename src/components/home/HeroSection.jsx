import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-200/40 dark:bg-neutral-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-apple-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The New 2026 Architectural Studio Collection</span>
          </motion.div>

          {/* Large Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-5xl leading-[1.08]"
          >
            Designed for those who appreciate <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-300 dark:to-neutral-600 bg-clip-text text-transparent">purity.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl font-normal leading-relaxed"
          >
            Discover minimalist luxury tech, architectural furniture, fine apparel, and audiophile gear. Form meets engineering precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <Link to="/shop" className="w-full sm:w-auto">
              <Button size="lg" fullWidth className="gap-2 shadow-apple-md">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" fullWidth>
                Explore Story
              </Button>
            </Link>
          </motion.div>

          {/* Floating Hero Showcase Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-5xl mt-12 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-apple-lg bg-neutral-100 dark:bg-neutral-900/50 aspect-[16/9] sm:aspect-[21/9]"
          >
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80"
              alt="AURA Sound Studio Headphones"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10 text-left">
              <div className="space-y-2 text-white max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300">Flagship Innovation</span>
                <h3 className="text-2xl sm:text-4xl font-bold">AURA Sound Studio Pro</h3>
                <p className="text-xs sm:text-sm text-neutral-300 hidden sm:block">
                  Custom-engineered titanium drivers, 50-hour lossless wireless acoustics, and zero-distortion active noise cancellation.
                </p>
                <div className="pt-2">
                  <Link to="/product/1">
                    <button className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors">
                      Discover $349 →
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Floating Pill Widget Left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex items-center gap-3 absolute top-8 left-8 p-3 rounded-2xl glass-panel text-left shadow-apple-md"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Same-Day Express</p>
                <p className="text-[10px] text-neutral-400">Available in major cities</p>
              </div>
            </motion.div>

            {/* Floating Pill Widget Right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden lg:flex items-center gap-3 absolute bottom-12 right-8 p-3 rounded-2xl glass-panel text-left shadow-apple-md"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">2-Year Official Care</p>
                <p className="text-[10px] text-neutral-400">International hardware coverage</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
