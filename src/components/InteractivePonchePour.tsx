import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Maximize2, Flame, Video, Sliders } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { OFFICIAL_BRAND_VIDEO_URL } from '../data/products';
import pourImg from '../assets/images/ponche_holiday_pour_cinematic_1792421801394.jpg';
import servedImg from '../assets/images/ponche_glass_iced_holiday_1792421801366.jpg';

interface InteractivePonchePourProps {
  className?: string;
  autoPlay?: boolean;
  compact?: boolean;
  defaultMode?: 'official-video' | 'interactive';
  onEnlarge?: () => void;
}

// Particle structures for 60fps canvas simulation
interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface BubbleParticle {
  x: number;
  y: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const InteractivePonchePour: React.FC<InteractivePonchePourProps> = ({
  className = '',
  autoPlay = true,
  compact = false,
  defaultMode = 'official-video',
  onEnlarge,
}) => {
  const [activeTab, setActiveTab] = useState<'official-video' | 'interactive'>(defaultMode);

  // Official Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(autoPlay);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  // Interactive Simulation State
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLooping, setIsLooping] = useState(true);
  const [progress, setProgress] = useState(25);
  const [viewMode, setViewMode] = useState<'pour' | 'served'>('pour');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const soundPlayingRef = useRef<boolean>(false);
  const durationMs = 4500;

  // Dynamic particle pools
  const splashesRef = useRef<SplashParticle[]>([]);
  const steamRef = useRef<SteamParticle[]>([]);
  const bubblesRef = useRef<BubbleParticle[]>([]);
  const flowOffsetRef = useRef<number>(0);

  // Video time tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTime = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', handleTime);
    video.addEventListener('ended', handleEnded);

    if (autoPlay && activeTab === 'official-video') {
      video.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    }

    return () => {
      video.removeEventListener('timeupdate', handleTime);
      video.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, activeTab]);

  // Interactive Playback timer loop
  useEffect(() => {
    if (activeTab !== 'interactive') return;
    if (!isPlaying) {
      soundPlayingRef.current = false;
      return;
    }

    if (soundEnabled && !soundPlayingRef.current && viewMode === 'pour') {
      soundPlayingRef.current = true;
      soundEffects.playIceClink();
      setTimeout(() => {
        soundEffects.playPourSound(3.8);
      }, 200);
    }

    let lastTimestamp = performance.now();

    const updateLoop = (now: number) => {
      const dt = now - lastTimestamp;
      lastTimestamp = now;

      setProgress((prev) => {
        const step = (dt / durationMs) * 100;
        const next = prev + step;

        if (next >= 100) {
          if (isLooping) {
            if (viewMode === 'pour') {
              setTimeout(() => {
                if (isLooping) {
                  setViewMode('pour');
                  setProgress(0);
                  if (soundEnabled) soundEffects.playIceClink();
                }
              }, 1200);
            }
            return 100;
          } else {
            setIsPlaying(false);
            setViewMode('served');
            if (soundEnabled) soundEffects.playIceClink();
            return 100;
          }
        }
        return next;
      });

      if (isPlaying) {
        animFrameRef.current = requestAnimationFrame(updateLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isLooping, viewMode, soundEnabled, activeTab]);

  // 60FPS Canvas Dynamic Fluid & Atmosphere Simulation
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'interactive') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (viewMode === 'pour') {
      flowOffsetRef.current += 1.5;

      const streamStartX = width * 0.72;
      const streamStartY = height * 0.28;
      const targetGlassX = width * 0.44;
      const targetGlassY = height * 0.72;

      // Draw creamy stream
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(streamStartX - 8, streamStartY);
      ctx.bezierCurveTo(
        streamStartX - 15,
        height * 0.45,
        targetGlassX + 10,
        height * 0.58,
        targetGlassX - 4,
        targetGlassY
      );
      ctx.lineTo(targetGlassX + 8, targetGlassY);
      ctx.bezierCurveTo(
        targetGlassX + 22,
        height * 0.58,
        streamStartX + 5,
        height * 0.45,
        streamStartX + 8,
        streamStartY
      );
      ctx.closePath();

      const streamGrad = ctx.createLinearGradient(streamStartX, streamStartY, targetGlassX, targetGlassY);
      streamGrad.addColorStop(0, '#FFF2D9');
      streamGrad.addColorStop(0.3, '#F5DEB3');
      streamGrad.addColorStop(0.7, '#E7C794');
      streamGrad.addColorStop(1, '#DAB37B');

      ctx.fillStyle = streamGrad;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      // Fluid particles
      if (Math.random() < 0.6) {
        splashesRef.current.push({
          x: targetGlassX + (Math.random() - 0.5) * 20,
          y: targetGlassY - Math.random() * 8,
          vx: (Math.random() - 0.5) * 4.5,
          vy: -Math.random() * 4 - 2,
          radius: Math.random() * 2.5 + 1.2,
          alpha: 0.9,
          color: Math.random() > 0.4 ? '#F5DEB3' : '#FFF5E1',
        });
      }
    }

    // Render splashes
    for (let i = splashesRef.current.length - 1; i >= 0; i--) {
      const p = splashesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22;
      p.alpha -= 0.035;

      if (p.alpha <= 0) {
        splashesRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [viewMode, activeTab]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      renderCanvas();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [renderCanvas]);

  // Video Controls
  const toggleVideoPlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setVideoPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  const toggleVideoMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !videoMuted;
    video.muted = next;
    setVideoMuted(next);
  };

  const handleRestartVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setVideoPlaying(true)).catch(() => {});
  };

  const triggerToast = (text: string) => {
    setToastFeedback(text);
    setTimeout(() => setToastFeedback(null), 2000);
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-xl bg-[#1A0C06] ${className}`}
    >
      {/* Top Header Mode Tabs */}
      <div className="px-3 py-2 bg-[#2D160C] border-b border-[#D4AF37]/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#F2DA91]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Presentación del Ponche</span>
        </div>

        {/* Tab pills */}
        <div className="inline-flex rounded-lg bg-[#241109] p-0.5 border border-[#4A2516]">
          <button
            type="button"
            onClick={() => setActiveTab('official-video')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
              activeTab === 'official-video'
                ? 'bg-[#E5C158] text-[#241109] shadow-xs'
                : 'text-[#D9A07E] hover:text-white'
            }`}
          >
            <Video className="w-3 h-3" />
            <span>Spot Oficial</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interactive')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
              activeTab === 'interactive'
                ? 'bg-[#E5C158] text-[#241109] shadow-xs'
                : 'text-[#D9A07E] hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Simulador</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      {activeTab === 'official-video' ? (
        /* OFFICIAL VIDEO SPOT VIEW */
        <div
          className={`relative ${compact ? 'aspect-[4/5] max-h-[360px]' : 'aspect-[9/16] max-h-[520px]'} w-full mx-auto overflow-hidden bg-black cursor-pointer group flex items-center justify-center`}
          onClick={() => toggleVideoPlay()}
        >
          {/* Ambient blurred backdrop for warm festive framing */}
          <video
            src={OFFICIAL_BRAND_VIDEO_URL}
            playsInline
            muted
            loop
            autoPlay
            className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-105 pointer-events-none"
          />

          {/* Fully justified video without crop or zoom */}
          <video
            ref={videoRef}
            src={OFFICIAL_BRAND_VIDEO_URL}
            playsInline
            muted={videoMuted}
            loop
            autoPlay
            className="relative z-10 w-full h-full object-contain"
          />

          {/* Video Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play Button if paused */}
          {!videoPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/90 text-[#241109] flex items-center justify-center shadow-2xl">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Mute/Audio Badge Banner */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => toggleVideoMute(e)}
              className="px-2.5 py-1 rounded-lg bg-[#241109]/90 border border-[#D4AF37]/70 text-[#F2DA91] text-[11px] font-bold flex items-center gap-1.5 shadow-md hover:bg-[#361A0C]"
            >
              {videoMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#D9A07E]" />
                  <span>Activar Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Audio Activo 🔊</span>
                </>
              )}
            </button>
          </div>

          {/* Badge top-right */}
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-[#D4AF37]/40 text-[10px] font-bold text-[#E5C158]">
              HD Oficial
            </span>
          </div>

          {/* Bottom Video Controls */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
            {/* Scrubber */}
            <div className="w-full bg-[#3D2214] h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-[#D4AF37] to-[#E5C158] h-full rounded-full"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#E8DAC7]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleVideoPlay(e)}
                  className="p-1 rounded-md bg-[#241109] text-[#F2DA91] hover:bg-[#361A0C]"
                >
                  {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleRestartVideo(e)}
                  className="p-1 rounded-md bg-[#241109] text-[#D9A07E] hover:text-[#F2DA91]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="font-script text-sm text-[#F2DA91] truncate px-2">
                "Dulcito. Sabor a tradición. Hecho con amor."
              </div>

              {onEnlarge && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnlarge();
                  }}
                  className="p-1 rounded-md bg-[#241109] text-[#D9A07E] hover:text-white"
                  title="Ampliar"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE SIMULATION VIEW */
        <div
          className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-[#1A0C06]"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Ambient Warmth */}
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay animate-firelight-glow bg-gradient-to-tr from-[#C86438]/20 via-[#E5C158]/15 to-transparent" />

          {/* Pour layer */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${viewMode === 'pour' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
            <img
              src={pourImg}
              alt="Vertido de ponche crema"
              className={`w-full h-full object-cover ${isPlaying ? 'animate-bottle-sway' : ''}`}
            />
          </div>

          {/* Served glass layer */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${viewMode === 'served' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
            <img src={servedImg} alt="Ponche servido en vaso con hielo" className="w-full h-full object-cover" />
          </div>

          {/* Canvas for fluid simulation */}
          <canvas ref={canvasRef} width={400} height={300} className="absolute inset-0 w-full h-full pointer-events-none z-15" />

          {/* Badge */}
          <div className="absolute bottom-3 left-3 z-25 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#241109]/85 border border-[#D4AF37]/50 text-[11px] font-semibold text-[#F2DA91]">
            <Flame className="w-3 h-3 text-[#E5C158]" />
            <span>Servido Ideal: 4°C · Con Hielo</span>
          </div>

          {/* Toast */}
          {toastFeedback && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1 rounded-full bg-[#241109]/95 border border-[#D4AF37] text-xs font-bold text-[#F2DA91] shadow-xl">
              {toastFeedback}
            </div>
          )}

          {/* Bottom Bar Controls */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/95 to-transparent">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#E5C158] text-[#241109] font-bold text-[11px]"
                >
                  {isPlaying ? 'Pausar' : 'Servir'}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode(viewMode === 'pour' ? 'served' : 'pour');
                  }}
                  className="px-2 py-1 rounded-lg bg-[#241109] text-[#D9A07E] hover:text-[#F2DA91] text-[11px] font-bold"
                >
                  {viewMode === 'pour' ? 'Ver Copa' : 'Ver Servido'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerToast('✨ ¡Nuez moscada fresca rallada!');
                  }}
                  className="px-2 py-1 rounded-lg bg-[#241109] border border-[#C86438] text-[#F2DA91] text-[11px]"
                >
                  Rallar Nuez
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerToast('🥂 ¡Salud y Feliz Navidad!');
                  }}
                  className="px-2 py-1 rounded-lg bg-[#241109] border border-[#D4AF37] text-[#F2DA91] text-[11px]"
                >
                  Brindar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
