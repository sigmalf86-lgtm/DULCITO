import React, { useMemo } from 'react';

/**
 * 13 Handcrafted Festive Christmas & Venezuelan Tradition Motifs
 * Drawn with delicate golden filigree outlines (bordes dorados)
 * Specifically requested:
 * 1. Velas (Candles)
 * 2. Botellas de ponche (Ponche Crema bottles)
 * 3. Luces navideñas (Christmas fairy lights)
 * 4. Panes de jamón (Holiday ham breads)
 * 5. Galletas con leche (Cookies with milk)
 * 6. Dulces varios (Assorted sweets / caramels)
 * 7. Chocolates (Chocolate bars / truffles)
 * 8. Bastones de caramelo (Candy canes)
 * 9. Soldados cascanueces (Nutcracker soldiers)
 * 10. Muérdago (Mistletoe / holly sprigs)
 * 11. Lazos de regalo (Gift ribbon bows)
 * 12. Arbolitos de navidad (Christmas pine trees)
 * 13. Café caliente (Steaming artisan coffee)
 */

interface MotifProps {
  className?: string;
  size?: number;
}

// 1. Vela Navideña con llama titilante y base
export const VelaIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Base saucer */}
    <ellipse cx="32" cy="56" rx="20" ry="4" strokeWidth="1.3" />
    <path d="M16 55 Q 32 61 48 55" strokeWidth="1.2" />
    <path d="M12 56 Q 8 50 12 44 Q 16 48 18 53" strokeWidth="1.2" />
    {/* Candle cylinder */}
    <path d="M22 55 L 22 28 C 22 25 42 25 42 28 L 42 55" strokeWidth="1.5" />
    {/* Melted wax rim */}
    <ellipse cx="32" cy="28" rx="10" ry="2.8" strokeWidth="1.2" />
    {/* Dripping wax drops */}
    <path d="M38 29 C 40 37 36 41 34 41" strokeWidth="1.2" />
    <path d="M25 29 C 23 35 26 38 27 38" strokeWidth="1.1" />
    {/* Candle wick */}
    <path d="M32 26 C 31 21 33 18 32 15" strokeWidth="1.4" />
    {/* Flame teardrop */}
    <path
      d="M32 15 C 27 10 27 6 32 2 C 37 6 37 10 32 15 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M32 13 C 29 10 29 8 32 5 C 35 8 35 10 32 13 Z" strokeWidth="1" />
    {/* Radiating sparkles */}
    <path d="M22 8 L 24 8" strokeWidth="1.2" />
    <path d="M40 8 L 42 8" strokeWidth="1.2" />
    <path d="M32 -2 L 32 0" strokeWidth="1.2" />
  </svg>
);

// 2. Botella de Ponche Crema con lazo, corcho y etiqueta
export const BotellaPoncheIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cork stopper */}
    <rect x="29" y="3" width="6" height="5" rx="1" strokeWidth="1.3" />
    {/* Bottle lip */}
    <ellipse cx="32" cy="8" rx="4.5" ry="1.5" strokeWidth="1.3" />
    {/* Neck */}
    <path d="M28.5 8 L 28.5 17 C 28.5 24 19 28 19 38 L 19 56 C 19 59 45 59 45 56 L 45 38 C 45 28 35.5 24 35.5 17 L 35.5 8" strokeWidth="1.5" />
    {/* Bottom base ring */}
    <ellipse cx="32" cy="56" rx="13" ry="3.5" strokeWidth="1.2" />
    {/* Neck ribbon cord */}
    <path d="M27 16 Q 32 18 37 16" strokeWidth="1.3" />
    {/* Little holiday bow at neck */}
    <path d="M32 16.5 C 28 14 27 19 32 17.5 Z" strokeWidth="1.1" />
    <path d="M32 16.5 C 36 14 37 19 32 17.5 Z" strokeWidth="1.1" />
    {/* Vintage label */}
    <rect x="24" y="34" width="16" height="15" rx="2" strokeWidth="1.3" strokeDasharray="3 1.5" />
    {/* Star Anise filigree inside label */}
    <circle cx="32" cy="41.5" r="3.2" strokeWidth="1" />
    <path d="M32 37 L 32 46 M 27.5 41.5 L 36.5 41.5 M 29 38.5 L 35 44.5 M 29 44.5 L 35 38.5" strokeWidth="0.9" />
    {/* Glass luster reflection line */}
    <path d="M22 36 L 22 51" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
  </svg>
);

