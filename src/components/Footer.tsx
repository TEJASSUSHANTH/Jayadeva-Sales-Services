import React from 'react';
import { Phone, Mail, MapPin, Clock, Lock } from 'lucide-react';
import { WebsiteSettings } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
  settings: WebsiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  return (
    <footer className="bg-[#001733]/90 backdrop-blur-xl text-slate-300 pt-12 pb-24 sm:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Logo variant="footer" size="lg" customLogoUrl={settings?.logoUrl} />
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized sales and technical service provider for Sunshine computer embroidery machines and Shunfa high-speed industrial sewing machines.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
              <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[#FF6321] font-bold border border-white/10">Sunshine</span>
              <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[#008080] font-bold border border-white/10">Shunfa</span>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-400/30 px-3 py-1.5 rounded-xl text-amber-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>IndiaMART TrustSEAL Certified</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C89327] transition-colors text-slate-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#C89327] transition-colors text-slate-300"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#C89327] transition-colors text-slate-300"
                >
                  Sales & Service Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C89327] transition-colors text-slate-300"
                >
                  About Jayadeva
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C89327] transition-colors text-slate-300"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Machine Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Machine Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#C89327] text-left">
                  Sunshine Multi-Head Embroidery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#C89327] text-left">
                  Shunfa Direct Drive Lockstitch
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#C89327] text-left">
                  Heavy Duty Walking Foot Machines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#C89327] text-left">
                  High Speed Overlock & Interlock
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#C89327] text-left">
                  Embroidery Cones & Threads
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C89327] shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}, {settings.state} - {settings.pincode}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C89327] shrink-0" />
                <span>{settings.phone1} {settings.phone2 ? `/ ${settings.phone2}` : ''}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C89327] shrink-0" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#C89327] shrink-0" />
                <span>{settings.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Jayadeva Sales & Services. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('admin-login')}
              className="inline-flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-xs"
              id="link-admin-login-footer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
