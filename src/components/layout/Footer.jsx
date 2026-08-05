import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#090909] text-neutral-600 dark:text-neutral-400 pt-16 pb-12 transition-colors">
      
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Complimentary Delivery</h4>
              <p className="text-xs text-neutral-500">Free global shipping on orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">2-Year Official Care</h4>
              <p className="text-xs text-neutral-500">Full warranty & hardware coverage</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">30-Day Free Return</h4>
              <p className="text-xs text-neutral-500">No questions asked return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Concierge 24/7</h4>
              <p className="text-xs text-neutral-500">Instant expert technical support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
        
        {/* Brand Column */}
        <div className="col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm">
              A
            </div>
            <span className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">
              AURA
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm text-neutral-500 dark:text-neutral-400">
            A minimalist e-commerce platform designed around pure function, timeless aesthetics, and uncompromising engineering.
          </p>
          <div className="pt-2 text-xs text-neutral-400">
            Designed with Apple design principles in Stockholm & California.
          </div>
        </div>

        {/* Column 1: Products */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
            Explore
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop?category=electronics" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Electronics</Link></li>
            <li><Link to="/shop?category=fashion" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Fashion</Link></li>
            <li><Link to="/shop?category=gaming" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Gaming</Link></li>
            <li><Link to="/shop?category=furniture" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Furniture</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
            Company
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Press Kit</Link></li>
            <li><Link to="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Sustainability</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & Support */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
            Support
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/dashboard" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Order Status</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Shipping Info</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <p>© 2026 AURA Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
            Instagram <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
            Twitter / X <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
            LinkedIn <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
