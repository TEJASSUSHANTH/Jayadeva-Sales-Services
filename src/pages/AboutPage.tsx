import React from 'react';
import { Award, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';
import { WebsiteSettings } from '../types';
import { GoogleReviewsSection } from '../components/GoogleReviews';

interface AboutPageProps {
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] tracking-tight">
          ABOUT JAYADEVA SALES & SERVICES
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl">
          Authorized sales and technical service provider for Sunshine computer embroidery machines and Shunfa industrial sewing machines.
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-2xl font-extrabold text-[#002B5B]">
            Industrial Machinery Experts You Can Trust
          </h2>
          <p>
            <strong className="text-slate-900">Jayadeva Sales & Services</strong> is an established sales and technical support dealership specializing in high-speed computer embroidery machines and industrial sewing machines.
          </p>
          <p>
            We supply and service the complete range of <strong className="text-[#FF6321]">Sunshine Embroidery Machines</strong> (including Pro, FU Type, Large Frame, and Butterfly models) and <strong className="text-[#008080]">Shunfa Sewing Machines</strong> (lockstitch, overlock, interlock, heavy duty walking foot, and computerized models).
          </p>
          <p>
            Our core mission is to provide garment manufacturers, boutiques, textile units, and leather fabricators with reliable machinery, original replacement spare parts, high-luster embroidery threads, and responsive technical service.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 text-xs">
            <div className="p-4 bg-white/80 backdrop-blur-xs border border-white/80 rounded-xl shadow-xs">
              <div className="font-extrabold text-[#002B5B] text-sm">Sunshine</div>
              <div className="text-slate-600">Embroidery Machines Sales & Support</div>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-xs border border-white/80 rounded-xl shadow-xs">
              <div className="font-extrabold text-[#002B5B] text-sm">Shunfa</div>
              <div className="text-slate-600">Industrial Sewing Machines Sales & Support</div>
            </div>
          </div>
        </div>

        {/* Right Photo Card */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md p-3 rounded-3xl border border-white/80 shadow-xl">
          <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 relative">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
              alt="Jayadeva Sales & Services Industrial Showroom"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001733]/90 via-transparent to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-[#FF6321] uppercase tracking-wider">Industrial Machinery Dealer</span>
              <span className="text-white font-extrabold text-base">Jayadeva Sales & Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Competencies Box */}
      <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl font-extrabold text-[#002B5B] mb-6 text-center">
          OUR CORE CAPABILITIES
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/60 space-y-2">
            <div className="w-11 h-11 bg-orange-100/80 text-[#FF6321] rounded-2xl flex items-center justify-center mx-auto font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#002B5B] text-base">Sales & Guidance</h4>
            <p className="text-xs text-slate-600">
              Expert machine selection based on factory capacity, stitch speed requirements, and budget.
            </p>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/60 space-y-2">
            <div className="w-11 h-11 bg-teal-100/80 text-[#008080] rounded-2xl flex items-center justify-center mx-auto font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#002B5B] text-base">Service & Maintenance</h4>
            <p className="text-xs text-slate-600">
              On-site machine installation, hook timing, motor calibration, and preventive maintenance.
            </p>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/60 space-y-2">
            <div className="w-11 h-11 bg-blue-100/80 text-[#002B5B] rounded-2xl flex items-center justify-center mx-auto font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#002B5B] text-base">Technical Warranty</h4>
            <p className="text-xs text-slate-600">
              Full 1-year warranty assistance with 6-month scheduled service intervals from installation.
            </p>
          </div>
        </div>
      </div>

      {/* GOOGLE REVIEWS */}
      <GoogleReviewsSection />

      {/* CTA Line */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-lg font-bold text-[#002B5B]">
          Interested in Sunshine or Shunfa Machines for your business?
        </h3>
        <button
          onClick={() => onNavigate('contact')}
          className="px-7 py-3.5 bg-[#002B5B] hover:bg-[#001f42] text-white font-extrabold text-xs rounded-xl transition-all shadow-lg"
        >
          Contact Our Sales Team Today
        </button>
      </div>
    </div>
  );
};
