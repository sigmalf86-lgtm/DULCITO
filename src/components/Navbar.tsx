import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ChristmasWreathPin } from './ChristmasWreathPin';
import { RedVelvetRibbonStrip } from './RedVelvetRibbonStrip';

import { SeasonId, SEASONS } from '../types/seasons';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateCategory?: (category: string) => void;
  currentSeason?: SeasonId;
  onOpenSeasonSelector?: () => void;
}

/**
 * WhatsApp Official Vector Icon
 */
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/**
 * Instagram Official Vector Icon
 */
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateCategory,
  currentSeason = 'navidad',
  onOpenSeasonSelector,
}) => {
  const activeSeasonConfig = SEASONS[currentSeason];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 relative shadow-[0_6px_24px_rgba(24,10,4,0.35)]`}
    >
      {/* Top Red Velvet Ribbon with Embossed Poinsettias & Holly Leaves */}
      <RedVelvetRibbonStrip position="top" className="h-[20px] sm:h-[24px] md:h-[28px]" />

      {/* Golden Ribbon Band */}
      <div
        className={`transition-all duration-300 relative ${
          isScrolled ? 'py-1.5 sm:py-2' : 'py-2 sm:py-3'
        }`}
        style={{
          // Warm, creamy champagne-gold matching user reference image (imagen_074717d9.png)
          background: 'linear-gradient(180deg, #E7C978 0%, #F8E5A0 25%, #FFF4C8 50%, #F8E5A0 75%, #E7C978 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* DESKTOP & TABLET VIEW: Logo + Action Buttons + Christmas Wreath Pin (~3 cm) close to buttons */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Brand Wordmark + Exact Enlarged Logo + Spinning Anise + Calligraphy + Metallic Red Heart */}
          <div className="flex items-center whitespace-nowrap shrink-0 group py-0.5 px-0.5">
            <BrandLogo size="responsive" showSpinningAnise={true} heartColor="red" inverted={false} />
          </div>

          {/* Central Action Cluster + Christmas Wreath Pin (~3 cm) placed close to buttons */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            {/* Essential Action Buttons: WhatsApp, Instagram, Carrito & Música */}
            <div className="flex items-center gap-2 lg:gap-2.5">
              {/* WhatsApp App Logo Button */}
              <a
                href="https://wa.me/584248830997?text=Bienvenido%20a%20DULCITO%20%F0%9F%A4%8E%0A%C2%BFEn%20qu%C3%A9%20puedo%20ayudarte%3F"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp: Escríbenos directamente"
                aria-label="Abrir chat de WhatsApp"
                className="group relative flex items-center justify-center p-2 rounded-xl border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] text-white shadow-[0_2px_8px_rgba(36,16,7,0.35)] hover:border-[#FFF8D6] hover:shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-white group-hover:text-[#FDE047] transition-colors" />
              </a>

              {/* Instagram App Logo Button */}
              <a
                href="https://www.instagram.com/dulcito___/"
                target="_blank"
                rel="noreferrer"
                title="Instagram: @dulcito___"
                aria-label="Abrir Instagram de Dulcito: @dulcito___"
                className="group relative flex items-center justify-center p-2 rounded-xl border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] text-white shadow-[0_2px_8px_rgba(36,16,7,0.35)] hover:border-[#FFF8D6] hover:shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all"
              >
                <InstagramIcon className="w-4 h-4 fill-current text-white group-hover:text-[#FDE047] transition-colors" />
              </a>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                aria-label={`Ver carrito de compra con ${cartCount} productos`}
                className="group relative flex items-center gap-2 px-3 py-1.5 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 rounded-xl hover:border-[#FFF8D6] hover:shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all shadow-[0_2px_8px_rgba(36,16,7,0.35)] whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 text-[#FDE047]" />
                <span>Carrito</span>
                <span className="min-w-5 h-5 px-1.5 flex items-center justify-center text-[10px] font-black bg-gradient-to-br from-[#E11D48] to-[#9F1239] text-white rounded-full tabular-nums shadow-xs border border-[#FDE047]">
                  {cartCount}
                </span>
              </button>

            </div>

            {/* Christmas Wreath Pin: 3 cm diameter (~114px), placed right next to the central buttons */}
            <div className="shrink-0 flex items-center pl-2">
              <ChristmasWreathPin
                size={114}
                className="w-[84px] h-[84px] sm:w-[98px] sm:h-[98px] md:w-[114px] md:h-[114px]"
              />
            </div>
          </div>
        </div>

        {/* MOBILE (PHONE) VIEW: Dedicated 2-Tier Harmonic Architecture */}
        {/* Tier 1 gives Brand Identity and Corona Navideña full, unhindered breathing room. */}
        {/* Tier 2 displays the action buttons cleanly across the ribbon with zero overlap. */}
        <div className="md:hidden flex flex-col gap-1.5 py-0.5">
          {/* Tier 1: Brand Logo on Left, Corona Navideña on Right */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center shrink min-w-0">
              <BrandLogo size="responsive" showSpinningAnise={true} heartColor="red" inverted={false} />
            </div>

            {/* Mobile Christmas Wreath Pin: Aligned to the right, sized ~3 cm, NO buttons crowding it */}
            <div className="shrink-0 flex items-center pl-1">
              <ChristmasWreathPin
                size={74}
                className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] drop-shadow-md"
              />
            </div>
          </div>

          {/* Tier 2: Dedicated Golden Action Strip - 3 Balanced Touch-Friendly Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#8F6516]/40">
            {/* WhatsApp App Button */}
            <a
              href="https://wa.me/584248830997?text=Bienvenido%20a%20DULCITO%20%F0%9F%A4%8E%0A%C2%BFEn%20qu%C3%A9%20puedo%20ayudarte%3F"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp: Escríbenos"
              aria-label="Abrir WhatsApp"
              className="flex-1 flex items-center justify-center gap-1.5 h-8.5 rounded-xl border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] text-white shadow-xs active:scale-95 transition-all text-xs font-bold"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-[#4ADE80]" />
              <span className="text-[11px]">WhatsApp</span>
            </a>

            {/* Instagram App Button */}
            <a
              href="https://www.instagram.com/dulcito___/"
              target="_blank"
              rel="noreferrer"
              title="Instagram: @dulcito___"
              aria-label="Abrir Instagram @dulcito___"
              className="flex-1 flex items-center justify-center gap-1.5 h-8.5 rounded-xl border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] text-white shadow-xs active:scale-95 transition-all text-xs font-bold"
            >
              <InstagramIcon className="w-3.5 h-3.5 fill-current text-[#F43F5E]" />
              <span className="text-[11px]">Instagram</span>
            </a>

            {/* Carrito de Compra Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Ver carrito con ${cartCount} productos`}
              className="flex-1 flex items-center justify-center gap-1.5 h-8.5 rounded-xl border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FDE047]" />
              <span className="text-[11px]">Carrito</span>
              <span className="min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-black bg-gradient-to-br from-[#E11D48] to-[#9F1239] text-white rounded-full border border-[#FDE047]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* End Golden Ribbon Band */}
    </div>

    {/* Bottom Red Velvet Ribbon with Embossed Poinsettias & Holly Leaves */}
    <RedVelvetRibbonStrip position="bottom" className="h-[20px] sm:h-[24px] md:h-[28px]" />
  </header>
  );
};
