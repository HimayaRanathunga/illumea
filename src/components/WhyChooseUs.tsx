import React from 'react';
import { CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/products';

interface WhyChooseUsProps {
  onContactClick: () => void;
  onShopClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onContactClick, onShopClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#faf9f6] via-[#f7f4ed] to-[#faf9f6] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-widest">
            Why Choose Illumea?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 leading-tight">
            Skincare you can trust — safe, effective, and naturally inspired.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            At Illumea, we believe in blending nature and science to deliver skincare that’s gentle yet powerful. Every product is carefully formulated with premium herbal ingredients, manufactured to the highest GMP standards, and designed to bring visible results while keeping your skin safe and healthy.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1b3b22] group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-stone-900 font-serif-title">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Callout Banner */}
        <div className="relative rounded-3xl bg-[#1b3b22] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Enhance Your Natural Beauty Today
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white">
                Join the Illumea family and experience the perfect blend of nature and science.
              </h3>
              <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Our products are 100% herbal, free from harmful chemicals, and designed to bring out your natural glow. Have questions about which cream or routine is right for your skin type? Our skincare experts in Kandy provide free, personalized advice.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="https://wa.me/94766503330?text=Hello%20Illumea%2C%20I%20would%20like%20a%20free%20skincare%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Free WhatsApp Consultation</span>
              </a>

              <button
                onClick={onShopClick}
                className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md text-center"
              >
                Shop Herbal Range
              </button>

              <button
                onClick={onContactClick}
                className="py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition text-center"
              >
                Contact Customer Care
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
