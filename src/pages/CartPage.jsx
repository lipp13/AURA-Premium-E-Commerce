import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Trash2, Bookmark, ArrowRight, ShoppingBag, Tag, Check, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CartPage = () => {
  const {
    cart,
    savedForLater,
    updateQuantity,
    removeFromCart,
    moveToSavedForLater,
    moveToCartFromSaved,
    removeSavedItem,
    coupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    grandTotal,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const res = applyCoupon(couponCode);
    if (res.success) {
      addToast(res.message, 'success');
      setCouponCode('');
    } else {
      addToast(res.message, 'error');
    }
  };

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Your Bag is Empty</h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          Before proceeding to checkout, discover our curated collection of architectural design pieces.
        </p>
        <Link to="/shop">
          <Button size="lg" className="gap-2">
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        Review Your Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Cart Items & Saved For Later */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Cart */}
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-apple-sm"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
                  <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-1 text-left w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {item.product.brand}
                  </span>
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white hover:opacity-75 transition-opacity">
                      {item.product.title}
                    </h3>
                  </Link>

                  <div className="flex gap-4 text-xs text-neutral-500">
                    {item.selectedColor && (
                      <div className="flex items-center gap-1">
                        <span>Color:</span>
                        <span className="w-3 h-3 rounded-full border border-neutral-400" style={{ backgroundColor: item.selectedColor }} />
                      </div>
                    )}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>

                  <div className="text-sm font-bold text-neutral-900 dark:text-white pt-1">
                    ${item.product.price}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 p-1 bg-white dark:bg-neutral-800">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => moveToSavedForLater(item)}
                    className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    title="Save for Later"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="p-2 text-neutral-400 hover:text-rose-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Saved for Later ({savedForLater.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedForLater.map((saved, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex gap-3 items-center">
                    <img src={saved.product.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold truncate">{saved.product.title}</h4>
                      <p className="text-xs text-neutral-400">${saved.product.price}</p>
                      <div className="flex gap-3 mt-2 text-[11px]">
                        <button onClick={() => moveToCartFromSaved(saved)} className="font-bold text-neutral-900 dark:text-white hover:underline">
                          Move to Bag
                        </button>
                        <button onClick={() => removeSavedItem(saved)} className="text-rose-500 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right: Order Summary */}
        <aside className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 sticky top-28 shadow-apple-sm">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-4">
            Order Summary
          </h3>

          {/* Coupon Code Box */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Promo code (e.g. AURA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium focus:outline-none uppercase"
              />
            </div>
            <Button type="submit" size="sm" variant="outline">
              Apply
            </Button>
          </form>

          {coupon && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span>Code '{coupon.code}' (-{coupon.discountPercentage}%)</span>
              <button onClick={removeCoupon} className="text-neutral-400 hover:text-neutral-900">
                Remove
              </button>
            </div>
          )}

          {/* Detailed Calculations */}
          <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-white">${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-500 font-semibold">
                <span>Discount</span>
                <span>-${discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>{shippingFee === 0 ? <span className="text-emerald-500 font-semibold">Free</span> : `$${shippingFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>${tax}</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-baseline font-bold text-lg text-neutral-900 dark:text-white">
            <span>Grand Total</span>
            <span className="text-2xl">${grandTotal}</span>
          </div>

          <Button fullWidth size="lg" onClick={() => navigate('/checkout')} className="gap-2">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted 256-Bit SSL Checkout</span>
          </div>
        </aside>

      </div>
    </div>
  );
};
