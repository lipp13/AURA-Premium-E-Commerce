import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../common/Skeleton';
import { QuickViewModal } from './QuickViewModal';

export const ProductGrid = ({
  products = [],
  loading = false,
  layout = 'grid',
  emptyMessage = 'No products match your selected criteria.'
}) => {
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  if (loading) {
    return (
      <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">No Products Found</h4>
        <p className="text-sm text-neutral-500 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            layout={layout}
            onQuickView={(p) => setSelectedQuickView(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={selectedQuickView}
        isOpen={Boolean(selectedQuickView)}
        onClose={() => setSelectedQuickView(null)}
      />
    </>
  );
};
