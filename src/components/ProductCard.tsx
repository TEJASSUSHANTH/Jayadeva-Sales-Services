import React from 'react';
import { ChevronRight, MessageSquare, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onEnquire: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onEnquire,
}) => {
  const getBrandBadge = (brand: string) => {
    switch (brand) {
      case 'Sunshine':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Shunfa':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const keySpecEntry = Object.entries(product.specifications || {})[0];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Product Image Box */}
      <div className="relative aspect-4/3 bg-slate-100/60 overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${getBrandBadge(product.brand)}`}>
            {product.brand}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#002B5B]/80 text-white text-[11px] font-medium backdrop-blur-md border border-white/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-mono font-bold text-[#008080] mb-1">
            MODEL: <span className="text-slate-800">{product.model}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-bold text-[#002B5B] text-base leading-snug hover:text-[#FF6321] transition-colors cursor-pointer line-clamp-2 mb-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Key Spec Highlight */}
          {keySpecEntry && (
            <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-xs mb-3 backdrop-blur-xs">
              <span className="text-slate-500 font-medium">{keySpecEntry[0]}: </span>
              <span className="font-bold text-slate-800">{keySpecEntry[1]}</span>
            </div>
          )}
        </div>

        {/* Pricing Notice */}
        <div className="pt-3 border-t border-slate-200/60 mt-2">
          <div className="mb-3 text-xs">
            {product.showPrice && product.price ? (
              <span className="text-lg font-extrabold text-[#002B5B]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            ) : (
              <div className="flex items-center space-x-1.5 text-slate-600 font-semibold text-xs">
                <Info className="w-3.5 h-3.5 text-[#FF6321] shrink-0" />
                <span>Price: Contact for latest quote</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="w-full flex items-center justify-center space-x-1 py-2.5 px-3 bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 font-bold text-xs rounded-xl transition-all border border-slate-200/80"
              id={`btn-product-details-${product.id}`}
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onEnquire(product)}
              className="w-full flex items-center justify-center space-x-1 py-2.5 px-3 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20"
              id={`btn-product-enquire-${product.id}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
