import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';

interface ProductVideoPlayerProps {
  videoUrl: string;
  productName: string;
  posterImage?: string;
  logoUrl?: string;
  compact?: boolean;
  interactiveMode?: 'gif-hover' | 'modal-full';
  onEnlarge?: () => void;
}

export const ProductVideoPlayer: React.FC<ProductVideoPlayerProps> = ({
  videoUrl,
  productName,
  posterImage,
  logoUrl,
  compact = true,
  interactiveMode = 'gif-hover',
  onEnlarge,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // In modal-full mode, autoplay immediately. In gif-hover mode, only play on hover or tap.
  const isGifMode = interactiveMode === 'gif-hover';
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(!isGifMode);
  const [isPlaying, setIsPlaying] = useState(!isGifMode);
  const [isMuted, setIsMuted] = useState(true);
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
      {/* 1. Static Poster Image (Zero GPU/CPU cost when idle, object-contain so logo is never cut off) */}
      {posterImage && (
        <img
          src={posterImage}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-contain p-1.5 transition-opacity duration-500 pointer-events-none ${
            shouldPlay ? 'opacity-0 z-0' : 'opacity-100 z-10'
          }`}
          loading="lazy"
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

      {/* 3. Subtle Vignette Overlays */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

      {/* 4. Top Status Badges */}
      <div className="absolute top-2.5 inset-x-2.5 z-25 flex items-center justify-between pointer-events-none">
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
              <span className="text-xs font-black block text-[#FDE047] leading-tight">Ver en GIF</span>
              <span className="text-[10px] text-[#D9C2AA] block leading-tight">Pasa el cursor</span>
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
