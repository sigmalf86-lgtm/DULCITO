import React, { useState } from 'react';
import { 
  Check, 
  MessageCircle, 
  Copy, 
  ArrowRight, 
  Heart, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { PlacedOrder } from '../types';
import { NewAppBadgeLogo } from './BrandLogo';
import { FireworksCelebration } from './FireworksCelebration';

export type OrderTrackingStage = 'preparando' | 'en_camino' | 'entregado';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [trackingStage, setTrackingStage] = useState<OrderTrackingStage>(order?.status || 'preparando');
  const [fireworksKey, setFireworksKey] = useState<number>(1);
  const [showFireworks, setShowFireworks] = useState<boolean>(true);

  if (!order) return null;

  const trackingStagesList = [
    {
      id: 'preparando' as const,
      label: 'Preparando',
      stepNumber: 1,
      icon: Package,
      statusBadge: 'En Taller Artesanal',
      badgeClass: 'bg-[#FFF3D6] text-[#9A5B18] border-[#E8C589]',
      description: 'Nuestros maestros artesanos están elaborando tu pedido fresco, embotellando y atando a mano el clásico lazo de mecatillo con canela y estrellas de anís.',
      note: 'En preparación en taller (Hoy)',
    },
    {
      id: 'en_camino' as const,
      label: 'En camino',
      stepNumber: 2,
      icon: Truck,
      statusBadge: 'Despacho en Tránsito',
      badgeClass: 'bg-[#EBF5FB] text-[#1B6F9A] border-[#A8D3EB]',
      description: `Tu paquete ha salido del taller protegido en caja acolchada y sellada, en ruta de entrega hacia ${order.customer.city || 'tu destino'}.`,
      note: 'Despacho activo con chofer asignado',
    },
    {
      id: 'entregado' as const,
      label: 'Entregado',
      stepNumber: 3,
      icon: CheckCircle2,
      statusBadge: '¡Entregado con Éxito!',
      badgeClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]',
      description: '¡Tu pedido artesanal ha sido entregado en tus manos! Recuerda agitar bien tu botella de Ponche Crema antes de degustar y mantenerla bien fría.',
      note: '¡Gracias por compartir nuestras tradiciones!',
    },
  ];

  const activeStageObj = trackingStagesList.find((s) => s.id === trackingStage) || trackingStagesList[0];

  const handleCopyBank = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const earnedBottles = Math.floor(order.subtotal / 50);

  // WhatsApp message generator
  const composeWhatsAppMessage = () => {
    let msg = `*PEDIDO DULCITO - ${order.orderNumber}*\n`;

    // Prominent vendor and dispatch alert for gift bottles earned by purchase volume
    if (earnedBottles > 0) {
      msg += `\n🚨 *ALERTA DE DESPACHO / VENDEDOR:*`;
      msg += `\n🎁 *OBSEQUIO POR VOLUMEN DE PEDIDO ($${order.subtotal.toFixed(2)}):*`;
      msg += `\n👉 *ENTREGAR AL CLIENTE:* ${earnedBottles}x ${earnedBottles === 1 ? 'Botella' : 'Botellas'} de Ponche Crema Tradicional *TOTALMENTE GRATIS* (1 gratis por cada $50 consumidos).`;
      msg += `\n⚠️ *INSTRUCCIÓN OBLIGATORIA:* Embalar e incluir las ${earnedBottles} ${earnedBottles === 1 ? 'botella de obsequio' : 'botellas de obsequio'} en este despacho.\n\n`;
    } else {
      msg += `\n`;
    }

    msg += `👤 *Cliente:* ${order.customer.fullName}\n`;
    msg += `📞 *Teléfono:* ${order.customer.phone}\n`;
    msg += `📍 *Dirección:* ${order.customer.address}, ${order.customer.city}\n`;
    msg += `📍 *Estado de Seguimiento:* ${activeStageObj.label} (${activeStageObj.statusBadge})\n`;
    if (order.customer.notes) {
      msg += `📝 *Nota:* ${order.customer.notes}\n`;
    }
    const paymentNames: Record<string, string> = {
      pago_movil: 'Pago Móvil (Bs. Tasa Oficial)',
      crixto: 'Crixto',
      binance: 'Binance Pay',
      airtm: 'Airtm',
      cash: 'Efectivo contra Entrega',
      whatsapp: 'Acordar vía WhatsApp',
      zelle: 'Zelle / Transferencia USD',
    };
    msg += `💳 *Método de Pago:* ${paymentNames[order.customer.paymentMethod] || order.customer.paymentMethod}\n`;

    if (order.customer.paymentMethod === 'pago_movil') {
      msg += `📲 *Cuentas Pago Móvil Disponibles:*\n`;
      msg += `• *Mercantil (0105):* Teléfono: 04248830997 | C.I.: 17320644\n`;
      msg += `• *BNC (0191):* Teléfono: 04145089082 | C.I.: 17320644\n\n`;
    } else if (['crixto', 'binance', 'airtm'].includes(order.customer.paymentMethod)) {
      msg += `📲 *Cuenta de Pago:* alfredovas60@gmail.com\n\n`;
    } else {
      msg += `\n`;
    }

    msg += `📦 *Detalle del Pedido:*\n`;

    order.items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.quantity}x ${item.product.name} (${item.variant.size}) - $${(item.variant.price * item.quantity).toFixed(2)}\n`;
      if (item.customNote) {
        msg += `   └ Dedicatoria: "${item.customNote}"\n`;
      }
    });

    msg += `\n*Subtotal:* $${order.subtotal.toFixed(2)}`;
    if (earnedBottles > 0) {
      msg += `\n🍾 *Obsequio Dulcito por Volumen:* ${earnedBottles}x Botella${earnedBottles > 1 ? 's' : ''} de Ponche Crema Tradicional *GRATIS* (Incluida${earnedBottles > 1 ? 's' : ''} para entrega)`;
    }
    msg += `\n*Envío:* Gratis (El empaque acolchado para envíos grandes corre por cuenta del vendedor)`;
    msg += `\n*TOTAL:* $${order.total.toFixed(2)}\n\n`;
    msg += `⚠️ *AVISO MUY IMPORTANTE:*\n`;
    msg += `📸 *Favor enviar comprobantes de pago y el motivo de ese pago por vía WhatsApp para ser procesados.*\n\n`;
    msg += `¡Muchas gracias por preservar nuestras tradiciones! ✨`;

    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/584248830997?text=${composeWhatsAppMessage()}`;

  const handleCopySummary = () => {
    let plainText = `Pedido DULCITO #${order.orderNumber}\n`;

    if (earnedBottles > 0) {
      plainText += `🚨 AVISO PARA DESPACHO / VENDEDOR:\n`;
      plainText += `🎁 Por volumen de compra ($${order.subtotal.toFixed(2)}), este cliente TIENE DERECHO A ${earnedBottles}x BOTELLA${earnedBottles > 1 ? 'S' : ''} DE PONCHE CREMA DE REGALO.\n`;
      plainText += `👉 Embalar e incluir ${earnedBottles} botella${earnedBottles > 1 ? 's' : ''} de obsequio GRATIS en este paquete.\n\n`;
    }

    plainText += `Cliente: ${order.customer.fullName}\n`;
    plainText += `Teléfono: ${order.customer.phone}\n`;
    plainText += `Total: $${order.total.toFixed(2)}\n`;
    plainText += `Dirección: ${order.customer.address}, ${order.customer.city}\n`;
    plainText += `Envío: Gratis (Empaque acolchado para envíos grandes por cuenta del vendedor)\n`;
    plainText += `Estado: ${activeStageObj.label} (${activeStageObj.statusBadge})\n`;
    if (order.customer.paymentMethod === 'pago_movil') {
      plainText += `Pago Móvil:\n• Mercantil: 0105 / 04248830997 / 17320644\n• BNC: 0191 / 04145089082 / 17320644\n`;
    } else if (['crixto', 'binance', 'airtm'].includes(order.customer.paymentMethod)) {
      plainText += `Cuenta (${order.customer.paymentMethod}): alfredovas60@gmail.com\n`;
    }
    plainText += `\nProductos:\n`;
    order.items.forEach((item) => {
      plainText += `• ${item.quantity}x ${item.product.name} (${item.variant.size})\n`;
    });
    if (earnedBottles > 0) {
      plainText += `• [OBSEQUIO GRATIS] ${earnedBottles}x Botella(s) de Ponche Crema Tradicional\n`;
    }
    plainText += `\n⚠️ AVISO IMPORTANTE: Enviar comprobantes de pago y el motivo de ese pago por vía WhatsApp para ser procesados.\n`;

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 3 Full-screen Fireworks Explosions with additive glow and sound */}
      <FireworksCelebration isActive={showFireworks} triggerKey={fireworksKey} />

      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#26150C]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <div
          className="relative bg-[#FAF5EC] rounded-2xl border border-[#E3D4C0] shadow-2xl max-w-lg w-full overflow-hidden text-[#3D2214] p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Icon Badge with New Logo */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <NewAppBadgeLogo size={68} className="drop-shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2E7D32] border-2 border-white flex items-center justify-center text-white shadow-sm">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B84A28]">
              ¡Pedido Registrado con Éxito!
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2214] mt-1">
              Gracias por elegir DULCITO
            </h2>
            <p className="text-xs text-[#78543E] mt-1 max-w-xs leading-relaxed">
              Hemos reservado tus productos artesanales. Estamos listos para preparar tu paquete con su lazo de mecatillo.
            </p>

            {/* Replay Fireworks Trigger */}
            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setShowFireworks(true);
                  setFireworksKey((prev) => prev + 1);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-[#D4AF37]/25 via-[#FAF3E0] to-[#D4AF37]/25 border border-[#D4AF37] text-[#8C5E28] hover:text-[#3D2214] hover:bg-[#FAF0DC] hover:shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8621B] animate-spin" style={{ animationDuration: '4s' }} />
                <span>🎆 Celebrar con Fuegos Artificiales</span>
              </button>
            </div>
          </div>

        {/* Visual Order Tracking Section */}
        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE1] rounded-2xl border-2 border-[#D4AF37]/50 shadow-sm text-xs">
          {/* Tracker Header with Pulsing Live Status */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EADCCE] mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    trackingStage === 'entregado'
                      ? 'bg-[#2E7D32]'
                      : trackingStage === 'en_camino'
                      ? 'bg-[#1976D2]'
                      : 'bg-[#E5A93C]'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    trackingStage === 'entregado'
                      ? 'bg-[#2E7D32]'
                      : trackingStage === 'en_camino'
                      ? 'bg-[#1976D2]'
                      : 'bg-[#D48806]'
                  }`}
                />
              </span>
              <span className="font-serif font-black text-xs sm:text-sm text-[#3D2214] tracking-wide">
                Seguimiento de tu Pedido Artesanal
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold shadow-2xs ${activeStageObj.badgeClass}`}
            >
              {activeStageObj.statusBadge}
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="relative mb-5 px-3 pt-1">
            {/* Background Track Line */}
            <div className="absolute top-6 left-8 right-8 h-1 bg-[#E2D1BF] rounded-full z-0" />
            {/* Active Colored Fill Line */}
            <div
              className="absolute top-6 left-8 h-1 bg-gradient-to-r from-[#D4AF37] via-[#B8621B] to-[#2E7D32] rounded-full z-0 transition-all duration-500 ease-out"
              style={{
                width:
                  trackingStage === 'preparando'
                    ? '0%'
                    : trackingStage === 'en_camino'
                    ? '50%'
                    : 'calc(100% - 4rem)',
              }}
            />

            {/* 3 Step Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {trackingStagesList.map((st, idx) => {
                const IconComponent = st.icon;
                const isCurrent = st.id === trackingStage;
                const isCompleted =
                  trackingStage === 'entregado' ||
                  (trackingStage === 'en_camino' && idx === 0);

                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setTrackingStage(st.id)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform active:scale-95"
                    title={`Ver estado: ${st.label}`}
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-[#3D2214] via-[#522914] to-[#3D2214] text-[#F3E2B8] ring-4 ring-[#D4AF37]/50 scale-110 shadow-md'
                          : isCompleted
                          ? 'bg-[#2E7D32] text-white ring-2 ring-[#A5D6A7]'
                          : 'bg-white border-2 border-[#D5BEA4] text-[#A89078] hover:border-[#B8621B]'
                      }`}
                    >
                      {isCompleted && !isCurrent ? (
                        <Check className="w-5 h-5 text-white stroke-[2.5]" />
                      ) : (
                        <IconComponent className="w-5 h-5" />
                      )}
                    </div>

                    {/* Stage Label */}
                    <span
                      className={`mt-2 text-xs font-bold text-center leading-tight transition-colors ${
                        isCurrent
                          ? 'text-[#3D2214] font-black'
                          : isCompleted
                          ? 'text-[#2E7D32]'
                          : 'text-[#8C6044]'
                      }`}
                    >
                      {st.label}
                    </span>
                    <span className="text-[10px] text-[#A8876F] hidden sm:block">
                      {st.statusBadge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail Description Box */}
          <div className="p-3.5 bg-white/95 rounded-xl border border-[#E3D4C0] shadow-2xs space-y-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#3D2214] text-xs">
                  Fase activa: {activeStageObj.label}
                </span>
                <span className="text-[10px] font-semibold text-[#8C5E28] bg-[#FAF3E0] px-2 py-0.5 rounded border border-[#E8DAC7]">
                  {activeStageObj.statusBadge}
                </span>
              </div>
              <p className="text-[11px] text-[#5A3822] leading-relaxed">
                {activeStageObj.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F0E4D4] flex items-center justify-between text-[10px] text-[#78543E]">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#B8621B]" />
                {activeStageObj.note}
              </span>
              <span className="italic text-[#9C785F]">
                (Haz clic en cada fase para consultar el estado)
              </span>
            </div>
          </div>
        </div>

        {/* Receipt Box */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#E8DAC7] space-y-3 mb-6 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#EFE4D4]">
            <span className="text-[#8C6044]">Número de Pedido:</span>
            <span className="font-mono font-bold text-[#3D2214]">{order.orderNumber}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-[#EFE4D4]">
            <span className="text-[#8C6044]">Fecha:</span>
            <span className="text-[#3D2214]">{order.date}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-[#EFE4D4]">
            <span className="text-[#8C6044]">Destinatario:</span>
            <span className="font-semibold text-[#3D2214]">{order.customer.fullName}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-[#EFE4D4]">
            <span className="text-[#8C6044]">Dirección:</span>
            <span className="text-[#3D2214] text-right truncate max-w-[200px]">
              {order.customer.address}, {order.customer.city}
            </span>
          </div>

          {/* Itemized preview */}
          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold text-[#8C6044] block mb-1.5">
              Productos seleccionados:
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#5A3822]">
                  <span className="truncate pr-2">
                    {it.quantity}x {it.product.name} ({it.variant.size})
                  </span>
                  <span className="font-bold tabular-nums text-[#3D2214] shrink-0">
                    ${(it.variant.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {earnedBottles > 0 && (
            <div className="mt-3 p-3.5 bg-gradient-to-br from-[#FFF9EE] to-[#FAF1DE] rounded-xl border-2 border-[#D4AF37] shadow-xs text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-[#8C5E28] flex items-center gap-1.5 text-xs sm:text-sm">
                  <span className="text-base">🍾</span>
                  <span>¡Obsequio por Volumen de Compra!</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2E7D32] text-white font-black text-[10px] tracking-wide shadow-2xs">
                  {earnedBottles}x {earnedBottles === 1 ? 'BOTELLA GRATIS' : 'BOTELLAS GRATIS'}
                </span>
              </div>
              <p className="text-[11px] text-[#5A3822] leading-relaxed">
                Por el volumen de este pedido (<strong className="text-[#3D2214]">${order.subtotal.toFixed(2)}</strong>), este cliente tiene derecho a{' '}
                <strong className="text-[#2E7D32] font-black">{earnedBottles} {earnedBottles === 1 ? 'botella' : 'botellas'} de Ponche Crema Tradicional de regalo</strong> (1 gratis por cada $50 consumidos).
              </p>
              <div className="pt-2 border-t border-[#E8DAC7] flex items-center gap-2 text-[10px] text-[#8C5E28] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#B84A28] shrink-0" />
                <span>Instrucción para el Vendedor/Despacho: Embalar e incluir {earnedBottles}x Ponche Crema gratis al preparar el paquete.</span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#DECDB8] flex items-center justify-between text-xs text-[#5A3822]">
            <div className="flex flex-col">
              <span className="font-semibold text-[#3D2214]">Envío y Despacho:</span>
              <span className="text-[10px] text-[#2E7D32]">
                Empaque acolchado para envíos grandes corre por cuenta del vendedor
              </span>
            </div>
            <span className="font-black text-[#2E7D32]">¡Gratis!</span>
          </div>

          <div className="pt-2 border-t border-[#DECDB8] flex items-center justify-between font-serif font-bold text-base text-[#3D2214]">
            <span>Total:</span>
            <span className="text-lg text-[#B8621B] tabular-nums">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Account Details Card in confirmation */}
        {order.customer.paymentMethod === 'pago_movil' && (
          <div className="mb-5 p-3.5 bg-[#F7EFE2] rounded-xl border border-[#D5BEA4] space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs text-[#3D2214] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#B8621B]" />
                Datos para Pago Móvil (Tasa Oficial BCV)
              </span>
              <span className="text-[10px] text-[#78543E] bg-[#EFE4D4] px-2 py-0.5 rounded-full font-medium">
                Mercantil y BNC
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Mercantil */}
              <div className="p-2.5 bg-white/95 rounded-lg border border-[#E3D4C0] space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#B8621B] text-[11px]">0105 • Mercantil</span>
                  <button
                    type="button"
                    onClick={() => handleCopyBank('0105 / 04248830997 / 17320644', 'mercantil')}
                    className="text-[10px] text-[#5A3822] hover:text-[#3D2214] flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F0E6D8] px-2 py-0.5 rounded border border-[#DECDB8] transition-colors"
                  >
                    {copiedBank === 'mercantil' ? (
                      <span className="text-[#2E7D32] font-bold">¡Copiado!</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-[#5A3822] space-y-0.5">
                  <p><strong className="text-[#3D2214]">Banco:</strong> 0105 (Mercantil)</p>
                  <p><strong className="text-[#3D2214]">Teléfono:</strong> 04248830997</p>
                  <p><strong className="text-[#3D2214]">C.I.:</strong> 17320644</p>
                </div>
              </div>

              {/* BNC */}
              <div className="p-2.5 bg-white/95 rounded-lg border border-[#E3D4C0] space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#B8621B] text-[11px]">0191 • BNC</span>
                  <button
                    type="button"
                    onClick={() => handleCopyBank('0191 / 04145089082 / 17320644', 'bnc')}
                    className="text-[10px] text-[#5A3822] hover:text-[#3D2214] flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F0E6D8] px-2 py-0.5 rounded border border-[#DECDB8] transition-colors"
                  >
                    {copiedBank === 'bnc' ? (
                      <span className="text-[#2E7D32] font-bold">¡Copiado!</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-[#5A3822] space-y-0.5">
                  <p><strong className="text-[#3D2214]">Banco:</strong> 0191 (BNC)</p>
                  <p><strong className="text-[#3D2214]">Teléfono:</strong> 04145089082</p>
                  <p><strong className="text-[#3D2214]">C.I.:</strong> 17320644</p>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#78543E] italic">
              * Recuerda enviar el comprobante o número de referencia al chat de WhatsApp.
            </p>
          </div>
        )}

        {(order.customer.paymentMethod === 'crixto' || order.customer.paymentMethod === 'binance' || order.customer.paymentMethod === 'airtm') && (
          <div className="mb-5 p-3.5 bg-[#F7EFE2] rounded-xl border border-[#D5BEA4] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs text-[#3D2214] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B8621B]" />
                Cuenta {order.customer.paymentMethod === 'crixto' ? 'Crixto' : order.customer.paymentMethod === 'binance' ? 'Binance Pay' : 'Airtm'}
              </span>
              <button
                type="button"
                onClick={() => handleCopyBank('alfredovas60@gmail.com', order.customer.paymentMethod)}
                className="text-[10px] text-[#5A3822] hover:text-[#3D2214] flex items-center gap-1 bg-[#FAF7F2] hover:bg-[#F0E6D8] px-2.5 py-1 rounded border border-[#DECDB8] transition-colors"
              >
                {copiedBank === order.customer.paymentMethod ? (
                  <span className="text-[#2E7D32] font-bold">¡Copiado!</span>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar correo</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 bg-white/95 rounded-lg border border-[#E3D4C0] flex items-center justify-between text-xs">
              <span className="text-[#5A3822]">Correo receptor:</span>
              <span className="font-mono font-bold text-[#3D2214] select-all">alfredovas60@gmail.com</span>
            </div>
          </div>
        )}

        {/* Eye-catching Banner for Payment Proof & Motive */}
        <div className="mb-4 p-3.5 sm:p-4 bg-gradient-to-r from-[#FFF4DB] via-[#FFEBB8] to-[#FFDFC2] rounded-xl border-2 border-[#D48806] shadow-md flex items-start gap-3 text-xs text-[#3D2214]">
          <div className="p-2 bg-[#D48806] text-white rounded-lg shrink-0 shadow-xs mt-0.5">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 bg-[#B84A28] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-2xs">
              ⚠️ AVISO MUY IMPORTANTE
            </span>
            <p className="font-extrabold text-[#3D2214] text-xs sm:text-[13px] leading-snug">
              Enviar comprobantes de pago y el motivo de ese pago por vía WhatsApp para ser procesados.
            </p>
            <p className="text-[11px] text-[#6B3E1F] leading-tight">
              📸 Al presionar el botón verde de abajo para abrir el WhatsApp de Dulcito, por favor adjunta tu comprobante/capture y escribe el motivo o número de pedido.
            </p>
          </div>
        </div>

        {/* WhatsApp & Copy Action */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] text-center no-underline"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>Enviar Pedido a WhatsApp Directo</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopySummary}
              className="flex-1 py-2.5 px-3 border border-[#D5BEA4] bg-white hover:bg-[#F3E9DB] text-[#5A3822] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-[#B8621B]" />
              <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 bg-[#3D2214] hover:bg-[#26150C] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Volver a la Tienda</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EBDCC8]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
