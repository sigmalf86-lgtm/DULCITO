import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Sparkles, ShoppingBag, ArrowDown, Gift } from 'lucide-react';
import { VITRINA_SHOWCASE_VIDEO_URL, PRODUCTS } from '../data/products';
import { SpinningStarAnise } from './SpinningStarAnise';
import { MetallicRedHeart } from './BrandLogo';
import { Product, ProductVariant } from '../types';

interface CommercialSpotlightProps {
  onQuickView?: (product: Product, initialTab?: 'video' | 'photo') => void;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
  onExploreCatalog?: () => void;
  onOpenCustomBox?: () => void;
}

export const CommercialSpotlight: React.FC<CommercialSpotlightProps> = ({
  onExploreCatalog,
  onOpenCustomBox,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const [heartTapped, setHeartTapped] = useState(false);

  const handleHeartClick = () => {
    setHeartTapped(true);
    setTimeout(() => setHeartTapped(false), 600);
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      // Loop seamlessly
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    // Pause video when out of screen to save CPU, GPU and battery on mobile
    let observer: IntersectionObserver | null = null;
    if (container && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              video.pause();
              setIsPlaying(false);
            } else if (isPlaying) {
              video.play().catch(() => {});
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(container);
    }

    // Attempt muted autoplay only when visible
    video.play().then(() => setIsPlaying(true)).catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      if (observer) observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowSoundPrompt(false);

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const targetTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="spot-comercial"
      className="relative pt-4 pb-6 sm:pt-6 sm:pb-8 bg-transparent text-[#FAF6F0] overflow-hidden"
    >
      {/* Decorative Warm Festive Lighting & Star Anise Glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-[#2E1208]/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge & Headline */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#261007]/90 border border-[#D4AF37]/70 text-xs font-bold text-[#F2DA91] mb-1.5 shadow-md backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Video Vitrina Oficial (60s)</span>
            <span className="text-[#D4AF37]">·</span>
            <span>Todos Nuestros 6 Productos</span>
            <SpinningStarAnise size={15} speed="slow" glow={false} />
          </div>

          {/* Main Title Block: DULCITO en blanco con 'sabor a tradición' al lado, y abajo 'hecho con amor' con corazón interactivo */}
          <div className="mb-2.5">
            {/* Top Line: DULCITO en blanco + 'sabor a tradición' al lado */}
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
              <span className="font-serif font-black uppercase text-white tracking-widest text-2xl sm:text-3xl lg:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                DULCITO
              </span>
              <span className="font-serif italic font-semibold text-white tracking-wider text-base sm:text-lg lg:text-xl drop-shadow-sm whitespace-nowrap">
                sabor a tradición
              </span>
            </div>

            {/* Bottom Line: 'Hecho con amor' con la tipografía caligráfica idéntica a la cinta dorada, en dorado con corazón rojo metálico */}
            {/* Bottom Line: 'Hecho con amor' con la tipografía caligráfica idéntica a la cinta dorada, en dorado con corazón rojo metálico */}
            <div className="mt-1 flex items-center justify-center relative">
              <div
                onClick={handleHeartClick}
                className="group inline-flex items-center gap-2.5 drop-shadow-sm whitespace-nowrap cursor-pointer transition-transform active:scale-95 focus:outline-none relative"
                title="Toca para sentir el cariño de Dulcito"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleHeartClick();
                  }
                }}
                aria-label="Hecho con amor"
              >
                <span
                  className="font-normal select-none text-2xl sm:text-3xl lg:text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  style={{
                    fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                    lineHeight: '1.15',
                    color: '#F5D77F',
                  }}
                >
                  Hecho con amor
                </span>
                <span
                  className={`inline-flex items-center justify-center transition-transform duration-300 relative ${
                    heartTapped
                      ? 'scale-140 rotate-12 drop-shadow-[0_0_15px_rgba(255,50,50,0.9)]'
                      : 'group-hover:scale-125'
                  }`}
                >
                  <MetallicRedHeart size={30} glow={heartTapped} />
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#E0CCA7] leading-relaxed max-w-xl mx-auto">
            Disfruta de nuestros productos: ponche crema, dulce de leche tradicional, chocolates árabes, quesillo tradicional, tequeños de queso y pan de jamón.
          </p>
        </div>

        {/* Video Vitrina Player - Centered and Compact without the side card */}
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
          {/* The Cinema Bezel Container - Scaled down to ~half size */}
          <div
            ref={containerRef}
            className="group relative w-full max-w-[160px] sm:max-w-[180px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/80 shadow-[0_15px_35px_rgba(0,0,0,0.85)] bg-black flex items-center justify-center transition-all duration-300 ring-1 ring-[#FFF3B3]/40"
          >
            {/* Warm Ambient Golden Glow Behind the Video */}
            <div
              className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,rgba(74,32,16,0.3)_50%,transparent_85%)] pointer-events-none"
              aria-hidden="true"
            />

            {/* Native Video Element: Main Vitrina Video con Sello Venezolano (60s) */}
            <video
              ref={videoRef}
              src={VITRINA_SHOWCASE_VIDEO_URL}
              poster="/assets/aistudio/vitrina_sello_poster.jpg"
              playsInline
              muted={isMuted}
              loop
              preload="metadata"
              className="relative z-10 w-full h-full object-contain cursor-pointer drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
              onClick={togglePlay}
            >
              Tu navegador no soporta el formato de video.
            </video>

            {/* Gentle Vignette Overlays for Crisp Controls */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            {/* Sound Prompt Tooltip if Muted - Compact */}
            {showSoundPrompt && isMuted && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute top-2.5 left-2.5 z-20 animate-bounce px-2 py-1 rounded-lg bg-[#D4AF37] text-[#241109] font-bold text-[9px] flex items-center gap-1 shadow-2xl hover:bg-[#F2DA91] transition-all cursor-pointer whitespace-nowrap"
              >
                <Volume2 className="w-3 h-3 text-[#241109] shrink-0" />
                <span>Audio 🔊</span>
              </button>
            )}

            {/* Top Bar Badges - Compact */}
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1">
              {currentTime < 2.5 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-[#1C0D07]/95 backdrop-blur-md border border-[#D4AF37] text-[8px] font-bold text-[#FDE047] flex items-center gap-1 shadow-lg animate-pulse">
                  <img src="/assets/aistudio/sello_sticker_clean.png" alt="" className="w-3 h-3 rounded-full object-cover" />
                  <span>Sello</span>
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded-full bg-[#1C0D07]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[8px] font-bold text-[#F2DA91] flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>60s HD</span>
                </span>
              )}
            </div>

            {/* Center Play Button if Paused - Scaled for compact window */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproducir video"
                className="absolute z-20 w-10 h-10 rounded-full bg-[#D4AF37]/95 text-[#241109] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            )}

            {/* Bottom Video Controls Bar - Compact */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-2 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
              {/* Scrubber Progress Slider */}
              <div className="relative w-full mb-1 group/scrubber">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercent || 0}
                  onChange={handleSeek}
                  aria-label="Progreso del spot"
                  className="w-full h-1 bg-[#4A2516] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] focus:outline-none"
                />
                <div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-lg pointer-events-none"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#E8DAC7]">
                {/* Left Controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    className="p-1 rounded bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#F2DA91] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                    className="p-1 rounded bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#F2DA91] transition-colors flex items-center gap-0.5"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3 h-3 text-[#D9A07E]" />
                    ) : (
                      <Volume2 className="w-3 h-3 text-[#F2DA91]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Reiniciar"
                    className="p-1 rounded bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#E8DAC7] transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>

                {/* Time label */}
                <span className="text-[9px] text-[#F2DA91] font-mono tabular-nums">
                  {Math.floor(currentTime)}s/{Math.floor(duration || 60)}s
                </span>

                {/* Right Fullscreen Control */}
                <button
                  type="button"
                  onClick={handleFullscreen}
                  aria-label="Pantalla completa"
                  className="p-1 rounded bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#E8DAC7] hover:text-white transition-colors"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Subtitle */}
          <div className="mt-2 flex items-center gap-1 text-[10px] text-[#C59B74] text-center max-w-[200px]">
            <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span>Vitrina 60s · 6 Productos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
