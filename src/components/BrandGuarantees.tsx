import React from 'react';
import { Truck, BadgeCheck, RotateCcw, Lock, ArrowRight } from 'lucide-react';
import { BRAND_GUARANTEES, PARTNERS } from '../data/products';

interface BrandGuaranteesProps {
  onShopClick: () => void;
}

export const BrandGuarantees: React.FC<BrandGuaranteesProps> = ({ onShopClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-6 h-6 text-emerald-700" />;
      case 'BadgeCheck':
        return <BadgeCheck className="w-6 h-6 text-amber-700" />;
      case 'RotateCcw':
        return <RotateCcw className="w-6 h-6 text-emerald-700" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-stone-700" />;
      default:
        return <BadgeCheck className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Heading & CTA */}
        <div className="bg-[#fcfaf7] rounded-3xl p-8 sm:p-12 border border-stone-200/80 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Popular Brand
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-900">
              Where Beauty Meets Empowerment.
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg">
              Embrace holistic wellness and skin vitality backed by world-standard herbal integrity.
            </p>
          </div>

          <button
            onClick={onShopClick}
            className="px-8 py-3.5 bg-[#1b3b22] hover:bg-[#142d1a] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <span>Shop Now!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Brand Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_GUARANTEES.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-stone-50/60 border border-stone-200/60 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col items-center sm:items-start text-center sm:text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center shadow-2xs mb-4">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Partners Carousel / Strip */}
        <div className="mt-16 pt-10 border-t border-stone-100 text-center">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
            Trusted By Professional Salons & Skincare Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="font-serif tracking-widest text-lg sm:text-xl font-bold uppercase text-stone-600 hover:text-emerald-900 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
