import React, { useState, useRef, useEffect } from 'react';

/**
 * 8-Bit Pixel Star Anise Icon for retro badges
 */
export const PixelStarAnise: React.FC<{ size?: number; className?: string }> = ({
  size = 11,
  className = '',
}) => (
  <svg
    viewBox="0 0 11 11"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 0h1v3H5z M5 8h1v3H5z M0 5h3v1H0z M8 5h3v1H8z M2 2h2v1H2z M7 2h2v1H7z M2 8h2v1H2z M7 8h2v1H7z M4 4h3v3H4z"
      fill="#FDE047"
    />
    <rect x="5" y="5" width="1" height="1" fill="#FFFFFF" />
  </svg>
);

export interface SpinningStarAniseProps {
  size?: number | string;
  className?: string;
  speed?: 'normal' | 'slow' | 'gentle';
  glow?: boolean;
  spin?: boolean;
  interactive?: boolean;
  showMessageOnClick?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const SpinningStarAnise: React.FC<SpinningStarAniseProps> = ({
  size = 28,
  className = '',
  speed = 'slow',
  glow = true,
  spin = true,
  interactive = false,
  showMessageOnClick = false,
  onClick,
}) => {
  const aniseId = React.useId().replace(/[:]/g, '');
  const coreId = `aniseCore-${aniseId}`;
  const podId = `podCopper-${aniseId}`;
  const seedId = `seedGold-${aniseId}`;
  const shadowId = `softAniseShadow-${aniseId}`;

  const [isTapped, setIsTapped] = useState(false);
  const [showTraditionBadge, setShowTraditionBadge] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive && !onClick) return;
    e.stopPropagation();

    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 550);

    if (showMessageOnClick || interactive) {
      setShowTraditionBadge(true);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setShowTraditionBadge(false);
      }, 1500); // Disappears in exactly 1.5 seconds per user request
    }

    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const speedClass = spin
    ? {
        normal: 'animate-spin',
        slow: 'animate-spin-slow',
        gentle: 'animate-spin-gentle',
      }[speed]
    : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        glow ? 'animate-gold-shimmer' : ''
      } ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size }}
      title={interactive ? 'Sabor a tradición (Toca para ver)' : 'Anís Estrellado Artesanal'}
      aria-label="Anís estrellado tradicional"
      onClick={interactive ? handleClick : onClick}
    >
      <div
        className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${
          isTapped
            ? 'scale-140 rotate-12 drop-shadow-[0_0_18px_rgba(212,175,55,0.95)]'
            : interactive
            ? 'hover:scale-125 active:scale-95'
            : ''
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${speedClass} transition-transform duration-300`}
          style={{ transformOrigin: 'center center' }}
        >
          <defs>
            {/* Radial gradient for the warm central core */}
            <radialGradient id={coreId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8F3418" />
              <stop offset="50%" stopColor="#5A2411" />
              <stop offset="100%" stopColor="#361B10" />
            </radialGradient>

            {/* Copper & Terracotta gradient for the carpel pods */}
            <linearGradient id={podId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D47A50" />
              <stop offset="40%" stopColor="#B85D36" />
              <stop offset="80%" stopColor="#883317" />
              <stop offset="100%" stopColor="#4A1C0D" />
            </linearGradient>

            {/* Golden shimmer for the exposed shiny seeds */}
            <linearGradient id={seedId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="40%" stopColor="#E5C158" />
              <stop offset="80%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#7E5606" />
            </linearGradient>

            {/* Shadow filter for depth */}
            <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#241109" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Group with filter */}
          <g filter={`url(#${shadowId})`}>
            {/* 8 Botanical Star Anise Carpels / Pods */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
              <g key={index} transform={`rotate(${angle} 50 50)`}>
                {/* Main outer boat-shaped follicle with solid fallback + gradient */}
                <path
                  d="M50 50 C46 36, 42 22, 50 6 C58 22, 54 36, 50 50 Z"
                  fill="#B85D36"
                />
                <path
                  d="M50 50 C46 36, 42 22, 50 6 C58 22, 54 36, 50 50 Z"
                  fill={`url(#${podId})`}
                  stroke="#6B2912"
                  strokeWidth="0.8"
                />
                {/* Inner carved hollow cavity */}
                <path
                  d="M50 44 C47 33, 45 23, 50 12 C55 23, 53 33, 50 44 Z"
                  fill="#3D180B"
                  opacity="0.85"
                />
                {/* Glossy Golden Seed resting inside the cavity with solid fallback + gradient */}
                <ellipse
                  cx="50"
                  cy="23"
                  rx="2.6"
                  ry="4.5"
                  fill="#D4AF37"
                />
                <ellipse
                  cx="50"
                  cy="23"
                  rx="2.6"
                  ry="4.5"
                  fill={`url(#${seedId})`}
                  stroke="#8A6305"
                  strokeWidth="0.5"
                />
                {/* Tiny specular highlight on the seed */}
                <circle cx="49.2" cy="21.5" r="0.9" fill="#FFFFFF" opacity="0.9" />
                {/* Pod spine vein */}
                <line
                  x1="50"
                  y1="34"
                  x2="50"
                  y2="48"
                  stroke="#D47A50"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </g>
            ))}

            {/* Central floral hub joining all 8 carpels */}
            <circle cx="50" cy="50" r="8" fill="#5A2411" />
            <circle cx="50" cy="50" r="8" fill={`url(#${coreId})`} stroke="#D4AF37" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="4.5" fill="#C86438" />
            <circle cx="50" cy="50" r="2" fill="#E5C158" />
          </g>
        </svg>
      </div>

      {/* Floating Retro Pixel Message Badge: "Sabor a tradición" (Disappears in 1.5 seconds) */}
      {/* Positioned on top (superior) of the star anise so it does not obstruct the brand tagline and heart below */}
      {showTraditionBadge && (
        <span
          role="status"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[150] pointer-events-none flex items-center gap-1.5 px-2.5 py-1 bg-[#100603] text-[#FDE047] border border-[#D4AF37] shadow-[2px_2px_0px_#000000] whitespace-nowrap animate-pop-above"
          style={{
            fontFamily: "'Silkscreen', 'Press Start 2P', monospace",
            fontSize: '9.5px',
            lineHeight: '1.2',
            letterSpacing: '0.4px',
            imageRendering: 'pixelated',
          }}
        >
          <PixelStarAnise size={10} />
          <span>Sabor a tradición</span>
        </span>
      )}
    </div>
  );
};
