import React from 'react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Scale, X, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareList.length === 0) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
          <Scale className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">No Products to Compare</h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          Add up to 4 products from the shop catalog to compare their technical specifications side-by-side.
        </p>
        <Link to="/shop">
          <Button size="lg" className="gap-2">
            Browse Catalog <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  // Collect all unique specification keys
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap(item => Object.keys(item.specifications || {})))
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb items={[{ label: 'Compare Products' }]} />

      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Compare Specs ({compareList.length}/4)
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Side-by-side technical matrix evaluation.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clearCompare}>
          Clear Matrix
        </Button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto no-scrollbar rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-apple-md">
        <table className="w-full min-w-[700px] text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="p-6 w-1/5 bg-neutral-50 dark:bg-neutral-950 font-bold uppercase tracking-wider text-xs text-neutral-400">
                Products
              </th>
              {compareList.map((product) => (
                <th key={product.id} className="p-6 relative min-w-[200px] align-top">
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <img src={product.images[0]} alt="" className="w-full h-36 object-cover rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{product.brand}</span>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white line-clamp-1">{product.title}</h4>
                      <p className="text-base font-extrabold text-neutral-900 dark:text-white mt-1">${product.price}</p>
                    </div>
                    <Button size="sm" fullWidth onClick={() => addToCart(product)} className="gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {/* Rating row */}
            <tr>
              <td className="p-4 bg-neutral-50 dark:bg-neutral-950 font-bold text-xs text-neutral-500 uppercase">
                Customer Rating
              </td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{p.rating}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Category row */}
            <tr>
              <td className="p-4 bg-neutral-50 dark:bg-neutral-950 font-bold text-xs text-neutral-500 uppercase">
                Category
              </td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 text-neutral-700 dark:text-neutral-300 font-semibold">
                  {p.category}
                </td>
              ))}
            </tr>

            {/* Specs rows */}
            {allSpecKeys.map((key) => (
              <tr key={key}>
                <td className="p-4 bg-neutral-50 dark:bg-neutral-950 font-bold text-xs text-neutral-500 uppercase">
                  {key}
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-4 text-neutral-600 dark:text-neutral-400">
                    {p.specifications[key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
