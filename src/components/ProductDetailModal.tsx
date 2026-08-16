import React from 'react';
import { X, MessageSquare, PhoneCall, Download, FileText, CheckCircle2, Truck } from 'lucide-react';
import { Product, WebsiteSettings } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
  settings: WebsiteSettings;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
  settings,
}) => {
  if (!product) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Jayadeva Sales & Services, I am interested in ${product.brand} ${product.name} (Model: ${product.model}). Please share specification sheet and pricing.`
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${settings.phone1.replace(/\s+/g, '')}`;
  };

  const handleDownloadBrochure = () => {
    const brochureUrl = product.brochureUrl || settings.generalBrochureUrl || product.mainImage;
    window.open(brochureUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/80 relative animate-fadeIn">
        {/* Modal Sticky Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100/90 text-amber-900 border border-amber-300/80">
              {product.brand}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors"
            id="btn-close-product-detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="bg-white/60 rounded-xl overflow-hidden border border-slate-200/80 aspect-4/3 shadow-xs">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} gallery ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-20 object-cover rounded-xl border border-slate-200/80 cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Primary Actions */}
            <div className="space-y-5">
              <div>
                <div className="text-xs font-mono font-bold text-[#C89327] mb-1">
                  MODEL: {product.model}
                </div>
                <h2 className="text-2xl font-extrabold text-[#002B5B] leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {product.description}
                </p>
              </div>

              {/* Price Box & Transportation Notice */}
              <div className="bg-white/70 border border-slate-200/80 rounded-xl p-4 shadow-2xs backdrop-blur-xs space-y-2">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Pricing Status</div>
                  <div className="text-lg font-extrabold text-[#002B5B] mt-0.5">
                    {product.showPrice && product.price
                      ? `₹${product.price.toLocaleString('en-IN')}`
                      : 'Contact for latest price'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Includes 1-Year Warranty & Official Jayadeva Technical Support
                  </div>
                </div>

                {/* Transportation Note */}
                <div className="pt-2.5 border-t border-slate-200/60 flex items-start space-x-2 text-xs text-slate-700 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80">
                  <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-[#002B5B]">Pan-India Delivery & Logistics:</span>{' '}
                    Doorstep machine dispatch is available across all states in India. Transportation and freight charges are billed separately based on destination location and machine specifications.
                  </div>
                </div>
              </div>

              {/* Action Buttons Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onRequestQuote(product)}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-[#002B5B] hover:bg-[#001d3d] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-900/20"
                  id="btn-detail-request-quote"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Quote</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20"
                  id="btn-detail-whatsapp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Enquiry</span>
                </button>

                <button
                  onClick={handleCall}
                  className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#002B5B] hover:bg-[#001f42] text-white font-semibold text-xs rounded-xl transition-all shadow-md"
                  id="btn-detail-call"
                >
                  <PhoneCall className="w-4 h-4 text-[#C89327]" />
                  <span>Call Now</span>
                </button>

                <button
                  onClick={handleDownloadBrochure}
                  className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-white/80 hover:bg-slate-100/80 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200/80 transition-colors"
                  id="btn-detail-brochure"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="border-t border-slate-200/80 pt-6">
              <h3 className="text-lg font-extrabold text-[#002B5B] mb-4 flex items-center space-x-2">
                <span>Technical Specifications</span>
              </h3>
              <div className="overflow-x-auto border border-slate-200/80 rounded-xl bg-white/50">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-white/60' : 'bg-transparent'}
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-b border-slate-200/60 w-1/3">
                          {key}
                        </td>
                        <td className="py-2.5 px-4 text-slate-900 border-b border-slate-200/60 font-medium">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div className="border-t border-slate-200/80 pt-6">
              <h3 className="text-lg font-extrabold text-[#002B5B] mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Applications */}
          {product.applications && product.applications.length > 0 && (
            <div className="border-t border-slate-200/80 pt-6">
              <h3 className="text-lg font-extrabold text-[#002B5B] mb-3">Recommended Applications</h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/80 border border-slate-200/80 rounded-full text-xs font-medium text-slate-800"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
