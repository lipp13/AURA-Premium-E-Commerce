import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Your Wishlist is Empty</h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          Save your favorite architectural design pieces to view or purchase them later.
        </p>
        <Link to="/shop">
          <Button size="lg" className="gap-2">
            Discover Products <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Your personal collection of bookmarked design items.
          </p>
        </div>

        <Button variant="ghost" onClick={clearWishlist} className="gap-2 text-rose-500 hover:text-rose-600">
          <Trash2 className="w-4 h-4" /> Clear All
        </Button>
      </div>

      <ProductGrid products={wishlist} />
    </div>
  );
};
