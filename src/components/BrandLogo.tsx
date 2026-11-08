import React from 'react';
import { SpinningStarAnise } from './SpinningStarAnise';
import newLogoImg from '../assets/images/new_app_logo_dulcito_1792418406728.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant' | 'responsive';
  variant?: 'badge' | 'lockup' | 'emblem';
  className?: string;
  showSpinningAnise?: boolean;
  inverted?: boolean;
  heartColor?: 'red' | 'gold';
}

/**
 * Exact Vector SVG representation of the user's uploaded logo:
 * Rich cocoa brown background (#361A0C),
 * arched cream/ivory serif typography "DULCITO",
 * two concentric target rings with solid dots on the flanks,
 * botanical hand-engraved crossed cinnamon sticks with roll scrolls and star anise blossom.
 */
export const NewAppBadgeLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 126,
  className = '',
}) => {
  const badgeId = React.useId().replace(/[:]/g, '');
  const bgGradId = `masterBadgeBg-${badgeId}`;
  const ivoryGradId = `ivoryInk-${badgeId}`;
  const goldRimGradId = `goldRim-${badgeId}`;
  const textArcId = `masterTextArcDulcito-${badgeId}`;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Authentic rich warm chocolate cocoa background matching the original brand seal */}
        <radialGradient id={bgGradId} cx="50%" cy="46%" r="56%">
          <stop offset="0%" stopColor="#3E1C0E" />
          <stop offset="65%" stopColor="#35180B" />
          <stop offset="100%" stopColor="#2A1208" />
        </radialGradient>

        {/* Pure warm ivory cream text & linework from original logo */}
        <linearGradient id={ivoryGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF1DE" />
          <stop offset="100%" stopColor="#F5E8D0" />
        </linearGradient>

        {/* Subtle gold accent for ring and caramel */}
        <linearGradient id={goldRimGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="35%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9E7616" />
        </linearGradient>

        {/* Harmonious wide-spanning arched path for DULCITO, lowered away from outer borders into the center */}
        <path
          id={textArcId}
          d="M 33 111 A 67 67 0 0 1 167 111"
          fill="none"
        />

        {/* Clip path for the central Venezuelan Seal sweets illustration */}
        <clipPath id={`medallionClip-${badgeId}`}>
          <circle cx="100" cy="103" r="45" />
        </clipPath>
      </defs>

      {/* 1. Circular warm chocolate backdrop with solid fallback and radial shading */}
      <circle cx="100" cy="100" r="97" fill="#241007" opacity="0.25" />
      {/* Solid rich cocoa chocolate base guarantee so it NEVER loses color on mobile */}
      <circle cx="100" cy="100" r="95" fill="#35180B" />
      <circle cx="100" cy="100" r="95" fill={`url(#${bgGradId})`} />

      {/* 2. Double concentric rings (Signature DULCITO seal frame in original warm ivory cream) */}
      <circle cx="100" cy="100" r="91" fill="none" stroke="#F5E8D0" strokeWidth="1.3" opacity="0.95" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#F5E8D0" strokeWidth="0.9" opacity="0.9" />

      {/* 3. Top Arched DULCITO in grand, prominent warm ivory cream extending to the flanking dots */}
      <text
        fill="#FAF1DE"
        fontFamily="'Fraunces', 'Cinzel', Georgia, serif"
        fontWeight="900"
        fontSize="25"
        letterSpacing="4.5"
      >
        <textPath href={`#${textArcId}`} startOffset="50%" textAnchor="middle">
          DULCITO
        </textPath>
      </text>

      {/* 4. Left and Right flanking solid cream dots matching reference logo */}
      <circle cx="34" cy="95" r="3.5" fill="#F5E8D0" />
      <circle cx="166" cy="95" r="3.5" fill="#F5E8D0" />

      {/* 5. Master Artisanal Hallmark Crest: Sello Venezolano Sweets Illustration */}
      {/* (Jar of Dulce de Leche with Wooden Spoon, Bottle with Shot Glass, Quesillo on Plate with Fork, and Stars) */}
      <g id="master-sello-illustration-crest">
        {/* Ambient warm golden aura behind the medallion */}
        <circle cx="100" cy="103" r="49" fill="#D4AF37" opacity="0.28" />

        {/* Ivory cream cameo medallion backing with fine 24K gold rim */}
        <circle cx="100" cy="103" r="46.5" fill="#F4EFE6" stroke={`url(#${goldRimGradId})`} strokeWidth="1.6" />
        <circle cx="100" cy="103" r="44.5" fill="none" stroke="#E2DAC9" strokeWidth="0.8" opacity="0.9" />

        {/* Handcrafted sweets illustration from the Sello Venezolano */}
        <g clipPath={`url(#medallionClip-${badgeId})`}>
          <image
            href="/assets/aistudio/sello_sticker_clean.png"
            x="22"
            y="25"
            width="156"
            height="156"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* Subtle decorative 24K gold rim around the illustration */}
        <circle cx="100" cy="103" r="45.5" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.85" />
      </g>

      {/* 6. STRAIGHT HORIZONTAL BOTTOM TEXT: ♥ Tradición ♥ */}
      <text
        x="100"
        y="166"
        textAnchor="middle"
        fill="#FAF1DE"
        fontFamily="'Fraunces', Georgia, serif"
        fontWeight="800"
        fontSize="12.5"
        letterSpacing="1.8"
      >
        <tspan fill="#F5E8D0" fontSize="11" dy="-0.5">♥ </tspan>
        <tspan fill="#FAF1DE">Tradición</tspan>
        <tspan fill="#F5E8D0" fontSize="11" dy="-0.5"> ♥</tspan>
      </text>
    </svg>
  );
};

