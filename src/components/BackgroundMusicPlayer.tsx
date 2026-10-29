import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { backgroundMusic, BGMState } from '../utils/backgroundMusic';

/**
 * Animated Sound Wave Equalizer Bars
 */
export const AudioEqualizerBars: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = '',
}) => {
  return (
    <span className={`inline-flex items-end gap-[2px] h-3.5 ${className}`} aria-hidden="true">
      <span
        className={`w-[2.5px] bg-[#FDE047] rounded-full transition-all ${
          active ? 'animate-pulse h-3' : 'h-1.5 opacity-40'
        }`}
        style={{ animationDuration: '0.6s' }}
      />
      <span
        className={`w-[2.5px] bg-[#F5D061] rounded-full transition-all ${
          active ? 'animate-pulse h-3.5' : 'h-2 opacity-50'
        }`}
        style={{ animationDuration: '0.9s', animationDelay: '0.15s' }}
      />
      <span
        className={`w-[2.5px] bg-[#FFF5BE] rounded-full transition-all ${
          active ? 'animate-pulse h-2.5' : 'h-1.5 opacity-40'
        }`}
        style={{ animationDuration: '0.75s', animationDelay: '0.3s' }}
      />
    </span>
  );
};

/**
 * Floating / Docked Background Music Player
 * Displays current track, soft volume control, play/pause and animated equalizer.
 */
export const BackgroundMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(18);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = backgroundMusic.subscribe((state: BGMState) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    backgroundMusic.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    backgroundMusic.setVolume(val);
  };

  return (
    <aside
      aria-label="Reproductor de música tradicional de fondo"
      className="fixed bottom-4 left-4 z-40 select-none pointer-events-auto"
    >
      <div className="bg-[#241007]/95 backdrop-blur-md border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-white p-2 transition-all duration-300 max-w-[280px]">
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleToggle}
            aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
            className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#38180C] to-[#241007] border border-[#D4AF37] ring-1 ring-[#FFF3B3]/60 flex items-center justify-center text-[#FDE047] hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Track Info with Equalizer */}
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Clic para ajustar volumen"
          >
            <div className="flex items-center gap-1.5">
              <AudioEqualizerBars active={isPlaying} />
              <span className="font-serif font-bold text-[11px] text-[#FFF8EE] truncate block leading-tight">
                Música Criolla de Fondo
              </span>
            </div>
            <p className="text-[9px] text-[#E0CCA7] truncate">
              {isPlaying ? 'Sonando suave (18%)' : 'Pausada · Clic para oír'}
            </p>
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Ocultar controles de volumen' : 'Mostrar controles de volumen'}
            className="p-1 text-[#D4AF37] hover:text-[#FFF5BE] transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Volume Slider Drawer */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-[#4A2516] px-1 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[10px] text-[#E0CCA7]">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-[#D4AF37]" />
                <span>Volumen: {volume}% (Suave)</span>
              </span>
              <span className="text-[9px] text-[#FDE047] font-semibold">Tradición</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Control de volumen de música de fondo"
              className="w-full h-1 bg-[#4A2516] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
