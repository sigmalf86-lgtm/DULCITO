import React, { useState, useEffect, useRef } from 'react';

interface ChristmasWreathPinProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * Sound synthesis helper using browser Web Audio API.
 * 100% self-contained with no external assets or network requirements.
 */
function playFestiveAudio(type: 'ignite' | 'blowout') {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (type === 'ignite') {
      // Christmas festive chime arpeggio: C5, E5, G5, C6 with warm harmonics
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.07);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.07 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.07);
        osc.stop(ctx.currentTime + index * 0.07 + 0.5);
      });
    } else {
      // Soft gentle breath puff / blowout whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.26);
    }
  } catch {
    // Fail silently if browser audio is disallowed
  }
}

/**
 * PIN Navideño de Colección con Lazo Rojo Grandioso y Vela Navideña con Llama Dinámica e Interactiva.
 * Rediseñado según especificaciones:
 * - Lazo rojo más grande en la parte superior con bordes dorados y caídas de terciopelo.
 * - Vela navideña artesanal en lugar de campanas con plato de bronce y cera con gotas de cera derretida.
 * - Fuego dinámico en movimiento orgánico continuo (llama oscilante, halo cálido y chispas ascendentes).
 * - Totalmente interactivo: Clic para soplar/apagar o reencender la vela, pedir deseos navideños, con sonido festivo y destellos.
 */
