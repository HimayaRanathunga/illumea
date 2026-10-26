import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, ShieldCheck, Truck, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCheckoutOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProduct) return null;

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setAddedNotice(false);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleDirectWhatsApp = () => {
    const totalAmount = selectedProduct.price * quantity;
    const text = encodeURIComponent(
      `Hello Illumea Skincare!\n\nI want to place an order directly:\n*Product:* ${selectedProduct.name} (${selectedProduct.size})\n*Quantity:* ${quantity}\n*Total:* Rs. ${totalAmount.toLocaleString()}\n\nPlease send me the delivery confirmation.`
    );
    window.open(`https://wa.me/94766503330?text=${text}`, '_blank');
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    handleClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Image & Badges Column */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#f9f7f2] to-[#f4f0e6] p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-stone-200">
            {selectedProduct.isBestSeller && (
              <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Best Seller
              </span>
            )}

            <div className="w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-md"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (selectedProduct.id.includes('night-cream')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-03-at-09.21.26_c94d0d8d.jpg';
                  } else if (selectedProduct.id.includes('charcoal')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-03-at-09.21.29_0537fe56.jpg';
                  } else if (selectedProduct.id.includes('anti-aging')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-03-at-09.21.27_ea14ca41.jpg';
                  } else if (selectedProduct.id.includes('pigment')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.07_4c1f48af.jpg';
                  } else if (selectedProduct.id.includes('lotion')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.05_5947221c.jpg';
                  } else if (selectedProduct.id.includes('day-cream')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.06_8f90bb2e.jpg';
                  } else if (selectedProduct.id.includes('toner')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.06_dbe5060c.jpg';
                  } else if (selectedProduct.id.includes('scrub')) {
                    target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.08_2504f0a9.jpg';
                  } else {
                    target.src = '/images/night-cream.jpg';
                  }
                }}
              />
            </div>

            <div className="w-full mt-6 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200/60 shadow-2xs">
                <span className="block font-bold text-stone-800">Net Volume</span>
                <span className="text-stone-500">{selectedProduct.size}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-stone-200/60 shadow-2xs">
                <span className="block font-bold text-emerald-800">100% Herbal</span>
                <span className="text-stone-500">GMP Certified</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-900">{selectedProduct.rating}</span>
                  <span className="text-stone-400">({selectedProduct.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-stone-900">
                {selectedProduct.name}
              </h2>

              <p className="text-sm text-stone-500 italic">
                {selectedProduct.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-[#1b3b22]">
                  රු {selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <>
                    <span className="text-base text-stone-400 line-through">
                      රු {selectedProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Save ਰු {(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Tabbed Info (Benefits / Ingredients / Usage) */}
            <div className="border-t border-b border-stone-200 py-4">
              <div className="flex border-b border-stone-200 pb-2 gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-1 transition ${
                    activeTab === 'benefits'
                      ? 'text-[#1b3b22] border-b-2 border-[#1b3b22]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Key Benefits
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-1 transition ${
                    activeTab === 'ingredients'
                      ? 'text-[#1b3b22] border-b-2 border-[#1b3b22]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Herbal Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-1 transition ${
                    activeTab === 'usage'
                      ? 'text-[#1b3b22] border-b-2 border-[#1b3b22]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  How to Use
                </button>
              </div>

              <div className="pt-3 min-h-[90px]">
                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {selectedProduct.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md text-xs border border-stone-200"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'usage' && (
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {selectedProduct.usage}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector & Actions */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#1b3b22] hover:bg-[#142d1a] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs transition shadow-xs"
                >
                  Buy Now (Instant Checkout)
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NMRA Approved
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" /> Islandwide Delivery
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" /> 30-Day Guarantee
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
