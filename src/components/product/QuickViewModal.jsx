import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Star, ShoppingBag, Heart, Check, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isFavorite = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    addToast(`Added ${quantity}x "${product.title}" to cart`, 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="w-full h-80 rounded-2xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <img
              src={product.images[selectedImg] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImg === idx ? 'border-neutral-900 dark:border-white scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-neutral-500">{product.brand}</span>
              <div className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400">({product.reviewCount})</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-base text-neutral-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
              {product.description}
            </p>

            {/* Colors picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                  Color Options
                </label>
                <div className="flex gap-2">
                  {product.colors.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === col ? 'border-neutral-900 dark:border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    >
                      {selectedColor === col && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Quantity
              </label>
              <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button fullWidth onClick={handleAdd} className="gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </Button>
              <button
                onClick={() => {
                  toggleWishlist(product);
                  addToast(isFavorite ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
                }}
                className={`p-3 rounded-full border border-neutral-200 dark:border-neutral-800 transition-colors ${
                  isFavorite ? 'bg-rose-500 text-white border-rose-500' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="block text-center text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline pt-1"
            >
              View Full Details & Specifications →
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
