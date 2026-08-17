import React from 'react';
import { ArrowRight, ShieldCheck, Wrench, Settings, ChevronRight, Award, Headphones, CheckCircle2, Truck } from 'lucide-react';
import { Product, WebsiteSettings } from '../types';
import { ProductCard } from '../components/ProductCard';
import { GoogleReviewsSection } from '../components/GoogleReviews';
import defaultProprietorPhoto from '../assets/images/regenerated_image_1786948309442.jpg';

interface HomePageProps {
  products: Product[];
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product?: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  settings,
  onNavigate,
  onSelectProduct,
  onRequestQuote,
}) => {
  const featuredProducts = products.filter((p) => p.published).slice(0, 6);

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#001a38] via-[#002B5B] to-[#001228] text-white overflow-hidden py-14 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-amber-300 border border-white/20">
                  <Award className="w-4 h-4 text-[#FF6321]" />
                  <span>Authorized Sales & Technical Service Center</span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-200 border border-amber-400/30">
                  <Truck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pan-India Delivery</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs sm:text-sm uppercase tracking-widest font-extrabold text-[#C89327]">
                  WELCOME TO JAYADEVA SALES & SERVICES
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Your Authorized Shop for <span className="text-[#FF6321]">SUNSHINE</span> & <span className="text-[#00B4D8]">SHUNFA</span> Machinery
                </h1>
              </div>

              <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
                Jayadeva Sales & Services is the official showroom and authorized service provider for <strong className="text-white">SUNSHINE Computerized Embroidery Machines</strong> and <strong className="text-white">SHUNFA High-Speed Industrial Sewing Machines</strong>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-7 py-3.5 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 border border-orange-400/30"
                  id="btn-hero-view-products"
                >
                  <span>View Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onRequestQuote()}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/30 backdrop-blur-md flex items-center justify-center space-x-2"
                  id="btn-hero-request-quote"
                >
                  <span>Request a Quote</span>
                </button>
              </div>

              {/* Key Trust Highlights */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15 text-xs text-slate-300">
                <div>
                  <div className="font-extrabold text-white text-sm">1-Year Warranty</div>
                  <div className="text-[11px] text-slate-300">On all new machines</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm">Pan-India Delivery</div>
                  <div className="text-[11px] text-slate-300">Freight & transport extra</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm">Genuine Spares</div>
                  <div className="text-[11px] text-slate-300">OEM Sunshine & Shunfa</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm">Expert Technicians</div>
                  <div className="text-[11px] text-slate-300">On-site service support</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card with Frosted Glass Overlay */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                    alt="Jayadeva Sunshine Embroidery & Shunfa Industrial Sewing Machine"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a38]/90 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs font-bold text-[#FF6321] uppercase tracking-widest">
                      Featured Industrial Model
                    </span>
                    <span className="text-white font-extrabold text-lg">
                      Sunshine Multi-Head & Shunfa Direct Drive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR BRANDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight">
            OUR BRANDS
          </h2>
          <div className="w-16 h-1 bg-[#FF6321] mx-auto mt-2 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Authorized sales and official technical service partner for world-class industrial machinery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand 1: Sunshine */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100/80 text-[#FF6321] rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-orange-200 font-black text-xl">
              SUN
            </div>
            <h3 className="text-xl font-extrabold text-[#002B5B]">Sunshine</h3>
            <div className="inline-block px-3 py-1 bg-orange-50 text-[#FF6321] font-bold text-xs rounded-full border border-orange-200">
              Embroidery Machines
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              High speed computer embroidery machines including Pro Series, FU Type, Large Frame, and Butterfly single/multi-head models.
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-[#FF6321] hover:text-[#e85a1e] inline-flex items-center space-x-1"
            >
              <span>Explore Sunshine Machines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Brand 2: Shunfa */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
            <div className="w-16 h-16 bg-teal-100/80 text-[#008080] rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-teal-200 font-black text-xl">
              SF
            </div>
            <h3 className="text-xl font-extrabold text-[#002B5B]">Shunfa</h3>
            <div className="inline-block px-3 py-1 bg-teal-50 text-[#008080] font-bold text-xs rounded-full border border-teal-200">
              Sewing Machines
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Industrial lockstitch, overlock, interlock, heavy-duty compound feed, and specialized computerized sewing machines.
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-[#008080] hover:text-teal-900 inline-flex items-center space-x-1"
            >
              <span>Explore Shunfa Machines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Brand 3: Jayadeva */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100/80 text-[#002B5B] rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-blue-200 font-black text-xl">
              JSS
            </div>
            <h3 className="text-xl font-extrabold text-[#002B5B]">Jayadeva</h3>
            <div className="inline-block px-3 py-1 bg-blue-50 text-[#002B5B] font-bold text-xs rounded-full border border-blue-200">
              Sales & Services
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete machinery selection support, professional installation, genuine accessories, embroidery threads, and technical warranty assistance.
            </p>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-[#002B5B] hover:text-blue-950 inline-flex items-center space-x-1"
            >
              <span>Our Service Commitments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight">
              FEATURED PRODUCTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Popular Sunshine embroidery machines and Shunfa industrial sewing models.
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#FF6321] hover:text-[#e85a1e] bg-orange-50/80 backdrop-blur-xs px-4 py-2 rounded-xl border border-orange-200/80 transition-colors shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onEnquire={(prod) => onRequestQuote(prod)}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE JAYADEVA / SERVICES SUMMARY */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight">
              WHY CHOOSE JAYADEVA SALES & SERVICES
            </h2>
            <div className="w-16 h-1 bg-[#FF6321] mx-auto mt-2 rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              End-to-end industrial machinery sales, installation, and certified technician support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md space-y-3">
              <div className="w-11 h-11 bg-orange-100 text-[#FF6321] rounded-xl flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#002B5B] text-sm">1-Year Warranty</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official 1-year warranty coverage from date of installation with scheduled service support.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md space-y-3">
              <div className="w-11 h-11 bg-teal-100 text-[#008080] rounded-xl flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#002B5B] text-sm">Expert On-Site Setup</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified technicians handle machine leveling, initial setup, operator orientation, and testing.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md space-y-3">
              <div className="w-11 h-11 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#002B5B] text-sm">Pan-India Logistics & Delivery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Safe doorstep shipping across all states in India. Transportation and freight charges are billed separately based on location distance and machine specifications.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md space-y-3">
              <div className="w-11 h-11 bg-blue-100 text-[#002B5B] rounded-xl flex items-center justify-center font-bold">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#002B5B] text-sm">Genuine Spare Parts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct access to OEM Sunshine & Shunfa hooks, needles, bobbins, motors, and electronic drive boards.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md space-y-3 sm:col-span-2 lg:col-span-2">
              <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#002B5B] text-sm">Prompt Technical Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated telephone & WhatsApp support to resolve machine maintenance and operational queries without delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <GoogleReviewsSection />

      {/* PROPRIETOR & SHOP SHOWROOM SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Proprietor Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-2xl p-6 shadow-xl space-y-4 border border-amber-400/30 relative overflow-hidden flex flex-col">
            {/* Large Proprietor Photo Frame */}
            <div className="relative group w-full h-60 sm:h-72 rounded-xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-800 shrink-0">
              <img
                src={settings.proprietorPhotoUrl || defaultProprietorPhoto}
                alt={settings.proprietorName || 'Mr. Ravindra VD'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                Proprietor & Founder
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-white">
                {settings.proprietorName || 'Mr. Ravindra VD'}
              </h4>
              <p className="text-xs font-bold text-amber-400">
                {settings.proprietorTitle || 'Managing Director'}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{settings.proprietorBio || 'Karnataka authorized sales and service dealer for Sunshine computer embroidery and Shunfa industrial sewing machinery.'}"
            </p>

            <button
              onClick={() => onNavigate('about')}
              className="w-full py-2.5 px-4 bg-[#FF6321] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-all text-center shadow-md block"
            >
              Meet Our Proprietor & View Details
            </button>
          </div>

          {/* Showroom & Shop Facility Preview */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6321] uppercase tracking-wider block">
                  Agrahara Dasarahalli, Bengaluru
                </span>
                <h3 className="text-xl font-black text-[#002B5B]">
                  Machinery Showroom & Workshop
                </h3>
              </div>
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-bold text-[#002B5B] hover:text-[#FF6321] underline"
              >
                View All Photos
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(settings.shopPhotos && settings.shopPhotos.length > 0 ? settings.shopPhotos.slice(0, 3) : [
                'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
              ]).map((photo, i) => (
                <div key={i} className="aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs cursor-pointer" onClick={() => onNavigate('about')}>
                  <img
                    src={photo}
                    alt={`Shop Photo ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600">
              Visit our physical store at <strong>35/6, Magadi Main Rd, Agrahara Dasarahalli, Rajajinagar, Bengaluru - 560079</strong> for live machine demonstrations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA QUOTE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#002B5B] to-[#001f42] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Looking for the Right Industrial Sewing or Embroidery Machine?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Contact our sales engineering team today for personalized machine recommendation, brochure downloads, and competitive quotations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onRequestQuote()}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-orange-500/25 text-center"
              id="btn-cta-quote"
            >
              Request a Quote
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/30 backdrop-blur-md transition-all text-center"
              id="btn-cta-contact"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
