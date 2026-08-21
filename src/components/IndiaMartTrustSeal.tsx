import React from 'react';
import { ShieldCheck, CheckCircle2, Award, ExternalLink } from 'lucide-react';

interface IndiaMartTrustSealProps {
  variant?: 'banner' | 'card' | 'compact';
}

export const IndiaMartTrustSeal: React.FC<IndiaMartTrustSealProps> = ({ variant = 'banner' }) => {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 rounded-full py-1 px-3 shadow-xs">
        <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
          ✓
        </div>
        <span className="text-xs font-bold text-amber-950">
          IndiaMART TrustSEAL Certified
        </span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-br from-amber-50/90 via-white to-orange-50/80 rounded-2xl p-6 border border-amber-200/90 shadow-md relative overflow-hidden group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 text-[11px] font-extrabold border border-amber-300/80">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>TrustSEAL Verified</span>
              </div>
              <h3 className="text-base font-extrabold text-[#002B5B] mt-1">
                IndiaMART Certified Supplier
              </h3>
            </div>
          </div>

          <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-md">
            VERIFIED
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed mb-4">
          <strong>JAYADEVA SALES AND SERVICE</strong> has been officially audited and certified under the <strong>IndiaMART TrustSEAL</strong> verification program, confirming verified business credentials, physical showroom legitimacy, and commercial reliability.
        </p>

        <div className="space-y-1.5 border-t border-amber-200/60 pt-3 text-xs text-slate-700">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Physical Office & Machinery Showroom</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Business Registration & GSTIN Compliance</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Trusted Industrial Sewing & Embroidery Supplier</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Banner Variant
  return (
    <section className="bg-gradient-to-r from-[#001733] via-[#002B5B] to-[#001f42] text-white py-8 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl relative overflow-hidden my-8 border border-amber-500/30">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Seal Graphic & Badge */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="relative shrink-0">
            {/* Seal Graphic Badge */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 p-1 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#001733] flex flex-col items-center justify-center text-center p-2 border border-amber-300/40">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center mb-0.5 shadow-xs">
                  ✓
                </div>
                <div className="text-[10px] sm:text-[11px] font-black text-amber-300 tracking-wider uppercase leading-none">
                  TRUST
                </div>
                <div className="text-[10px] sm:text-[11px] font-extrabold text-white tracking-widest uppercase leading-none mt-0.5">
                  SEAL
                </div>
                <div className="text-[8px] font-mono text-amber-200/90 mt-1">
                  indiamart
                </div>
              </div>
            </div>
            {/* Sparkle Badge */}
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-amber-950 p-1 rounded-full shadow-md">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Verification Stamp</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              IndiaMART TrustSEAL Certified Member
            </h3>
            <p className="text-xs text-amber-100/90 max-w-xl leading-relaxed">
              <strong>JAYADEVA SALES AND SERVICE</strong> has been certified for having met the rigorous requirements of <strong>IndiaMART TrustSEAL</strong>.
            </p>
          </div>
        </div>

        {/* Right Verified Attributes */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 sm:gap-4 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-100">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Audited Showroom & Business</span>
          </div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-100">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Certified Trust Status</span>
          </div>
        </div>
      </div>
    </section>
  );
};
