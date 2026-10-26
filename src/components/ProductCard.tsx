import React from 'react';
import { ShoppingBag, Eye, Star, Sparkles, MessageCircle } from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useCart();

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello Illumea Skincare, I would like to order:\n\n*Product:* ${product.name} (${product.size})\n*Price:* Rs. ${product.price.toLocaleString()}\n\nPlease let me know the delivery details.`
    );
    window.open(`https://wa.me/94766503330?text=${message}`, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Best Seller
          </span>
        )}
        {product.isDiscount && product.originalPrice && (
          <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            Save රු {(product.originalPrice - product.price).toLocaleString()}
          </span>
        )}
      </div>

      {/* Image Container with Hover Quick View */}
      <div className="relative aspect-square w-full bg-[#fbf9f5] flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-108"
          onError={(e) => {
            const target = e.currentTarget;
            if (product.id.includes('night-cream')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-03-at-09.21.26_c94d0d8d.jpg';
            } else if (product.id.includes('charcoal')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-03-at-09.21.29_0537fe56.jpg';
            } else if (product.id.includes('anti-aging')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-03-at-09.21.27_ea14ca41.jpg';
            } else if (product.id.includes('pigment')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.07_4c1f48af.jpg';
            } else if (product.id.includes('lotion')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.05_5947221c.jpg';
            } else if (product.id.includes('day-cream')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.06_8f90bb2e.jpg';
            } else if (product.id.includes('toner')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.06_dbe5060c.jpg';
            } else if (product.id.includes('scrub')) {
              target.src = 'https://illumea.lk/wp-content/uploads/2025/09/WhatsApp-Image-2025-10-07-at-11.00.08_2504f0a9.jpg';
            } else {
              target.src = '/images/night-cream.jpg';
            }
          }}
        />

        {/* Floating Quick View button on hover */}
        <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="px-3.5 py-2 bg-white text-stone-900 rounded-full text-xs font-semibold shadow-md hover:bg-stone-50 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Size Badge */}
        <span className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-600 px-2 py-0.5 rounded-md border border-stone-200/60 shadow-2xs">
          {product.size}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-emerald-800 tracking-wider uppercase">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-stone-700">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-[#1b3b22] transition-colors">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-[#1b3b22]">
              රු {product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-stone-400 line-through">
                රු {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Order Icon */}
            <button
              onClick={handleWhatsAppOrder}
              title="Order directly via WhatsApp"
              className="p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-full border border-emerald-300 transition"
              aria-label="Order via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-3.5 py-2 bg-[#1b3b22] hover:bg-[#142d1a] text-white rounded-full text-xs font-semibold shadow-xs hover:shadow transition flex items-center gap-1.5"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
