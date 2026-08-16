import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Product, BrandType, CategoryType } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onSelectProduct,
  onRequestQuote,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedProducts = useMemo(() => {
    return products.filter((p) => p.published);
  }, [products]);

  const brandsList = ['ALL', 'Sunshine', 'Shunfa', 'Jayadeva'];
  const categoriesList = [
    'ALL',
    'Embroidery Machines',
    'Lockstitch',
    'Overlock',
    'Interlock',
    'Heavy Duty',
    'Special Machines',
    'Accessories & Threads',
  ];

  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((product) => {
      // Brand Filter
      if (selectedBrand !== 'ALL' && product.brand !== selectedBrand) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
        return false;
      }

      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const modelMatch = product.model.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        const brandMatch = product.brand.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        return nameMatch || modelMatch || categoryMatch || brandMatch || descMatch;
      }

      return true;
    });
  }, [publishedProducts, selectedBrand, selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedBrand('ALL');
    setSelectedCategory('ALL');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] tracking-tight">
          OUR PRODUCTS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl">
          Browse our complete range of Sunshine Embroidery Machines, Shunfa Industrial Sewing Machines, Accessories, and High-Grade Threads.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-4 sm:p-6 space-y-4 shadow-lg">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by machine model (e.g., S310, S510-D4, FU-904, Pro)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white/90 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-[#FF6321] focus:border-[#FF6321] outline-hidden shadow-2xs"
            id="input-product-search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Brand Filter Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Filter by Brand
          </label>
          <div className="flex flex-wrap gap-2">
            {brandsList.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedBrand === brand
                    ? 'bg-[#002B5B] text-white shadow-md'
                    : 'bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
                id={`filter-brand-${brand}`}
              >
                {brand === 'ALL' ? 'All Brands' : brand}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF6321] text-white font-bold shadow-md shadow-orange-500/20'
                    : 'bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
                id={`filter-cat-${cat}`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary Bar */}
        {(selectedBrand !== 'ALL' || selectedCategory !== 'ALL' || searchQuery) && (
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-[#002B5B]">{filteredProducts.length}</span> products
            </div>
            <button
              onClick={clearFilters}
              className="text-[#FF6321] hover:text-[#e85a1e] font-bold underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onEnquire={onRequestQuote}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No products match your criteria
          </h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different brand/category filter.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#0f2b5c] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
