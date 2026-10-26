import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Leaf, Coins, FlaskConical, HeartPulse } from 'lucide-react';
import { CORE_VALUES } from '../data/products';

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-amber-700" />,
  Sparkles: <Sparkles className="w-6 h-6 text-emerald-700" />,
  Leaf: <Leaf className="w-6 h-6 text-green-700" />,
  Coins: <Coins className="w-6 h-6 text-amber-700" />,
  FlaskConical: <FlaskConical className="w-6 h-6 text-emerald-700" />,
  HeartPulse: <HeartPulse className="w-6 h-6 text-rose-700" />,
};

export const CoreValues: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f6] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3 py-1 bg-emerald-100/80 text-emerald-900 text-xs font-bold rounded-full uppercase tracking-widest">
            Our Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 leading-tight">
            The principles that guide Illumea in delivering safe, effective, and affordable skincare.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From our founding roots in Italy to manufacturing excellence in Sri Lanka, we adhere to uncompromising safety, biological purity, and clinical efficacy.
          </p>
        </div>

        {/* 7 Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_VALUES.map((item, index) => (
            <div
              key={item.title}
              className={`p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group ${
                index === 6 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f4f1ea] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ICON_MAP[item.icon] || <Sparkles className="w-6 h-6 text-emerald-700" />}
                </div>

                <h3 className="text-xl font-serif-title font-bold text-stone-900 group-hover:text-[#1b3b22] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                <span>100% Guaranteed Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
