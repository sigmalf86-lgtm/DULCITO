import React, { useState } from 'react';
import { Heart, Quote, Sparkles } from 'lucide-react';
import { SpinningStarAnise } from './SpinningStarAnise';
import { MetallicRedHeart } from './BrandLogo';
import { NOSTALGIA_STORIES } from '../data/products';

const STORY_IMAGE_1 = '/assets/aistudio/Gemini_Generated_Image_2bacpu2bacpu2bac_f2d7880d.jpg';
const STORY_IMAGE_2 = '/assets/aistudio/Gemini_Generated_Image_2bacpu2bacpu2bac_1__8d3a19ff.jpg';

export const StorySection: React.FC = () => {
  const [heartPulsing, setHeartPulsing] = useState(false);

  const handleHeartClick = () => {
    setHeartPulsing(true);
    setTimeout(() => setHeartPulsing(false), 700);
  };

  return (
    <section id="historia" className="py-6 sm:py-10 bg-transparent border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-6">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#FDE047] mb-1.5">
              <SpinningStarAnise size={16} speed="slow" glow={true} />
              <span>Nuestra Raíz & Añoranza</span>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span>Memoria Gastronómica</span>
            </div>

            {/* Heading with interactive metallic red heart from the top logo */}
            <div className="mb-3">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#FFF8EE] leading-tight [text-wrap:balance] inline">
                No es solo tradición, es la nostalgia del sabor.
              </h2>
              <span
                onClick={handleHeartClick}
                className={`inline-flex items-center align-middle ml-2.5 p-1 rounded-full cursor-pointer transition-all duration-300 ${
                  heartPulsing
                    ? 'scale-135 rotate-6 drop-shadow-[0_0_15px_rgba(255,40,60,0.9)]'
                    : 'hover:scale-120 active:scale-95'
                }`}
                title="Hecho con amor (Toca el corazón)"
              >
                <MetallicRedHeart size={34} glow={true} />
              </span>
            </div>

            {/* Paragraphs with exact requested story */}
            <p className="text-xs sm:text-sm text-[#EBD8C3] leading-relaxed mb-3">
              Dulcito nació en una cocina impregnada del aroma a hogar, canela y anís estrellado. Nace de la determinación de un venezolano por salir adelante, honrando con amor las enseñanzas de su madre.
            </p>

            <p className="text-xs sm:text-sm text-[#EBD8C3] leading-relaxed mb-3">
              Para quienes están lejos, probar su dulce de leche o servir un ponche crema frío es un viaje directo a los abrazos de diciembre, a las risas compartidas y al sabor entrañable de la infancia.
            </p>

            <p className="text-xs sm:text-sm text-[#FDE047] font-medium italic leading-relaxed mb-4">
              Disfruta de nuestras recetas que están hechas con amor...
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 bg-[#241007] px-3.5 py-2 rounded-xl border border-[#D4AF37]/60 text-[#FDE047] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FDE047]" />
                <span className="text-[#FFF8EE]">Recetas de herencia familiar</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#241007] px-3.5 py-2 rounded-xl border border-[#D4AF37]/60 text-[#FDE047] shadow-sm">
                <MetallicRedHeart size={18} />
                <span className="text-[#FFF8EE]">Elaboración 100% Artesanal</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/50 bg-[#1A0A05] group">
                <img
                  src={STORY_IMAGE_1}
                  alt="Ponche Crema Tradicional, Dulce de Leche y Chocolates Árabes DULCITO"
                  className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-[#180A04]/95 rounded-xl border-2 border-[#D4AF37]/50 text-xs text-[#EBD8C3] shadow-md">
                <span className="font-serif font-bold text-[#FFF8EE] block mb-1">Paila & Madera</span>
                Batido ininterrumpido durante horas para lograr el cuerpo denso sin espesantes químicos.
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 bg-gradient-to-br from-[#241007] to-[#34160A] text-[#FFF8EE] rounded-xl border-2 border-[#D4AF37]/50 text-xs shadow-md">
                <span className="font-serif font-bold text-sm block mb-1 text-[#FDE047]">El Secreto del Ron</span>
                Utilizamos ron venezolano añejado en barricas de roble blanco para una calidez redonda y especiada.
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/50 bg-[#1A0A05] group">
                <img
                  src={STORY_IMAGE_2}
                  alt="Pan de Jamón Navideño, Quesillo Criollo y Tequeños Artesanales DULCITO"
                  className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nostalgia Testimonials / Guestbook in Luxury Dark Chocolate */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-[#FFF8EE]">
                Voces de Nuestra Mesa
              </h3>
              <SpinningStarAnise size={20} speed="slow" glow={true} />
            </div>
            <p className="text-xs sm:text-sm text-[#E0CCA7]">
              Historias reales de personas que volvieron a casa en un bocado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NOSTALGIA_STORIES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#180A04]/95 p-5 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-xl flex flex-col justify-between hover:border-[#FDE047] transition-all"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#FDE047] mb-3" />
                  <p className="text-xs sm:text-sm text-[#EBD8C3] italic leading-relaxed mb-4">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#FFF8EE]">
                      {item.author}
                    </h4>
                    <span className="text-[11px] text-[#E0CCA7]">
                      {item.location}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#261007] border border-[#D4AF37]/60 text-[#FDE047] px-2.5 py-1 rounded-md">
                    {item.favorite}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
