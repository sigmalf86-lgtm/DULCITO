export const WHATSAPP_PHONE = '584248830997';
export const WHATSAPP_ORDER_MESSAGE = 'Buenas, DULCITO 🤎, quiero hacer un pedido.';
export const WHATSAPP_AUTO_REPLY =
  'Bienvenido a DULCITO 🤎, el sabor a tradición, en un momento serás atendido.';

export function getWhatsAppUrl(message: string = WHATSAPP_ORDER_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function notifyWhatsAppAutoReply(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<string>('dulcito:whatsapp-reply', {
      detail: WHATSAPP_AUTO_REPLY,
    })
  );
}
