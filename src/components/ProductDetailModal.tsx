import React, { useState } from 'react';
import { X, ShoppingBag, Star, Check, Sparkles, Video, Image as ImageIcon } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { SpinningStarAnise } from './SpinningStarAnise';
import { ProductVideoPlayer } from './ProductVideoPlayer';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant : ProductVariant, quantity: number) => void;
  initialMediaTab?: 'video' | 'photo';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  initialMediaTab = 'video',
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const hasVideo = Boolean(product?.videoUrl);
  const [mediaTab, setMediaTab] = useState<'video' | 'photo'>(
    hasVideo ? (initialMediaTab || 'video') : 'photo'
  );

  React.useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      setMediaTab(product.videoUrl ? (initialMediaTab || 'video') : 'photo');
    }
  }, [product, initialMediaTab]);

  if (!product || !selectedVariant) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A0A04]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#FAF6F0] rounded-2xl border-2 border-[#D4AF37]/70 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden text-[#361B10] my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle watermark logo in background */}
        {product.logoUrl && (
          <div
            className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full overflow-hidden opacity-10 pointer-events-none select-none mix-blend-multiply"
            aria-hidden="true"
          >
            <img
              src={product.logoUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalles del producto"
          className="absolute top-3.5 right-3.5 z-20 w-8.5 h-8.5 rounded-full bg-[#FAF6F0]/90 border border-[#E5CEBA] flex items-center justify-center text-[#5A2C18] hover:text-[#361B10] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-[92vh]">
          {/* Image & Video Presentation Column */}
          <div className="relative bg-[#FBF5EB] p-4 sm:p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-[#E8DAC7]">
            {hasVideo ? (
              <div className="w-full flex flex-col items-center">
                {/* Media mode switch buttons */}
                <div className="inline-flex rounded-xl bg-[#FAF3E0] p-1 border border-[#D4AF37]/50 mb-3 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setMediaTab('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      mediaTab === 'video'
                        ? 'bg-[#361A0C] text-[#F2DA91] shadow-sm'
                        : 'text-[#8F4828] hover:text-[#361A0C]'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>🎬 Spot Oficial en Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaTab('photo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      mediaTab === 'photo'
                        ? 'bg-[#361A0C] text-[#F2DA91] shadow-sm'
                        : 'text-[#8F4828] hover:text-[#361A0C]'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>📸 Fotografía</span>
                  </button>
                </div>

                {mediaTab === 'video' ? (
                  <div className="w-full rounded-xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/60">
                    <ProductVideoPlayer
                      videoUrl={product.videoUrl!}
                      productName={product.name}
                      posterImage={product.image}
                      logoUrl={product.logoUrl}
                      compact={false}
                      interactiveMode="modal-full"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] max-h-[280px] sm:max-h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-[#D4AF37]/50 bg-[#1A0A04] flex items-center justify-center p-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain object-center drop-shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    {product.badge && (
                      <div className="absolute top-2.5 left-2.5 bg-[#FDF3EC]/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#9E4420] border border-[#E5B59E] shadow-sm">
                        {product.badge}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] max-h-[280px] sm:max-h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-[#D4AF37]/50 bg-[#1A0A04] flex items-center justify-center p-2.5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-2.5 left-2.5 bg-[#FDF3EC]/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#9E4420] border border-[#E5B59E] shadow-sm">
                    {product.badge}
                  </div>
                )}
              </div>
            )}

            {/* Serving Tip Snippet */}
            <div className="mt-3.5 p-3 w-full bg-[#FDF3EC] rounded-xl border border-[#E5B59E] text-xs text-[#7A4022]">
              <div className="font-bold text-[#361B10] flex items-center gap-1.5 mb-1">
                <SpinningStarAnise size={15} speed="slow" glow={false} />
                <span>Cómo degustar:</span>
              </div>
              <p className="leading-relaxed">{product.servingSuggestion}</p>
            </div>
          </div>

          {/* Details & Purchase Contiguous Module */}
          <div className="relative z-10 p-5 sm:p-7 flex flex-col max-h-[85vh] overflow-y-auto">
            {/* Logo Badge & Rating (No redundant red text) */}
            <div className="flex items-center justify-between text-xs text-[#8F4828] mb-2 pb-1.5 border-b border-[#E8DAC7]/60">
              <div className="flex items-center gap-2">
                {product.logoUrl && (
                  <img
                    src={product.logoUrl}
                    alt=""
                    className="w-6 h-6 rounded-full border-2 border-[#D4AF37] object-cover shrink-0 shadow-xs"
                  />
                )}
                <span className="font-serif italic text-xs text-[#8F4828] font-semibold">
                  Sello Oficial DULCITO
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] stroke-[#B8860B]" />
                <span className="font-bold text-[#361B10] tabular-nums text-sm">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#8F4828] tabular-nums text-xs">
                  ({product.reviewsCount} opiniones)
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#361B10] leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Product Description */}
            <p className="text-xs sm:text-sm text-[#5A2C18] leading-relaxed mb-4 font-medium">
              {product.description || product.tagline}
            </p>

            {/* NOTAS DE CATACIÓN */}
            <div className="mb-5 p-4 bg-[#FAF3E0] rounded-xl border border-[#D4AF37]/60 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#361B10] block mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>NOTAS DE CATACIÓN</span>
              </span>
              <div className="space-y-2 text-xs text-[#5A2C18]">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#B84A28] shrink-0">Textura:</span>
                  <span>{product.tastingNotes.texture}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#B84A28] shrink-0">Identidad:</span>
                  <span>{product.tastingNotes.identity || product.tastingNotes.finish}</span>
                </div>
              </div>
            </div>

            {/* Presentation Selector */}
            <div className="mb-5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#361B10] block mb-2">
                Presentación / Tamaño
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#FAF3E0] shadow-sm ring-1 ring-[#D4AF37]'
                          : 'border-[#E8DAC7] bg-[#FAF7F2] hover:bg-[#FDF3EC] text-[#5A2C18]'
                      }`}
                    >
                      <div className="font-bold text-[#361B10]">{v.size}</div>
                      <div className="text-[11px] text-[#7A4022] truncate">{v.name}</div>
                      <div className="text-xs font-bold text-[#B84A28] tabular-nums mt-0.5">
                        ${v.price.toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Buy Bar */}
            <div className="pt-4 border-t border-[#E8DAC7] mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#361B10]">
                  Cantidad
                </span>
                <div className="flex items-center border border-[#D5BEA4] rounded-lg bg-[#FAF6F0] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-[#5A2C18] hover:bg-[#EBDCC8] disabled:opacity-30 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#361B10] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#5A2C18] hover:bg-[#EBDCC8] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8F4828] uppercase tracking-wider font-semibold">Total</span>
                  <span className="text-xl font-serif font-bold text-[#361B10] tabular-nums">
                    ${(selectedVariant.price * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    addedAnimation
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-gradient-to-r from-[#361B10] via-[#4A2516] to-[#361B10] border border-[#D4AF37]/50 text-white hover:border-[#D4AF37] active:scale-[0.99]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Añadido a la Cesta!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
                      <span>Añadir a la Cesta</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
