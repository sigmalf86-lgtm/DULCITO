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

        {/* Video Vitrina Player & Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center max-w-4xl mx-auto">
          {/* Left: Fully Justified 9:16 Video Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* The Cinema Bezel Container */}
            <div
              ref={containerRef}
              className="group relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-[1.75rem] overflow-hidden border-2 border-[#D4AF37]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-black flex items-center justify-center transition-all duration-300 ring-1 ring-[#FFF3B3]/40"
            >
              {/* Warm Ambient Golden Glow Behind the Video (Pure CSS, 0% GPU video overhead) */}
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

              {/* Sound Prompt Tooltip if Muted */}
              {showSoundPrompt && isMuted && (
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute top-3.5 left-3.5 z-20 animate-bounce px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#241109] font-bold text-[11px] flex items-center gap-1.5 shadow-2xl hover:bg-[#F2DA91] transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#241109]" />
                  <span>¡Activar Audio Oficial! 🔊</span>
                </button>
              )}

              {/* Top Bar Badges */}
              <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
                {currentTime < 2.5 ? (
                  <span className="px-2.5 py-1 rounded-full bg-[#1C0D07]/95 backdrop-blur-md border border-[#D4AF37] text-[10px] font-bold text-[#FDE047] flex items-center gap-1.5 shadow-lg animate-pulse">
                    <img src="/assets/aistudio/sello_sticker_clean.png" alt="" className="w-3.5 h-3.5 rounded-full object-cover" />
                    <span>Sello Venezolano</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-[#1C0D07]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[10px] font-bold text-[#F2DA91] flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>Vitrina 60s HD</span>
                  </span>
                )}
              </div>

              {/* Center Play Button if Paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Reproducir video"
                  className="absolute z-20 w-14 h-14 rounded-full bg-[#D4AF37]/95 text-[#241109] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              )}

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                {/* Scrubber Progress Slider */}
                <div className="relative w-full mb-2 group/scrubber">
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

                <div className="flex items-center justify-between text-xs text-[#E8DAC7]">
                  {/* Left Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                      className="p-1 rounded-lg bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#F2DA91] transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                      className="p-1 rounded-lg bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#F2DA91] transition-colors flex items-center gap-1"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-[#D9A07E]" />
                          <span className="text-[9px] font-bold text-[#D9A07E]">Mudo</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#F2DA91]" />
                          <span className="text-[9px] font-bold text-[#F2DA91]">Audio</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleRestart}
                      aria-label="Reiniciar"
                      className="p-1 rounded-lg bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#E8DAC7] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Time label */}
                  <span className="text-[10px] text-[#F2DA91] font-mono tabular-nums">
                    {Math.floor(currentTime)}s / {Math.floor(duration || 60)}s
                  </span>

                  {/* Right Fullscreen Control */}
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="Pantalla completa"
                    className="p-1 rounded-lg bg-[#361A0C]/90 hover:bg-[#4A2516] text-[#E8DAC7] hover:text-white transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Subtitle */}
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#C59B74] text-center">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Video Vitrina 60s · Todos los 6 Productos con Narración y Música</span>
            </div>
          </div>

          {/* Right Column: Vitrina Showcase Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative bg-[#26130B]/95 rounded-2xl border-2 border-[#D4AF37]/50 p-5 sm:p-6 shadow-2xl space-y-4 overflow-hidden">
              {/* Subtle background seal */}
              <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full overflow-hidden opacity-10 pointer-events-none select-none mix-blend-screen">
                <img src="/assets/aistudio/CHOCOLATES_LOGO_51b91f48.jpg" alt="" className="w-full h-full object-cover" />
              </div>

              {/* Header with Anise */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#4A2516]">
                <div className="flex items-center gap-2">
                  <SpinningStarAnise size={20} speed="slow" glow={true} />
                  <div>
                    <span className="text-[11px] font-bold text-[#F2DA91] uppercase tracking-wider block">
                      Gran Vitrina de Productos
                    </span>
                    <span className="text-xs text-[#E0CCA7]">
                      6 Creaciones Emblemáticas de DULCITO
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#1C0D07] text-[#FDE047] border border-[#D4AF37]/50 shadow-inner">
                    Hecho con Amor
                  </span>
                </div>
              </div>

              {/* Product Description */}
              <div className="relative z-10 space-y-1.5">
                <h2 className="font-serif font-black text-xl sm:text-2xl text-[#FFF8EE] tracking-tight">
                  Vitrina de Productos:
                </h2>
                <p className="text-xs sm:text-sm text-[#E0CCA7] leading-relaxed">
                  En este spot de 60 segundos podrás apreciar la textura, el color y el empaque artesanal de cada una de nuestras especialidades para estas fiestas decembrinas.
                </p>
              </div>

              {/* Product Feature Highlights List */}
              <div className="relative z-10 space-y-2 text-xs text-[#FFF8EE]">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1C0D07]/80 border border-[#3E1C0F]">
                  <span className="text-base">🍶</span>
                  <div className="truncate">
                    <span className="font-bold text-[#FDE047]">1. Ponche Crema Tradicional. DULCITO:</span>{' '}
                    <span className="text-[#D9C2AA]">Emulsión espesa sobre roca de hielo a 4°C</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1C0D07]/80 border border-[#3E1C0F]">
                  <span className="text-base">🥛</span>
                  <div className="truncate">
                    <span className="font-bold text-[#FDE047]">2. Dulce de Leche Tradicional. DULCITO:</span>{' '}
                    <span className="text-[#D9C2AA]">De paila de cobre a fuego lento y bocados criollos</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1C0D07]/80 border border-[#3E1C0F]">
                  <span className="text-base">🍫</span>
                  <div className="truncate">
                    <span className="font-bold text-[#FDE047]">3. Chocolates Árabes Tradicionales. DULCITO:</span>{' '}
                    <span className="text-[#D9C2AA]">Cacao al 70%, pistachos tostados y cardamomo</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1C0D07]/80 border border-[#3E1C0F]">
                  <span className="text-base">🍮</span>
                  <div className="truncate">
                    <span className="font-bold text-[#FDE047]">4. Quesillo Tradicional. DULCITO:</span>{' '}
                    <span className="text-[#D9C2AA]">Con sus huequitos y abundante caramelo dorado</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1C0D07]/80 border border-[#3E1C0F]">
                  <span className="text-base">🧀</span>
                  <div className="truncate">
                    <span className="font-bold text-[#FDE047]">5. Tequeños de Queso Artesanales. DULCITO:</span>{' '}
                    <span className="text-[#D9C2AA]">Masa fina crocante con queso blanco fundente</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#1C0D07]/80 border border-[#3E1C0F]">
                  <span className="text-base">🥖</span>
                  <div className="truncate">
                    <span className="font-bold text-[#FDE047]">6. Pan de Jamón Navideño. DULCITO:</span>{' '}
                    <span className="text-[#D9C2AA]">Brioche con papelón, jamón ahumado y pasas</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onExploreCatalog) {
                      onExploreCatalog();
                    } else {
                      const el = document.getElementById('catalogo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-[#D4AF37] via-[#F3DE98] to-[#D4AF37] text-[#241109] shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.6)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#FFF8EE]/40"
                >
                  <ArrowDown className="w-4 h-4 text-[#241109] shrink-0" />
                  <span>Ver Catálogo con Videos Individuales</span>
                </button>

                {onOpenCustomBox && (
                  <button
                    type="button"
                    onClick={onOpenCustomBox}
                    className="py-3 px-4 rounded-xl font-bold text-xs bg-[#1C0D07] text-[#F2DA91] border border-[#D4AF37]/60 hover:bg-[#2C140A] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Gift className="w-4 h-4 text-[#FDE047]" />
                    <span>Nuestros Protagonistas</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
