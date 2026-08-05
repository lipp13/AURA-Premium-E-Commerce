import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { ShieldCheck, CreditCard, Landmark, Wallet, Truck, CheckCircle2, ArrowRight, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const { cart, grandTotal, clearCart } = useCart();
  const { currentUser, isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Success

  // Form State
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  });

  useEffect(() => {
    if (currentUser) {
      const parts = (currentUser.name || '').split(' ');
      setShippingData({
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || '',
        email: currentUser.email || '',
        address: currentUser.address || 'Via Montenapoleone 8',
        city: currentUser.city || 'Milan',
        country: currentUser.country || 'Italy',
        zip: currentUser.zip || '20121',
      });
    }
  }, [currentUser]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
  });

  const handleInputChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Trigger celebration confetti blast!
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback if canvas canvas-confetti context is empty
    }

    setStep(4);
    clearCart();
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">No active checkout session</h2>
        <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Wizard Steps Bar */}
      {step !== 4 && (
        <div className="flex items-center justify-between max-w-xl mx-auto border-b border-neutral-200 dark:border-neutral-800 pb-6 text-xs font-bold uppercase tracking-wider">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'bg-neutral-200 dark:bg-neutral-800'}`}>1</span>
            <span>Shipping</span>
          </div>
          <span className="text-neutral-300">------</span>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'bg-neutral-200 dark:bg-neutral-800'}`}>2</span>
            <span>Payment</span>
          </div>
          <span className="text-neutral-300">------</span>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : 'bg-neutral-200 dark:bg-neutral-800'}`}>3</span>
            <span>Review</span>
          </div>
        </div>
      )}

      {/* STEP 1: Shipping Information */}
      {step === 1 && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-apple-md">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Shipping Address & Contact
            </h2>
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-xs font-bold text-neutral-900 dark:text-white underline hover:opacity-80 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Masuk Akun</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={shippingData.firstName} onChange={handleInputChange} />
            <Input label="Last Name" name="lastName" value={shippingData.lastName} onChange={handleInputChange} />
          </div>

          <Input label="Email Address" type="email" name="email" value={shippingData.email} onChange={handleInputChange} />
          <Input label="Street Address" name="address" value={shippingData.address} onChange={handleInputChange} />

          <div className="grid grid-cols-3 gap-4">
            <Input label="City" name="city" value={shippingData.city} onChange={handleInputChange} />
            <Input label="Country" name="country" value={shippingData.country} onChange={handleInputChange} />
            <Input label="Zip Code" name="zip" value={shippingData.zip} onChange={handleInputChange} />
          </div>

          <Button fullWidth size="lg" onClick={() => setStep(2)}>
            Continue to Payment →
          </Button>
        </div>
      )}

      {/* STEP 2: Payment Method */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-apple-md">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Select Payment Method
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'card', name: 'Credit Card', icon: CreditCard },
              { id: 'bank', name: 'Bank Transfer', icon: Landmark },
              { id: 'cod', name: 'Cash on Delivery', icon: Truck },
              { id: 'ewallet', name: 'E-Wallet', icon: Wallet },
            ].map(method => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border flex items-center gap-3 transition-all text-xs font-bold ${
                    paymentMethod === method.id
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent shadow-apple-sm'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{method.name}</span>
                </button>
              );
            })}
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4 pt-2">
              <Input label="Card Number" value={cardData.cardNumber} onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" value={cardData.expDate} onChange={(e) => setCardData({...cardData, expDate: e.target.value})} />
                <Input label="CVV" value={cardData.cvv} onChange={(e) => setCardData({...cardData, cvv: e.target.value})} />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button variant="outline" fullWidth onClick={() => setStep(1)}>
              ← Back
            </Button>
            <Button fullWidth onClick={() => setStep(3)}>
              Review Order →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Order Review */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-apple-md">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Final Order Review
          </h2>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
            <p className="font-bold text-sm text-neutral-900 dark:text-white">Shipping To:</p>
            <p>{shippingData.firstName} {shippingData.lastName} — {shippingData.address}, {shippingData.city}, {shippingData.country}</p>
            <p className="font-bold text-sm text-neutral-900 dark:text-white pt-2">Payment Method:</p>
            <p className="uppercase">{paymentMethod}</p>
          </div>

          <div className="space-y-3 max-h-48 overflow-y-auto no-scrollbar">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span>{item.quantity}x {item.product.title}</span>
                <span className="font-bold">${item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xl font-bold border-t border-neutral-200 dark:border-neutral-800 pt-4">
            <span>Total Payable</span>
            <span>${grandTotal}</span>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" fullWidth onClick={() => setStep(2)}>
              ← Back
            </Button>
            <Button fullWidth size="lg" onClick={handlePlaceOrder}>
              Complete Order ${grandTotal}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Order Confirmed Screen */}
      {step === 4 && (
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-apple-lg">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Order Confirmed!
          </h2>

          <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            Thank you for purchasing with AURA. Your order confirmation <span className="font-mono text-neutral-900 dark:text-white font-bold">#AU-{Math.floor(100000 + Math.random() * 900000)}</span> has been sent to {shippingData.email}.
          </p>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 text-xs text-neutral-500 space-y-1">
            <p className="font-bold text-neutral-900 dark:text-white">Estimated Delivery Window</p>
            <p>August 6, 2026 — August 8, 2026</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button fullWidth onClick={() => navigate('/dashboard')}>
              Track Order in Dashboard
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