// 3. Luces Navideñas (Guirnalda con bombillos)
export const LucesNavidenasIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Swag wire line */}
    <path d="M3 16 Q 18 30 34 20 Q 48 10 61 22" strokeWidth="1.5" />
    {/* Bulb 1 */}
    <rect x="15" y="22" width="4" height="3" rx="0.5" strokeWidth="1" />
    <path d="M15 25 C 11 31 19 40 17 44 C 15 40 23 31 19 25 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.12" />
    <path d="M17 31 L 17 36" strokeWidth="0.9" />
    {/* Bulb 2 */}
    <rect x="32" y="21" width="4" height="3" rx="0.5" strokeWidth="1" />
    <path d="M32 24 C 28 30 36 39 34 43 C 32 39 40 30 36 24 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.12" />
    <path d="M34 30 L 34 35" strokeWidth="0.9" />
    {/* Bulb 3 */}
    <rect x="49" y="16" width="4" height="3" rx="0.5" strokeWidth="1" />
    <path d="M49 19 C 45 25 53 34 51 38 C 49 34 57 25 53 19 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.12" />
    {/* Radiating sparkle rays around bulbs */}
    <path d="M9 35 L 11 35 M 23 34 L 25 34" strokeWidth="1" />
    <path d="M26 42 L 28 42 M 40 42 L 42 42" strokeWidth="1" />
  </svg>
);

// 4. Pan de Jamón Tradicional con cortes trenzados y aceitunas
export const PanJamonIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Loaf silhouette */}
    <path
      d="M7 36 C 7 21 19 18 32 18 C 45 18 57 21 57 36 C 57 48 45 50 32 50 C 19 50 7 48 7 36 Z"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Traditional diagonal fork crust slashes */}
    <path d="M16 23 Q 21 34 19 45" strokeWidth="1.4" />
    <path d="M25 20 Q 30 34 28 47" strokeWidth="1.4" />
    <path d="M35 20 Q 40 34 38 47" strokeWidth="1.4" />
    <path d="M45 23 Q 49 34 47 45" strokeWidth="1.4" />
    {/* Decorative fork dots / vents */}
    <circle cx="21" cy="27" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="31" cy="26" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="41" cy="27" r="1.1" fill="currentColor" stroke="none" />
    {/* Spiral olive details visible in the crust */}
    <circle cx="23" cy="40" r="1.8" strokeWidth="1.1" />
    <circle cx="33" cy="40" r="1.8" strokeWidth="1.1" />
    <circle cx="43" cy="38" r="1.8" strokeWidth="1.1" />
    {/* Warm aroma vapor */}
    <path d="M26 13 Q 29 9 32 13" strokeWidth="1.2" />
    <path d="M36 14 Q 39 10 42 14" strokeWidth="1.2" />
  </svg>
);

// 5. Galletas con Leche (Vaso/Botella de leche y galleta navideña decorada)
export const GalletasLecheIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Milk Glass */}
    <path d="M11 20 L 26 20 L 24 53 Q 24 56 18.5 56 Q 13 56 13 53 Z" strokeWidth="1.4" />
    <ellipse cx="18.5" cy="20" rx="7.5" ry="2" strokeWidth="1.2" />
    {/* Milk level and straw */}
    <path d="M12.5 28 Q 18.5 30 24.5 28" strokeWidth="1.1" />
    <path d="M18.5 24 L 22 8 L 26 5" strokeWidth="1.4" />
    {/* Round Holiday Cookie with Scalloped Edge */}
    <circle cx="44" cy="42" r="13" strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
    {/* Frosting / Chocolate chips */}
    <circle cx="40" cy="38" r="1.5" strokeWidth="1" fill="currentColor" />
    <circle cx="48" cy="37" r="1.5" strokeWidth="1" fill="currentColor" />
    <circle cx="44" cy="46" r="1.5" strokeWidth="1" fill="currentColor" />
    <circle cx="37" cy="45" r="1.3" strokeWidth="1" fill="currentColor" />
    <circle cx="51" cy="45" r="1.3" strokeWidth="1" fill="currentColor" />
    {/* Mini gingerbread star cookie */}
    <path
      d="M44 14 L 46 19 L 51 20 L 47 24 L 48 29 L 44 26 L 40 29 L 41 24 L 37 20 L 42 19 Z"
      strokeWidth="1.2"
    />
  </svg>
);

// 6. Dulces Varios y Caramelos Envueltos
export const DulcesVariosIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main wrapped candy */}
    <ellipse cx="32" cy="26" rx="11" ry="8" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Diagonal sweet stripes */}
    <path d="M27 20 C 30 26 27 30 25 32" strokeWidth="1.2" />
    <path d="M33 19 C 36 26 33 31 31 33" strokeWidth="1.2" />
    <path d="M39 21 C 41 26 39 30 38 32" strokeWidth="1.2" />
    {/* Left wrapper ruffle */}
    <path d="M21 26 L 9 17 L 11 35 Z" strokeWidth="1.3" />
    <path d="M12 21 L 18 24 M 13 31 L 18 28" strokeWidth="1" />
    {/* Right wrapper ruffle */}
    <path d="M43 26 L 55 17 L 53 35 Z" strokeWidth="1.3" />
    <path d="M52 21 L 46 24 M 51 31 L 46 28" strokeWidth="1" />
    {/* Traditional wrapped artisan caramel cube below */}
    <rect x="22" y="44" width="16" height="12" rx="2" strokeWidth="1.4" />
    <path d="M22 44 L 30 50 L 38 44" strokeWidth="1.2" />
    <path d="M22 56 L 30 50 L 38 56" strokeWidth="1.2" />
    {/* Twinkle dots */}
    <circle cx="16" cy="48" r="1.2" fill="currentColor" />
    <circle cx="48" cy="48" r="1.2" fill="currentColor" />
  </svg>
);

