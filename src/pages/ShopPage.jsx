import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { brands } from '../data/brands';
import { ProductGrid } from '../components/product/ProductGrid';
import { Pagination } from '../components/common/Pagination';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { LayoutGrid, List, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Layout mode: 'grid' or 'list'
  const [layout, setLayout] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters State
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(4000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Sort Option
  const [sortBy, setSortBy] = useState('popular');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync category state when URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Filter
      if (selectedCategory !== 'all') {
        const catObj = categories.find(c => c.id === selectedCategory);
        if (catObj && p.category.toLowerCase() !== catObj.name.toLowerCase()) return false;
      }
      // Brand Filter
      if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      // Price Filter
      if (p.price > priceRange) return false;
      // Rating Filter
      if (p.rating < minRating) return false;
      // In Stock
      if (inStockOnly && p.stock <= 0) return false;
      // On Sale
      if (onSaleOnly && !p.isFlashSale && !p.oldPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return b.soldCount - a.soldCount; // Popularity
    });
  }, [selectedCategory, selectedBrand, priceRange, minRating, inStockOnly, onSaleOnly, sortBy]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange(4000);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('popular');
    setCurrentPage(1);
    setSearchParams({});
  };

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (priceRange < 4000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={[{ label: 'Shop Catalog' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Shop Catalog
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Showing {filteredProducts.length} premium products available for instant shipping.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-2 pr-9 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Layout Grid / List Switcher */}
          <div className="hidden sm:flex items-center p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-full transition-colors ${layout === 'grid' ? 'bg-white dark:bg-neutral-900 shadow-apple-sm text-black dark:text-white' : 'text-neutral-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-full transition-colors ${layout === 'list' ? 'bg-white dark:bg-neutral-900 shadow-apple-sm text-black dark:text-white' : 'text-neutral-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 sticky top-28 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Filters
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-3">
              Categories
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto no-scrollbar pr-1">
              <button
                onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-60">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              <span>Max Price</span>
              <span className="text-neutral-900 dark:text-white font-mono">${priceRange}</span>
            </div>
            <input
              type="range"
              min="50"
              max="4000"
              step="50"
              value={priceRange}
              onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
              className="w-full accent-neutral-900 dark:accent-white cursor-pointer"
            />
          </div>

          {/* Brand Filter */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-1.5">
              {[0, 4, 4.5].map((stars) => (
                <button
                  key={stars}
                  onClick={() => { setMinRating(stars); setCurrentPage(1); }}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    minRating === stars
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {stars === 0 ? 'All' : `${stars}+ ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
                className="rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-0"
              />
              <span>In Stock Items Only</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => { setOnSaleOnly(e.target.checked); setCurrentPage(1); }}
                className="rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-0"
              />
              <span>Discounted / Flash Sale Only</span>
            </label>
          </div>
        </aside>

        {/* Product Catalog Display */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Active Filter Tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs text-neutral-400 font-medium">Active:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium">
                  Cat: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium">
                  Brand: {selectedBrand}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('all')} />
                </span>
              )}
              {priceRange < 4000 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium">
                  Under ${priceRange}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(4000)} />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-500 font-semibold hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid / List */}
          <ProductGrid
            products={currentProducts}
            layout={layout}
            emptyMessage="Try clearing some filter criteria to discover more products."
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 200, behavior: 'smooth' });
            }}
          />
        </main>
      </div>
    </div>
  );
};
