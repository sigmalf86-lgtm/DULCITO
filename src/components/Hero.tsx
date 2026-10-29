import React from 'react';
import { Heart, ShieldCheck, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { SpinningStarAnise } from './SpinningStarAnise';
import heroImg from '../assets/images/hero_dulcito_table_1792413778114.jpg';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCustomBox: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenCustomBox,
}) => {
  return (
    <section className="relative overflow-hidden pt-2 pb-6 lg:pt-4 lg:pb-8 bg-transparent">
      {/* Decorative ambient subtle warmth rings */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#240D05]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1A0803]/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtle editorial kicker with Star Anise accent */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#FDE047] mb-2">
              <SpinningStarAnise size={18} speed="slow" glow={true} />
              <span>Tradición Familiar Criolla</span>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span>Edición Artesanal de Autor</span>
            </div>

            {/* Headline with balanced wrap and gold accents */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-black text-[#FFF8EE] leading-[1.12] tracking-tight mb-3 [text-wrap:balance]">
              El sabor de la <span className="text-[#F5D061] italic font-serif">añoranza</span> en cada sorbo y bocado.
            </h1>

            {/* Evocative descriptive copy */}
            <p className="text-sm sm:text-base text-[#EBD8C3] font-medium leading-relaxed mb-4 max-w-xl">
              Ponche crema artesanal espeso con ron añejo y especias nobles, 
              dulce de leche cocinado a fuego lento en paila de cobre, y bocados 
              que despiertan los recuerdos más cálidos de nuestra tierra.
            </p>

            {/* Action Buttons in signature Brown, White & Gold style */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a
                href="#catalogo"
                onClick={onExploreCatalog}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 rounded-xl hover:border-[#FFF8D6] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap shrink-0 group shadow-md"
              >
                <span>Descubrir la Tienda</span>
                <SpinningStarAnise size={16} speed="slow" glow={false} className="group-hover:rotate-180 transition-transform" />
                <ArrowRight className="w-4 h-4 text-[#FDE047]" />
              </a>

              <button
                onClick={onOpenCustomBox}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2A1308] via-[#421D0E] to-[#2A1308] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 rounded-xl hover:border-[#FFF8D6] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap shrink-0 shadow-md"
              >
                <Heart className="w-4 h-4 text-[#FF4D4D] fill-[#FF4D4D]" />
                <span>Armar Caja de Regalo</span>
              </button>

              <a
                href="#spot-comercial"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('spot-comercial');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1C0D07] via-[#30140A] to-[#1C0D07] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 rounded-xl hover:border-[#FFF8D6] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md whitespace-nowrap shrink-0 group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span>Ver Spot Comercial</span>
                <span className="text-[#FDE047] group-hover:translate-x-0.5 transition-transform">▶</span>
              </a>
            </div>

            {/* Clean Proof Note with Gold & Brown accents */}
            <div className="pt-3 border-t border-[#D4AF37]/30 flex flex-wrap items-center gap-5 text-xs text-[#EBD8C3]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FDE047]" />
                <span>
                  <strong className="text-[#FFF8EE] font-bold text-xs sm:text-sm tabular-nums">+1,400</strong> botellas este año
                </span>
              </div>
              <span className="text-[#FDE047]">·</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FDE047]" />
                <span>
                  Receta con <strong className="text-[#FFF8EE]">anís estrellado y canela pura</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Gold & Deep Brown Accents */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[280px] sm:h-[340px] lg:h-[380px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/60 bg-[#1A0A05] group">
              <img
                src={heroImg}
                alt="Botella de ponche crema tradicional Dulcito con lazo de mecatillo y frascos de dulce de leche en mesa rústica"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Gentle warm gradient vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0502]/85 via-[#1A0A05]/20 to-transparent pointer-events-none" />

              {/* Floating caption card in dark luxury chocolate with gold border */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-[#160803]/95 backdrop-blur-md p-3 rounded-xl border-2 border-[#D4AF37]/60 shadow-2xl">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#241007] to-[#34160A] border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                    <SpinningStarAnise size={18} speed="slow" glow={true} />
                  </div>
                  <div>
                    <h2 className="text-xs font-serif font-bold text-[#FFF8EE]">
                      Hecho en Lotes Pequeños
                    </h2>
                    <p className="text-[11px] text-[#E0CCA7] mt-0.5 leading-snug">
                      Embotellado en cristal con mecatillo y especias maceradas al punto exacto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Trust & Heritage Strip in Dark Luxury Brown Cards */}
        <div className="mt-6 pt-5 border-t border-[#D4AF37]/30 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#1A0A05]/90 border border-[#D4AF37]/50 shadow-lg hover:border-[#FDE047] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#261007] border border-[#D4AF37]/60 flex items-center justify-center shrink-0 text-[#FDE047]">
              <Flame className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#FFF8EE]">Cocción Lenta</h3>
              <p className="text-xs text-[#E0CCA7] mt-0.5">En paila tradicional para un cuerpo denso y sedoso.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#1A0A05]/90 border border-[#D4AF37]/50 shadow-lg hover:border-[#FDE047] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#261007] border border-[#D4AF37]/60 flex items-center justify-center shrink-0 text-[#FDE047]">
              <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#FFF8EE]">100% Pura Leche</h3>
              <p className="text-xs text-[#E0CCA7] mt-0.5">Sin almidones ni conservantes artificiales.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#1A0A05]/90 border border-[#D4AF37]/50 shadow-lg hover:border-[#FDE047] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#261007] border border-[#D4AF37]/60 flex items-center justify-center shrink-0 text-[#FDE047]">
              <Heart className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#FFF8EE]">Empaque Artesanal</h3>
              <p className="text-xs text-[#E0CCA7] mt-0.5">Lazo de yute rústico y tarjeta con dedicatoria.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#1A0A05]/90 border border-[#D4AF37]/50 shadow-lg hover:border-[#FDE047] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#261007] border border-[#D4AF37]/60 flex items-center justify-center shrink-0 text-[#FDE047]">
              <Sparkles className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#FFF8EE]">Empaque Seguro</h3>
              <p className="text-xs text-[#E0CCA7] mt-0.5">Protección térmica para botellas de cristal.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