// 7. Barra de Chocolates con Onzas y Trufa
export const ChocolatesIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Chocolate bar perspective frame */}
    <rect x="10" y="14" width="34" height="42" rx="3" strokeWidth="1.5" />
    {/* Grid of chocolate snap blocks */}
    <line x1="27" y1="14" x2="27" y2="56" strokeWidth="1.3" />
    <line x1="10" y1="28" x2="44" y2="28" strokeWidth="1.3" />
    <line x1="10" y1="42" x2="44" y2="42" strokeWidth="1.3" />
    {/* Inner bevels on blocks */}
    <rect x="13" y="17" width="11" height="8" rx="1" strokeWidth="0.9" />
    <rect x="30" y="17" width="11" height="8" rx="1" strokeWidth="0.9" />
    <rect x="13" y="31" width="11" height="8" rx="1" strokeWidth="0.9" />
    <rect x="30" y="31" width="11" height="8" rx="1" strokeWidth="0.9" />
    <rect x="13" y="45" width="11" height="8" rx="1" strokeWidth="0.9" />
    <rect x="30" y="45" width="11" height="8" rx="1" strokeWidth="0.9" />
    {/* Artisan Cocoa Truffle bonbon alongside */}
    <circle cx="51" cy="44" r="8" strokeWidth="1.4" fill="currentColor" fillOpacity="0.12" />
    {/* Swirled chocolate drizzle on truffle */}
    <path d="M46 41 Q 51 38 56 42 Q 52 47 48 48" strokeWidth="1.1" />
  </svg>
);

// 8. Bastón de Caramelo con Rayas Espirales y Lazito
export const BastonCarameloIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cane hook body */}
    <path
      d="M23 58 L 23 25 C 23 11 45 11 45 25 L 45 30 C 45 33 39 33 39 30 L 39 25 C 39 17 29 17 29 25 L 29 58 Z"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Diagonal spiral stripes */}
    <path d="M23 52 L 29 48" strokeWidth="1.3" />
    <path d="M23 44 L 29 40" strokeWidth="1.3" />
    <path d="M23 36 L 29 32" strokeWidth="1.3" />
    <path d="M24 25 L 29 21" strokeWidth="1.3" />
    <path d="M28 17 L 34 14" strokeWidth="1.3" />
    <path d="M36 14 L 41 18" strokeWidth="1.3" />
    <path d="M39 24 L 45 27" strokeWidth="1.3" />
    {/* Bow on the cane */}
    <path d="M26 38 C 20 35 19 43 26 40 Z" strokeWidth="1.2" />
    <path d="M26 38 C 32 35 33 43 26 40 Z" strokeWidth="1.2" />
    <circle cx="26" cy="38" r="1.5" fill="currentColor" />
  </svg>
);

// 9. Soldado Cascanueces Clásico (Nutcracker)
export const CascanuecesIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Tall soldier shako hat */}
    <path d="M24 6 L 40 6 L 41 21 L 23 21 Z" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1" />
    <ellipse cx="32" cy="6" rx="8" ry="1.5" strokeWidth="1.2" />
    {/* Star badge on hat */}
    <path d="M32 10 L 33 13 L 36 13 L 33.5 15 L 34.5 18 L 32 16 L 29.5 18 L 30.5 15 L 28 13 L 31 13 Z" strokeWidth="0.8" />
    {/* Hat visor */}
    <path d="M22 21 Q 32 24 42 21" strokeWidth="1.3" />
    {/* Face & beard */}
    <rect x="25" y="21" width="14" height="13" strokeWidth="1.3" />
    {/* Eyes */}
    <circle cx="28.5" cy="25" r="1" fill="currentColor" />
    <circle cx="35.5" cy="25" r="1" fill="currentColor" />
    {/* Mustache */}
    <path d="M26 29 Q 32 31 38 29 Q 32 32 26 29 Z" strokeWidth="1.1" fill="currentColor" />
    {/* Teeth / Nutcracker jaw mouth */}
    <rect x="29" y="32" width="6" height="2" strokeWidth="0.9" />
    <line x1="31" y1="32" x2="31" y2="34" strokeWidth="0.8" />
    <line x1="33" y1="32" x2="33" y2="34" strokeWidth="0.8" />
    {/* Jacket & epaulets */}
    <path d="M22 34 L 42 34 L 41 49 L 23 49 Z" strokeWidth="1.4" />
    <ellipse cx="21" cy="35.5" rx="3" ry="1.8" strokeWidth="1.1" />
    <ellipse cx="43" cy="35.5" rx="3" ry="1.8" strokeWidth="1.1" />
    {/* Gold buttons on jacket */}
    <circle cx="32" cy="38" r="1" fill="currentColor" />
    <circle cx="32" cy="42" r="1" fill="currentColor" />
    <circle cx="32" cy="46" r="1" fill="currentColor" />
    {/* Belt */}
    <line x1="23" y1="48" x2="41" y2="48" strokeWidth="1.4" />
    {/* Boots */}
    <path d="M26 49 L 26 58 L 29 58 L 29 49" strokeWidth="1.3" />
    <path d="M35 49 L 35 58 L 38 58 L 38 49" strokeWidth="1.3" />
  </svg>
);

