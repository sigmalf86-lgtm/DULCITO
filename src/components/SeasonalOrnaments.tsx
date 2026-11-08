import React, { useState } from 'react';
import { SeasonId, SEASONS } from '../types/seasons';
import { Sparkles, X, Check, Calendar } from 'lucide-react';
import { SpinningStarAnise } from './SpinningStarAnise';

interface SeasonalOrnamentsProps {
  currentSeason: SeasonId;
  onSeasonChange: (season: SeasonId) => void;
  isModalOpen?: boolean;
  onOpenModalChange?: (open: boolean) => void;
}

/**
 * Top Left Christmas Garland Swag with pine needles, golden bells, holly sprig & red velvet bow
 */
const ChristmasCornerGarlandLeft: React.FC = () => (
  <svg
    viewBox="0 0 200 160"
    className="hidden sm:block sm:w-44 sm:h-36 md:w-56 md:h-44 pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lush Pine Boughs & Needles */}
    <g stroke="#1F4D25" strokeWidth="2.5" strokeLinecap="round">
      <path d="M -10 -10 Q 50 20 110 50 Q 150 75 180 110" />
      <path d="M 15 5 L 25 22 M 28 8 L 42 26 M 45 15 L 62 38 M 65 25 L 85 50 M 90 38 L 115 65" />
      <path d="M -5 15 Q 40 40 90 75 Q 125 105 140 145" />
      <path d="M 10 25 L 18 42 M 25 32 L 38 52 M 42 45 L 60 70 M 65 60 L 88 88" />
    </g>
    {/* Secondary Pine Needles with gold frost tips */}
    <g stroke="#3A7D44" strokeWidth="1.8" strokeLinecap="round">
      <path d="M 20 10 L 32 26 M 38 18 L 52 38 M 55 28 L 74 54 M 78 44 L 102 75 M 105 60 L 132 95" />
      <path d="M 5 35 L 22 48 M 24 45 L 42 62 M 46 58 L 68 82 M 72 75 L 98 105" />
    </g>

    {/* Holly Leaves with golden veins */}
    <g fill="#16381C" stroke="#D4AF37" strokeWidth="1.2">
      <path d="M 45 35 C 55 30 65 32 75 22 C 70 34 76 42 70 52 C 58 48 52 54 45 35 Z" />
      <path d="M 85 45 C 98 40 108 44 118 32 C 112 46 120 56 112 68 C 98 62 92 70 85 45 Z" />
    </g>

    {/* Bright Holly Berries in clusters */}
    <g fill="#D91424" stroke="#FFF5BE" strokeWidth="1">
      <circle cx="58" cy="38" r="4.5" />
      <circle cx="65" cy="42" r="4" />
      <circle cx="60" cy="46" r="4.2" />
      <circle cx="95" cy="50" r="4.5" />
      <circle cx="102" cy="54" r="4" />
    </g>

    {/* Double Golden Christmas Bells */}
    <g transform="translate(68, 48) rotate(-15)">
      {/* Back Bell */}
      <path
        d="M 18 8 C 18 3 26 3 26 8 C 26 18 34 26 34 32 L 10 32 C 10 26 18 18 18 8 Z"
        fill="#C59325"
        stroke="#FDE047"
        strokeWidth="1.5"
      />
      <ellipse cx="22" cy="32" rx="12" ry="3.5" fill="#E5B83B" stroke="#FDE047" strokeWidth="1.2" />
      <circle cx="22" cy="35" r="2.8" fill="#8B1A1A" stroke="#FDE047" strokeWidth="1" />

      {/* Front Bell */}
      <path
        d="M 6 12 C 6 6 14 6 14 12 C 14 22 22 30 22 36 L -2 36 C -2 30 6 22 6 12 Z"
        fill="url(#bellGoldGrad)"
        stroke="#FFF5BE"
        strokeWidth="1.5"
      />
      <ellipse cx="10" cy="36" rx="12" ry="3.8" fill="#F5D061" stroke="#FFF5BE" strokeWidth="1.2" />
      <circle cx="10" cy="39" r="3" fill="#B31317" stroke="#FFF5BE" strokeWidth="1" />
    </g>

    {/* Festive Red Velvet Ribbon Bow at Crown */}
    <g transform="translate(60, 42)">
      {/* Ribbon Loops */}
      <path d="M 0 0 C -18 -15 -28 5 -5 6 Z" fill="#B31317" stroke="#FDE047" strokeWidth="1.2" />
      <path d="M 0 0 C 18 -15 28 5 5 6 Z" fill="#B31317" stroke="#FDE047" strokeWidth="1.2" />
      {/* Streamers */}
      <path d="M -3 4 C -12 22 -18 35 -24 45 L -16 43 L -12 45 C -6 32 -2 20 0 6 Z" fill="#8A0C10" stroke="#FDE047" strokeWidth="1" />
      <path d="M 3 4 C 12 22 18 35 24 45 L 16 43 L 12 45 C 6 32 2 20 0 6 Z" fill="#8A0C10" stroke="#FDE047" strokeWidth="1" />
      {/* Center Knot with Gold Star Anise Jewel */}
      <circle cx="0" cy="2" r="4.5" fill="#D6181F" stroke="#FCE38A" strokeWidth="1.2" />
    </g>

    {/* Sparkle Twinkles */}
    <circle cx="120" cy="35" r="2" fill="#FFF5BE" />
    <circle cx="165" cy="80" r="2.5" fill="#FDE047" />
    <circle cx="40" cy="80" r="1.8" fill="#FFF5BE" />

    <defs>
      <linearGradient id="bellGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="40%" stopColor="#F5D061" />
        <stop offset="75%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#966E14" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Top Right Christmas Garland Swag (Mirrored)
 */
const ChristmasCornerGarlandRight: React.FC = () => (
  <div className="transform scale-x-[-1]">
    <ChristmasCornerGarlandLeft />
  </div>
);

/**
 * Hanging Christmas Bauble for page margins
 */
const HangingChristmasBauble: React.FC<{
  side: 'left' | 'right';
  topPercent: number;
  cordLength: number;
  ballColor?: string;
  size?: number;
}> = ({ side, topPercent, cordLength, ballColor = '#D4AF37', size = 32 }) => {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none z-10 hidden lg:block"
      style={{
        [side]: '14px',
        top: `${topPercent}%`,
      }}
    >
      <svg
        width={size}
        height={cordLength + size}
        viewBox={`0 0 ${size} ${cordLength + size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] animate-pulse"
        style={{ animationDuration: '4s' }}
      >
        {/* Golden cord hanging down */}
        <line
          x1={size / 2}
          y1={0}
          x2={size / 2}
          y2={cordLength}
          stroke="#FDE047"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
        {/* Bauble cap with ring */}
        <rect
          x={size / 2 - 3.5}
          y={cordLength}
          width="7"
          height="4"
          rx="1"
          fill="#D4AF37"
          stroke="#FFF5BE"
          strokeWidth="0.8"
        />
        <circle
          cx={size / 2}
          cy={cordLength - 2}
          r="2.5"
          stroke="#FDE047"
          strokeWidth="1"
          fill="none"
        />

        {/* Bauble Globe */}
        <circle
          cx={size / 2}
          cy={cordLength + size / 2}
          r={size / 2 - 2}
          fill={ballColor}
          stroke="#FFF5BE"
          strokeWidth="1.5"
        />
        {/* Gilded ornamental band */}
        <path
          d={`M ${size * 0.15} ${cordLength + size * 0.5} Q ${size * 0.5} ${cordLength + size * 0.65} ${size * 0.85} ${cordLength + size * 0.5}`}
          stroke="#FDE047"
          strokeWidth="1.2"
        />
        <path
          d={`M ${size * 0.2} ${cordLength + size * 0.42} Q ${size * 0.5} ${cordLength + size * 0.55} ${size * 0.8} ${cordLength + size * 0.42}`}
          stroke="#FFF5BE"
          strokeWidth="0.8"
        />
        {/* Specular sheen */}
        <ellipse
          cx={size * 0.35}
          cy={cordLength + size * 0.35}
          rx={size * 0.12}
          ry={size * 0.08}
          fill="#FFFFFF"
          fillOpacity="0.65"
          transform={`rotate(-25 ${size * 0.35} ${cordLength + size * 0.35})`}
        />
      </svg>
    </div>
  );
};

/**
 * Seasonal Divider Filigree with season-specific motifs
 */
export const SeasonalSectionDivider: React.FC<{ season?: SeasonId }> = ({ season = 'navidad' }) => {
  if (season === 'navidad') {
    return (
      <div className="relative py-1.5 flex items-center justify-center pointer-events-none select-none max-w-xl mx-auto px-4">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
        <div className="mx-4 flex items-center gap-2 px-3 py-1 bg-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 rounded-full shadow-lg">
          <span className="text-xs">🎄</span>
          <span className="font-serif italic font-bold text-xs text-[#FDE047]">Edición Festiva Navideña</span>
          <SpinningStarAnise size={16} speed="slow" glow={true} />
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      </div>
    );
  }

  if (season === 'madres') {
    return (
      <div className="relative py-1.5 flex items-center justify-center pointer-events-none select-none max-w-xl mx-auto px-4">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
        <div className="mx-4 flex items-center gap-2 px-3 py-1 bg-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 rounded-full shadow-lg">
          <span className="text-xs">💐</span>
          <span className="font-serif italic font-bold text-xs text-[#FDE047]">Homenaje a las Madres</span>
          <span className="text-red-500">❤️</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      </div>
    );
  }

  if (season === 'verano') {
    return (
      <div className="relative py-1.5 flex items-center justify-center pointer-events-none select-none max-w-xl mx-auto px-4">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
        <div className="mx-4 flex items-center gap-2 px-3 py-1 bg-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 rounded-full shadow-lg">
          <span className="text-xs">☀️</span>
          <span className="font-serif italic font-bold text-xs text-[#FDE047]">Cacao & Verano Criollo</span>
          <span className="text-xs">🌿</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="relative py-1.5 flex items-center justify-center pointer-events-none select-none max-w-xl mx-auto px-4">
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      <div className="mx-4 flex items-center gap-2 px-3 py-1 bg-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 rounded-full shadow-lg">
        <span className="text-xs">🍂</span>
        <span className="font-serif italic font-bold text-xs text-[#FDE047]">Cosecha & Dulces de Olla</span>
        <span className="text-xs">🌰</span>
      </div>
      <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
    </div>
  );
};

export const SeasonalOrnaments: React.FC<SeasonalOrnamentsProps> = ({
  currentSeason,
  onSeasonChange,
  isModalOpen: externalIsModalOpen,
  onOpenModalChange,
}) => {
  const [internalIsModalOpen, setInternalIsModalOpen] = useState(false);
  const isModalOpen = externalIsModalOpen !== undefined ? externalIsModalOpen : internalIsModalOpen;
  const setModalOpen = (open: boolean) => {
    if (onOpenModalChange) {
      onOpenModalChange(open);
    } else {
      setInternalIsModalOpen(open);
    }
  };
  const activeConfig = SEASONS[currentSeason];

  return (
    <>
      {/* Background corner illustrations and hanging ornaments removed per user request */}
      {/* Only the golden ribbons with wreath & dynamic candle pin are retained */}

      {/* 3. MODAL FOR SEASON SELECTION & PREVIEW (Triggered optionally via season switcher) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-lg bg-[#180A04] rounded-3xl border-2 border-[#D4AF37] shadow-[0_20px_60px_rgba(0,0,0,0.95)] ring-2 ring-[#FFF3B3]/60 p-6 sm:p-8 text-[#FFF8EE] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#261007] border-2 border-[#D4AF37] flex items-center justify-center text-2xl shadow-md">
                  <Calendar className="w-6 h-6 text-[#FDE047]" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-[#FFF8EE] leading-tight">
                    Adornos de Temporada
                  </h3>
                  <p className="text-xs text-[#E0CCA7] mt-0.5">
                    Elige la época del año para transformar todos los adornos de la tienda
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl border border-[#D4AF37]/40 bg-[#261007] text-[#E0CCA7] hover:text-white hover:border-[#FDE047] transition-all"
                aria-label="Cerrar selector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Season Cards Grid */}
            <div className="space-y-3 mb-6">
              {(Object.keys(SEASONS) as SeasonId[]).map((seasonKey) => {
                const config = SEASONS[seasonKey];
                const isSelected = currentSeason === seasonKey;

                return (
                  <button
                    key={seasonKey}
                    type="button"
                    onClick={() => {
                      onSeasonChange(seasonKey);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 relative overflow-hidden ${
                      isSelected
                        ? 'border-[#FDE047] bg-gradient-to-r from-[#2F1308] via-[#4A200F] to-[#2F1308] shadow-[0_4px_20px_rgba(212,175,55,0.4)] ring-1 ring-[#FFF3B3]'
                        : 'border-[#D4AF37]/35 bg-[#1F0C05]/90 hover:bg-[#2A1107] hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#140602] border border-[#D4AF37]/60 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                      {config.icon}
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm sm:text-base text-[#FFF8EE]">
                          {config.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1A0B05]">
                            Activa
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#FDE047] font-medium mt-0.5">
                        {config.sublabel}
                      </p>
                      <p className="text-[11px] text-[#D9C2AA] mt-1 line-clamp-2 leading-relaxed">
                        {config.ornamentDescription}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#FDE047] bg-[#D4AF37] text-[#1A0B05]'
                            : 'border-[#D4AF37]/50 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer / Confirmation */}
            <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#E0CCA7]">
                <Sparkles className="w-4 h-4 text-[#FDE047]" />
                <span>Adornos aplicados al instante en toda la página</span>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 text-white font-bold text-xs hover:border-[#FFF8D6] hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
