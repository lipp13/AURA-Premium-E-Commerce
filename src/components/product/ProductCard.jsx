import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, Scale } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useToast } from '../../context/ToastContext';

export const ProductCard = ({ product, onQuickView, layout = 'grid' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { addToast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.title}" to cart`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(isFavorite ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = addToCompare(product);
    addToast(res.message, res.success ? 'success' : 'error');
  };

  if (layout === 'list') {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        className="group relative flex flex-col sm:flex-row items-center gap-6 p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-apple-sm hover:shadow-apple-md"
      >
        <div className="relative w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
          <img
            src={product.images[0]}
            alt={product.title}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {product.isFlashSale && (
            <div className="absolute top-3 left-3">
              <Badge variant="sale">Flash Sale</Badge>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2 text-left w-full">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-semibold uppercase tracking-wider text-neutral-500">{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs text-amber-500 font-medium">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-neutral-400">({product.reviewCount} reviews)</span>
            <span className="text-neutral-400">• {product.soldCount} sold</span>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCompare}
                className={`p-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 transition-colors ${
                  isCompared ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="Compare product"
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 transition-colors ${
                  isFavorite ? 'bg-rose-500 text-white border-rose-500' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-apple-sm hover:shadow-apple-md overflow-hidden"
    >
      {/* Top Badges & Favorite Button */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1 pointer-events-auto">
          {product.isFlashSale && <Badge variant="sale">-{product.discountPercentage}%</Badge>}
          {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {product.isNewArrival && <Badge variant="new">New</Badge>}
        </div>
        <button
          onClick={handleWishlistToggle}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all shadow-apple-sm ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-300 hover:scale-110'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Image Container with Hover Quick View */}
      <div className="relative w-full h-64 bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden flex items-center justify-center p-4">
        <Link to={`/product/${product.id}`} className="w-full h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 rounded-2xl"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Hover overlay action bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView && onQuickView(product);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white text-xs font-medium backdrop-blur-md shadow-apple-sm hover:bg-white dark:hover:bg-neutral-800 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            onClick={handleCompare}
            className={`p-2 rounded-full backdrop-blur-md shadow-apple-sm transition-all ${
              isCompared
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800'
            }`}
            title="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-neutral-500">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-apple-sm"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