// 10. Muérdago Navideño (Mistletoe / Holly con bayas y lazo)
export const MuerdagoIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Upper left holly leaf */}
    <path
      d="M32 29 C 26 24 16 26 12 18 C 17 18 20 14 19 8 C 26 13 28 17 32 29 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M19 15 L 26 21" strokeWidth="0.9" />
    {/* Upper right holly leaf */}
    <path
      d="M32 29 C 38 24 48 26 52 18 C 47 18 44 14 45 8 C 38 13 36 17 32 29 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M45 15 L 38 21" strokeWidth="0.9" />
    {/* Bottom central holly leaf */}
    <path
      d="M32 35 C 27 42 28 50 32 58 C 36 50 37 42 32 35 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M32 36 L 32 50" strokeWidth="0.9" />
    {/* 3 Holly berries in center */}
    <circle cx="28" cy="32" r="3.6" strokeWidth="1.4" fill="currentColor" fillOpacity="0.2" />
    <circle cx="36" cy="32" r="3.6" strokeWidth="1.4" fill="currentColor" fillOpacity="0.2" />
    <circle cx="32" cy="27" r="3.6" strokeWidth="1.4" fill="currentColor" fillOpacity="0.2" />
    {/* Berry specular shine spots */}
    <circle cx="27" cy="31" r="0.8" fill="white" />
    <circle cx="35" cy="31" r="0.8" fill="white" />
    <circle cx="31" cy="26" r="0.8" fill="white" />
    {/* Mini ribbon knot */}
    <path d="M30 24 C 26 21 27 18 32 22 C 37 18 38 21 34 24" strokeWidth="1.2" />
  </svg>
);

// 11. Lazo de Regalo Elegante con Colas Onduladas
export const LazoRegaloIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left voluminous loop */}
    <path
      d="M30 26 C 14 12 10 32 28 31 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M28 28 C 18 20 18 26 26 29" strokeWidth="1" />
    {/* Right voluminous loop */}
    <path
      d="M34 26 C 50 12 54 32 36 31 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M36 28 C 46 20 46 26 38 29" strokeWidth="1" />
    {/* Central wrapped knot */}
    <ellipse cx="32" cy="28.5" rx="4.5" ry="4" strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />
    <circle cx="32" cy="28.5" r="1.5" strokeWidth="1" />
    {/* Left swallowtail trailing ribbon */}
    <path
      d="M29 32 C 22 43 17 50 12 58 L 18 56 L 22 58 C 24 50 26 42 31 33 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Right swallowtail trailing ribbon */}
    <path
      d="M35 32 C 42 43 47 50 52 58 L 46 56 L 42 58 C 40 50 38 42 33 33 Z"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.08"
    />
  </svg>
);

// 12. Arbolito de Navidad con Estrella y Guirnaldas
export const ArbolitoNavidadIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Star topper */}
    <path
      d="M32 3 L 33.5 7.5 L 38 7.5 L 34.5 10.2 L 36 15 L 32 12.2 L 28 15 L 29.5 10.2 L 26 7.5 L 30.5 7.5 Z"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.3"
    />
    {/* Pine boughs - 3 tiers */}
    <path
      d="M32 14 L 24 24 L 28 24 L 18 36 L 24 36 L 14 50 L 50 50 L 40 36 L 46 36 L 36 24 L 40 24 Z"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Garland swag lines */}
    <path d="M26 23 Q 32 27 38 23" strokeWidth="1.1" />
    <path d="M20 34 Q 32 40 44 34" strokeWidth="1.1" />
    <path d="M16 47 Q 32 54 48 47" strokeWidth="1.1" />
    {/* Hanging round ornaments / baubles */}
    <circle cx="28" cy="29" r="1.8" strokeWidth="1.1" fill="currentColor" fillOpacity="0.2" />
    <circle cx="36" cy="33" r="1.8" strokeWidth="1.1" fill="currentColor" fillOpacity="0.2" />
    <circle cx="24" cy="42" r="1.8" strokeWidth="1.1" fill="currentColor" fillOpacity="0.2" />
    <circle cx="39" cy="44" r="1.8" strokeWidth="1.1" fill="currentColor" fillOpacity="0.2" />
    {/* Trunk */}
    <rect x="29" y="50" width="6" height="8" rx="1" strokeWidth="1.3" />
  </svg>
);

