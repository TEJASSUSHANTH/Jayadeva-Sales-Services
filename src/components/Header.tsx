import React, { useState } from 'react';
import { Menu, X, MessageSquare, PhoneCall, FileText } from 'lucide-react';
import { WebsiteSettings } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
  settings: WebsiteSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onRequestQuote,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Hello Jayadeva Sales & Services, I am interested in your machines. Please share more details.'
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-white/60 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#002B5B] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-block font-medium text-amber-300">
              Authorized Sales & Service Dealer
            </span>
            <span className="flex items-center space-x-1">
              <PhoneCall className="w-3 h-3 text-[#C89327]" />
              <span>{settings.phone1}</span>
            </span>
            <span className="hidden md:inline">| {settings.workingHours}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300 text-xs">
            <span className="hidden sm:inline font-bold text-[#FF6321]">Sunshine</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline font-semibold text-[#008080]">Shunfa</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="focus:outline-hidden group"
          id="btn-header-logo"
        >
          <Logo variant="header" size="md" customLogoUrl={settings?.logoUrl} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs sm:text-sm font-semibold transition-all py-1 border-b-2 ${
                  isActive
                    ? 'text-[#002B5B] border-[#C89327] font-bold'
                    : 'text-slate-600 border-transparent hover:text-[#002B5B] hover:border-[#C89327]/40'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="hidden xl:flex flex-col items-end mr-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Support</span>
            <span className="text-xs font-bold text-[#25D366]">{settings.whatsAppNumber ? `+${settings.whatsAppNumber}` : settings.phone1}</span>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-xs rounded-lg transition-colors shadow-2xs"
            id="btn-header-whatsapp"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={onRequestQuote}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#002B5B] hover:bg-[#001d3d] rounded-lg transition-all shadow-md shadow-blue-900/20 hover:shadow-lg"
            id="btn-header-request-quote"
          >
            <FileText className="w-4 h-4" />
            <span>Request Quote</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#002B5B] hover:bg-white/60 focus:outline-hidden border border-slate-200/60"
          id="btn-mobile-menu-toggle"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-white/60 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#002B5B] border-l-4 border-[#C89327] font-bold'
                      : 'text-slate-800 hover:bg-slate-100/60 hover:text-[#002B5B]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-200/60 flex flex-col space-y-2">
            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 rounded-lg border border-emerald-200/80"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Contact on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onRequestQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-bold text-white bg-[#002B5B] hover:bg-[#001d3d] rounded-lg shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
