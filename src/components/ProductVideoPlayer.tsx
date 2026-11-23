import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';

interface ProductVideoPlayerProps {
  videoUrl: string;
  productName: string;
  posterImage?: string;
  logoUrl?: string;
  compact?: boolean;
  interactiveMode?: 'gif-hover' | 'modal-full';
  christmasRibbonOverlay?: boolean;
  onEnlarge?: () => void;
}

const ChristmasGoldRibbonOverlay: React.FC = () => (
  <div
    className="absolute top-0 inset-x-0 z-30 h-[11.5%] min-h-[36px] max-h-[44px] pointer-events-none select-none overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.85)]"
    aria-hidden="true"
  >
    {/* Metallic Champagne-Gold Silk Ribbon Base */}
    <div
      className="relative w-full h-full flex items-center justify-between px-2.5 sm:px-3.5 border-b-2 border-[#FFF4C8]"
      style={{
        background:
          'linear-gradient(180deg, #7A540B 0%, #D4AF37 15%, #FFF4C8 42%, #F6D365 65%, #C89B2B 88%, #6B4707 100%)',
      }}
    >
      {/* Subtle Silk Sheen Sweep */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-ribbon-sheen"
      />

      {/* Delicate Stitched Gold Thread Borders */}
      <div className="absolute inset-x-0 top-[3px] border-t border-dashed border-[#6B4208]/45" />
      <div className="absolute inset-x-0 bottom-[3px] border-b border-dashed border-[#6B4208]/45" />

      {/* Left Festive Holly, Pine & Berries Cluster (directly over top-left watermark area) */}
      <svg
        viewBox="0 0 96 36"
        className="relative z-10 h-7 sm:h-8 w-auto shrink-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pine Sprigs */}
        <path d="M4 18 Q22 10 46 18" stroke="#184722" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 15 L14 7 M14 14 L22 5 M22 14 L30 6 M30 15 L38 8" stroke="#246331" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 21 L14 29 M16 20 L23 29 M25 19 L32 28" stroke="#184722" strokeWidth="1.6" strokeLinecap="round" />
        {/* Scalloped Holly Leaves with Gold Trim */}
        <path
          d="M28 18 C34 10 44 10 52 6 C50 14 54 19 48 25 C40 22 34 25 28 18 Z"
          fill="#1B4D24"
          stroke="#FFF4B8"
          strokeWidth="1"
        />
        <path
          d="M12 18 C16 12 24 12 29 9 C28 15 30 19 26 23 C20 21 16 23 12 18 Z"
          fill="#246331"
          stroke="#FFF4B8"
          strokeWidth="0.9"
        />
        {/* Crimson Holly Berries */}
        <circle cx="30" cy="17" r="3.6" fill="#C8102E" stroke="#FFF4C8" strokeWidth="0.8" />
        <circle cx="36" cy="20" r="3.2" fill="#E11D48" stroke="#FFF4C8" strokeWidth="0.8" />
        <circle cx="35" cy="13" r="3.0" fill="#B91C1C" stroke="#FFF4C8" strokeWidth="0.8" />
        {/* Berry Highlights */}
        <circle cx="29" cy="16" r="0.9" fill="#FFFFFF" opacity="0.85" />
        <circle cx="35" cy="19" r="0.8" fill="#FFFFFF" opacity="0.85" />
        {/* Gold Twinkle */}
        <path d="M62 18 L64 13 L66 18 L71 20 L66 22 L64 27 L62 22 L57 20 Z" fill="#FFFDF0" opacity="0.9" />
      </svg>

      {/* Centerpiece Ribbon Crest & Calligraphy */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 rounded-full bg-[#241006]/90 border border-[#FFF4C8]/85 shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
        <span className="text-[#FDE047] text-[9px] sm:text-[10px]">★</span>
        <span className="font-serif font-black tracking-[0.14em] uppercase text-[9px] sm:text-[11px] text-[#FFF8DC] whitespace-nowrap">
          DULCITO
        </span>
        <span className="text-[#D4AF37] text-[10px] hidden xs:inline">·</span>
        <span
          className="text-[13px] sm:text-[15px] text-[#FDE047] leading-none whitespace-nowrap hidden xs:inline"
          style={{ fontFamily: "'Great Vibes', 'Alex Brush', cursive" }}
        >
          Navidad
        </span>
        <span className="text-[#FDE047] text-[9px] sm:text-[10px]">★</span>
      </div>

      {/* Right Mirrored Festive Holly, Pine & Crimson Bow Accent */}
      <svg
        viewBox="0 0 96 36"
        className="relative z-10 h-7 sm:h-8 w-auto shrink-0 transform scale-x-[-1] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 18 Q22 10 46 18" stroke="#184722" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 15 L14 7 M14 14 L22 5 M22 14 L30 6 M30 15 L38 8" stroke="#246331" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 21 L14 29 M16 20 L23 29 M25 19 L32 28" stroke="#184722" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M28 18 C34 10 44 10 52 6 C50 14 54 19 48 25 C40 22 34 25 28 18 Z"
          fill="#1B4D24"
          stroke="#FFF4B8"
          strokeWidth="1"
        />
        <path
          d="M12 18 C16 12 24 12 29 9 C28 15 30 19 26 23 C20 21 16 23 12 18 Z"
          fill="#246331"
          stroke="#FFF4B8"
          strokeWidth="0.9"
        />
        <circle cx="30" cy="17" r="3.6" fill="#C8102E" stroke="#FFF4C8" strokeWidth="0.8" />
        <circle cx="36" cy="20" r="3.2" fill="#E11D48" stroke="#FFF4C8" strokeWidth="0.8" />
        <circle cx="35" cy="13" r="3.0" fill="#B91C1C" stroke="#FFF4C8" strokeWidth="0.8" />
        <circle cx="29" cy="16" r="0.9" fill="#FFFFFF" opacity="0.85" />
        <circle cx="35" cy="19" r="0.8" fill="#FFFFFF" opacity="0.85" />
        <path d="M62 18 L64 13 L66 18 L71 20 L66 22 L64 27 L62 22 L57 20 Z" fill="#FFFDF0" opacity="0.9" />
      </svg>
    </div>
  </div>
);

export const ProductVideoPlayer: React.FC<ProductVideoPlayerProps> = ({
  videoUrl,
  productName,
  posterImage,
  logoUrl,
  compact = true,
  interactiveMode = 'gif-hover',
  christmasRibbonOverlay = false,
  onEnlarge,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // In modal-full mode, autoplay immediately. In gif-hover mode, only play on hover or tap.
  const isGifMode = interactiveMode === 'gif-hover';
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(!isGifMode);
  const [isPlaying, setIsPlaying] = useState(!isGifMode);
  const [isMuted, setIsMuted] = useState(isGifMode);
  const [progress, setProgress] = useState(0);

  // Active state is either hovered on desktop or explicitly activated on mobile
  const shouldPlay = isGifMode ? (isHovered || isTouchActive) : isPlaying;

  // Sync play/pause with shouldPlay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted if unmuted, retry muted
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [shouldPlay]);

  // Video time tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // IntersectionObserver to pause video on mobile when scrolled out of view
  useEffect(() => {
    if (!isGifMode) return;
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isTouchActive) {
            setIsTouchActive(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isGifMode, isTouchActive]);

  const handleMouseEnter = () => {
    if (isGifMode) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isGifMode) {
      setIsHovered(false);
      // On desktop mouse leave, also deactivate touch mode so it resets cleanly
      setIsTouchActive(false);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGifMode) {
      // Toggle play on touch/click
      const nextState = !shouldPlay;
      setIsTouchActive(nextState);
      if (!nextState) setIsHovered(false);
    } else {
      // Modal full player toggle
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    if (!next && video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      className={`relative w-full overflow-hidden bg-[#120703] cursor-pointer group flex items-center justify-center select-none ${
        compact ? 'aspect-[4/3] max-h-[340px]' : 'aspect-[16/10] sm:aspect-[4/3] max-h-[340px]'
      }`}
    >
      {/* 1. Static Poster Image (Zero GPU/CPU cost when idle, object-contain so bottle is never cut off) */}
      {posterImage && (
        <img
          src={posterImage}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-contain p-1.5 transition-opacity duration-500 pointer-events-none ${
            shouldPlay ? 'opacity-0 z-0' : 'opacity-100 z-10'
          }`}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* 2. Video Element (Lazy loaded: only streams and decodes on demand, freeing mobile GPU) */}
      {shouldPlay && (
        <video
          ref={videoRef}
          src={videoUrl}
          preload="auto"
          autoPlay
          playsInline
          muted={isMuted}
          loop
          className="relative w-full h-full object-contain transition-opacity duration-300 drop-shadow-md opacity-100 z-10"
        />
      )}

      {/* 2b. Christmas Golden Ribbon Overlay (covers top watermark cleanly when playing) */}
      {christmasRibbonOverlay && shouldPlay && <ChristmasGoldRibbonOverlay />}

      {/* 3. Subtle Vignette Overlays */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

      {/* 4. Top Status Badges */}
      <div
        className={`absolute inset-x-2.5 z-25 flex items-center justify-between pointer-events-none ${
          christmasRibbonOverlay && shouldPlay ? 'top-12 sm:top-13' : 'top-2.5'
        }`}
      >
        {/* GIF Mode Indicator Badge */}
        <div className="pointer-events-auto">
          {shouldPlay ? (
            <div className="px-2.5 py-1 rounded-lg bg-[#241109]/90 border border-[#FDE047] text-[#FDE047] text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 shadow-lg animate-pulse-gentle backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FDE047] animate-ping" />
              <span>GIF en reproducción</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-lg bg-[#1C0D06]/85 border border-[#D4AF37]/60 text-[#F2DA91] text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-sm group-hover:border-[#FDE047] transition-colors">
              <Film className="w-3 h-3 text-[#E5C158]" />
              <span>GIF (Pasa el cursor o toca)</span>
            </div>
          )}
        </div>

        {/* Brand Seal Watermark Badge on Top Right */}
        {logoUrl && (
          <div className="flex items-center gap-1 bg-[#1C0D06]/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#D4AF37]/60 shadow-md pointer-events-auto">
            <img src={logoUrl} alt="" className="w-4 h-4 rounded-full object-cover" />
            <span className="text-[10px] font-bold text-[#FDE047] hidden sm:inline">Oficial</span>
          </div>
        )}
      </div>

      {/* 5. Center Play Button when Idle */}
      {!shouldPlay && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="px-3.5 py-2 rounded-2xl bg-[#1C0D06]/90 border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 text-[#FFF8EE] flex items-center gap-2 shadow-2xl transition-transform duration-300 transform group-hover:scale-105 backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FDE047] text-[#241109] flex items-center justify-center font-black">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black block text-[#FDE047] leading-tight">Ver GIF con Sonido</span>
              <span className="text-[10px] text-[#D9C2AA] block leading-tight">Pasa el cursor o toca</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Active Controls Overlay (When Playing) */}
      {shouldPlay && (
        <div className="absolute bottom-0 inset-x-0 z-25 p-2 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          {/* Progress bar */}
          <div className="w-full bg-[#3D2214] h-1 rounded-full overflow-hidden mb-1.5">
            <div
              className="bg-gradient-to-r from-[#D4AF37] via-[#FDE047] to-[#D4AF37] h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#E8DAC7]">
            {/* Play/Pause toggle button */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleContainerClick}
                className="px-2 py-0.5 rounded-md bg-[#241109]/90 border border-[#D4AF37]/50 text-[#FDE047] text-[10px] font-bold flex items-center gap-1 hover:bg-[#381A0C] transition-colors"
                aria-label={isPlaying ? 'Pausar GIF' : 'Reproducir GIF'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
              </button>

              {/* Sound Toggle (Muted by default like GIF, user can enable audio anytime!) */}
              <button
                type="button"
                onClick={toggleMute}
                className={`px-2 py-0.5 rounded-md border text-[10px] font-bold flex items-center gap-1 transition-all ${
                  isMuted
                    ? 'bg-[#241109]/90 border-[#D4AF37]/40 text-[#D9A07E] hover:text-[#FDE047]'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#FDE047] border-[#FFF] text-[#241109]'
                }`}
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3 h-3 text-[#D9A07E]" />
                    <span>Con Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" />
                    <span>Audio Activo</span>
                  </>
                )}
              </button>
            </div>

            {/* Product Title and Enlarge */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-serif italic text-[#F2DA91] truncate max-w-[120px] hidden sm:inline">
                {productName}
              </span>

              {onEnlarge && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnlarge();
                  }}
                  className="p-1 rounded-md bg-[#241109]/90 border border-[#D4AF37]/40 text-[#D9A07E] hover:text-[#FDE047] transition-colors"
                  title="Ver en pantalla completa"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
