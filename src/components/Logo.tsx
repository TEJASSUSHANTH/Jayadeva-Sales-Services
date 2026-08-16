import React from 'react';
import defaultLogoImg from '../assets/images/regenerated_image_1786889977345.png';

interface LogoProps {
  variant?: 'header' | 'footer' | 'admin' | 'light' | 'icon-only' | 'full';
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  customLogoUrl?: string;
  companyName?: string;
  subtitle?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  layout = 'horizontal',
  size = 'md',
  className = '',
  customLogoUrl,
  companyName = 'JAYADEVA',
  subtitle = 'SALES & SERVICES',
  showText = false,
}) => {
  // Sizing map for the full uploaded logo image
  const iconHeight = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-18',
    xl: 'h-20 sm:h-24',
  }[size];

  const logoSrc = (customLogoUrl && customLogoUrl.trim() !== '') ? customLogoUrl : defaultLogoImg;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={logoSrc}
        alt={`${companyName} Logo`}
        className={`${iconHeight} w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />
      {showText && (
        <div className="flex flex-col justify-center leading-none ml-3">
          <div className="font-serif font-black tracking-[0.2em] uppercase text-[#002B5B]">
            {companyName}
          </div>
          {subtitle && (
            <div className="font-sans font-bold uppercase text-[#C89327] mt-1">
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
