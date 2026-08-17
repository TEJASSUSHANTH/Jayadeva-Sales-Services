import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WebsiteSettings } from '../types';

interface FloatingWhatsAppProps {
  settings: WebsiteSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);

    const text = encodeURIComponent(
      'Hello Jayadeva Sales & Services, I am interested in your machines. Please share more details.'
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40">
      <div className="relative flex items-center justify-center">
        {/* Subtle Ambient Ping Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping pointer-events-none" />

        {/* Click Tactile Ping Wave */}
        <AnimatePresence>
          {isClicked && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400 bg-emerald-300/30 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 backdrop-blur-md text-white rounded-full shadow-2xl shadow-emerald-600/35 border border-emerald-300/50 cursor-pointer focus:outline-hidden"
          aria-label="Chat on WhatsApp"
          id="btn-floating-whatsapp"
        >
          <MessageSquare className="w-7 h-7 fill-white text-emerald-500 transition-transform group-hover:scale-110" />

          {/* Tooltip on Hover */}
          <span className="absolute right-16 bg-[#001733]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold py-2 px-3.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Need machine details? Chat on WhatsApp
          </span>
        </motion.button>
      </div>
    </div>
  );
};