// 13. Taza de Café Caliente con Vapor Aromático
export const CafeCalienteIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Saucer plate */}
    <ellipse cx="32" cy="54" rx="22" ry="4" strokeWidth="1.3" />
    <path d="M14 53 Q 32 59 50 53" strokeWidth="1.1" />
    {/* Porcelain cup */}
    <path
      d="M16 28 L 48 28 L 44 49 C 44 53 20 53 20 49 Z"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Oval cup rim */}
    <ellipse cx="32" cy="28" rx="16" ry="4" strokeWidth="1.3" />
    {/* Coffee surface */}
    <ellipse cx="32" cy="29" rx="13" ry="2.8" strokeWidth="1.1" />
    {/* Cup handle */}
    <path d="M47 31 C 55 31 55 45 44 45" strokeWidth="1.4" />
    {/* Delicate aroma steam wisps */}
    <path d="M26 23 C 23 17 28 13 25 7" strokeWidth="1.3" />
    <path d="M32 23 C 36 17 30 12 33 5" strokeWidth="1.3" />
    <path d="M38 23 C 42 17 37 13 40 7" strokeWidth="1.3" />
  </svg>
);

// 14. Campanas Navideñas con lazo y badajos
export const CampanasNavidenasIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left Bell */}
    <path d="M 22 18 C 22 12 28 12 28 18 C 28 26 34 32 34 38 L 10 38 C 10 32 16 26 16 18 Z" strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
    <ellipse cx="22" cy="38" rx="12" ry="3.5" strokeWidth="1.2" />
    <circle cx="22" cy="42" r="2.5" strokeWidth="1.1" fill="currentColor" fillOpacity="0.25" />

    {/* Right Bell */}
    <path d="M 40 22 C 40 16 46 16 46 22 C 46 30 52 36 52 42 L 28 42 C 28 36 34 30 34 22 Z" strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
    <ellipse cx="40" cy="42" rx="12" ry="3.5" strokeWidth="1.2" />
    <circle cx="40" cy="46" r="2.5" strokeWidth="1.1" fill="currentColor" fillOpacity="0.25" />

    {/* Holiday Bow connecting bells */}
    <path d="M 31 16 C 24 10 20 18 31 17 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <path d="M 31 16 C 38 10 42 18 31 17 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="31" cy="16.5" r="2.2" strokeWidth="1.1" />
  </svg>
);

// 15. Estrella de Belén con estela luminosa
export const EstrellaBelenIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main 8-pointed star */}
    <path
      d="M 28 4 L 32 20 L 48 24 L 32 28 L 28 44 L 24 28 L 8 24 L 24 20 Z"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M 18 14 L 38 34 M 38 14 L 18 34" strokeWidth="1.1" />
    <circle cx="28" cy="24" r="3" strokeWidth="1.2" />
    {/* Sweeping star trails */}
    <path d="M 33 26 C 44 28 52 38 58 54" strokeWidth="1.3" strokeDasharray="3 2" />
    <path d="M 31 29 C 40 33 46 44 50 58" strokeWidth="1.1" />
    <circle cx="58" cy="54" r="1.5" fill="currentColor" />
  </svg>
);

// 16. Hallaca tradicional envuelta en hoja de plátano con amarre de pabilo
export const AmarreHallacaIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Banana leaf rectangular pillow */}
    <rect x="12" y="16" width="40" height="32" rx="6" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
    {/* Leaf fold ridges */}
    <path d="M 12 24 Q 32 27 52 24" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 12 40 Q 32 43 52 40" strokeWidth="1" strokeDasharray="2 2" />
    {/* Twine vertical strings */}
    <line x1="24" y1="16" x2="24" y2="48" strokeWidth="1.3" />
    <line x1="40" y1="16" x2="40" y2="48" strokeWidth="1.3" />
    {/* Twine horizontal strings */}
    <line x1="12" y1="32" x2="52" y2="32" strokeWidth="1.3" />
    {/* Center twine knot & loops */}
    <circle cx="32" cy="32" r="2.5" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <path d="M 32 30 C 29 25 35 24 32 30 Z" strokeWidth="1" />
    <path d="M 32 34 C 29 39 35 40 32 34 Z" strokeWidth="1" />
  </svg>
);

// 17. Copo de Nieve de Filigrana Cristalina
export const CopoNieveIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 6 primary axes */}
    <line x1="32" y1="8" x2="32" y2="56" strokeWidth="1.5" />
    <line x1="11" y1="20" x2="53" y2="44" strokeWidth="1.5" />
    <line x1="11" y1="44" x2="53" y2="20" strokeWidth="1.5" />
    {/* Center hex jewel */}
    <circle cx="32" cy="32" r="5" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
    {/* Branching V chevron crystals */}
    <path d="M 27 15 L 32 20 L 37 15" strokeWidth="1.2" />
    <path d="M 27 49 L 32 44 L 37 49" strokeWidth="1.2" />
    <path d="M 16 28 L 22 26 L 20 20" strokeWidth="1.2" />
    <path d="M 48 36 L 42 38 L 44 44" strokeWidth="1.2" />
    <path d="M 20 44 L 22 38 L 16 36" strokeWidth="1.2" />
    <path d="M 44 20 L 42 26 L 48 28" strokeWidth="1.2" />
  </svg>
);

