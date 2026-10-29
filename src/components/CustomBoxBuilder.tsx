import React from 'react';
import { Gift, Sparkles, MessageCircle } from 'lucide-react';
import { SpinningStarAnise } from './SpinningStarAnise';
import { ALL_PRODUCTS_CHRISTMAS_IMAGE_URL } from '../data/products';

interface CustomBoxBuilderProps {
  onAddCustomBox?: (
    title: string,
    description: string,
    price: number,
    customNote: string,
    recipientName: string
  ) => void;
}

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = () => {
  return (
    <section id="caja-regalo" className="py-8 sm:py-12 bg-transparent border-y border-[#D4AF37]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-[#FDE047] mb-2">
            <SpinningStarAnise size={18} speed="slow" glow={true} />
            <span>Disponible por Pedido</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>Edición Especial de Obsequio</span>
            <SpinningStarAnise size={18} speed="slow" glow={true} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#FFF8EE] mb-2 [text-wrap:balance]">
            Una vista a nuestros protagonistas
          </h2>
          <p className="text-xs sm:text-sm text-[#EBD8C3] leading-relaxed">
            Nuestra selección más emblemática para compartir en estas fiestas: las 6 creaciones tradicionales de DULCITO reunidas en una presentación artesanal inolvidable.
          </p>
        </div>

        {/* Live Preview Panel with Authentic Full Product Family Image */}
        <div className="relative bg-[#160803]/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border-2 border-[#D4AF37]/60 shadow-2xl overflow-hidden">
          {/* Watermark logo in background */}
          <div
            className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full overflow-hidden opacity-10 pointer-events-none select-none mix-blend-screen"
            aria-hidden="true"
          >
            <img
              src="/assets/aistudio/sello_venezolano_gold.png"
              alt=""
              className="w-full h-full object-cover filter contrast-125"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Box Rendering: All Products Christmas Arrangement */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/80 shadow-[0_15px_35px_rgba(0,0,0,0.8)] bg-[#1A0A05] group">
                <img
                  src={ALL_PRODUCTS_CHRISTMAS_IMAGE_URL}
                  alt="Colección Navideña Completa DULCITO con todos los productos"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0502]/95 via-[#1A0A05]/20 to-transparent pointer-events-none" />

                {/* Gold Pill Badge indicating all products */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180A04]/90 border border-[#D4AF37] ring-1 ring-[#FFF3B3]/40 shadow-lg backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-[11px] font-black tracking-wider uppercase text-[#FDE047]">
                    Los 6 Productos Tradicionales
                  </span>
                </div>

                {/* Bottom Label description */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="font-serif font-black text-base sm:text-lg block text-[#FFF8EE]">
                    Colección Familiar DULCITO
                  </span>
                  <span className="text-[#F2DA91] text-xs font-medium block mt-0.5">
                    Ponche crema, dulce de leche tradicional, chocolates árabes, quesillo tradicional, tequeños de queso y pan de jamón.
                  </span>
                </div>
              </div>
            </div>

            {/* Gift Box Details & Composition */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#D4AF37]/30">
                  <Gift className="w-5 h-5 text-[#FDE047]" />
                  <h3 className="font-serif font-bold text-lg text-[#FFF8EE]">
                    Detalles del Obsequio
                  </h3>
                </div>

                {/* Summary list of included products */}
                <div className="space-y-2 text-xs text-[#EBD8C3]">
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">1. Ponche Crema:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Botella de 500 ml, infusionado con especias tradicionales</span>
                  </div>
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">2. Dulce de Leche:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Cocido en paila de cobre a fuego lento</span>
                  </div>
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">3. Chocolates Árabes:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Cacao fino, pistachos y cardamomo</span>
                  </div>
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">4. Quesillo Tradicional:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Huevos, leche, azúcar, ron y corazón</span>
                  </div>
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">5. Tequeños de Queso:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Masa peculiar y queso llanero</span>
                  </div>
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">6. Pan de Jamón:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Sabor a tradición, hecho con amor</span>
                  </div>
                  <div className="flex items-start justify-between pb-1.5 border-b border-[#D4AF37]/20">
                    <span className="text-[#E0CCA7] font-semibold">Presentación:</span>
                    <span className="font-medium text-[#FFF8EE] text-right">Caja a convenir, de madera o acrílica, lazo y mecatillo</span>
                  </div>
                </div>
              </div>

              {/* Dedicated letter card mock in Dark Roasted Cocoa & Gold */}
              <div className="p-4 bg-[#241007] rounded-xl border border-[#D4AF37]/50 relative text-center shadow-md">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#FDE047] mb-1 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Tarjeta Caligrafiada con Sello de Lacre</span>
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#FFF8EE] leading-relaxed">
                  "Con todo nuestro cariño y el recuerdo más dulce de casa... Hecho con amor."
                </p>
                <span className="text-[11px] font-sans text-[#E0CCA7] mt-1.5 block font-medium">
                  — Para la familia y seres queridos
                </span>
              </div>

              {/* Action WhatsApp Contact */}
              <a
                href="https://wa.me/584248830997?text=Hola%20Dulcito,%20quisiera%20consultar%20sobre%20el%20Obsequio%20Familiar%20Navide%C3%B1o%20con%20todos%20los%20productos."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 text-white hover:border-[#FFF8D6] hover:shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Consultar Obsequio por WhatsApp</span>
                <SpinningStarAnise size={18} speed="slow" glow={false} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
