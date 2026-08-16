import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface MobileBottomBarProps {
  settings: WebsiteSettings;
  onRequestQuote: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  settings,
  onRequestQuote,
}) => {
  const handleCall = () => {
    window.location.href = `tel:${settings.phone1.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Jayadeva Sales & Services, I am interested in your machines. Please share more details.'
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#001733]/90 backdrop-blur-xl text-white border-t border-white/10 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 h-14 divide-x divide-white/10">
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center space-y-0.5 active:bg-white/10 text-slate-100 transition-colors"
          id="btn-mobile-bottom-call"
        >
          <Phone className="w-4 h-4 text-[#C89327]" />
          <span className="text-[11px] font-bold tracking-wider uppercase">CALL</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center space-y-0.5 active:bg-white/10 text-emerald-300 transition-colors"
          id="btn-mobile-bottom-whatsapp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-bold tracking-wider uppercase">WHATSAPP</span>
        </button>

        <button
          onClick={onRequestQuote}
          className="flex flex-col items-center justify-center space-y-0.5 active:bg-[#001d3d] bg-[#002B5B] text-white font-bold transition-colors"
          id="btn-mobile-bottom-enquire"
        >
          <FileText className="w-4 h-4" />
          <span className="text-[11px] font-bold tracking-wider uppercase">ENQUIRE</span>
        </button>
      </div>
    </div>
  );
};