// 18. Piña de Pino Navideña
export const PinaPinoIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Top stem & pine sprig */}
    <path d="M 32 6 L 32 14" strokeWidth="1.5" />
    <path d="M 26 12 L 38 12 M 22 9 L 30 14 M 42 9 L 34 14" strokeWidth="1.2" />
    {/* Oval cone contour */}
    <path d="M 32 14 C 18 18 18 46 32 56 C 46 46 46 18 32 14 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
    {/* Overlapping scales curves */}
    <path d="M 24 22 Q 32 26 40 22" strokeWidth="1.2" />
    <path d="M 20 30 Q 32 35 44 30" strokeWidth="1.2" />
    <path d="M 22 38 Q 32 43 42 38" strokeWidth="1.2" />
    <path d="M 26 46 Q 32 50 38 46" strokeWidth="1.2" />
  </svg>
);

// 19. Paila de Cobre Tradicional con Paleta de Madera
export const PailaCobreIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Paila kettle rim */}
    <ellipse cx="32" cy="24" rx="20" ry="6" strokeWidth="1.5" />
    {/* Paila cauldron belly */}
    <path d="M 12 24 C 12 44 20 52 32 52 C 44 52 52 44 52 24" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
    {/* Side riveted handles */}
    <path d="M 12 22 C 6 22 6 30 12 30" strokeWidth="1.3" />
    <path d="M 52 22 C 58 22 58 30 52 30" strokeWidth="1.3" />
    {/* Wooden paddle stirring */}
    <path d="M 44 8 L 26 38 C 24 41 27 44 30 42 L 48 10 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.2" />
    {/* Steam aroma wisps */}
    <path d="M 24 16 Q 22 10 26 6" strokeWidth="1.1" />
    <path d="M 38 16 Q 42 10 38 6" strokeWidth="1.1" />
  </svg>
);

// 20. Frasco de Dulce Cortado con Tapa de Mecatillo
export const FrascoDulceCortadoIcon: React.FC<MotifProps> = ({ className = '', size = 56 }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Rustic Cloth Cap */}
    <path d="M 20 15 C 20 10 44 10 44 15 L 48 20 C 44 22 20 22 16 20 Z" strokeWidth="1.4" fill="currentColor" fillOpacity="0.15" />
    {/* Twine cord around neck */}
    <line x1="18" y1="21" x2="46" y2="21" strokeWidth="1.5" />
    <ellipse cx="32" cy="22" rx="3" ry="1.5" strokeWidth="1.1" />
    {/* Glass jar body */}
    <path d="M 18 22 L 18 50 C 18 54 46 54 46 50 L 46 22" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
    <ellipse cx="32" cy="50" rx="14" ry="3.5" strokeWidth="1.2" />
    {/* Dulce layer inside */}
    <path d="M 19 36 Q 32 39 45 36" strokeWidth="1.1" strokeDasharray="3 1.5" />
    {/* Star anise blossom */}
    <circle cx="32" cy="38" r="4" strokeWidth="1" />
    <path d="M 32 34 L 32 42 M 28 38 L 36 38" strokeWidth="0.8" />
  </svg>
);

/**
 * Four-point golden sparkle accent for atmospheric stardust
 */
export const SparkleAccent: React.FC<MotifProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" />
    <circle cx="12" cy="12" r="2.5" fill="#FFFBE6" />
  </svg>
);

// 20 Handcrafted Golden Filigree Motifs representing Christmas and Venezuelan Tradition
const MOTIFS = [
  { key: 'vela', component: VelaIcon },
  { key: 'ponche', component: BotellaPoncheIcon },
  { key: 'luces', component: LucesNavidenasIcon },
  { key: 'panJamon', component: PanJamonIcon },
  { key: 'galletas', component: GalletasLecheIcon },
  { key: 'dulces', component: DulcesVariosIcon },
  { key: 'chocolates', component: ChocolatesIcon },
  { key: 'baston', component: BastonCarameloIcon },
  { key: 'cascanueces', component: CascanuecesIcon },
  { key: 'muerdago', component: MuerdagoIcon },
  { key: 'lazo', component: LazoRegaloIcon },
  { key: 'arbolito', component: ArbolitoNavidadIcon },
  { key: 'cafe', component: CafeCalienteIcon },
  { key: 'campanas', component: CampanasNavidenasIcon },
  { key: 'estrellaBelen', component: EstrellaBelenIcon },
  { key: 'hallaca', component: AmarreHallacaIcon },
  { key: 'copoNieve', component: CopoNieveIcon },
  { key: 'pinaPino', component: PinaPinoIcon },
  { key: 'pailaCobre', component: PailaCobreIcon },
  { key: 'frascoDulce', component: FrascoDulceCortadoIcon },
];

