import React from 'react';
import { LOGOS } from '../data/products';

/**
 * 6 Official Artisanal Product Logos in exact user sequence:
 * 1. Ponche crema
 * 2. Dulce de leche
 * 3. Chocolates árabes
 * 4. Quesillo tradicional
 * 5. Tequeños de queso
 * 6. Pan de jamón
 */
const BASE_LOGOS = [
  { id: 'ponche', name: 'Ponche Crema Tradicional', src: LOGOS.ponche },
  { id: 'dulce-leche', name: 'Dulce de Leche Tradicional', src: LOGOS.dulceLeche },
  { id: 'chocolates', name: 'Chocolates Árabes', src: LOGOS.chocolates },
  { id: 'quesillo', name: 'Quesillo Tradicional', src: LOGOS.quesillo },
  { id: 'tequenos', name: 'Tequeños de Queso', src: LOGOS.tequenos },
  { id: 'pan-jamon', name: 'Pan de Jamón Tradicional', src: LOGOS.panJamon },
];

// Generate repeating sequence optimized for 60fps mobile scrolling (8 items per row covers from mobile to 4K)
const ROW_SEQUENCES = [
  // Row 0: Starting at Ponche Crema
  [...BASE_LOGOS, BASE_LOGOS[0], BASE_LOGOS[1]],
  // Row 1: Staggered offset starting at Quesillo
  [...BASE_LOGOS.slice(3), ...BASE_LOGOS.slice(0, 2)],
  // Row 2: Staggered offset starting at Dulce de Leche
  [...BASE_LOGOS.slice(1), BASE_LOGOS[0]],
  // Row 3: Staggered offset starting at Tequeños
  [...BASE_LOGOS.slice(4), ...BASE_LOGOS.slice(0, 3)],
  // Row 4: Staggered offset starting at Chocolates Árabes
  [...BASE_LOGOS.slice(2), ...BASE_LOGOS.slice(0, 1)],
];

const ROW_OFFSETS = [
  '-20px',
  '-100px',
  '-50px',
  '-120px',
  '-30px',
];

/**
 * ProductLogosWatermark:
 * Renders the 6 official product logos in subtle watermark rows.
 * Highly optimized with:
 * - GPU hardware acceleration (translateZ(0)) so scrolling never repaints the background.
 * - Hardware rounded-full clipping instead of expensive CSS mask-image filters.
 * - Exact 6% opacity requested by the user.
 */
export const ProductLogosWatermark: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden flex flex-col justify-around py-6"
      style={{
        contain: 'strict',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {ROW_SEQUENCES.map((rowLogos, rowIndex) => (
        <div
          key={`wm-row-${rowIndex}`}
          className="flex items-center gap-6 sm:gap-8 lg:gap-10 whitespace-nowrap shrink-0"
          style={{
            transform: `translateX(${ROW_OFFSETS[rowIndex % ROW_OFFSETS.length]})`,
          }}
        >
          {rowLogos.map((logo, logoIndex) => (
            <div
              key={`logo-${rowIndex}-${logoIndex}-${logo.id}`}
              className="relative rounded-full overflow-hidden shrink-0 flex items-center justify-center"
              style={{
                width: 'clamp(100px, 14vw, 150px)',
                height: 'clamp(100px, 14vw, 150px)',
                opacity: 0.06,
                mixBlendMode: 'screen',
              }}
            >
              <img
                src={logo.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none"
                style={{
                  transform: 'scale(1.25)',
                  filter: 'contrast(1.15)',
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