export const ChristmasWreathPin: React.FC<ChristmasWreathPinProps> = ({
  size = 74,
  className = '',
  glow = true,
}) => {
  const pinId = React.useId().replace(/[:]/g, '');
  const [isLit, setIsLit] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [sparkleBurst, setSparkleBurst] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const handleCandleInteraction = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLitState = !isLit;
    setIsLit(nextLitState);
    setSparkleBurst(true);
    setTimeout(() => setSparkleBurst(false), 900);

    if (nextLitState) {
      playFestiveAudio('ignite');
      triggerFeedback('✨ ¡Llama encendida! Pide tu deseo');
    } else {
      playFestiveAudio('blowout');
      triggerFeedback('💨 ¡Vela apagada! Toca para encender');
    }
  };

  const triggerFeedback = (msg: string) => {
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }
    setFeedbackMsg(msg);
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedbackMsg(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onClick={handleCandleInteraction}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCandleInteraction(e as unknown as React.MouseEvent);
        }
      }}
      className={`group relative inline-flex items-center justify-center shrink-0 cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      title={isLit ? '🕯️ Vela encendida · Haz clic para apagarla o pedir un deseo' : '✨ Vela apagada · Haz clic para encenderla'}
      aria-label="Corona Navideña con lazo rojo y vela con llama dinámica interactiva"
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        className={`shrink-0 overflow-visible transition-all duration-300 ${
          glow && isLit
            ? 'drop-shadow-[0_4px_18px_rgba(234,179,8,0.7)] filter'
            : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes flameSway_${pinId} {
            0%, 100% {
              transform: rotate(0deg) scale(1) skewX(0deg);
            }
            18% {
              transform: rotate(-3.5deg) scale(1.06, 0.94) skewX(-2deg);
            }
            36% {
              transform: rotate(3deg) scale(0.95, 1.05) skewX(2.5deg);
            }
            54% {
              transform: rotate(-2deg) scale(1.04, 0.96) skewX(-1.5deg);
            }
            72% {
              transform: rotate(3.5deg) scale(0.97, 1.03) skewX(2deg);
            }
            88% {
              transform: rotate(-1deg) scale(1.02, 0.98) skewX(-0.5deg);
            }
          }

          @keyframes flameCoreDance_${pinId} {
            0%, 100% {
              transform: rotate(0deg) scale(1);
            }
            25% {
              transform: rotate(2deg) scale(1.08, 0.92);
            }
            50% {
              transform: rotate(-2.5deg) scale(0.92, 1.08);
            }
            75% {
              transform: rotate(1.5deg) scale(1.04, 0.96);
            }
          }

          @keyframes haloBreathe_${pinId} {
            0%, 100% {
              opacity: 0.72;
              transform: scale(1);
            }
            50% {
              opacity: 0.98;
              transform: scale(1.15);
            }
          }

          @keyframes sparkFlyA_${pinId} {
            0% {
              transform: translate(80px, 52px) scale(0.6);
              opacity: 0;
            }
            25% {
              opacity: 1;
            }
            75% {
              opacity: 0.8;
            }
            100% {
              transform: translate(73px, 26px) scale(0.2);
              opacity: 0;
            }
          }

          @keyframes sparkFlyB_${pinId} {
            0% {
              transform: translate(80px, 50px) scale(0.7);
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            70% {
              opacity: 0.85;
            }
            100% {
              transform: translate(88px, 22px) scale(0.2);
              opacity: 0;
            }
          }

          @keyframes smokeCurl_${pinId} {
            0% {
              transform: translate(80px, 62px) scale(0.4);
              opacity: 0.85;
            }
            50% {
              transform: translate(83px, 46px) scale(1);
              opacity: 0.5;
            }
            100% {
              transform: translate(76px, 28px) scale(1.6);
              opacity: 0;
            }
          }

          @keyframes emberPulse_${pinId} {
            0%, 100% {
              opacity: 0.6;
              r: 1.8;
            }
            50% {
              opacity: 1;
              r: 2.4;
            }
          }
        `}</style>

        <defs>
          {/* Flame Radiant Outer Halo */}
          <radialGradient id={`flameHalo-${pinId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#F97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Flame Teardrop Gradient */}
          <linearGradient id={`flameGrad-${pinId}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="12%" stopColor="#EA580C" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Flame Core White-Hot Gradient */}
          <linearGradient id={`flameCoreGrad-${pinId}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="40%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Large Velvet Red Ribbon Bow Gradient */}
          <linearGradient id={`grandBowRed-${pinId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4A5C" />
            <stop offset="28%" stopColor="#DC1428" />
            <stop offset="65%" stopColor="#9E0A1A" />
            <stop offset="100%" stopColor="#540008" />
          </linearGradient>

          {/* Ribbon Gold Stitching Edge */}
          <linearGradient id={`bowGoldEdge-${pinId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9D2" />
            <stop offset="45%" stopColor="#FDE047" />
            <stop offset="75%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A5A12" />
          </linearGradient>

          {/* Candle Cream Ivory Wax Gradient */}
          <linearGradient id={`candleWaxGrad-${pinId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2D4B7" />
            <stop offset="25%" stopColor="#FFFDF7" />
            <stop offset="65%" stopColor="#FFF9EB" />
            <stop offset="100%" stopColor="#CBB895" />
          </linearGradient>

          {/* Candle Brass Saucer/Holder Gradient */}
          <linearGradient id={`brassHolderGrad-${pinId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5BE" />
            <stop offset="30%" stopColor="#F3CA40" />
            <stop offset="70%" stopColor="#BA8E23" />
            <stop offset="100%" stopColor="#634509" />
          </linearGradient>

          {/* Gold Brooch Rim */}
          <linearGradient id={`goldBrooch-${pinId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#7A4E0D" />
          </linearGradient>
        </defs>

        {/* --- 1. BROOCH BASE & GOLDEN RIM --- */}
        {/* Ambient Warm Golden Aura */}
        <circle cx="80" cy="80" r="74" fill="#D4AF37" opacity={isLit ? 0.16 : 0.08} />

        {/* Outer Circular Brooch/Pin Ring with 24k Gold Beading */}
        <circle cx="80" cy="80" r="71" stroke={`url(#goldBrooch-${pinId})`} strokeWidth="2.8" />
        <circle cx="80" cy="80" r="67" stroke="#FFF5BE" strokeWidth="0.8" strokeDasharray="3 2.5" opacity="0.85" />

        {/* --- 2. LUSH EVERGREEN PINE WREATH (CORONA NAVIDEÑA) --- */}
        {/* Deep forest pine base ring */}
        <circle cx="80" cy="80" r="50" strokeWidth="17" stroke="#0F3818" fill="none" opacity="0.95" />

        {/* Primary dense radial pine needle boughs */}
        <g stroke="#184D23" strokeWidth="3" strokeLinecap="round">
          {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 80 80)`}>
              <path d="M 80 26 L 73 18 M 80 28 L 87 20 M 80 32 L 72 24 M 80 34 L 88 26 M 80 38 L 71 30 M 80 40 L 89 32" />
            </g>
          ))}
        </g>

        {/* Middle pine needles with vibrant emerald needles & frost highlights */}
        <g stroke="#2E7D32" strokeWidth="2.2" strokeLinecap="round">
          {[12, 36, 60, 84, 108, 132, 156, 180, 204, 228, 252, 276, 300, 324, 348].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 80 80)`}>
              <path d="M 80 24 L 75 16 M 80 27 L 85 19 M 80 31 L 74 23 M 80 35 L 86 27" />
            </g>
          ))}
        </g>

        {/* Golden frosted tips on boughs */}
        <g stroke="#FDE047" strokeWidth="1.2" strokeLinecap="round" opacity="0.85">
          {[6, 30, 54, 78, 102, 126, 150, 174, 198, 222, 246, 270, 294, 318, 342].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 80 80)`}>
              <line x1="80" y1="20" x2="82" y2="15" />
              <line x1="80" y1="24" x2="77" y2="18" />
            </g>
          ))}
        </g>

        {/* --- 3. MUÉRDAGO / HOLLY LEAVES & BERRIES --- */}
        <g fill="#164E22" stroke="#D4AF37" strokeWidth="0.9">
          {/* Left Holly Sprig */}
          <path d="M 38 86 C 30 79 28 69 20 65 C 28 69 34 65 40 57 C 38 67 46 73 38 86 Z" />
          <path d="M 40 94 C 32 98 24 94 16 102 C 24 96 28 102 38 104 Z" />
          {/* Right Holly Sprig */}
          <path d="M 122 86 C 130 79 132 69 140 65 C 132 69 126 65 120 57 C 122 67 114 73 122 86 Z" />
          <path d="M 120 94 C 128 98 136 94 144 102 C 136 96 132 102 122 104 Z" />
          {/* Bottom Center Holly Sprig */}
          <path d="M 72 134 C 64 138 62 144 56 148 C 64 144 70 146 76 148 Z" />
          <path d="M 88 134 C 96 138 98 144 104 148 C 96 144 90 146 84 148 Z" />
        </g>

        {/* Clusters of Ruby Holly Berries with 3D depth */}
        <g fill="#DC1424" stroke="#FFF5BE" strokeWidth="0.8">
          {/* Left berry cluster */}
          <circle cx="34" cy="80" r="4.2" />
          <circle cx="41" cy="84" r="3.8" />
          <circle cx="35" cy="88" r="4" />
          {/* Right berry cluster */}
          <circle cx="126" cy="80" r="4.2" />
          <circle cx="119" cy="84" r="3.8" />
          <circle cx="125" cy="88" r="4" />
          {/* Bottom berry cluster */}
          <circle cx="74" cy="138" r="4" />
          <circle cx="86" cy="138" r="4" />
          <circle cx="80" cy="143" r="4.2" />
        </g>

        {/* Berry specular shine spots */}
        <g fill="#FFFFFF" opacity="0.9">
          <circle cx="33" cy="78.5" r="1.1" />
          <circle cx="40" cy="82.5" r="1" />
          <circle cx="34" cy="86.5" r="1" />
          <circle cx="125" cy="78.5" r="1.1" />
          <circle cx="118" cy="82.5" r="1" />
          <circle cx="124" cy="86.5" r="1" />
          <circle cx="73" cy="136.5" r="1" />
          <circle cx="85" cy="136.5" r="1" />
          <circle cx="79" cy="141.5" r="1.1" />
        </g>

        {/* --- 4. ARTISANAL CHRISTMAS CANDLE (REPLACES THE BELLS) --- */}
        <g id="christmas-candle-assembly">
          {/* Brass candleholder tray base nestled in pine */}
          <ellipse cx="80" cy="124" rx="27" ry="7" fill={`url(#brassHolderGrad-${pinId})`} stroke="#FFF5BE" strokeWidth="1.2" />
          <ellipse cx="80" cy="122.5" rx="23" ry="5.5" fill="#4E3306" opacity="0.3" />
          {/* Beaded rim on saucer */}
          <ellipse cx="80" cy="124" rx="26" ry="6.6" stroke="#FFEBA8" strokeWidth="0.8" strokeDasharray="1.8 1.8" fill="none" />
          {/* Baroque golden finger handle on right side */}
          <path
            d="M 103 123 C 114 122, 118 132, 107 136 C 103 138, 98 134, 101 127"
            stroke={`url(#brassHolderGrad-${pinId})`}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 103 123 C 113 122, 117 131, 107 135"
            stroke="#FFF5BE"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Candle Column (Rich ivory wax with cylindrical shading) */}
          <rect
            x="70"
            y="72"
            width="20"
            height="50"
            rx="2.5"
            fill={`url(#candleWaxGrad-${pinId})`}
            stroke="#8F784D"
            strokeWidth="0.9"
          />

          {/* Candle Decorative Golden Ribbon Band with Star */}
          <rect x="70" y="98" width="20" height="7" fill={`url(#brassHolderGrad-${pinId})`} stroke="#FFF2B2" strokeWidth="0.7" />
          <path
            d="M 80 99 L 81.3 101.5 L 84 101.8 L 82 103.5 L 82.6 106 L 80 104.7 L 77.4 106 L 78 103.5 L 76 101.8 L 78.7 101.5 Z"
            fill="#FFFBEB"
            stroke="#C49117"
            strokeWidth="0.5"
          />

          {/* Melted Wax Pool and Rim at Top */}
          <ellipse cx="80" cy="72" rx="10" ry="3.5" fill="#FFFDF8" stroke="#A78D5B" strokeWidth="0.9" />
          <ellipse cx="80" cy="72" rx="8" ry="2.6" fill="#F4E8D1" />

          {/* Realistic Dripping Melted Wax Tears */}
          {/* Left Dripping Wax */}
          <path
            d="M 70.8 73 C 69.5 76, 69.2 81, 71.5 87 C 73 91, 74.8 91, 74.5 86 C 74.2 81, 73.5 74, 73.5 72"
            fill="#FFFDF7"
            stroke="#CBB895"
            strokeWidth="0.8"
          />
          {/* Right Dripping Wax */}
          <path
            d="M 88.5 73 C 90 77, 90.8 82, 89.2 88 C 88 92, 86 92, 86.8 86 C 87.5 81, 88 74, 88 72"
            fill="#FFFDF7"
            stroke="#CBB895"
            strokeWidth="0.8"
          />
          {/* Center Subtle Drip */}
          <path
            d="M 78 74 C 77.5 77, 78 80, 79 82 C 80 84, 81.2 84, 81.5 80 C 81.8 77, 81 74, 81 74"
            fill="#FFF8E8"
            opacity="0.85"
          />

          {/* Candle Wick */}
          <path
            d="M 80 72 C 80 69, 79.5 66, 80 62"
            stroke="#2B1508"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* --- 5. DYNAMIC, MOVING, INTERACTIVE FLAME (EL FUEGO QUE SE MUEVE) --- */}
          {isLit ? (
            <g id="dynamic-candle-flame">
              {/* Outer Pulsing Glow Aura */}
              <circle
                cx="80"
                cy="48"
                r="30"
                fill={`url(#flameHalo-${pinId})`}
                style={{
                  transformOrigin: '80px 48px',
                  animation: `haloBreathe_${pinId} 2.2s ease-in-out infinite`,
                }}
              />

              {/* Combustion Base Glow (Realistic Physics Blue Notch at Wick Root) */}
              <ellipse cx="80" cy="62" rx="3.5" ry="2" fill="#2563EB" opacity="0.85" />
              <ellipse cx="80" cy="62" rx="2" ry="1.2" fill="#60A5FA" />

              {/* Main Outer Flame Teardrop (Dancing & Flickering with Organically Styled SVG Keyframes) */}
              <g
                style={{
                  transformOrigin: '80px 60px',
                  animation: `flameSway_${pinId} 1.4s ease-in-out infinite`,
                }}
              >
                {/* Outer Flame Envelope */}
                <path
                  d="M 80 62 C 73 59, 71 49, 75 42 C 77 37, 79 33, 80 27 C 81 33, 83 37, 85 42 C 89 49, 87 59, 80 62 Z"
                  fill={`url(#flameGrad-${pinId})`}
                  stroke="#FFD54F"
                  strokeWidth="0.8"
                  style={{
                    filter: isHovered
                      ? 'drop-shadow(0 0 10px rgba(253, 224, 71, 0.95))'
                      : 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))',
                  }}
                />

                {/* Mid-Flame Brilliant Amber-Yellow Layer */}
                <path
                  d="M 80 61 C 75 58, 73.5 50, 76.5 44 C 78 40, 79.5 36, 80 32 C 80.5 36, 82 40, 83.5 44 C 86.5 50, 85 58, 80 61 Z"
                  fill="#FBBF24"
                  opacity="0.92"
                />

                {/* Inner Flame Core (Dancing synchronously with white-hot brilliance) */}
                <path
                  d="M 80 60 C 76.5 58, 75.5 52, 77.5 47 C 78.5 44, 79.5 40, 80 36 C 80.5 40, 81.5 44, 82.5 47 C 84.5 52, 83.5 58, 80 60 Z"
                  fill={`url(#flameCoreGrad-${pinId})`}
                  style={{
                    transformOrigin: '80px 60px',
                    animation: `flameCoreDance_${pinId} 0.9s ease-in-out infinite alternate`,
                  }}
                />

                {/* White-Hot Core Needle */}
                <ellipse cx="80" cy="51" rx="1.6" ry="5.5" fill="#FFFFFF" opacity="0.95" />
              </g>

              {/* Floating Embers / Flying Sparks Rising From Flame */}
              <circle
                cx="0"
                cy="0"
                r="1.6"
                fill="#FEF08A"
                style={{
                  animation: `sparkFlyA_${pinId} 1.9s ease-out infinite`,
                  filter: 'drop-shadow(0 0 3px #FDE047)',
                }}
              />
              <circle
                cx="0"
                cy="0"
                r="1.4"
                fill="#FDE047"
                style={{
                  animation: `sparkFlyB_${pinId} 2.3s ease-out 0.8s infinite`,
                  filter: 'drop-shadow(0 0 3px #F59E0B)',
                }}
              />
            </g>
          ) : (
            /* Blown-Out State: Wispy Smoke Curler and Red Smoldering Ember Wick */
            <g id="blown-out-candle">
              {/* Hot smoldering ember at wick tip */}
              <circle
                cx="80"
                cy="62"
                r="2"
                fill="#EF4444"
                style={{
                  animation: `emberPulse_${pinId} 1.2s ease-in-out infinite`,
                  filter: 'drop-shadow(0 0 4px #DC2626)',
                }}
              />
              <circle cx="80" cy="62" r="0.9" fill="#FDE047" />

              {/* Rising Wisps of Smoke */}
              <g
                style={{
                  transformOrigin: '80px 62px',
                  animation: `smokeCurl_${pinId} 2.5s ease-out infinite`,
                }}
              >
                <path
                  d="M 0 0 C 4 -6, -4 -14, 2 -22 C 6 -28, 0 -36, 4 -42"
                  stroke="#E2E8F0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                  opacity="0.75"
                  fill="none"
                />
              </g>
            </g>
          )}
        </g>

        {/* --- 6. GRAND RED VELVET RIBBON BOW AT THE TOP CROWN (LAZO ROJO MÁS GRANDE) --- */}
        {/* Prominent, voluminous velvet red bow crowning the wreath with gold embroidery and cascading swallowtail tails */}
        <g id="grand-top-red-bow">
          {/* Flowing Ribbon Tails Cascading Down Wreath Sides (Behind Main Loops) */}
          {/* Left Ribbon Tail */}
          <path
            d="M 74 34 C 64 44, 48 58, 40 76 L 47 74 L 52 78 C 56 64, 68 50, 76 36 Z"
            fill="#7A000D"
            stroke={`url(#bowGoldEdge-${pinId})`}
            strokeWidth="1.1"
          />
          {/* Right Ribbon Tail */}
          <path
            d="M 86 34 C 96 44, 112 58, 120 76 L 113 74 L 108 78 C 104 64, 92 50, 84 36 Z"
            fill="#7A000D"
            stroke={`url(#bowGoldEdge-${pinId})`}
            strokeWidth="1.1"
          />

          {/* Left Big Bow Loop (Upper and Broad) */}
          <path
            d="M 80 27 C 62 10, 32 15, 34 32 C 35 44, 58 43, 76 31 Z"
            fill={`url(#grandBowRed-${pinId})`}
            stroke={`url(#bowGoldEdge-${pinId})`}
            strokeWidth="1.4"
            className="transition-all duration-300"
          />
          {/* Left Inner Fold Dimension Shadow */}
          <path
            d="M 72 29 C 58 20, 42 22, 44 32 C 45 37, 58 38, 70 31 Z"
            fill="#5A0009"
            opacity="0.8"
          />

          {/* Right Big Bow Loop (Upper and Broad) */}
          <path
            d="M 80 27 C 98 10, 128 15, 126 32 C 125 44, 102 43, 84 31 Z"
            fill={`url(#grandBowRed-${pinId})`}
            stroke={`url(#bowGoldEdge-${pinId})`}
            strokeWidth="1.4"
            className="transition-all duration-300"
          />
          {/* Right Inner Fold Dimension Shadow */}
          <path
            d="M 88 29 C 102 20, 118 22, 116 32 C 115 37, 102 38, 90 31 Z"
            fill="#5A0009"
            opacity="0.8"
          />

          {/* Ribbon Folds Specular Highlights */}
          <path
            d="M 44 22 C 54 18, 68 22, 74 27"
            stroke="#FFF5BE"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.75"
            fill="none"
          />
          <path
            d="M 116 22 C 106 18, 92 22, 86 27"
            stroke="#FFF5BE"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.75"
            fill="none"
          />

          {/* Center Knot (Luxurious Brooch Cushion Knot with Faceted 8-Point Gold Star Jewel) */}
          <circle cx="80" cy="29" r="8.5" fill="#990B17" stroke={`url(#bowGoldEdge-${pinId})`} strokeWidth="1.6" />
          <circle cx="80" cy="29" r="6" fill={`url(#grandBowRed-${pinId})`} />
          {/* 8-Point Gold Star Brooch Jewel */}
          <path
            d="M 80 23 L 81.8 27.2 L 86 29 L 81.8 30.8 L 80 35 L 78.2 30.8 L 74 29 L 78.2 27.2 Z"
            fill="#FFFBEB"
            stroke="#C49117"
            strokeWidth="0.8"
          />
          <circle cx="80" cy="29" r="1.6" fill="#FDE047" />
        </g>

        {/* --- 7. SPARKLE STARS AROUND WREATH --- */}
        <g fill="#FFFDF7">
          <circle cx="26" cy="38" r="1.8" />
          <circle cx="134" cy="38" r="1.8" />
          <circle cx="20" cy="116" r="1.6" />
          <circle cx="140" cy="116" r="1.6" />
          <circle cx="80" cy="150" r="2.2" fill="#FDE047" />
        </g>

        {/* --- 8. BURST PARTICLES ON INTERACTION (PIDE UN DESEO) --- */}
        {sparkleBurst && (
          <g id="sparkle-burst-particles">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 80 60)`}>
                <line
                  x1="80"
                  y1="34"
                  x2="80"
                  y2="18"
                  stroke="#FDE047"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="animate-ping"
                />
                <circle cx="80" cy="16" r="2" fill="#FFFFFF" />
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* Interactive Micro-Tooltip / Feedback Notification - Positioned tightly on the wreath so it never gets clipped or lost */}
      {feedbackMsg ? (
        <div
          role="status"
          className="absolute bottom-1 sm:bottom-1.5 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-[150] pointer-events-none whitespace-nowrap px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-full bg-[#100603] border border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 text-[#FDE047] text-[9.5px] sm:text-xs font-bold shadow-[2px_2px_0px_#000000] drop-shadow-lg animate-wreath-pop"
          style={{
            letterSpacing: '0.3px',
          }}
        >
          {feedbackMsg}
        </div>
      ) : isHovered ? (
        <div className="absolute bottom-1 sm:bottom-1.5 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-[140] pointer-events-none whitespace-nowrap px-2 py-0.5 rounded-full bg-[#1A0A04]/95 border border-[#D4AF37]/90 text-[#FFF3B3] text-[9px] sm:text-[10px] font-medium shadow-md transition-opacity duration-200">
          {isLit ? '✨ Toca la vela' : '🕯️ Toca para encender'}
        </div>
      ) : null}
    </div>
  );
};