/**
 * Deterministic pseudo-random number generator for harmonious layout consistency
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface FestiveWatermarkBackgroundProps {
  season?: string;
}

export const FestiveWatermarkBackground: React.FC<FestiveWatermarkBackgroundProps> = () => {
  // Generate a dense, abundant, beautifully balanced matrix of all 20 motifs
  // spanning the full height and width of the page
  const items = useMemo(() => {
    const list: Array<{
      id: string;
      Motif: React.FC<MotifProps>;
      x: number; // percentage (0 - 100)
      y: number; // percentage (0 - 100)
      size: number; // px size
      rotation: number; // degrees
      opacity: number;
    }> = [];

    // 12 columns across horizontal, 42 vertical tiers for genuinely abundant, dense coverage across the whole page (504 items)
    const COLS = 12;
    const ROWS = 42;

    let index = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        index++;
        const seed = r * 43 + c * 67 + 211;
        const randX = seededRandom(seed);
        const randY = seededRandom(seed + 1);
        const randRot = seededRandom(seed + 2);
        const randSize = seededRandom(seed + 3);
        const randOp = seededRandom(seed + 4);

        // Grid-guided anchor with organic jitter for rich, dense yet balanced scatter
        const cellWidth = 100 / COLS;
        const cellHeight = 100 / ROWS;

        // Alternate staggered row offset for brick/honeycomb harmony
        const staggerOffset = r % 2 === 1 ? cellWidth * 0.5 : 0;
        const posX = Math.min(98, Math.max(1.2, c * cellWidth + staggerOffset + (randX - 0.5) * (cellWidth * 0.75)));
        const posY = Math.min(99.4, Math.max(0.3, r * cellHeight + (randY - 0.5) * (cellHeight * 0.75)));

        // Rotate through all 20 motifs in a non-repetitive harmonious sequence
        const motifIndex = (r * 11 + c * 5 + index) % MOTIFS.length;
        const MotifComponent = MOTIFS[motifIndex].component;

        // Varied sizes from 44px to 86px for rich visual hierarchy
        const size = Math.round(44 + randSize * 42);
        // Rotation between -28 and +28 degrees
        const rotation = Math.round((randRot - 0.5) * 56);
        // Abundant, high-contrast watermark opacity between 0.45 and 0.80 on dark brown
        const opacity = +(0.45 + randOp * 0.32).toFixed(2);

        list.push({
          id: `watermark-${r}-${c}`,
          Motif: MotifComponent,
          x: posX,
          y: posY,
          size,
          rotation,
          opacity,
        });
      }
    }

    return list;
  }, []);

  // Scattered Venezuelan Seal Watermarks (Sello Venezolano)
  // Slightly larger than the 44-86px golden illustrations (~98px-128px),
  // scattered and abundant throughout the entire page height.
  const selloItems = useMemo(() => {
    const list: Array<{
      id: string;
      x: number;
      y: number;
      size: number;
      rotation: number;
      opacity: number;
    }> = [];

    const TOTAL_SELLOS = 18;
    for (let i = 0; i < TOTAL_SELLOS; i++) {
      const seed = i * 83 + 617;
      const randX = seededRandom(seed);
      const randRot = seededRandom(seed + 1);
      const randSize = seededRandom(seed + 2);
      const randOp = seededRandom(seed + 3);

      // Staggered Y position down the whole page
      const baseY = (i / TOTAL_SELLOS) * 96 + 2;
      const posY = Math.min(98.2, Math.max(1.5, baseY + (seededRandom(seed + 4) - 0.5) * 3));

      // Organic scatter horizontally: alternating sides & inner lanes
      let posX: number;
      const lane = i % 4;
      if (lane === 0) {
        posX = 3 + randX * 8; // Left outer
      } else if (lane === 1) {
        posX = 86 + randX * 10; // Right outer
      } else if (lane === 2) {
        posX = 20 + randX * 14; // Left inner
      } else {
        posX = 66 + randX * 14; // Right inner
      }

      // Slightly larger than the 44-86px illustrations: 98px to 128px
      const size = Math.round(98 + randSize * 30);
      const rotation = Math.round((randRot - 0.5) * 52); // -26 to +26 deg
      const opacity = +(0.34 + randOp * 0.18).toFixed(2); // 0.34 to 0.52

      list.push({
        id: `sello-scatter-${i}`,
        x: posX,
        y: posY,
        size,
        rotation,
        opacity,
      });
    }

    return list;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      style={{
        // Seamless transition strictly between deep, rich, dark browns (no orange, no light browns)
        background: `
          radial-gradient(circle at 10% 8%, rgba(45, 18, 8, 0.40) 0%, transparent 45%),
          radial-gradient(circle at 90% 20%, rgba(52, 21, 9, 0.38) 0%, transparent 48%),
          radial-gradient(circle at 15% 38%, rgba(40, 16, 7, 0.42) 0%, transparent 46%),
          radial-gradient(circle at 85% 55%, rgba(48, 19, 8, 0.40) 0%, transparent 45%),
          radial-gradient(circle at 12% 72%, rgba(42, 17, 7, 0.42) 0%, transparent 46%),
          radial-gradient(circle at 88% 88%, rgba(36, 14, 6, 0.45) 0%, transparent 50%),
          linear-gradient(180deg,
            #080302 0%,     /* Marrón Cacao Ultra Profundo / Noche */
            #110502 5%,     /* Marrón Espresso Oscuro */
            #1A0803 11%,    /* Marrón Cacao Tostado Oscuro */
            #230D05 18%,    /* Marrón Caoba Intenso */
            #2A1107 26%,    /* Marrón Grano de Café Maduro */
            #220D05 34%,    /* Marrón Barrica de Cacao */
            #1B0904 43%,    /* Marrón Chocolate Amargo Puro */
            #271006 52%,    /* Marrón Madera Noble Quemada */
            #2D1308 61%,    /* Marrón Tostado Profundo */
            #230D05 70%,    /* Marrón Barrica de Ron Oscura */
            #1B0904 79%,    /* Marrón Café Negro Concentrado */
            #140602 88%,    /* Marrón Chocolate Azabache */
            #0B0402 95%,    /* Marrón Cacao Nocturno */
            #070201 100%    /* Marrón Cierre Ultra Oscuro */
          )
        `,
      }}
    >
      {/* SVG Definitions for golden gradients */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="goldFiligreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="65%" stopColor="#E5B83B" />
            <stop offset="100%" stopColor="#B3861B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Render all 504 abundant scattered watermarks in radiant metallic gold */}
      {items.map((it) => (
        <div
          key={it.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            opacity: it.opacity,
            transform: `translate(-50%, -50%) rotate(${it.rotation}deg)`,
            filter: 'drop-shadow(0 0 4px rgba(253, 224, 71, 0.55)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.9))',
          }}
        >
          <it.Motif
            size={it.size}
            className="text-[#FDE047] transition-transform"
          />
        </div>
      ))}

      {/* Scattered Sello Venezolano Watermarks: slightly larger (~98-128px) and abundant throughout the tapestry */}
      {selloItems.map((s) => (
        <div
          key={s.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            filter: 'drop-shadow(0 0 6px rgba(253, 224, 71, 0.55)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.9))',
          }}
        >
          <img
            src="/assets/aistudio/sello_venezolano_gold.png"
            alt=""
            width={s.size}
            height={s.size}
            className="object-contain"
            style={{ width: `${s.size}px`, height: `${s.size}px` }}
          />
        </div>
      ))}

      {/* Abundant golden stardust and holiday sparkles throughout the journey */}
      <div className="absolute top-[3%] left-[8%] text-[#FDE047] opacity-75 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={24} />
      </div>
      <div className="absolute top-[7%] right-[11%] text-[#FDE047] opacity-80 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={28} />
      </div>
      <div className="absolute top-[14%] left-[16%] text-[#FDE047] opacity-75 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={22} />
      </div>
      <div className="absolute top-[21%] right-[6%] text-[#FDE047] opacity-80 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={26} />
      </div>
      <div className="absolute top-[28%] left-[10%] text-[#FDE047] opacity-75 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={24} />
      </div>
      <div className="absolute top-[36%] right-[14%] text-[#FDE047] opacity-80 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={28} />
      </div>
      <div className="absolute top-[44%] left-[7%] text-[#FDE047] opacity-75 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={22} />
      </div>
      <div className="absolute top-[52%] right-[16%] text-[#FDE047] opacity-80 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={26} />
      </div>
      <div className="absolute top-[60%] left-[12%] text-[#FDE047] opacity-75 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={24} />
      </div>
      <div className="absolute top-[68%] right-[8%] text-[#FDE047] opacity-80 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={28} />
      </div>
      <div className="absolute top-[76%] left-[15%] text-[#FDE047] opacity-75 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={24} />
      </div>
      <div className="absolute top-[84%] right-[12%] text-[#FDE047] opacity-80 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
        <SparkleAccent size={26} />
      </div>
      {/* Artisanal Product Watermark Logo Seals floating harmoniously down the tapestry */}
      <div className="absolute top-[11%] left-[3%] w-32 h-32 rounded-full overflow-hidden opacity-20 filter contrast-125 mix-blend-screen pointer-events-none select-none border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <img src="/assets/aistudio/PONCHE_CREMA_LOGO_bbe2a4ae.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-[26%] right-[3%] w-32 h-32 rounded-full overflow-hidden opacity-20 filter contrast-125 mix-blend-screen pointer-events-none select-none border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <img src="/assets/aistudio/CHOCOLATES_LOGO_51b91f48.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-[48%] left-[2%] w-32 h-32 rounded-full overflow-hidden opacity-20 filter contrast-125 mix-blend-screen pointer-events-none select-none border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <img src="/assets/aistudio/QUESILLO_LOGO_5a52b8cf.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-[67%] right-[2%] w-32 h-32 rounded-full overflow-hidden opacity-20 filter contrast-125 mix-blend-screen pointer-events-none select-none border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <img src="/assets/aistudio/DULCE_DE_LECHE_LOGO_34768add.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-[85%] left-[3%] w-32 h-32 rounded-full overflow-hidden opacity-20 filter contrast-125 mix-blend-screen pointer-events-none select-none border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <img src="/assets/aistudio/PAN_DE_JAMON_LOGO_f66ef27c.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-[93%] right-[3%] w-32 h-32 rounded-full overflow-hidden opacity-20 filter contrast-125 mix-blend-screen pointer-events-none select-none border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <img src="/assets/aistudio/Gemini_Generated_Image_7c4os47c4os47c4o_b0abb632.jpg" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
