import React from 'react';
import newLogoImg from '../assets/images/new_app_logo_dulcito_1792418406728.jpg';

interface LogoProps {
  size?: number;
  className?: string;
  showSubtitle?: boolean;
}

export const NewAppBadgeLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-[#D4AF37] via-[#FFF3B3] to-[#A68019] shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-[#241109] flex items-center justify-center">
        <img
          src={newLogoImg}
          alt="DULCITO Logo Oficial"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Fallback to circular sticker in public/assets
            (e.target as HTMLImageElement).src = '/assets/aistudio/sello_sticker_circular.png';
          }}
        />
      </div>
    </div>
  );
};

export const BrandLogo: React.FC<LogoProps> = ({
  size = 48,
  className = '',
  showSubtitle = true,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <NewAppBadgeLogo size={size} />
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-black tracking-tight text-xl sm:text-2xl text-[#FFF8EE] leading-none">
            DULCITO
          </span>
          <span className="text-base text-[#D4AF37] leading-none" title="Hecho con Amor">
            🍫
          </span>
        </div>
        {showSubtitle && (
          <span className="block text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#D4AF37] font-semibold mt-0.5">
            Ponche Crema & Dulces Criollos
          </span>
        )}
      </div>
    </div>
  );
};
