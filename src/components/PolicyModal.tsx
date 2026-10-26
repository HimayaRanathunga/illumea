import React from 'react';
import { X, ShieldCheck, FileText, RotateCcw } from 'lucide-react';

interface PolicyModalProps {
  policyType: 'refund' | 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            {policyType === 'refund' && <RotateCcw className="w-5 h-5 text-emerald-800" />}
            {policyType === 'terms' && <FileText className="w-5 h-5 text-emerald-800" />}
            {policyType === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-800" />}
            <h2 className="text-lg font-bold text-stone-900">
              {policyType === 'refund' && 'Refund & Returns Policy'}
              {policyType === 'terms' && 'Terms and Conditions'}
              {policyType === 'privacy' && 'Privacy Policy'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-stone-600 space-y-4 leading-relaxed">
          {policyType === 'refund' && (
            <>
              <p>
                At <strong>Illumea Skin Care</strong> (operated under Sansu International Pvt Ltd), customer satisfaction is our top priority. We offer a 30-day return policy for unused, unopened items in original packaging.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">Eligibility for Returns:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Items must be returned within 30 days of the purchase date.</li>
                <li>Product seal and original packaging must be intact and undamaged.</li>
                <li>In case of allergic reaction or defective pump/jar, contact our support team with photographic proof within 7 days.</li>
              </ul>
              <h4 className="font-bold text-stone-900 text-sm">Refund Process:</h4>
              <p>
                Approved refunds will be processed via direct bank transfer or store credit within 3 to 5 business days upon receiving the returned product at our Kandy branch.
              </p>
            </>
          )}

          {policyType === 'terms' && (
            <>
              <p>
                Welcome to <strong>Illumea.lk</strong>. By purchasing from our website or authorized representatives, you agree to comply with our Terms of Service.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">1. Product Usage:</h4>
              <p>
                All Illumea products are manufactured strictly in compliance with NMRA and GMP standards. Always conduct a small patch test before full facial application.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">2. Islandwide Delivery:</h4>
              <p>
                Orders are dispatched from Kandy, Sri Lanka. Standard delivery takes 1-3 business days within Western & Central provinces, and 2-4 business days for outstation areas.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">3. Pricing & Offers:</h4>
              <p>
                All prices are stated in Sri Lankan Rupees (රු / LKR). We reserve the right to modify promotional discounts or product bundles at our discretion.
              </p>
            </>
          )}

          {policyType === 'privacy' && (
            <>
              <p>
                Sansu International Pvt Ltd and Illumea Skin Care are committed to safeguarding your privacy.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">Information We Collect:</h4>
              <p>
                We only collect necessary personal details (name, delivery address, phone number, and email) required to process and dispatch your cosmetics order safely.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">Data Protection:</h4>
              <p>
                Your personal details are never sold, rented, or shared with unauthorized third parties. We use industry-standard encryption for all digital transactions.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1b3b22] text-white rounded-xl text-xs font-semibold hover:bg-[#142d1a] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
