import React from 'react';
import { ShoppingBag, Wrench, ShieldCheck, CheckCircle2, Clock, Phone, FileText } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface ServicesPageProps {
  settings: WebsiteSettings;
  onRequestQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ settings, onRequestQuote }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] tracking-tight">
          OUR SERVICES
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl">
          Complete machine lifecycle support — from expert pre-sales consultation and precision installation to warranty service and maintenance for Sunshine & Shunfa machines.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Service 1: SALES */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
          <div className="w-12 h-12 bg-orange-100/80 text-[#FF6321] rounded-2xl flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#002B5B]">SALES</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Machine selection and sales support tailored to your garment manufacturing, boutique, embroidery, or heavy upholstery requirements.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Personalized machine model recommendation based on fabric types</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demonstration and stitch sample verification</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bulk unit pricing and technical quotation support</span>
            </li>
          </ul>
        </div>

        {/* Service 2: INSTALLATION */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
          <div className="w-12 h-12 bg-teal-100/80 text-[#008080] rounded-2xl flex items-center justify-center font-bold">
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#002B5B]">INSTALLATION</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            On-site machine installation, leveling, table mounting, motor wiring, and operator orientation by Jayadeva certified technicians.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>On-site mechanical assembly and precision table leveling</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Control panel configuration and motor parameter tuning</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Operator initial training on threading and basic maintenance</span>
            </li>
          </ul>
        </div>

        {/* Service 3: SERVICE & MAINTENANCE */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
          <div className="w-12 h-12 bg-blue-100/80 text-[#002B5B] rounded-2xl flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#002B5B]">SERVICE & MAINTENANCE</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Technical service, preventive maintenance, repair of mechanical components, rotary hooks, timing belt alignments, and drive motor systems.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rotary hook timing & thread tension calibration</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Genuine OEM spare parts replacement</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Preventive maintenance visits to reduce factory downtime</span>
            </li>
          </ul>
        </div>

        {/* Service 4: WARRANTY SUPPORT */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all space-y-4">
          <div className="w-12 h-12 bg-purple-100/80 text-purple-700 rounded-2xl flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#002B5B]">WARRANTY SUPPORT</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Official warranty and service assistance in strict accordance with manufacturer standards.
          </p>
          <div className="bg-purple-50/80 border border-purple-200/80 rounded-xl p-4 text-xs space-y-2 text-purple-900 font-medium backdrop-blur-xs">
            <div className="font-bold text-sm">Official Warranty Terms:</div>
            <div>• One-year warranty from date of machine installation</div>
            <div>• First service interval: At 6 months from installation</div>
            <div>• Second service interval: At 12 months from installation</div>
          </div>
        </div>
      </div>

      {/* Need Technical Assistance Box */}
      <div className="bg-gradient-to-r from-[#002B5B] to-[#001733] text-white rounded-2xl p-8 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-white">Need On-Site Machine Service?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Our technician team is ready to assist with machine maintenance, tuning, or spare parts.
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => {
              window.location.href = `tel:${settings.phone1.replace(/\s+/g, '')}`;
            }}
            className="px-5 py-3 bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Service Team</span>
          </button>

          <button
            onClick={onRequestQuote}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Book Service Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
