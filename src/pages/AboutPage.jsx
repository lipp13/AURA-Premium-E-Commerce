import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Feather, Globe } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <Breadcrumb items={[{ label: 'About AURA' }]} />

      {/* Hero Story Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Our Story</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
          Form follow function. Minimalist perfection.
        </h1>
        <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
          Founded in Stockholm & California, AURA was created with a singular mission: to eliminate visual noise and build everyday objects that embody pure engineering aesthetic.
        </p>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-apple-lg">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt="AURA Architectural Studio"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Feather className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Uncompromising Precision</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Every edge radius, anodized aluminum component, and fabric tactile response is calibrated with millimetric precision.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Sustainable Footprint</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            100% recycled packaging, carbon-neutral shipping routes, and products designed to endure decades of active use.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Lifetime Warranty Care</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            We stand unreservedly behind our craftsmanship with hardware replacement guarantees and official 2-year care.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-neutral-900 text-white dark:bg-neutral-900 border border-neutral-800 text-center">
        <div>
          <span className="text-3xl sm:text-5xl font-extrabold">120+</span>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Curated Products</p>
        </div>
        <div>
          <span className="text-3xl sm:text-5xl font-extrabold">20</span>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Design Categories</p>
        </div>
        <div>
          <span className="text-3xl sm:text-5xl font-extrabold">45+</span>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Countries Shipped</p>
        </div>
        <div>
          <span className="text-3xl sm:text-5xl font-extrabold">99.8%</span>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Satisfaction Rate</p>
        </div>
      </div>

    </div>
  );
};
