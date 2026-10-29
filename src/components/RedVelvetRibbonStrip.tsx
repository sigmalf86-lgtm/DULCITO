import React from 'react';

interface RedVelvetRibbonStripProps {
  position: 'top' | 'bottom';
  className?: string;
}

/**
 * RedVelvetRibbonStrip
 * Exact recreation of the rich burgundy/ruby red velvet ribbon with embossed
 * golden-sheen Christmas poinsettia flowers and holly berries from the user's reference image (imagen_074717d9.png).
 * Used to frame both the top (Navbar) and bottom (Footer) golden ribbons.
 */
export const RedVelvetRibbonStrip: React.FC<RedVelvetRibbonStripProps> = ({
  position,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none relative z-10 shrink-0 ${
        position === 'top'
          ? 'border-b border-[#3D030A] shadow-[0_2px_6px_rgba(45,5,12,0.45)]'
          : 'border-t border-[#3D030A] shadow-[0_-2px_6px_rgba(45,5,12,0.45)]'
      } ${className}`}
      style={{
        backgroundImage: "url('/assets/red_velvet_ribbon_seamless.png')",
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center center',
      }}
      aria-hidden="true"
    >
      {/* Fine golden thread edge stitch accent */}
      <div
        className={`absolute left-0 right-0 h-[1.5px] ${
          position === 'top' ? 'bottom-0' : 'top-0'
        } bg-gradient-to-r from-[#B8861B] via-[#FFE58F] to-[#B8861B] opacity-75 shadow-xs`}
      />
      {/* Subtle top/bottom velvet bevel shadow */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          position === 'top'
            ? 'bg-gradient-to-b from-black/25 via-transparent to-black/15'
            : 'bg-gradient-to-b from-black/15 via-transparent to-black/25'
        }`}
      />
    </div>
  );
};
