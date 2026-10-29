import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Star, Sparkles, Video, Image as ImageIcon, Check } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductVideoPlayer } from './ProductVideoPlayer';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, initialTab?: 'video' | 'photo') => void;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const hasVideo = Boolean(product.videoUrl);
  // Default to 'photo' for lightning-fast first paint on mobile; users can switch to GIF seamlessly
  const [cardMediaMode, setCardMediaMode] = useState<'video' | 'photo'>('photo');

  useEffect(() => {
    setSelectedVariant(product.variants[0]);
  }, [product.id, product.variants]);

  return (
    <div className="group relative flex flex-col bg-[#1C0D06]/95 backdrop-blur-md rounded-2xl border-2 border-[#D4AF37]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:border-[#FDE047] ring-1 ring-[#FFF3B3]/40 shadow-2xl">
      {/* Media Slot: Video Presentation or Product Photo */}
      {hasVideo ? (
        <div className="relative w-full bg-[#1F0E07]">
          {/* Top Switcher Bar between Video Presentation & Photo */}
          <div className="px-3 py-1.5 bg-[#2D160C] border-b border-[#D4AF37]/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#F2DA91] text-[11px] truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
              <span className="truncate">Presentación en GIF</span>
            </div>

            <div className="inline-flex rounded-lg bg-[#241109] p-0.5 border border-[#4A2516] shrink-0">
              <button
                type="button"
                onClick={() => setCardMediaMode('video')}
                className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 ${
                  cardMediaMode === 'video'
                    ? 'bg-[#E5C158] text-[#241109] shadow-xs'
                    : 'text-[#D9A07E] hover:text-white'
                }`}
              >
                <Video className="w-3 h-3" />
                <span>GIF Animado</span>
              </button>
              <button
                type="button"
                onClick={() => setCardMediaMode('photo')}
                className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 ${
                  cardMediaMode === 'photo'
                    ? 'bg-[#E5C158] text-[#241109] shadow-xs'
                    : 'text-[#D9A07E] hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Foto fija</span>
              </button>
            </div>
          </div>

          {/* Media Viewport */}
          {cardMediaMode === 'video' ? (
            <div className="w-full">
              <ProductVideoPlayer
                videoUrl={product.videoUrl!}
                productName={product.name}
                posterImage={product.image}
                logoUrl={product.logoUrl}
                compact={true}
                interactiveMode="gif-hover"
                onEnlarge={() => onQuickView(product, 'video')}
              />
            </div>
          ) : (
            <div
              className="relative aspect-[4/3] w-full bg-[#1A0A04] overflow-hidden cursor-pointer"
              onClick={() => onQuickView(product, 'photo')}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-600 group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {product.badge && (
                <div className="absolute top-2.5 left-2.5 bg-[#241109]/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#FDE047] border border-[#D4AF37]/70 shadow-md">
                  {product.badge}
                </div>
              )}

              {/* Quick View Button on Photo */}
              <div className="absolute inset-0 bg-[#241109]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product, 'photo');
                  }}
                  aria-label={`Ver detalles de ${product.name}`}
                  className="px-3.5 py-2 text-xs font-bold text-[#241109] bg-gradient-to-r from-[#FFF3B3] via-[#FDE047] to-[#E5C158] border border-[#FFF] rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <Eye className="w-3.5 h-3.5 text-[#241109]" />
                  <span>Ver Receta & Detalles</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Regular Product Card Image Slot */
        <div
          className="relative aspect-[4/3] w-full bg-[#1A0A04] overflow-hidden cursor-pointer"
          onClick={() => onQuickView(product, 'photo')}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-600 group-hover:scale-[1.04]"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {product.badge && (
            <div className="absolute top-2.5 left-2.5 bg-[#241109]/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#FDE047] border border-[#D4AF37]/70 shadow-md">
              {product.badge}
            </div>
          )}

          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-[#241109]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product, 'photo');
              }}
              aria-label={`Ver detalles de ${product.name}`}
              className="px-3.5 py-2 text-xs font-bold text-[#241109] bg-gradient-to-r from-[#FFF3B3] via-[#FDE047] to-[#E5C158] border border-[#FFF] rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Eye className="w-3.5 h-3.5 text-[#241109]" />
              <span>Ver Receta & Detalles</span>
            </button>
          </div>
        </div>
      )}

      {/* Card Body & Metadata in Luxury Chocolate & Gold */}
      <div className="relative p-4 sm:p-5 flex flex-col flex-1 bg-[#1C0D06]/95 overflow-hidden">
        {/* Watermark Logo in Background ("adicional de fondo en marca de agua") */}
        {product.logoUrl && (
          <div
            className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full overflow-hidden opacity-15 pointer-events-none select-none mix-blend-screen transition-all duration-500 group-hover:opacity-25 group-hover:scale-105"
            aria-hidden="true"
          >
            <img
              src={product.logoUrl}
              alt=""
              className="w-full h-full object-cover filter contrast-125"
            />
          </div>
        )}

        {/* Category, Seal and Rating */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#E8D0B5] mb-1.5">
          <div className="flex items-center gap-1.5 truncate">
            {product.logoUrl && (
              <img
                src={product.logoUrl}
                alt=""
                className="w-5 h-5 rounded-full border border-[#D4AF37]/80 object-cover shrink-0 shadow-xs"
              />
            )}
            <span className="uppercase tracking-wider font-bold text-[10px] text-[#FDE047] truncate">
              {product.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#D4AF37] shrink-0">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] stroke-[#B8860B]" />
            <span className="font-bold text-[#FFF8EE] tabular-nums text-xs">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[#CBB096] tabular-nums text-[11px]">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product, hasVideo ? 'video' : 'photo')}
          className="relative z-10 font-serif font-bold text-base sm:text-lg text-[#FFF8EE] group-hover:text-[#FDE047] transition-colors cursor-pointer leading-snug line-clamp-2 mb-1.5"
        >
          {product.name}
        </h3>

        {/* Tagline snippet */}
        <p className="relative z-10 text-xs text-[#D9C2AA] line-clamp-2 leading-relaxed mb-3 flex-1">
          {product.tagline}
        </p>

        {/* Video presentation highlight pill */}
        {product.videoCaption && (
          <div className="relative z-10 mb-3 px-2.5 py-1 bg-[#261007]/90 rounded-lg border border-[#D4AF37]/50 text-[11px] font-medium text-[#FDE047] flex items-center gap-1.5">
            <span className="text-[#FDE047] shrink-0">✨</span>
            <span className="truncate font-serif italic text-[#FFF4C2]">
              GIF animado (Pasa el cursor o toca para reproducir)
            </span>
          </div>
        )}

        {/* Presentation Selector for products with multiple presentations */}
        {product.variants.length > 1 && (
          <div className="relative z-10 mb-3 pt-2.5 border-t border-[#D4AF37]/25">
            <div className="text-[10px] uppercase tracking-wider font-bold text-[#E5C158] mb-1.5 flex items-center justify-between">
              <span>Elige presentación:</span>
              <span className="text-[10px] font-normal text-[#CBB096] capitalize truncate max-w-[120px]">
                {selectedVariant.name}
              </span>
            </div>
            <div className={`grid gap-1.5 ${product.variants.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariant(v);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-left transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#3D1A0D] to-[#4A2010] border-[#FDE047] text-[#FFF8EE] shadow-sm ring-1 ring-[#FDE047]/60'
                        : 'bg-[#241007]/80 border-[#D4AF37]/35 text-[#D9C2AA] hover:border-[#E5C158]/80 hover:bg-[#2D150B]'
                    }`}
                  >
                    <span className="text-[11px] font-bold truncate block">
                      {v.size}
                    </span>
                    <span
                      className={`text-[10px] font-semibold tabular-nums mt-0.5 ${
                        isSelected ? 'text-[#FDE047]' : 'text-[#CBB096]'
                      }`}
                    >
                      ${v.price.toFixed(2)} USD
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="relative z-10 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-[11px] text-[#CBB096] truncate max-w-[150px]">
              {selectedVariant.size}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-[#FFF8EE] tabular-nums">
                ${selectedVariant.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-[#E5C158]">USD</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, selectedVariant)}
            aria-label={`Añadir ${product.name} (${selectedVariant.size}) a la cesta`}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 rounded-xl hover:border-[#FFF8D6] hover:shadow-[0_4px_16px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
