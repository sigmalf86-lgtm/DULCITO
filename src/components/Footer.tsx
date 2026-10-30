import React from 'react';
import { Heart, MessageCircle, Clock, MapPin, ShieldCheck, Instagram } from 'lucide-react';
import { BrandLogo, MetallicRedHeart } from './BrandLogo';
import { SpinningStarAnise } from './SpinningStarAnise';
import { ChristmasWreathPin } from './ChristmasWreathPin';
import { RedVelvetRibbonStrip } from './RedVelvetRibbonStrip';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#180A04] text-[#FAF6F0] relative overflow-hidden">
      {/* 1. TOP RIBBON (Golden ribbon framed by embossed red velvet ribbons matching Navbar) */}
      <div className="w-full relative shadow-[0_4px_20px_rgba(24,10,4,0.35)]">
        {/* Top Red Velvet Ribbon with Embossed Poinsettias & Holly Leaves */}
        <RedVelvetRibbonStrip position="top" className="h-[20px] sm:h-[24px] md:h-[28px]" />

        {/* Golden Ribbon Band */}
        <div
          className="w-full py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8 relative"
          style={{
            // Warm, creamy champagne-gold matching user reference image (imagen_074717d9.png)
            background: 'linear-gradient(180deg, #E7C978 0%, #F8E5A0 25%, #FFF4C8 50%, #F8E5A0 75%, #E7C978 100%)',
          }}
        >
          <div className="relative z-10">
        {/* DESKTOP VIEW (md:flex): Logo on Left, Motto in Center, Wreath Pin on Right */}
        <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-4">
          <div className="flex items-center shrink-0">
            <BrandLogo size="responsive" showSpinningAnise={true} heartColor="red" inverted={false} />
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#241007]/95 rounded-xl border border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 text-white shadow-md">
              <SpinningStarAnise size={16} spin={false} interactive={true} showMessageOnClick={true} glow={true} />
              <span className="font-serif italic font-bold text-xs sm:text-sm text-[#FDE047]">
                "Donde haya añoranza, habrá un Dulcito"
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2A1208] border-l border-[#8F6516]/50 pl-3">
              <span>Recetas de 1954</span>
              <span>·</span>
              <span>100% Pura Tradición</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-end">
            <ChristmasWreathPin
              size={114}
              className="w-[84px] h-[84px] sm:w-[98px] sm:h-[98px] md:w-[114px] md:h-[114px]"
            />
          </div>
        </div>

        {/* MOBILE VIEW (md:hidden): Harmonic Spaced Architecture for Phones */}
        <div className="md:hidden max-w-md mx-auto flex flex-col gap-2 py-0.5">
          {/* Top Row: Brand on Left, Corona Navideña on Right */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center shrink min-w-0">
              <BrandLogo size="responsive" showSpinningAnise={true} heartColor="red" inverted={false} />
            </div>

            <div className="shrink-0 flex items-center pl-1">
              <ChristmasWreathPin
                size={74}
                className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] drop-shadow-md"
              />
            </div>
          </div>

          {/* Bottom Center: Heritage Banner */}
          <div className="flex flex-col items-center justify-center gap-1.5 text-center pt-1 border-t border-[#8F6516]/40">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#241007]/95 rounded-xl border border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 text-white shadow-md">
              <SpinningStarAnise size={14} spin={false} interactive={true} showMessageOnClick={true} glow={true} />
              <span className="font-serif italic font-bold text-xs text-[#FDE047]">
                "Donde haya añoranza, habrá un Dulcito"
              </span>
            </div>
            <span className="text-[11px] font-serif font-bold text-[#2A1208]">
              Recetas de 1954 · 100% Pura Tradición
            </span>
          </div>
        </div>
        </div>
        {/* End Golden Ribbon Band */}
      </div>

      {/* Bottom Red Velvet Ribbon with Embossed Poinsettias & Holly Leaves */}
      <RedVelvetRibbonStrip position="bottom" className="h-[20px] sm:h-[24px] md:h-[28px]" />
    </div>

      {/* 2. MAIN FOOTER CONTENT - Clean solid dark chocolate with gold Venezuelan seal watermark */}
      <div className="relative overflow-hidden bg-[#180A04]">
        {/* Sello venezolano del logo en dorado artesanal, difuminado como marca de agua de fondo */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/aistudio/sello_venezolano_gold.png"
            alt=""
            className="w-[320px] sm:w-[420px] md:w-[480px] max-w-none object-contain opacity-20 filter blur-[0.8px] mix-blend-screen scale-100"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pb-6 border-b border-[#3D2214]">
          {/* Artisan Heritage & Description */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FDE047] uppercase tracking-wider">
              <SpinningStarAnise size={15} speed="slow" glow={true} />
              <span>Despensa Artesanal de Hogar</span>
            </div>

            <p className="text-xs text-[#EBD8C3] leading-relaxed max-w-sm">
              Elaboramos cada ponche crema y dulce de leche con recetas heredadas de la familia, 
              leche fresca de pastura, ron de barrica y canela en rama. Hecho a fuego lento y con dedicación tradicional.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-[#D9A07E]">
              <span className="flex items-center gap-1.5 text-[#FDE047]">
                <MetallicRedHeart size={18} />
                <span>Hecho en casa con amor</span>
              </span>
              <span>·</span>
              <span>Lotes frescos semanales</span>
            </div>
          </div>

          {/* Catalog links (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#F2DA91] uppercase tracking-wider">
              Nuestra Tienda
            </h4>
            <ul className="space-y-1.5 text-xs text-[#EAD5C3]">
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('ponche')}
                  className="hover:text-[#FDE047] transition-colors"
                >
                  Ponche Crema Tradicional. DULCITO
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('tequenos')}
                  className="hover:text-[#FDE047] transition-colors"
                >
                  Tequeños de Queso Artesanales. DULCITO
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('chocolates')}
                  className="hover:text-[#FDE047] transition-colors"
                >
                  Chocolates Árabes Tradicionales. DULCITO
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('quesillo')}
                  className="hover:text-[#FDE047] transition-colors"
                >
                  Quesillo Tradicional Criollo. DULCITO
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('tradicionales')}
                  className="hover:text-[#FDE047] transition-colors"
                >
                  Dulce de leche tradicional. DULCITO
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={() => onSelectCategory('pan-jamon')}
                  className="hover:text-[#FDE047] transition-colors"
                >
                  Pan de Jamón Navideño. DULCITO
                </a>
              </li>
              <li>
                <a
                  href="#historia"
                  className="hover:text-[#FDE047] transition-colors"
                >
                  La Historia de Nuestra Olla
                </a>
              </li>
            </ul>
          </div>

          {/* Artisan Guarantee & Deliveries (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#F2DA91] uppercase tracking-wider">
              Atención & Envíos
            </h4>
            <div className="space-y-2 text-xs text-[#EBD8C3]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#FDE047] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#FAF6F0]">Horario de Envíos:</strong> Lunes a Sábado de 9:00 am a 6:00 pm.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FDE047] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#FAF6F0]">Cobertura:</strong> Entregas locales y envíos nacionales protegidos.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FDE047] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#FAF6F0]">Garantía:</strong> Cada lote es preparado fresco de la semana.
                </span>
              </div>
            </div>

            <div className="pt-1.5 flex flex-wrap gap-2.5">
              <a
                href="https://wa.me/584248830997?text=Bienvenido%20a%20DULCITO%20%F0%9F%A4%8E%0A%C2%BFEn%20qu%C3%A9%20puedo%20ayudarte%3F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 hover:border-[#FFF8D6] text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#FDE047]" />
                <span>WhatsApp: Pedido directo</span>
              </a>

              <a
                href="https://www.instagram.com/dulcito___/"
                target="_blank"
                rel="noreferrer"
                title="Instagram: @dulcito___"
                aria-label="Abrir Instagram de Dulcito: @dulcito___"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 hover:border-[#FFF8D6] text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <Instagram className="w-4 h-4 text-[#F43F5E]" />
                <span>Instagram: @dulcito___</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet copyright with Motto */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A67C63] gap-2">
          <div>
            © {new Date().getFullYear()} DULCITO. Todos los derechos reservados. Dulces tradicionales y ponche crema.
          </div>
          <div className="flex items-center gap-3">
            <span>Tradición artesanal desde 1954</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>Ingredientes 100% nobles</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};
