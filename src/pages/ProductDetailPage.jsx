import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProductGrid } from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useToast } from '../context/ToastContext';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check, Plus, Scale } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id)) || products[0];

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { addToast } = useToast();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      window.scrollTo(0, 0);
      setSelectedImg(0);
      if (product.colors) setSelectedColor(product.colors[0]);
      if (product.sizes) setSelectedSize(product.sizes[0]);
    }
  }, [id]);

  // Frequently Bought Together suggestion item
  const bundleProduct = products.find(p => p.id !== product.id && p.category === product.category) || products[1];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    addToast(`Added ${quantity}x "${product.title}" to cart`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart');
  };

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor, selectedSize);
    addToCart(bundleProduct, 1);
    addToast(`Added 2-item bundle to cart!`, 'success');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumb items={[
        { label: 'Shop', link: '/shop' },
        { label: product.category, link: `/shop?category=${product.categorySlug}` },
        { label: product.title }
      ]} />

      {/* Top Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Gallery */}
        <div className="space-y-4 sticky top-28">
          <div className="w-full h-[450px] sm:h-[550px] rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-apple-md relative group">
            <img
              src={product.images[selectedImg] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {product.isFlashSale && (
              <div className="absolute top-4 left-4">
                <Badge variant="sale">-{product.discountPercentage}% Flash Sale</Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImg === idx
                    ? 'border-neutral-900 dark:border-white scale-105 shadow-apple-sm'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              <span>{product.brand}</span>
              <span className="text-emerald-500 font-bold">In Stock ({product.stock} units available)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              {product.title}
            </h1>

            {/* Ratings & Sold */}
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mt-3">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-sm text-neutral-900 dark:text-white">{product.rating}</span>
              </div>
              <span>•</span>
              <span>{product.reviewCount} Reviews</span>
              <span>•</span>
              <span>{product.soldCount} Units Sold</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-neutral-400 line-through">
                ${product.oldPrice}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500">
                Save {product.discountPercentage}% Instant
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Select Finish / Color
              </label>
              <div className="flex gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === col ? 'border-neutral-900 dark:border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col }}
                  >
                    {selectedColor === col && <Check className="w-4 h-4 text-white mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Select Size
              </label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent shadow-apple-sm'
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
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Quantity
            </label>
            <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 p-1 bg-neutral-50 dark:bg-neutral-900">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm font-semibold"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm font-semibold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button fullWidth size="lg" onClick={handleAddToCart} className="gap-2">
                <ShoppingBag className="w-5 h-5" /> Add to Shopping Bag
              </Button>
              <Button fullWidth size="lg" variant="secondary" onClick={handleBuyNow}>
                Express Buy Now
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => {
                  toggleWishlist(product);
                  addToast(isFavorite ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-semibold transition-colors ${
                  isFavorite
                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                {isFavorite ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button
                onClick={() => {
                  const res = addToCompare(product);
                  addToast(res.message, res.success ? 'success' : 'error');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-semibold transition-colors ${
                  isCompared
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Scale className="w-4 h-4" />
                {isCompared ? 'In Compare List' : 'Compare Specs'}
              </button>
            </div>
          </div>

          {/* Delivery & Warranty guarantee boxes */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-neutral-900 dark:text-white" />
              <span className="font-semibold text-neutral-900 dark:text-white">Free Express</span>
              <span>2-3 Business Days</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-neutral-900 dark:text-white" />
              <span className="font-semibold text-neutral-900 dark:text-white">2-Year Official</span>
              <span>Full Replacement</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="w-5 h-5 text-neutral-900 dark:text-white" />
              <span className="font-semibold text-neutral-900 dark:text-white">30 Days</span>
              <span>Free Returns</span>
            </div>
          </div>

        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <section className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-sm">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">
          Frequently Bought Together
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <Plus className="w-6 h-6 text-neutral-400 flex-shrink-0" />
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
              <img src={bundleProduct.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{product.title} + {bundleProduct.title}</h4>
              <p className="text-xs text-neutral-400 mt-1">Combine for unified aesthetic perfection.</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-lg font-bold text-neutral-900 dark:text-white">
                  ${product.price + bundleProduct.price}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  ${(product.price + bundleProduct.price * 1.15).toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          <Button onClick={handleAddBundle} variant="secondary" className="gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" /> Add Bundle to Bag
          </Button>
        </div>
      </section>

      {/* Tabbed Specs & Customer Reviews */}
      <section className="space-y-6">
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-8">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'specs'
                ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white'
                : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white'
                : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm">
                <span className="text-neutral-500 font-medium">{key}</span>
                <span className="font-bold text-neutral-900 dark:text-white">{val}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="text-center pr-6 border-r border-neutral-200 dark:border-neutral-800">
                <span className="text-5xl font-extrabold text-neutral-900 dark:text-white">{product.rating}</span>
                <div className="flex gap-0.5 text-amber-400 justify-center my-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-xs text-neutral-400">Based on {product.reviewCount} verified reviews</span>
              </div>
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <span>5 Star</span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-amber-400 w-[85%]" />
                  </div>
                  <span>85%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>4 Star</span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-amber-400 w-[12%]" />
                  </div>
                  <span>12%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Related Products
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};
