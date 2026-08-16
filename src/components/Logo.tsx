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
  showText = true,
}) => {
  // Sizing map for the logo symbol icon
  const iconHeight = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20',
  }[size];

  const mainTextSize = {
    sm: 'text-sm sm:text-base tracking-[0.22em]',
    md: 'text-base sm:text-lg lg:text-xl tracking-[0.25em]',
    lg: 'text-xl sm:text-2xl tracking-[0.28em]',
    xl: 'text-2xl sm:text-3xl tracking-[0.3em]',
  }[size];

  const subTextSize = {
    sm: 'text-[9px] sm:text-[10px] tracking-[0.25em]',
    md: 'text-[10px] sm:text-[11px] lg:text-xs tracking-[0.28em]',
    lg: 'text-xs sm:text-sm tracking-[0.3em]',
    xl: 'text-sm sm:text-base tracking-[0.32em]',
  }[size];

  const logoSrc = (customLogoUrl && customLogoUrl.trim() !== '') ? customLogoUrl : defaultLogoImg;

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={logoSrc}
          alt={`${companyName} Logo`}
          className={`${iconHeight} w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
        />
      </div>
    );
  }

  // Primary text colors matching "logo text.png"
  // JAYADEVA: Deep Teal (#084252) or white on dark background
  // SALES & SERVICES: Warm Gold (#C89327)
  const isDarkBg = variant === 'footer' || variant === 'light';
  const mainTextColor = isDarkBg ? 'text-white' : 'text-[#084252]';
  const subTextColor = 'text-[#C89327]';

  const isVertical = layout === 'vertical' || variant === 'full';

  const TextBlock = (
    <div className={`flex flex-col justify-center leading-tight uppercase font-serif ${isVertical ? 'items-center text-center mt-2' : 'text-left ml-3'}`}>
      <span className={`font-extrabold ${mainTextColor} ${mainTextSize} transition-colors group-hover:text-[#002B5B]`}>
        {companyName}
      </span>
      {subtitle && (
        <span className={`font-sans font-bold ${subTextColor} ${subTextSize} mt-0.5`}>
          {subtitle}
        </span>
      )}
    </div>
  );

  return (
    <div className={`inline-flex ${isVertical ? 'flex-col items-center' : 'items-center'} justify-center ${className}`}>
      <img
        src={logoSrc}
        alt={`${companyName} Logo`}
        className={`${iconHeight} w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />
      {showText && TextBlock}
    </div>
  );
};

