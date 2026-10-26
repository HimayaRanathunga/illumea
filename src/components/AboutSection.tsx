import React from 'react';
import { Award, Leaf, CheckCircle, MapPin, Globe, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onShopClick: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onShopClick, onContactClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full uppercase tracking-widest">
            About Illumea Skin Care
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-stone-900 leading-tight">
            Crafted with Care, Certified for Safety, and Inspired by Nature.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Illumea is a herbal and natural skincare brand operating under <strong>Sansu International Pvt Ltd</strong>, led by Dr. Chaminda Malalasekara. Following a celebrated launch in Italy, Illumea has expanded to Sri Lanka to bring world-class botanical care within everyone's reach.
          </p>
        </div>

        {/* Story Grid: Italy to Sri Lanka */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900">
                From Italian Elegance to Pure Sri Lankan Botanicals
              </h2>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              At Illumea, we believe in blending nature and science to deliver skincare that is gentle yet powerful. Every product is formulated with selected herbal ingredients, manufactured to the highest GMP standards, and designed to bring visible results while keeping your skin safe, healthy, and illuminated.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              Sri Lankan consumers have for years been exposed to harsh chemical bleaching creams that cause irreversible damage. Illumea was founded with a singular conviction: to prove that 100% chemical-free herbal formulations can achieve luminous, spotless, radiant skin without sacrificing safety.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                <Globe className="w-5 h-5 text-emerald-700 mb-1" />
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Global Launch</h4>
                <p className="text-[11px] text-stone-500">Established in Italy, perfected for tropical Asian skin</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                <Award className="w-5 h-5 text-amber-700 mb-1" />
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">NMRA GMP Certified</h4>
                <p className="text-[11px] text-stone-500">Tested and verified by national regulatory authorities</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="bg-gradient-to-tr from-[#1b3b22] to-[#2c5e38] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs uppercase font-bold text-amber-300 tracking-widest">
                The Illumea Promise
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold mt-2 mb-4">
                "Where Beauty Meets Empowerment."
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>100% Herbal Ingredients:</strong> Pure extracts of saffron, licorice, gotu kola, aloe vera, and natural oils.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Bleaching Agents:</strong> No hydroquinone, no mercury, no steroids, no damaging bleaches.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Paraben & Sulfate Free:</strong> Clean, skin-friendly cosmetic formulations.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Cruelty Free:</strong> Ethically sourced and never tested on animals.</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Sansu International Pvt Ltd</div>
                  <div className="text-[11px] text-emerald-200">783 / William Gopallawa Mawatha, Kandy</div>
                </div>
                <MapPin className="w-5 h-5 text-amber-300" />
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1b3b22] flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif-title font-bold text-stone-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To empower men and women in Sri Lanka and across the globe with pure, certified herbal skincare that delivers visible radiance, eliminates pigmentation safely, and respects the delicate biological barrier of the skin.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif-title font-bold text-stone-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To be the most trusted natural cosmetic house in South Asia, championing honest formulations, research-driven botanical chemistry, and sustainable wellness for generations to come.
            </p>
          </div>
        </div>

        {/* Action Call to Action */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-serif-title font-bold text-stone-900">
            Ready to experience natural, safe skincare?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onShopClick}
              className="px-8 py-3.5 bg-[#1b3b22] hover:bg-[#142d1a] text-white font-bold text-sm rounded-full shadow-md transition"
            >
              Browse Shop Collection
            </button>
            <button
              onClick={onContactClick}
              className="px-8 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-sm rounded-full transition"
            >
              Get in Touch
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
