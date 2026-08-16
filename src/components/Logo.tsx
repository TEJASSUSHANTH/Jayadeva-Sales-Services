import React from 'react';
import defaultLogoImg from '../assets/images/regenerated_image_1786867047931.png';

interface LogoProps {
  variant?: 'header' | 'footer' | 'admin' | 'light' | 'icon-only' | 'full';
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  customLogoUrl?: string;
  companyName?: string;
  subtitle?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  layout = 'horizontal',
  size = 'md',
  className = '',
  customLogoUrl,
  companyName = 'JAYADEVA',
  subtitle = 'SALES & SERVICES',
}) => {
  // Primary brand colors based on variant
  const isDarkBg = variant === 'footer' || variant === 'light';
  const primaryTextColor = isDarkBg ? 'text-white' : 'text-[#002B5B]';
  const goldColor = '#C89327';

  // Sizing map
  const iconHeight = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  }[size];

  const textSizeMap = {
    sm: { main: 'text-sm sm:text-base', sub: 'text-[9px] tracking-[0.25em]' },
    md: { main: 'text-base sm:text-lg', sub: 'text-[10px] tracking-[0.28em]' },
    lg: { main: 'text-xl sm:text-2xl', sub: 'text-xs tracking-[0.3em]' },
    xl: { main: 'text-2xl sm:text-3xl', sub: 'text-sm tracking-[0.32em]' },
  }[size];

  // Image Symbol for Logo
  const logoSrc = customLogoUrl || defaultLogoImg;
  const SymbolGraphic = (
    <img
      src={logoSrc}
      alt={`${companyName} Logo`}
      className={`${iconHeight} w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
    />
  );

  if (layout === 'vertical' || variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {SymbolGraphic}
        <div className="mt-2 space-y-1">
          <div
            className={`font-serif font-extrabold tracking-[0.25em] uppercase transition-colors ${textSizeMap.main} ${primaryTextColor}`}
          >
            {companyName}
          </div>
          {subtitle && (
            <div className={`font-sans font-bold uppercase text-[#C89327] ${textSizeMap.sub}`}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3.5 text-left ${className}`}>
      {SymbolGraphic}

      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center leading-none">
          <div
            className={`font-serif font-black tracking-[0.2em] uppercase transition-colors ${textSizeMap.main} ${primaryTextColor} group-hover:text-[#FF6321]`}
          >
            {companyName}
          </div>
          {subtitle && (
            <div className={`font-sans font-bold uppercase text-[#C89327] mt-1.5 ${textSizeMap.sub}`}>
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
