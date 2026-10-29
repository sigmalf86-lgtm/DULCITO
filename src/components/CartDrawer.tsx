import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { SpinningStarAnise } from './SpinningStarAnise';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const BOTTLE_TIER = 50.00;
  const earnedBottles = Math.floor(subtotal / BOTTLE_TIER);
  const remainder = subtotal % BOTTLE_TIER;

  // When subtotal is 0: needed is $50.00, progress is 0%
  // When subtotal is 50: earned 1 bottle, needed for 2nd is $50.00, progress is 0%
  // When subtotal is 55: earned 1 bottle, needed for 2nd is $45.00, progress is 10%
  const neededForNext = remainder === 0
    ? BOTTLE_TIER
    : Number((BOTTLE_TIER - remainder).toFixed(2));

  const progressPercent = subtotal === 0
    ? 0
    : (remainder === 0 ? 0 : Math.min(100, (remainder / BOTTLE_TIER) * 100));

  const getOrdinal = (n: number) => {
    switch (n) {
      case 1: return 'primera';
      case 2: return 'segunda';
      case 3: return 'tercera';
      case 4: return 'cuarta';
      case 5: return 'quinta';
      default: return `${n}ª`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#241109]/65 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col border-l-2 border-[#D4AF37]/50 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Spinning Star Anise */}
        <div className="p-5 border-b border-[#E8DAC7] flex items-center justify-between bg-gradient-to-r from-[#FAF3E0] to-[#FDF3EC]">
          <div className="flex items-center gap-2.5">
            <SpinningStarAnise size={22} speed="slow" />
            <div>
              <h2 className="font-serif font-black text-lg text-[#361B10]">
                Tu Cesta ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </h2>
              <span className="text-[11px] font-serif italic text-[#B84A28]">Selección Artesanal</span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar cesta"
            className="w-8 h-8 rounded-full border border-[#D5BEA4] flex items-center justify-center text-[#5A2C18] hover:bg-[#FBECE3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tiered Free Ponche Crema Bottle Banner */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#FAF3E0] via-[#FDF3EC] to-[#FAF3E0] border-b border-[#E5CEBA] text-xs text-[#5A2C18]">
          <div className="flex items-start justify-between mb-2 gap-2">
            <div className="flex items-start gap-2 text-[#361B10] leading-snug">
              <span className="p-1 rounded-md bg-[#D4AF37]/25 text-[#8C5E28] shrink-0 mt-0.5">
                <Gift className="w-4 h-4 text-[#B84A28]" />
              </span>
              <div>
                {earnedBottles === 0 ? (
                  <p className="font-bold text-[#361B10]">
                    ¡Faltan <span className="text-[#B84A28] font-black">${neededForNext.toFixed(2)}</span> para tu{' '}
                    <span className="text-[#8C5E28] font-bold">Botella de ponche Gratis!</span>
                  </p>
                ) : (
                  <div>
                    <p className="font-black text-[#2E7D32]">
                      ¡Ya tienes {earnedBottles} {earnedBottles === 1 ? 'botella' : 'botellas'} de ponche gratis!
                    </p>
                    <p className="font-medium text-[#5A2C18] text-[11px] mt-0.5">
                      Faltan <span className="text-[#B84A28] font-black">${neededForNext.toFixed(2)}</span> para la{' '}
                      <span className="font-bold text-[#8C5E28]">{getOrdinal(earnedBottles + 1)}</span> botella de ponche gratis.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <span className="font-black tabular-nums text-[#8C5E28] shrink-0 text-[11px] bg-white/90 px-2 py-0.5 rounded-full border border-[#E5CEBA] shadow-2xs">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full bg-[#EAD5C3] rounded-full h-2.5 overflow-hidden shadow-inner p-0.5">
            <div
              className="bg-gradient-to-r from-[#D4AF37] via-[#E5A93C] to-[#C86438] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#7A4022]">
              <div className="w-16 h-16 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 flex items-center justify-center mb-4 text-[#D4AF37]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-black text-lg text-[#361B10] mb-1">
                Tu cesta está vacía
              </h3>
              <p className="text-xs text-[#7A4022] max-w-xs mb-5">
                Descubre el auténtico ponche crema y nuestros dulces tradicionales recién preparados.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gradient-to-r from-[#361B10] to-[#4A2516] text-white rounded-xl text-xs font-bold hover:shadow-md transition-all"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.variant.id}-${index}`}
                className="flex gap-3.5 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DAC7] shadow-xs relative group"
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-xl bg-[#FBF5EB] overflow-hidden shrink-0 border border-[#E5CEBA]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[#361B10] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-[#7A4022] mt-0.5">
                    {item.variant.name} ({item.variant.size})
                  </div>

                  {item.customNote && (
                    <div className="mt-1 text-[11px] text-[#B84A28] italic line-clamp-1 bg-[#FAF3E0] px-2 py-0.5 rounded-md border border-[#D4AF37]/40">
                      Nota: "{item.customNote}"
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#D5BEA4] rounded-lg bg-[#FAF6F0]">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#5A2C18] hover:bg-[#FBECE3]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-black text-[#361B10] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#5A2C18] hover:bg-[#FBECE3]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-black text-sm text-[#361B10] tabular-nums">
                      ${(item.variant.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => onRemoveItem(index)}
                  aria-label="Eliminar producto"
                  className="text-[#A47F65] hover:text-[#C62828] p-1 transition-colors self-start"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8DAC7] bg-[#FAF3E0]/70">
            <div className="flex items-center justify-between mb-2 text-xs text-[#7A4022]">
              <span>Subtotal</span>
              <span className="font-bold text-[#361B10] text-sm tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {earnedBottles > 0 && (
              <div className="flex items-center justify-between mb-2 text-xs bg-[#FAF3E0] px-3 py-2 rounded-xl border border-[#D4AF37]/60 shadow-2xs">
                <span className="flex items-center gap-1.5 font-bold text-[#361B10]">
                  <Gift className="w-3.5 h-3.5 text-[#B84A28]" />
                  Obsequio Dulcito:
                </span>
                <span className="font-black text-[#2E7D32]">
                  {earnedBottles} {earnedBottles === 1 ? 'Botella GRATIS' : 'Botellas GRATIS'}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-4 text-xs text-[#7A4022]">
              <span>Envío</span>
              <span className="font-bold text-[#361B10]">
                {subtotal >= 50 ? (
                  <span className="text-[#2E7D32]">¡Gratis!</span>
                ) : (
                  'Calculado al finalizar'
                )}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#361B10] via-[#4A2516] to-[#361B10] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>Continuar al Pago</span>
              <ArrowRight className="w-4 h-4 text-[#E5C158]" />
            </button>
            <p className="text-[11px] text-center text-[#8F4828] mt-2 font-medium">
              Aceptamos Pago Movil, Crixto, Binance, Airtm , Efectivo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
