import React from 'react';

export interface SpinningStarAniseProps {
  size?: number;
  speed?: 'slow' | 'medium' | 'fast' | 'gentle';
  glow?: boolean;
  className?: string;
  staticAngle?: number;
}

export const SpinningStarAnise: React.FC<SpinningStarAniseProps> = ({
  size = 24,
  speed = 'slow',
  glow = false,
  className = '',
  staticAngle,
}) => {
  const speedClass =
    staticAngle !== undefined
      ? ''
      : speed === 'slow'
      ? 'animate-spin-slow'
      : speed === 'gentle'
      ? 'animate-spin-gentle'
      : speed === 'fast'
      ? 'animate-spin'
      : 'animate-spin-slow';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${glow ? 'animate-gold-shimmer' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`${speedClass} transition-transform`}
        style={staticAngle !== undefined ? { transform: `rotate(${staticAngle}deg)` } : undefined}
      >
        <defs>
          {/* Radial warm wood gradient */}
          <radialGradient id="aniseWood" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#824623" />
            <stop offset="45%" stopColor="#5E2C13" />
            <stop offset="85%" stopColor="#3B1708" />
            <stop offset="100%" stopColor="#220B03" />
          </radialGradient>
          {/* Golden spice seed highlight */}
          <linearGradient id="aniseSeed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8D5B18" />
          </linearGradient>
          {/* Edge highlight */}
          <linearGradient id="aniseEdge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A86134" />
            <stop offset="100%" stopColor="#4A1E0B" />
          </linearGradient>
        </defs>

        {/* 8-pointed botanical star anise */}
        <g transform="translate(50, 50)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle})`}>
              {/* Outer woody carpel / boat-shaped follicle */}
              <path
                d="M 0 0 C -6 -12 -11 -28 0 -45 C 11 -28 6 -12 0 0 Z"
                fill="url(#aniseWood)"
                stroke="url(#aniseEdge)"
                strokeWidth="1.2"
              />
              {/* Inner carved crease */}
              <path
                d="M 0 -8 L 0 -36"
                stroke="#240D04"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Glossy shiny seed inside follicle */}
              <ellipse
                cx="0"
                cy="-26"
                rx="3.2"
                ry="5.5"
                fill="url(#aniseSeed)"
                stroke="#6B370E"
                strokeWidth="0.6"
              />
              {/* Tiny specular sheen on seed */}
              <ellipse
                cx="-0.8"
                cy="-28"
                rx="0.9"
                ry="1.8"
                fill="#FFFDF5"
                opacity="0.85"
              />
            </g>
          ))}

          {/* Central woody hub connecting the follicles */}
          <circle cx="0" cy="0" r="10" fill="#361506" stroke="#5E2C13" strokeWidth="1" />
          <circle cx="0" cy="0" r="6" fill="#200B03" />
          <circle cx="0" cy="0" r="3" fill="#D4AF37" opacity="0.8" />
        </g>
      </svg>
    </span>
  );
};
