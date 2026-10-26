import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'values', label: 'Core Values' },
    { id: 'why-us', label: 'Why Illumea' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1b3b22] text-[#f7e7ce] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">100% Herbal Skincare • Formulated in Italy • Crafted for Sri Lanka</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="hidden md:inline-flex items-center gap-1 opacity-90">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> NMRA & GMP Certified Safe
            </span>
            <a
              href="https://wa.me/94766503330"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Hotline / WhatsApp: <strong className="text-white">+94 76 650 3330</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <img
              src="/images/logo.png"
              alt="ILLUMEA SKIN CARE"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                // fallback if local file fails
                const target = e.currentTarget;
                if (!target.src.includes('wp-content')) {
                  target.src = 'https://illumea.lk/wp-content/uploads/2025/09/logo-1.png';
                }
              }}
            />
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-widest text-[#985e23] font-semibold">
                Sansu International
              </div>
              <div className="text-[11px] text-stone-500 font-serif italic">
                Pure Natural Glow
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === link.id
                    ? 'text-[#1b3b22] bg-emerald-50/80 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-[#1b3b22] hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Input Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-stone-100 rounded-full pl-3 pr-2 py-1.5 border border-stone-200 animate-fade-in">
                  <Search className="w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search herbal products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== 'shop') setActiveTab('shop');
                    }}
                    autoFocus
                    className="w-36 sm:w-48 bg-transparent text-sm px-2 focus:outline-none text-stone-800"
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="p-1 hover:bg-stone-200 rounded-full"
                  >
                    <X className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search"
                  className="p-2 text-stone-600 hover:text-[#1b3b22] hover:bg-stone-100 rounded-full transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Consultation CTA */}
            <a
              href="https://wa.me/94766503330?text=Hello%20Illumea%2C%20I%20would%20like%20a%20free%20skincare%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-300 bg-amber-50/60 text-[#854d0e] text-xs font-semibold hover:bg-amber-100/80 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Skin Advice</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#1b3b22] text-white hover:bg-[#142d1a] rounded-full transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-black rounded-lg hover:bg-stone-100"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <div className="pb-2 mb-2 border-b border-stone-100">
            <input
              type="text"
              placeholder="Search herbal creams, packs, toners..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTab('shop');
              }}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === link.id
                  ? 'bg-emerald-50 text-[#1b3b22] font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href="https://wa.me/94766503330"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow-xs"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Specialist (+94 76 650 3330)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
