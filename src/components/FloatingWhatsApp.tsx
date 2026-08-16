import React from 'react';
import { MessageSquare } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface FloatingWhatsAppProps {
  settings: WebsiteSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const handleClick = () => {
    const text = encodeURIComponent(
      'Hello Jayadeva Sales & Services, I am interested in your machines. Please share more details.'
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40">
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500/90 hover:bg-emerald-600 backdrop-blur-md text-white rounded-full shadow-xl shadow-emerald-500/25 border border-emerald-300/40 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-hidden"
        aria-label="Chat on WhatsApp"
        id="btn-floating-whatsapp"
      >
        <MessageSquare className="w-7 h-7 fill-white text-emerald-500" />
        
        {/* Tooltip on Hover */}
        <span className="absolute right-16 bg-[#001733]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold py-2 px-3.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          Need machine details? Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