/**
 * Radiant 3D Metallic Golden Heart
 * Features 24k gold gradient, specular reflection sheen, bevel rim,
 * sparkle star, and warm golden glow filter for prominent visibility.
 */
/**
 * 8-Bit Pixel Heart Icon for retro badges
 */
export const PixelHeart: React.FC<{ size?: number; className?: string }> = ({
  size = 11,
  className = '',
}) => (
  <svg
    viewBox="0 0 10 9"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2 0h2v1H2z M6 0h2v1H6z M1 1h4v1H1z M5 1h4v1H5z M0 2h10v3H0z M1 5h8v1H1z M2 6h6v1H2z M3 7h4v1H3z M4 8h2v1H4z"
      fill="#FF2647"
    />
    <rect x="2" y="2" width="1" height="1" fill="#FFFFFF" />
  </svg>
);

/**
 * Radiant 3D Metallic Golden Heart
 * Features 24k gold gradient, specular reflection sheen, bevel rim,
 * sparkle star, and warm golden glow filter for prominent visibility.
 */
export const GoldenHeart: React.FC<{
  size?: number;
  className?: string;
  glow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showMessageOnClick?: boolean;
}> = ({
  size = 26,
  className = '',
  glow = true,
  onClick,
  showMessageOnClick = true,
}) => {
  const heartId = React.useId().replace(/[:]/g, '');
  const [isTapped, setIsTapped] = React.useState(false);
  const [showLoveBadge, setShowLoveBadge] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 550);

    if (showMessageOnClick) {
      setShowLoveBadge(true);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setShowLoveBadge(false);
      }, 1500); // Disappears in 1.5 seconds
    }

    if (onClick) {
      onClick(e);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      <button
        type="button"
        onClick={handleClick}
        title="Hecho con amor (Toca para ver el mensaje)"
        aria-label="Hecho con amor"
        className={`inline-flex items-center justify-center p-0.5 rounded-full cursor-pointer focus:outline-none transition-transform duration-300 ${
          isTapped
            ? 'scale-140 rotate-12 drop-shadow-[0_0_18px_rgba(212,175,55,0.95)]'
            : 'hover:scale-125 active:scale-95'
        } ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${
            glow || isTapped
              ? 'drop-shadow-[0_2px_10px_rgba(212,175,55,0.75)] filter'
              : 'drop-shadow-[0_1px_4px_rgba(212,175,55,0.5)]'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* 24-Karat Golden Metallic Gradient */}
            <linearGradient id={`goldHeartGrad-${heartId}`} x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FFF9D2" />
              <stop offset="25%" stopColor="#F9E286" />
              <stop offset="50%" stopColor="#E5C158" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9E7616" />
            </linearGradient>

            {/* Golden highlight sheen on upper-left lobe */}
            <linearGradient id={`goldHeartSheen-${heartId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#FFF4B8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E5C158" stopOpacity="0" />
            </linearGradient>

            {/* Burnished gold/copper rim contour */}
            <linearGradient id={`goldHeartRim-${heartId}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A5A12" />
              <stop offset="40%" stopColor="#C86438" />
              <stop offset="100%" stopColor="#F5D77F" />
            </linearGradient>
          </defs>

          {/* Ambient warm golden aura layer */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#D4AF37"
            opacity="0.35"
            transform="scale(1.1) translate(-1.1, -0.9)"
          />

          {/* Main 3D Metallic Golden Heart Body */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={`url(#goldHeartGrad-${heartId})`}
            stroke={`url(#goldHeartRim-${heartId})`}
            strokeWidth="1.1"
          />

          {/* 3D Specular Highlight curved along left lobe */}
          <path
            d="M 6.8 5.2 C 5 5.5 3.8 6.9 3.8 8.6 C 3.8 10.7 5.7 13.1 9 15.8 C 7.6 13.2 6.2 10.8 6.2 8.8 C 6.2 7 7.2 5.8 8.4 5.2 Z"
            fill={`url(#goldHeartSheen-${heartId})`}
          />

          {/* Brilliant diamond sparkle on top right lobe */}
          <g transform="translate(16.5, 6.5)">
            <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
            <path
              d="M 0 -2.8 L 0 2.8 M -2.8 0 L 2.8 0"
              stroke="#FFFFFF"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>
        </svg>
      </button>

      {/* Floating Animated "Hecho con amor" Pixel Message Badge directly UNDER the heart (1.5 seconds) */}
      {showLoveBadge && (
        <span
          role="status"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-[120] pointer-events-none flex items-center gap-1.5 px-2.5 py-1 bg-[#100603] text-[#FAF1DE] border border-[#D4AF37] shadow-[2px_2px_0px_#000000] whitespace-nowrap animate-pop-under"
          style={{
            fontFamily: "'Silkscreen', 'Press Start 2P', monospace",
            fontSize: '9.5px',
            lineHeight: '1.2',
            letterSpacing: '0.4px',
            imageRendering: 'pixelated',
          }}
        >
          <PixelHeart size={10} />
          <span>Hecho con amor</span>
        </span>
      )}
    </span>
  );
};

/**
 * 3D Metallic Red Christmas Ribbon Heart ("Rojo Metálico")
 * Features deep festive ruby and crimson gradients, specular metallic reflection sheen,
 * bevel rim, holiday sparkle star, and warm ruby glow filter for high-impact visibility.
 */
export const MetallicRedHeart: React.FC<{
  size?: number;
  className?: string;
  glow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showMessageOnClick?: boolean;
}> = ({
  size = 28,
  className = '',
  glow = true,
  onClick,
  showMessageOnClick = true,
}) => {
  const heartId = React.useId().replace(/[:]/g, '');
  const [isTapped, setIsTapped] = React.useState(false);
  const [showLoveBadge, setShowLoveBadge] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 550);

    if (showMessageOnClick) {
      setShowLoveBadge(true);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setShowLoveBadge(false);
      }, 1500); // Disappears in exactly 1.5 seconds per user request
    }

    if (onClick) {
      onClick(e);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      <button
        type="button"
        onClick={handleClick}
        title="Hecho con amor (Toca para ver el mensaje)"
        aria-label="Hecho con amor"
        className={`inline-flex items-center justify-center p-0.5 rounded-full cursor-pointer focus:outline-none transition-transform duration-300 ${
          isTapped
            ? 'scale-140 rotate-12 drop-shadow-[0_0_18px_rgba(255,40,60,0.95)]'
            : 'hover:scale-125 active:scale-95'
        } ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={`shrink-0 ${
            glow || isTapped
              ? 'drop-shadow-[0_2px_10px_rgba(214,15,35,0.85)] filter'
              : 'drop-shadow-[0_1px_4px_rgba(180,10,25,0.6)]'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Metallic Ruby Red Gradient */}
            <linearGradient id={`redHeartGrad-${heartId}`} x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FFA6A6" />
              <stop offset="20%" stopColor="#FF2E3E" />
              <stop offset="50%" stopColor="#D90B1C" />
              <stop offset="80%" stopColor="#96020E" />
              <stop offset="100%" stopColor="#540007" />
            </linearGradient>

            {/* High-gloss metallic highlight sheen on upper-left lobe */}
            <linearGradient id={`redHeartSheen-${heartId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#FFCCD0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#D90B1C" stopOpacity="0" />
            </linearGradient>

            {/* Burnished crimson/gold rim contour */}
            <linearGradient id={`redHeartRim-${heartId}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A0005" />
              <stop offset="50%" stopColor="#C41525" />
              <stop offset="100%" stopColor="#FFD1D5" />
            </linearGradient>
          </defs>

          {/* Ambient festive ruby aura */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#D90B1C"
            opacity="0.3"
            transform="scale(1.12) translate(-1.3, -1.0)"
          />

          {/* Main 3D Metallic Red Heart Body */}
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={`url(#redHeartGrad-${heartId})`}
            stroke={`url(#redHeartRim-${heartId})`}
            strokeWidth="1.15"
          />

          {/* 3D Specular Highlight curved along left lobe */}
          <path
            d="M 6.8 5.2 C 5 5.5 3.8 6.9 3.8 8.6 C 3.8 10.7 5.7 13.1 9 15.8 C 7.6 13.2 6.2 10.8 6.2 8.8 C 6.2 7 7.2 5.8 8.4 5.2 Z"
            fill={`url(#redHeartSheen-${heartId})`}
          />

          {/* Diamond sparkle on top right lobe */}
          <g transform="translate(16.5, 6.5)">
            <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
            <path
              d="M 0 -3 L 0 3 M -3 0 L 3 0"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.95"
            />
          </g>
        </svg>
      </button>

      {/* Floating Animated "Hecho con amor" Pixel Message Badge directly UNDER the heart (1.5 seconds) */}
      {showLoveBadge && (
        <span
          role="status"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-[120] pointer-events-none flex items-center gap-1.5 px-2.5 py-1 bg-[#100603] text-[#FAF1DE] border border-[#D4AF37] shadow-[2px_2px_0px_#000000] whitespace-nowrap animate-pop-under"
          style={{
            fontFamily: "'Silkscreen', 'Press Start 2P', monospace",
            fontSize: '9.5px',
            lineHeight: '1.2',
            letterSpacing: '0.4px',
            imageRendering: 'pixelated',
          }}
        >
          <PixelHeart size={10} />
          <span>Hecho con amor</span>
        </span>
      )}
    </span>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'lg',
  variant = 'lockup',
  className = '',
  showSpinningAnise = true,
  inverted = false,
  heartColor = 'red',
}) => {
  // Dimensions calibrated for prominent circular badge (~126px on desktop, ~76px on mobile), prominent DULCITO letters, large visible metallic red heart, and fluid cursive lema
  const dimension = {
    sm: { badge: 82, text: 'text-2xl', anise: 30, lema: 'text-2xl', heart: 26 },
    md: { badge: 106, text: 'text-3xl sm:text-4xl', anise: 40, lema: 'text-2xl sm:text-3xl', heart: 30 },
    lg: { badge: 126, text: 'text-3xl sm:text-4xl lg:text-[2.85rem]', anise: 48, lema: 'text-2xl sm:text-3xl lg:text-[2.35rem]', heart: 34 },
    xl: { badge: 142, text: 'text-4xl sm:text-5xl lg:text-[3.75rem]', anise: 58, lema: 'text-3xl sm:text-4xl lg:text-[2.85rem]', heart: 40 },
    giant: { badge: 158, text: 'text-5xl sm:text-6xl lg:text-[4.5rem]', anise: 70, lema: 'text-4xl sm:text-5xl lg:text-[3.5rem]', heart: 48 },
    responsive: {
      badge: 126,
      text: 'text-2xl sm:text-3xl md:text-4xl lg:text-[2.95rem]',
      anise: 42,
      lema: 'text-xl sm:text-2xl md:text-[1.85rem] lg:text-[2.35rem]',
      heart: 34,
    },
  }[size];

  const [badgeMode, setBadgeMode] = React.useState<'cameo' | 'fullSeal'>('cameo');

  if (variant === 'badge' || variant === 'emblem') {
    return (
      <div className={`relative inline-block ${className}`}>
        {badgeMode === 'cameo' ? (
          <NewAppBadgeLogo size={dimension.badge} className="drop-shadow-lg hover:scale-105 transition-transform cursor-pointer" />
        ) : (
          <img
            src="/assets/aistudio/sello_sticker_clean.png"
            alt="Sello Dulcito"
            style={{ width: dimension.badge, height: dimension.badge }}
            className="rounded-full drop-shadow-xl hover:scale-105 transition-transform cursor-pointer object-contain"
          />
        )}
      </div>
    );
  }

  // Primary Brand Lockup:
  // 1) The master logo circle (enlarged circle badge) with . DULCITO . and ♥ Tradición ♥
  // 2) The Brand Name "DULCITO" in prominent serif
  // 3) The spinning star anise right beside DULCITO
  // 4) Subtitle with ♥ Tradición ♥ (matching name color) + "Hecho con amor" + metallic red heart
  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 ${className}`}>
      {/* Master Logo Badge - Enlarged circle badge (~126px on desktop, ~76px on mobile) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setBadgeMode((prev) => (prev === 'cameo' ? 'fullSeal' : 'cameo'));
        }}
        title="Toca para alternar entre el camafeo con la ilustración y el sello completo"
        aria-label="Alternar presentación de la ilustración del sello"
        className="relative shrink-0 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      >
        {badgeMode === 'cameo' ? (
          <NewAppBadgeLogo
            size={dimension.badge}
            className="w-[76px] h-[76px] sm:w-[98px] sm:h-[98px] md:w-[124px] md:h-[124px] lg:w-[128px] lg:h-[128px] drop-shadow-xl"
          />
        ) : (
          <div className="w-[76px] h-[76px] sm:w-[98px] sm:h-[98px] md:w-[124px] md:h-[124px] lg:w-[128px] lg:h-[128px] rounded-full p-0.5 bg-gradient-to-tr from-[#35180B] via-[#D4AF37] to-[#35180B] drop-shadow-xl flex items-center justify-center overflow-hidden">
            <img
              src="/assets/aistudio/sello_sticker_clean.png"
              alt="Sello Tradicional Dulcito"
              className="w-full h-full object-contain rounded-full transform scale-105"
            />
          </div>
        )}
      </button>

      {/* Name + Large Spinning Star Anise + Snug "Tradición" & "Hecho con amor" underneath */}
      <div className="flex flex-col justify-center -space-y-0.5">
        {/* Row with DULCITO + Large Anís Estrellado Girando al lado */}
        <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
          <span
            className={`font-serif font-black tracking-wider drop-shadow-xs ${dimension.text} ${
              inverted ? 'text-[#FFFDF7]' : 'text-[#241007]'
            }`}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: inverted ? '#FFFDF7' : '#241007',
              textShadow: inverted
                ? '0 2px 8px rgba(0,0,0,0.7)'
                : '0 1px 2px rgba(36,16,7,0.15)',
            }}
          >
            DULCITO
          </span>

          {/* Anís estrellado principal al lado del nombre en las franjas doradas: no gira, aumenta de tamaño al hacer clic y muestra "Sabor a tradición" en pixel por 1.5s */}
          {showSpinningAnise && (
            <div className="inline-flex items-center justify-center shrink-0">
              <SpinningStarAnise
                size={dimension.anise}
                spin={false}
                interactive={true}
                showMessageOnClick={true}
                glow={true}
                className="drop-shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Lema debajo del nombre: "Hecho con amor" con tipografía caligráfica artesanal y corazón rojo metálico */}
        <div className="flex items-center gap-2 sm:gap-2.5 pl-0.5 mt-0.5 sm:mt-1 leading-none">
          <span
            className={`font-normal drop-shadow-xs select-none ${dimension.lema} ${
              inverted ? 'text-[#F5D77F]' : 'text-[#3E1C0C]'
            }`}
            style={{
              fontFamily: "'Great Vibes', 'Alex Brush', cursive",
              lineHeight: '1.15',
              color: inverted ? '#F5D77F' : '#3E1C0C',
              textShadow: inverted
                ? '0 1px 4px rgba(0,0,0,0.5)'
                : '0 1px 1px rgba(255,255,255,0.4)',
            }}
          >
            Hecho con amor
          </span>

          {/* Corazón rojo metálico brillante con destellos */}
          {heartColor === 'gold' ? (
            <GoldenHeart
              size={dimension.heart}
              glow={true}
              className="hover:scale-125 hover:rotate-6 transition-transform cursor-pointer shrink-0"
            />
          ) : (
            <MetallicRedHeart
              size={dimension.heart}
              glow={true}
              className="hover:scale-125 hover:rotate-6 transition-transform cursor-pointer shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};
