import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { FAQSection } from '../components/home/FAQSection';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your inquiry has been sent to our concierge desk.', 'success');
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <Breadcrumb items={[{ label: 'Contact Support' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-apple-md">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Concierge Desk</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1">
              Get in Touch
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Our technical specialist team responds within 2 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              Thank you! Message received. An AURA specialist will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" required />
                <Input label="Last Name" required />
              </div>
              <Input label="Email Address" type="email" required />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="How may our team assist your order or technical inquiry?"
                  className="w-full rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </div>
              <Button type="submit" fullWidth size="lg" className="gap-2">
                <Send className="w-4 h-4" /> Transmit Message
              </Button>
            </form>
          )}
        </div>

        {/* Info & Global Map Placeholder */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left space-y-2">
              <Mail className="w-5 h-5 text-neutral-900 dark:text-white" />
              <h4 className="text-xs font-bold uppercase text-neutral-400">Email Us</h4>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">support@aura.design</p>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left space-y-2">
              <Phone className="w-5 h-5 text-neutral-900 dark:text-white" />
              <h4 className="text-xs font-bold uppercase text-neutral-400">Hotline</h4>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">+1 (800) 888-AURA</p>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left space-y-2">
              <MapPin className="w-5 h-5 text-neutral-900 dark:text-white" />
              <h4 className="text-xs font-bold uppercase text-neutral-400">Headquarters</h4>
              <p className="text-xs font-bold text-neutral-900 dark:text-white">Stockholm & Milan</p>
            </div>
          </div>

          {/* Interactive Map Graphic Placeholder */}
          <div className="w-full h-80 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative bg-neutral-200 dark:bg-neutral-800 shadow-apple-md">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80"
              alt="Global Operations Map"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              <div className="text-center p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                <h4 className="font-bold text-lg">AURA Global Studios</h4>
                <p className="text-xs text-neutral-300">Stockholm • Milan • Tokyo • San Francisco</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <FAQSection />
    </div>
  );
};
