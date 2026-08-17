import React, { useState } from 'react';
import { Award, ShieldCheck, Wrench, CheckCircle2, Phone, Mail, MessageSquare, MapPin, Building2, User, Eye, X } from 'lucide-react';
import { WebsiteSettings } from '../types';
import { GoogleReviewsSection } from '../components/GoogleReviews';
import defaultProprietorPhoto from '../assets/images/regenerated_image_1786948309442.jpg';

interface AboutPageProps {
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const proprietorName = settings.proprietorName || 'Mr. Ravindra VD';
  const proprietorTitle = settings.proprietorTitle || 'Proprietor & Managing Director';
  const proprietorPhone = settings.proprietorPhone || settings.phone1 || '+91 93434 78096';
  const proprietorEmail = settings.proprietorEmail || settings.email || 'jayadevtech1@gmail.com';
  const proprietorBio = settings.proprietorBio || 'With over 20+ years of industrial machinery expertise, Mr. Ravindra VD leads Jayadeva Sales & Services as Karnataka\'s leading authorized sales and technical service center for Sunshine Computer Embroidery and Shunfa Industrial Sewing Machines.';
  const proprietorPhoto = settings.proprietorPhotoUrl || defaultProprietorPhoto;

  const defaultShopPhotos = [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
  ];

  const shopPhotos = settings.shopPhotos && settings.shopPhotos.length > 0
    ? settings.shopPhotos
    : defaultShopPhotos;

  const photoLabels = [
    'Main Showroom & Machinery Display',
    'Sunshine Embroidery Machine Unit',
    'Shunfa Technical Service Center',
    'Genuine Spare Parts & Accessories Counter'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black text-[#FF6321] uppercase tracking-wider block mb-1">
            Authorized Sales & Service Dealership
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] tracking-tight">
            ABOUT JAYADEVA SALES & SERVICES
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl">
             Karnataka's premier sales and technical service provider for Sunshine computer embroidery machines and Shunfa industrial sewing machines.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 bg-slate-100/80 p-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
          <MapPin className="w-4 h-4 text-[#FF6321]" />
          <span>Magadi Main Rd, Agrahara Dasarahalli, Bengaluru</span>
        </div>
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
              <div className="font-extrabold text-[#002B5B] text-sm">Sunshine Dealer</div>
              <div className="text-slate-600">Computer Embroidery Sales & Service</div>
            </div>
            <div className="p-4 bg-white/80 backdrop-blur-xs border border-white/80 rounded-xl shadow-xs">
              <div className="font-extrabold text-[#002B5B] text-sm">Shunfa Dealer</div>
              <div className="text-slate-600">Industrial Sewing Sales & Support</div>
            </div>
          </div>
        </div>

        {/* Right Showroom Main Image Card */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md p-3 rounded-3xl border border-white/80 shadow-xl">
          <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 relative group cursor-pointer" onClick={() => setSelectedImage(shopPhotos[0])}>
            <img
              src={shopPhotos[0]}
              alt="Jayadeva Sales & Services Industrial Showroom"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001733]/90 via-transparent to-transparent flex flex-col justify-end p-5">
              <span className="text-xs font-bold text-[#FF6321] uppercase tracking-wider">Showroom Front</span>
              <span className="text-white font-extrabold text-base">Jayadeva Sales & Services</span>
              <span className="text-slate-300 text-xs mt-0.5">35/6, Magadi Main Rd, Agrahara Dasarahalli, Rajajinagar</span>
            </div>
            <div className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* PROPRIETOR DETAILS SECTION */}
      <div className="bg-gradient-to-br from-[#002B5B] to-[#001733] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background Decorative Accent */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Proprietor Photo */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              <div className="w-full h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-800">
                <img
                  src={proprietorPhoto}
                  alt={proprietorName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-amber-950 font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Proprietor & Managing Director
              </div>
            </div>
          </div>

          {/* Proprietor Information */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-amber-300 mb-2">
                <User className="w-3.5 h-3.5" />
                <span>Leadership & Technical Director</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {proprietorName}
              </h3>
              <p className="text-amber-400 font-bold text-sm">
                {proprietorTitle}
              </p>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
              "{proprietorBio}"
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={`tel:${proprietorPhone}`}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#FF6321] hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Proprietor: {proprietorPhone}</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsAppNumber}?text=Hello%20${encodeURIComponent(proprietorName)},%20I%20am%20interested%20in%20Sunshine/Shunfa%20machinery`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Direct</span>
              </a>

              <a
                href={`mailto:${proprietorEmail}`}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold rounded-xl border border-white/20 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{proprietorEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SHOP & SHOWROOM PHOTOS GALLERY */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-bold text-[#FF6321] uppercase tracking-wider block">
              35/6 Magadi Main Road Showroom
            </span>
            <h3 className="text-2xl font-black text-[#002B5B]">
              SHOP & WORKSHOP PHOTOS
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Take a look at our machinery showroom, service facility, and stock warehouse in Agrahara Dasarahalli, Bengaluru.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {shopPhotos.map((photoUrl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(photoUrl)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-4/3 bg-slate-900 relative overflow-hidden">
                <img
                  src={photoUrl}
                  alt={photoLabels[idx] || `Shop Photo ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 text-slate-900 p-2.5 rounded-full shadow-lg">
                    <Eye className="w-5 h-5 text-[#002B5B]" />
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <span className="text-[10px] font-bold text-[#FF6321] uppercase tracking-wider block">
                  Photo {idx + 1}
                </span>
                <span className="text-xs font-extrabold text-[#002B5B] block truncate">
                  {photoLabels[idx] || `Showroom View ${idx + 1}`}
                </span>
              </div>
            </div>
          ))}
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

      {/* Lightbox Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Shop & Showroom High Res Preview"
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <div className="mt-3 text-white text-xs font-medium text-center">
              Jayadeva Sales & Services Showroom & Workshop Facility — 35/6 Magadi Main Rd, Agrahara Dasarahalli, Bengaluru
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
