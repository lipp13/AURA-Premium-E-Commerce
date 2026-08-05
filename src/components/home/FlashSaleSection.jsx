import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { Zap, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FlashSaleSection = () => {
  const flashProducts = products.filter(p => p.isFlashSale).slice(0, 4);

  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-neutral-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 my-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-rose-400" /> Flash Sale Event
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Limited Hours Drop
          </h2>
        </div>

        {/* Realtime Countdown Timer */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Ends In:</span>
          <div className="flex items-center gap-2 font-mono font-bold text-lg">
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white">
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <span>:</span>
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <span>:</span>
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
