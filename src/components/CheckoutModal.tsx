import React, { useState } from 'react';
import { X, Check, MessageCircle, ShieldCheck, Truck, CreditCard, ArrowRight, Gift, Copy, AlertCircle } from 'lucide-react';
import { CartItem, OrderCustomerInfo, PlacedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('pago_movil');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyBankData = (text: string, bankKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankKey);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  // El empaque acolchado para envíos grandes corre por cuenta del vendedor (sin recargo al cliente)
  const shipping = 0;
  const total = subtotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `DLC-${randomSuffix}`;

    const placedOrder: PlacedOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...items],
      subtotal,
      shipping,
      total,
      status: 'preparando',
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        city: city.trim(),
        notes: notes.trim(),
        paymentMethod,
      },
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderCompleted(placedOrder);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#26150C]/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-[#FAF5EC] rounded-2xl border border-[#E3D4C0] shadow-2xl max-w-2xl w-full overflow-hidden text-[#3D2214]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DAC7] bg-[#F4ECDF] flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#3D2214]">
              Finalizar tu Pedido
            </h2>
            <p className="text-xs text-[#78543E] mt-0.5">
              Datos de contacto y entrega
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de pago"
            className="w-8 h-8 rounded-full border border-[#D5BEA4] flex items-center justify-center text-[#5A3822] hover:bg-[#EBDCC8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Customer info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2214] mb-3">
              1. Datos de Contacto y Entrega
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-semibold text-[#5A3822] block mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5BEA4] bg-white text-xs sm:text-sm text-[#3D2214] focus:outline-none focus:ring-2 focus:ring-[#C26D2B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#5A3822] block mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+58 424 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5BEA4] bg-white text-xs sm:text-sm text-[#3D2214] focus:outline-none focus:ring-2 focus:ring-[#C26D2B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-[#5A3822] block mb-1">
                  Correo Electrónico (Para recibir comprobante)
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5BEA4] bg-white text-xs sm:text-sm text-[#3D2214] focus:outline-none focus:ring-2 focus:ring-[#C26D2B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-[#5A3822] block mb-1">
                  Dirección de Entrega Exacta *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Calle, Edificio/Casa, Piso o Punto de referencia"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5BEA4] bg-white text-xs sm:text-sm text-[#3D2214] focus:outline-none focus:ring-2 focus:ring-[#C26D2B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#5A3822] block mb-1">
                  Ciudad / Municipio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Caracas, Valencia, San Cristóbal"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5BEA4] bg-white text-xs sm:text-sm text-[#3D2214] focus:outline-none focus:ring-2 focus:ring-[#C26D2B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#5A3822] block mb-1">
                  Instrucciones o Dedicatoria (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Dejar en conserjería / Tocar timbre"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5BEA4] bg-white text-xs sm:text-sm text-[#3D2214] focus:outline-none focus:ring-2 focus:ring-[#C26D2B]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D2214] mb-3">
              2. Método de Pago Preferido
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'pago_movil',
                  name: 'Pago Móvil (Bs. Tasa Oficial)',
                  desc: 'Mercantil (0105) y BNC (0191)',
                  icon: <CreditCard className="w-4 h-4 text-[#B8621B]" />,
                },
                {
                  id: 'crixto',
                  name: 'Crixto',
                  desc: 'alfredovas60@gmail.com',
                  icon: <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />,
                },
                {
                  id: 'binance',
                  name: 'Binance Pay',
                  desc: 'alfredovas60@gmail.com',
                  icon: <CreditCard className="w-4 h-4 text-[#E5A93C]" />,
                },
                {
                  id: 'airtm',
                  name: 'Airtm',
                  desc: 'alfredovas60@gmail.com',
                  icon: <ShieldCheck className="w-4 h-4 text-[#0066FF]" />,
                },
                {
                  id: 'cash',
                  name: 'Efectivo contra Entrega',
                  desc: 'Pagas al recibir tu paquete sellado.',
                  icon: <Truck className="w-4 h-4 text-[#78543E]" />,
                },
                {
                  id: 'whatsapp',
                  name: 'Acordar vía WhatsApp',
                  desc: 'Coordinamos los detalles en el chat.',
                  icon: <MessageCircle className="w-4 h-4 text-[#2E7D32]" />,
                },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === method.id
                      ? 'border-[#B8621B] bg-[#F7EFE2] shadow-sm ring-1 ring-[#B8621B]'
                      : 'border-[#E8DAC7] bg-[#FAF7F2] hover:bg-[#F3E9DB] text-[#5A3822]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {method.icon}
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#3D2214]">
                      {method.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#78543E] leading-snug">{method.desc}</p>
                </button>
              ))}
            </div>

            {/* Active Payment Method Details Box */}
            {paymentMethod === 'pago_movil' && (
              <div className="mt-3.5 p-4 rounded-xl border border-[#D5BEA4] bg-[#F7EFE2] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#B8621B]" />
                    <span className="font-serif font-bold text-xs text-[#3D2214]">
                      Cuentas Pago Móvil (Tasa Oficial BCV)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#78543E] bg-[#EFE4D4] px-2 py-0.5 rounded-full font-medium">
                    Mercantil y BNC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {/* Mercantil */}
                  <div className="p-3 bg-white/95 rounded-lg border border-[#E3D4C0] space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#B8621B] text-[11px] uppercase tracking-wide">
                        0105 • Mercantil
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyBankData('0105 / 04248830997 / 17320644', 'mercantil')}
                        className="text-[10px] text-[#5A3822] hover:text-[#3D2214] font-medium flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F0E6D8] px-2 py-0.5 rounded border border-[#DECDB8] transition-colors"
                      >
                        {copiedBank === 'mercantil' ? (
                          <>
                            <Check className="w-3 h-3 text-[#2E7D32]" />
                            <span className="text-[#2E7D32]">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="space-y-0.5 text-[#5A3822] text-[11px]">
                      <p><strong className="text-[#3D2214]">Banco:</strong> 0105 (Mercantil)</p>
                      <p><strong className="text-[#3D2214]">Teléfono:</strong> 04248830997</p>
                      <p><strong className="text-[#3D2214]">C.I.:</strong> 17320644</p>
                    </div>
                  </div>

                  {/* BNC */}
                  <div className="p-3 bg-white/95 rounded-lg border border-[#E3D4C0] space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#B8621B] text-[11px] uppercase tracking-wide">
                        0191 • BNC
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyBankData('0191 / 04145089082 / 17320644', 'bnc')}
                        className="text-[10px] text-[#5A3822] hover:text-[#3D2214] font-medium flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F0E6D8] px-2 py-0.5 rounded border border-[#DECDB8] transition-colors"
                      >
                        {copiedBank === 'bnc' ? (
                          <>
                            <Check className="w-3 h-3 text-[#2E7D32]" />
                            <span className="text-[#2E7D32]">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="space-y-0.5 text-[#5A3822] text-[11px]">
                      <p><strong className="text-[#3D2214]">Banco:</strong> 0191 (Banco Nac. de Crédito)</p>
                      <p><strong className="text-[#3D2214]">Teléfono:</strong> 04145089082</p>
                      <p><strong className="text-[#3D2214]">C.I.:</strong> 17320644</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-[#78543E] italic">
                  * Puedes pagar en cualquiera de las dos cuentas. Envíanos el capture o referencia al finalizar tu pedido.
                </p>
              </div>
            )}

            {(paymentMethod === 'crixto' || paymentMethod === 'binance' || paymentMethod === 'airtm') && (
              <div className="mt-3.5 p-4 rounded-xl border border-[#D5BEA4] bg-[#F7EFE2] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B8621B]" />
                    <span className="font-serif font-bold text-xs text-[#3D2214]">
                      Cuenta para {paymentMethod === 'crixto' ? 'Crixto' : paymentMethod === 'binance' ? 'Binance Pay' : 'Airtm'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyBankData('alfredovas60@gmail.com', paymentMethod)}
                    className="text-[10px] text-[#5A3822] hover:text-[#3D2214] font-medium flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F0E6D8] px-2.5 py-1 rounded border border-[#DECDB8] transition-colors"
                  >
                    {copiedBank === paymentMethod ? (
                      <>
                        <Check className="w-3 h-3 text-[#2E7D32]" />
                        <span className="text-[#2E7D32]">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar correo</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 bg-white/95 rounded-lg border border-[#E3D4C0] flex items-center justify-between text-xs">
                  <span className="text-[#5A3822]">Correo receptor:</span>
                  <span className="font-mono font-bold text-[#3D2214] select-all">alfredovas60@gmail.com</span>
                </div>
                <p className="text-[10px] text-[#78543E] italic">
                  * Envía tu pago al correo indicado y te confirmaremos vía WhatsApp al recibirlo.
                </p>
              </div>
            )}

            {/* Eye-catching Banner for Payment Proof & Motive */}
            <div className="mt-3.5 p-3.5 sm:p-4 bg-gradient-to-r from-[#FFF4DB] via-[#FFEBB8] to-[#FFDFC2] rounded-xl border-2 border-[#D48806] shadow-sm flex items-start gap-3 text-xs text-[#3D2214]">
              <div className="p-2 bg-[#D48806] text-white rounded-lg shrink-0 shadow-xs mt-0.5">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 bg-[#B84A28] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-2xs">
                  ⚠️ Aviso Muy Importante
                </span>
                <p className="font-extrabold text-[#3D2214] text-xs sm:text-[13px] leading-snug">
                  Enviar comprobantes de pago y el motivo de ese pago por vía WhatsApp para ser procesados.
                </p>
                <p className="text-[11px] text-[#6B3E1F] leading-tight">
                  Al confirmar tu pedido podrás abrir el WhatsApp oficial (+58 424-8830997) para enviar tu captura o referencia bancaria y agilizar tu entrega.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Strip */}
          <div className="p-4 bg-[#F4ECDF] rounded-xl border border-[#E3D4C0] space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#5A3822]">
              <span>Productos ({items.reduce((acc, it) => acc + it.quantity, 0)})</span>
              <span className="font-semibold tabular-nums text-[#3D2214]">${subtotal.toFixed(2)}</span>
            </div>
            {Math.floor(subtotal / 50) > 0 && (
              <div className="p-2.5 bg-gradient-to-r from-[#FFF9EE] to-[#FAF1DE] rounded-xl border border-[#D4AF37] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-[#8C5E28]">
                    <Gift className="w-3.5 h-3.5 text-[#B84A28]" />
                    Obsequio por volumen (${subtotal.toFixed(2)}):
                  </span>
                  <span className="font-black text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded text-[11px]">
                    {Math.floor(subtotal / 50)}x Ponche GRATIS
                  </span>
                </div>
                <p className="text-[10px] text-[#5A3822] leading-tight">
                  🚨 <strong>Instrucción de despacho:</strong> Se incluirán {Math.floor(subtotal / 50)} {Math.floor(subtotal / 50) === 1 ? 'botella de Ponche Crema de regalo' : 'botellas de Ponche Crema de regalo'} en este paquete (1 por cada $50 consumidos).
                </p>
              </div>
            )}
            <div className="flex items-center justify-between text-[#5A3822]">
              <div className="flex flex-col">
                <span className="font-semibold text-[#3D2214]">Envío y Despacho</span>
                <span className="text-[10px] text-[#2E7D32]">
                  Empaque acolchado para envíos grandes corre por cuenta del vendedor
                </span>
              </div>
              <span className="font-black text-[#2E7D32]">¡Gratis!</span>
            </div>
            <div className="pt-2 border-t border-[#DFCDBC] flex items-center justify-between font-serif font-bold text-base text-[#3D2214]">
              <span>Total a Pagar</span>
              <span className="tabular-nums text-xl text-[#B8621B]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#5A3822] hover:text-[#3D2214] transition-colors"
            >
              Regresar a la Cesta
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 bg-[#3D2214] hover:bg-[#26150C] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C26D2B]"
            >
              {isSubmitting ? (
                <span>Procesando...</span>
              ) : (
                <>
                  <span>Confirmar Pedido</span>
                  <ArrowRight className="w-4 h-4 text-[#EBDCC8]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
