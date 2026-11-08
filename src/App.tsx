import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  Flame,
  Award,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  Gift,
  ArrowRight,
  Download,
  Share2,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BrandLogo, NewAppBadgeLogo } from './components/BrandLogo';
import { Hero } from './components/Hero';
import { FestivePineGarland } from './components/FestivePineGarland';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SpinningStarAnise } from './components/SpinningStarAnise';
import { Product, CartItem, CustomerInfo, PlacedOrder } from './types';
import { soundEffects } from './utils/audio';

// Catalog products with rich authentic imagery
const PRODUCTS: Product[] = [
  {
    id: 'ponche-tradicional',
    name: 'Ponche Crema Tradicional de Autor',
    category: 'ponche',
    description: 'Elaborado artesanalmente con ron añejo venezolano, leche entera fresca cocida a fuego lento, yemas seleccionadas y maceración de anís estrellado y canela en rama.',
    badge: '⭐ El Más Solicitado',
    image: '/assets/aistudio/ponche_nuevo_poster_vertido.jpg',
    variants: [
      { id: 'pt-075', size: 'Botella Cristal 0.75 L', price: 18, inStock: true },
      { id: 'pt-100', size: 'Botella Familiar 1.0 L', price: 24, inStock: true },
    ],
    ingredients: ['Ron Añejo Venezolano', 'Pura Leche Entera', 'Yemas Frescas', 'Anís Estrellado', 'Canela Ceilán'],
    heritageNote: 'Embotellado a mano con sello de lacre, lazo de mecatillo natural y rama de canela Ceilán atada al cuello.',
    isSpecial: true,
  },
  {
    id: 'ponche-cafe-cacao',
    name: 'Ponche Crema Cacao de Barlovento & Moka',
    category: 'ponche',
    description: 'Fusión cremosa de nuestro ponche tradicional con licor de cacao criollo de Barlovento y extracto de café recién tostado de los Andes.',
    badge: 'Edición Limitada',
    image: '/assets/aistudio/Gemini_Generated_Image_yvqufzyvqufzyvqu_327b65ee.jpg',
    variants: [
      { id: 'pcc-075', size: 'Botella Cristal 0.75 L', price: 20, inStock: true },
      { id: 'pcc-100', size: 'Botella Familiar 1.0 L', price: 26, inStock: true },
    ],
    ingredients: ['Cacao Barloventeño', 'Café Tostado Andino', 'Ron Añejo', 'Leche Fresca'],
    heritageNote: 'Notas aterciopeladas de chocolate amargo criollo con el remate aromático del café de altura.',
  },
  {
    id: 'dulce-leche-paila',
    name: 'Dulce de Leche Criollo en Paila de Cobre',
    category: 'dulces',
    description: 'Cocinado lentamente durante 6 horas en paila de cobre batido a mano con paleta de madera, logrando un punto untuoso, denso y caramelizado.',
    badge: 'Hecho a Mano',
    image: '/assets/aistudio/04_dulce_de_leche_limpio_ab931cfb.png',
    variants: [
      { id: 'dl-250', size: 'Frasco Vidrio 250g', price: 7, inStock: true },
      { id: 'dl-500', size: 'Frasco Vidrio 500g', price: 12, inStock: true },
    ],
    ingredients: ['Leche Entera de Ordeño', 'Azúcar Morena', 'Vainilla Natural', 'Pizca de Bicarbonato Artesanal'],
    heritageNote: 'Sin colorantes ni conservantes químicos. Receta de la abuela con textura untuosa sedosa.',
  },
  {
    id: 'alfajores-polvorosas',
    name: 'Alfajores Artesanales & Polvorosas Mantecosas',
    category: 'dulces',
    description: 'Bocados tiernos de maicena rellenos con abundante dulce de leche de la casa y lluvia de coco rallado, junto a nuestras famosas polvorosas mantecosas que se deshacen en la boca.',
    badge: 'Receta Secreta',
    image: '/assets/aistudio/dulcito_vitrina_productos_44s_9e8bc171.mp4',
    variants: [
      { id: 'alf-12', size: 'Caja Artesanal 12 uds (Surtido)', price: 10, inStock: true },
      { id: 'alf-24', size: 'Caja Familiar 24 uds (Surtido)', price: 18, inStock: true },
    ],
    ingredients: ['Maicena', 'Dulce de Leche Casero', 'Coco Rallado Fino', 'Mantequilla Pura', 'Canela en Polvo'],
    heritageNote: 'Horneados diariamente en tandas pequeñas para garantizar la frescura y la suavidad inigualable.',
  },
  {
    id: 'quesillo-tradicional',
    name: 'Quesillo Tradicional Caraqueño',
    category: 'dulces',
    description: 'El rey de los postres venezolanos: suave textura con sus característicos agujeritos, cocido al baño de María y bañado en caramelo dorado intenso.',
    badge: 'Clásico Venezolano',
    image: '/assets/aistudio/01_quesillo_tradicional_limpio_38cd1897.png',
    variants: [
      { id: 'q-med', size: 'Molde Mediano (6-8 porciones)', price: 14, inStock: true },
      { id: 'q-fam', size: 'Molde Grande (10-12 porciones)', price: 20, inStock: true },
    ],
    ingredients: ['Huevos Frescos', 'Leche Condensada', 'Leche Líquida', 'Caramelo Rubio', 'Ron de Cocina'],
    heritageNote: 'Desmoldado perfecto con abundante sirope de caramelo para bañar cada porción.',
  },
  {
    id: 'pan-de-jamon',
    name: 'Pan de Jamón Tradicional Navideño',
    category: 'navidad',
    description: 'Masa brioche suave y dulce rellena de jamón ahumado tierno de primera calidad, tocineta crujiente, pasas rubias y aceitunas rellenas de pimentón.',
    badge: '🎄 Tradición Decembrina',
    image: '/assets/aistudio/05_pan_de_jamon_limpio_9d9d60c5.png',
    variants: [
      { id: 'pj-100', size: 'Pan Grande Tradicional (1 kg)', price: 16, inStock: true },
      { id: 'pj-duo', size: 'Combo 2 Panes Grandes', price: 30, inStock: true },
    ],
    ingredients: ['Masa Dulce Enmantequillada', 'Jamón Ahumado Superior', 'Tocineta', 'Pasas', 'Aceitunas'],
    heritageNote: 'Bañado con papelón derretido antes del horno para un dorado brillante y corteza suave.',
  },
  {
    id: 'caja-regalo-navidena',
    name: 'Caja Regalo "Añoranza Criolla"',
    category: 'cajas',
    description: 'El obsequio corporativo y familiar más elegante: 1 Botella de Ponche Crema Tradicional (0.75L), 1 Frasco de Dulce de Leche (250g), 8 Alfajores de Maicena, lazo festivo y tarjeta caligrafiada personalizada.',
    badge: '🎁 Listo para Regalar',
    image: '/assets/aistudio/sello_sticker_circular.png',
    variants: [
      { id: 'cr-estandar', size: 'Caja Madera & Lazo Rojo', price: 35, inStock: true },
      { id: 'cr-premium', size: 'Caja Deluxe con 2 Botellas', price: 52, inStock: true },
    ],
    ingredients: ['Presentación de Lujo', 'Madera de Pino Natural', 'Lazo de Terciopelo', 'Tarjeta con Dedicatoria'],
    heritageNote: 'Elaborada especialmente para empresas, familiares en el exterior y cenas de fin de año.',
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomBoxOpen, setIsCustomBoxOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeVideoMuted, setActiveVideoMuted] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // Customer form state
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Caracas',
    paymentMethod: 'pago_movil',
    notes: '',
  });

  // Custom Box builder state
  const [customBox, setCustomBox] = useState<{
    bottles: number;
    dulceLeche: number;
    alfajores: number;
    note: string;
  }>({
    bottles: 1,
    dulceLeche: 1,
    alfajores: 1,
    note: '¡Felices Fiestas con todo el cariño de nuestra familia!',
  });

  // PWA beforeinstallprompt capture
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsAppInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setIsInstallGuideOpen(true);
    }
  };

  // Cart operations
  const addToCart = (product: Product, variantIndex = 0, customNote?: string) => {
    soundEffects.playClick();
    const variant = product.variants[variantIndex];
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variant.id === variant.id && i.customNote === customNote
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, variant, quantity: 1, customNote }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    soundEffects.playClick();
    setCart((prev) => {
      const next = [...prev];
      const target = next[index];
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index] = { ...target, quantity: newQty };
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    soundEffects.playClick();
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const earnedBottles = Math.floor(subtotal / 50);
  const amountToNextFreeBottle = subtotal > 0 ? 50 - (subtotal % 50) : 50;

  // Add custom box to cart
  const handleAddCustomBoxToCart = () => {
    soundEffects.playClick();
    const boxPrice = customBox.bottles * 18 + customBox.dulceLeche * 7 + customBox.alfajores * 10 + 6; // $6 luxury packaging
    const customProduct: Product = {
      id: `caja-personalizada-${Date.now()}`,
      name: `Caja Personalizada Dulcito (${customBox.bottles} Ponche, ${customBox.dulceLeche} Dulce de Leche, ${customBox.alfajores} Alfajores)`,
      category: 'cajas',
      description: `Caja artesanal de pino con lazo rojo y dedicatoria: "${customBox.note}"`,
      image: '/assets/aistudio/sello_sticker_circular.png',
      variants: [{ id: `cbv-${Date.now()}`, size: 'Caja de Lujo Armada', price: boxPrice, inStock: true }],
    };

    addToCart(customProduct, 0, customBox.note);
    setIsCustomBoxOpen(false);
  };

  // Submit order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address) {
      return;
    }

    const orderNumber = `DUL-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('es-VE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: PlacedOrder = {
      orderNumber,
      date: dateFormatted,
      items: [...cart],
      subtotal,
      total: subtotal,
      customer: { ...customer },
      status: 'preparando',
    };

    setPlacedOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // WhatsApp link 1: First automated greeting requested by user:
  // "Bienvenido a DULCITO 🍫\n¿En qué puedo ayudarte?"
  const generalWhatsAppGreeting = encodeURIComponent(
    'Bienvenido a DULCITO 🍫\n¿En qué puedo ayudarte?'
  );
  const generalWhatsAppUrl = `https://wa.me/584248830997?text=${generalWhatsAppGreeting}`;

  // WhatsApp link 2: Automated consultation for family Christmas gift requested by user:
  // "Hola DULCITO 🍫, quisiera consultar por el Obsequio familiar Navideño y sus productos?..."
  const giftInquiryWhatsAppText = encodeURIComponent(
    'Hola DULCITO 🍫, quisiera consultar por el Obsequio familiar Navideño y sus productos?...'
  );
  const giftInquiryWhatsAppUrl = `https://wa.me/584248830997?text=${giftInquiryWhatsAppText}`;

  const filteredProducts =
    selectedCategory === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#1A0B05] text-[#FAF5EC] flex flex-col selection:bg-[#D4AF37] selection:text-[#1A0B05]">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="relative bg-gradient-to-r from-[#240F08] via-[#3D1A0D] to-[#240F08] border-b border-[#D4AF37]/40 px-3 py-2 text-center text-xs font-medium text-[#FFF8EE] overflow-hidden z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 mx-auto">
            <span className="inline-block animate-pulse text-base">🎁</span>
            <span className="font-bold text-[#FDE047]">OBSEQUIO FAMILIAR NAVIDEÑO:</span>
            <span className="hidden sm:inline">Por cada $50 en tu compra,</span>
            <span className="font-extrabold text-white underline decoration-[#D4AF37]">
              ¡Te regalamos 1 Botella de Ponche Crema Tradicional!
            </span>
          </div>

          {/* Quick install button on banner */}
          <button
            type="button"
            onClick={handleInstallApp}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] hover:bg-[#F2DF99] text-[#241109] font-black text-[11px] shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>{isAppInstalled ? 'App Instalada' : 'Descargar App'}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN FESTIVE NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#160803]/95 backdrop-blur-md border-b border-[#D4AF37]/50 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <NewAppBadgeLogo size={52} className="group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-tight text-2xl sm:text-3xl text-[#FFF8EE] leading-none">
                  DULCITO
                </span>
                <span className="text-xl" title="Hecho con Amor">
                  🍫
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#D4AF37] font-bold mt-1">
                Ponche Crema & Dulces Criollos
              </span>
            </div>
          </a>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Install App Button */}
            <button
              type="button"
              onClick={handleInstallApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#FDE047] bg-[#2A1308] border border-[#D4AF37]/60 hover:bg-[#3D1A0D] hover:border-[#FDE047] transition-all cursor-pointer shadow-xs"
              title="Descargar la app en tu teléfono o PC"
            >
              <Download className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Descargar App</span>
            </button>

            {/* Direct WhatsApp Consultation Button */}
            <a
              href={giftInquiryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#205C2E] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#388E3C] border border-[#A5D6A7]/50 shadow-md transition-all active:scale-95 no-underline whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="hidden md:inline">Consultar Obsequio</span>
              <span className="md:hidden">WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#2E1408] to-[#451F0D] border-2 border-[#D4AF37] text-white hover:border-[#FFF3B3] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-[#FDE047]" />
              <span className="hidden sm:inline text-xs font-bold font-serif text-[#FFF8EE]">
                Mi Cesta
              </span>
              {cartTotalCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#B84A28] border-2 border-[#160803] text-white text-[11px] font-black flex items-center justify-center shadow-md animate-bounce">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dense Christmas Pine Garland Framing the Navbar bottom */}
        <FestivePineGarland />
      </header>

      {/* 3. HERO COMPONENT */}
      <Hero
        onExploreCatalog={() => {
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomBox={() => setIsCustomBoxOpen(true)}
      />

      {/* 4. PROMO CALLOUT: OBSEQUIO FAMILIAR NAVIDEÑO */}
      <section className="py-6 bg-gradient-to-r from-[#210D05] via-[#2F1408] to-[#210D05] border-y border-[#D4AF37]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#180A04]/90 rounded-2xl border-2 border-[#D4AF37] p-5 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#2A1308] border-2 border-[#D4AF37] flex items-center justify-center shrink-0 text-3xl shadow-lg">
                🍾
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#B84A28] text-white font-black text-[10px] tracking-wider uppercase">
                    ¡Promoción Especial Activa!
                  </span>
                  <span className="text-xs text-[#FDE047] font-bold">1 Gratis por cada $50</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-[#FFF8EE]">
                  Obsequio Familiar Navideño de DULCITO
                </h2>
                <p className="text-xs sm:text-sm text-[#E0CCA7] mt-1 max-w-2xl leading-relaxed">
                  Celebra con los tuyos el auténtico sabor tradicional. Al completar $50 en cualquiera de nuestros productos, 
                  recibes automáticamente una botella de Ponche Crema Tradicional de Autor totalmente gratis.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <a
                href={giftInquiryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#160803] bg-gradient-to-r from-[#D4AF37] via-[#F2DF99] to-[#D4AF37] hover:brightness-110 shadow-lg transition-all flex items-center gap-2 active:scale-95 no-underline font-serif"
              >
                <MessageCircle className="w-4 h-4 text-[#160803]" />
                <span>Consultar Obsequio por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsCustomBoxOpen(true)}
                className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#FAF5EC] bg-[#2A1308] border border-[#D4AF37]/60 hover:border-[#FFF3B3] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>Armar Caja de Regalo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMMERCIAL SPOT / VIDEO SHOWCASE */}
      <section id="spot-comercial" className="py-10 bg-[#140803] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1308] border border-[#D4AF37]/50 text-xs font-bold text-[#FDE047] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Nuestra Pasión Artesanal en Video</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#FFF8EE]">
              Spot Comercial & Vitrina de Productos
            </h2>
            <p className="text-xs sm:text-sm text-[#D5BFA8] mt-2 leading-relaxed">
              Descubre el proceso de cocción lenta, el embotellado minucioso y la textura espesa y sedosa de nuestro ponche crema.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-[#0F0502]">
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/assets/aistudio/ponche_crema_dulcito_anuncio_audio_mejorado_a48cd512.mp4"
                poster="/assets/aistudio/ponche_nuevo_poster_vertido.jpg"
                autoPlay
                loop
                muted={activeVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top controls overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => setActiveVideoMuted(!activeVideoMuted)}
                  className="p-2.5 rounded-full bg-[#160803]/80 backdrop-blur-md border border-[#D4AF37] text-white hover:bg-[#2A1308] transition-all cursor-pointer shadow-lg"
                  aria-label={activeVideoMuted ? 'Activar audio' : 'Silenciar audio'}
                >
                  {activeVideoMuted ? (
                    <VolumeX className="w-4 h-4 text-[#FDE047]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#FDE047]" />
                  )}
                </button>
              </div>

              {/* Bottom banner on video */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0F0502] via-[#0F0502]/70 to-transparent p-4 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <NewAppBadgeLogo size={42} />
                  <div>
                    <h3 className="font-serif font-black text-sm sm:text-base text-white">
                      DULCITO · Tradición de Autor
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#E0CCA7]">
                      Hecho en pequeños lotes con especias nobles y ron añejo venezolano.
                    </p>
                  </div>
                </div>

                <a
                  href="#catalogo"
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F2DF99] text-[#160803] font-bold text-xs font-serif shadow-md transition-all whitespace-nowrap active:scale-95 no-underline"
                >
                  Pedir Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT CATALOG SECTION */}
      <section id="catalogo" className="py-12 bg-gradient-to-b from-[#140803] via-[#1A0B05] to-[#140803] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FDE047] uppercase tracking-wider mb-2">
                <SpinningStarAnise size={18} speed="slow" glow={true} />
                <span>Tienda Artesanal Criolla</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#FFF8EE]">
                Nuestros Sabores & Especialidades
              </h2>
              <p className="text-xs sm:text-sm text-[#D5BFA8] mt-1 max-w-xl">
                Selecciona tus botellas de ponche crema, dulces de paila y bocados tradicionales.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'todos', label: 'Todos los Productos' },
                { id: 'ponche', label: '🍾 Ponche Crema' },
                { id: 'dulces', label: '🍯 Dulces & Bocados' },
                { id: 'navidad', label: '🎄 Navideño' },
                { id: 'cajas', label: '🎁 Cajas de Regalo' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#D4AF37] text-[#1A0B05] shadow-md'
                      : 'bg-[#241007] text-[#D5BFA8] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const mainVariant = product.variants[0];

              return (
                <div
                  key={product.id}
                  className="bg-[#210D05]/95 rounded-2xl border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all shadow-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] flex flex-col overflow-hidden group"
                >
                  {/* Product Image Frame */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#140803]">
                    {product.image.endsWith('.mp4') ? (
                      <video
                        src={product.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/aistudio/ponche_nuevo_poster_vertido.jpg';
                        }}
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#210D05] via-transparent to-black/30 pointer-events-none" />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#160803]/90 backdrop-blur-md border border-[#D4AF37] text-[11px] font-black text-[#FDE047] shadow-lg">
                        {product.badge}
                      </div>
                    )}

                    {/* Price tag */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#160803]/95 backdrop-blur-md border border-[#D4AF37] text-white shadow-xl flex items-baseline gap-1">
                      <span className="text-[10px] text-[#D4AF37]">Desde</span>
                      <span className="text-base font-bold font-serif text-[#FDE047] tabular-nums">
                        ${mainVariant.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#FFF8EE] group-hover:text-[#FDE047] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#D5BFA8] mt-2 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Ingredients / Heritage pill */}
                      {product.heritageNote && (
                        <div className="mt-3 p-2.5 rounded-lg bg-[#180A04] border border-[#D4AF37]/30 text-[11px] text-[#E0CCA7] flex items-start gap-1.5">
                          <span className="text-[#D4AF37] shrink-0">✦</span>
                          <span>{product.heritageNote}</span>
                        </div>
                      )}
                    </div>

                    {/* Variants and Add to Cart */}
                    <div className="mt-5 pt-4 border-t border-[#D4AF37]/30 space-y-2">
                      <div className="flex flex-col gap-2">
                        {product.variants.map((v, vIdx) => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-[#160803]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors"
                          >
                            <div className="text-xs">
                              <span className="font-semibold text-white block">{v.size}</span>
                              <span className="text-[#FDE047] font-bold tabular-nums">${v.price}.00</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => addToCart(product, vIdx)}
                              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-110 text-[#160803] font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Agregar</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CUSTOM GIFT BOX BUILDER MODAL */}
      {isCustomBoxOpen && (
        <div className="fixed inset-0 z-50 bg-[#140803]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="bg-[#210D05] border-2 border-[#D4AF37] rounded-3xl max-w-lg w-full p-6 text-[#FAF5EC] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsCustomBoxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#160803] border border-[#D4AF37]/40 text-[#D5BFA8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#2A1308] border border-[#D4AF37] flex items-center justify-center mx-auto mb-2 text-2xl">
                🎁
              </div>
              <h3 className="text-2xl font-serif font-black text-[#FFF8EE]">
                Arma tu Caja de Regalo
              </h3>
              <p className="text-xs text-[#D5BFA8] mt-1">
                Personaliza el contenido de tu caja artesanal con lazo festivo y tarjeta caligrafiada.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Bottles Selector */}
              <div className="p-3 bg-[#180A04] rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Botellas de Ponche Crema (0.75L)</span>
                  <span className="text-[#D4AF37]">$18 c/u</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomBox((b) => ({ ...b, bottles: Math.max(1, b.bottles - 1) }))}
                    className="w-8 h-8 rounded-lg bg-[#261007] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-base w-4 text-center">{customBox.bottles}</span>
                  <button
                    type="button"
                    onClick={() => setCustomBox((b) => ({ ...b, bottles: b.bottles + 1 }))}
                    className="w-8 h-8 rounded-lg bg-[#261007] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dulce de Leche Selector */}
              <div className="p-3 bg-[#180A04] rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Frascos Dulce de Leche (250g)</span>
                  <span className="text-[#D4AF37]">$7 c/u</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomBox((b) => ({ ...b, dulceLeche: Math.max(0, b.dulceLeche - 1) }))}
                    className="w-8 h-8 rounded-lg bg-[#261007] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-base w-4 text-center">{customBox.dulceLeche}</span>
                  <button
                    type="button"
                    onClick={() => setCustomBox((b) => ({ ...b, dulceLeche: b.dulceLeche + 1 }))}
                    className="w-8 h-8 rounded-lg bg-[#261007] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Alfajores Selector */}
              <div className="p-3 bg-[#180A04] rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Cajas de Alfajores (12 uds)</span>
                  <span className="text-[#D4AF37]">$10 c/u</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomBox((b) => ({ ...b, alfajores: Math.max(0, b.alfajores - 1) }))}
                    className="w-8 h-8 rounded-lg bg-[#261007] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-base w-4 text-center">{customBox.alfajores}</span>
                  <button
                    type="button"
                    onClick={() => setCustomBox((b) => ({ ...b, alfajores: b.alfajores + 1 }))}
                    className="w-8 h-8 rounded-lg bg-[#261007] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dedication Note */}
              <div>
                <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                  Dedicatoria personalizada en tarjeta de hilo:
                </label>
                <textarea
                  value={customBox.note}
                  onChange={(e) => setCustomBox((b) => ({ ...b, note: e.target.value }))}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-[#180A04] border border-[#D4AF37]/40 text-white text-xs focus:outline-none focus:border-[#FDE047]"
                  placeholder="Ej: Para la familia Pérez con todo el cariño de..."
                />
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-white block">Total de la Caja:</span>
                  <span className="text-[10px] text-[#D5BFA8]">Incluye empaque de madera y lazo</span>
                </div>
                <span className="text-xl font-bold font-serif text-[#FDE047]">
                  ${customBox.bottles * 18 + customBox.dulceLeche * 7 + customBox.alfajores * 10 + 6}.00
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCustomBoxToCart}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#160803] font-bold text-sm font-serif shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Agregar Caja de Regalo a Mi Cesta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. CART SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
          <div
            className="w-full max-w-md bg-[#1C0D07] border-l border-[#D4AF37]/50 h-full flex flex-col p-5 shadow-2xl text-[#FAF5EC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#FDE047]" />
                <h3 className="font-serif font-black text-lg text-white">
                  Mi Cesta ({cartTotalCount})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg bg-[#2A1308] text-[#D5BFA8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gift Progress Bar */}
            <div className="my-3 p-3 rounded-xl bg-[#2A1308] border border-[#D4AF37]/40 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#FDE047] flex items-center gap-1">
                  <span>🍾</span>
                  <span>Obsequio Navideño por Volumen</span>
                </span>
                <span className="font-extrabold text-white">
                  {earnedBottles} {earnedBottles === 1 ? 'Botella Gratis' : 'Botellas Gratis'}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#160803] overflow-hidden mb-1">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#2E7D32] transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((subtotal % 50) / 50) * 100)}%`,
                  }}
                />
              </div>

              <p className="text-[11px] text-[#D5BFA8]">
                {earnedBottles > 0
                  ? `¡Genial! Tienes ${earnedBottles} botella(s) de regalo asegurada(s). Agrega $${amountToNextFreeBottle.toFixed(2)} más para otra gratis.`
                  : `Agrega $${amountToNextFreeBottle.toFixed(2)} más para llevarte 1 botella de Ponche Crema GRATIS.`}
              </p>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-[#D5BFA8]">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#D4AF37]" />
                  <p className="text-sm font-semibold">Tu cesta está vacía</p>
                  <p className="text-xs mt-1">Explora nuestro catálogo y agrega tus dulces favoritos.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#241007] border border-[#D4AF37]/30 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 text-xs">
                      <h4 className="font-bold text-white leading-tight">{item.product.name}</h4>
                      <span className="text-[11px] text-[#D4AF37] block mt-0.5">{item.variant.size}</span>
                      {item.customNote && (
                        <span className="text-[10px] italic text-[#E0CCA7] block mt-1">
                          Dedicatoria: "{item.customNote}"
                        </span>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, -1)}
                          className="w-6 h-6 rounded bg-[#160803] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold tabular-nums text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, 1)}
                          className="w-6 h-6 rounded bg-[#160803] border border-[#D4AF37]/40 flex items-center justify-center text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between items-end h-full">
                      <span className="font-bold font-serif text-[#FDE047] text-sm tabular-nums">
                        ${(item.variant.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(idx)}
                        className="text-[#B84A28] hover:text-red-400 p-1 mt-2"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#D5BFA8]">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white text-sm tabular-nums">${subtotal.toFixed(2)}</span>
                </div>

                {earnedBottles > 0 && (
                  <div className="flex items-center justify-between text-xs text-[#81C784]">
                    <span>🍾 Obsequio por Compra:</span>
                    <span className="font-black">{earnedBottles}x Botella GRATIS</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#81C784]">
                  <span>Envío & Empaque Acolchado:</span>
                  <span className="font-bold">¡Gratis por el vendedor!</span>
                </div>

                <div className="flex items-center justify-between text-base font-serif font-black text-white pt-2 border-t border-[#D4AF37]/20">
                  <span>Total:</span>
                  <span className="text-xl text-[#FDE047] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F2DF99] to-[#D4AF37] text-[#160803] font-bold text-sm font-serif shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar con mi Pedido</span>
                  <ArrowRight className="w-4 h-4 text-[#160803]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="bg-[#210D05] border-2 border-[#D4AF37] rounded-3xl max-w-lg w-full p-6 text-[#FAF5EC] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#160803] border border-[#D4AF37]/40 text-[#D5BFA8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <NewAppBadgeLogo size={56} className="mx-auto mb-2" />
              <h3 className="text-2xl font-serif font-black text-[#FFF8EE]">
                Completa tus Datos de Entrega
              </h3>
              <p className="text-xs text-[#D5BFA8] mt-1">
                Para coordinar el despacho directo y preparar tu paquete artesanal.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Ej: María Rodríguez"
                  className="w-full p-2.5 rounded-xl bg-[#160803] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#FDE047]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="Ej: 0424-1234567"
                    className="w-full p-2.5 rounded-xl bg-[#160803] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#FDE047]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                    Ciudad / Zona *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="Ej: Caracas, Lechería, Valencia"
                    className="w-full p-2.5 rounded-xl bg-[#160803] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#FDE047]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                  Dirección exacta de Entrega *
                </label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Calle, urbanización, edificio, nro. de casa"
                  className="w-full p-2.5 rounded-xl bg-[#160803] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#FDE047]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                  Forma de Pago Preferida
                </label>
                <select
                  value={customer.paymentMethod}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      paymentMethod: e.target.value as CustomerInfo['paymentMethod'],
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-[#160803] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#FDE047]"
                >
                  <option value="pago_movil">Pago Móvil (Mercantil / BNC - Tasa Oficial BCV)</option>
                  <option value="crixto">Crixto (alfredovas60@gmail.com)</option>
                  <option value="binance">Binance Pay (alfredovas60@gmail.com)</option>
                  <option value="airtm">Airtm (alfredovas60@gmail.com)</option>
                  <option value="cash">Efectivo contra Entrega</option>
                  <option value="whatsapp">Acordar vía WhatsApp</option>
                  <option value="zelle">Zelle / Transferencia USD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E0CCA7] mb-1">
                  Instrucciones o Dedicatoria para el Despacho
                </label>
                <textarea
                  rows={2}
                  value={customer.notes || ''}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Ej: Es para un regalo de cumpleaños, entregar bien frío..."
                  className="w-full p-2.5 rounded-xl bg-[#160803] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#FDE047]"
                />
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#D5BFA8] block">Total a Pagar:</span>
                  <span className="text-xl font-bold font-serif text-[#FDE047] tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:brightness-110 text-white font-bold text-sm font-serif shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  Confirmar y Ver Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. ORDER CONFIRMATION MODAL (Includes fireworks, live tracking, and WhatsApp dispatch) */}
      <OrderConfirmationModal order={placedOrder} onClose={() => setPlacedOrder(null)} />

      {/* 11. PWA INSTALL GUIDE MODAL */}
      {isInstallGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-[#210D05] border-2 border-[#D4AF37] rounded-3xl max-w-md w-full p-6 text-[#FAF5EC] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsInstallGuideOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#160803] border border-[#D4AF37]/40 text-[#D5BFA8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <NewAppBadgeLogo size={56} className="mx-auto mb-2" />
              <h3 className="text-xl font-serif font-black text-[#FFF8EE]">
                Cómo Descargar la App de DULCITO
              </h3>
              <p className="text-xs text-[#D5BFA8] mt-1">
                Instálala directamente en tu teléfono o computadora para pedir más rápido y sin ocupar espacio.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {/* iPhone / Safari */}
              <div className="p-3 bg-[#180A04] rounded-xl border border-[#D4AF37]/30 space-y-1">
                <span className="font-bold text-[#FDE047] flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-[#FDE047]" />
                  <span>En iPhone / iPad (Safari):</span>
                </span>
                <p className="text-[#D5BFA8]">
                  1. Toca el botón <strong>Compartir</strong> (ícono de cuadro con flecha hacia arriba).
                </p>
                <p className="text-[#D5BFA8]">
                  2. Desliza hacia abajo y selecciona <strong>"Agregar a pantalla de inicio"</strong>.
                </p>
              </div>

              {/* Android / Chrome */}
              <div className="p-3 bg-[#180A04] rounded-xl border border-[#D4AF37]/30 space-y-1">
                <span className="font-bold text-[#FDE047] flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-[#FDE047]" />
                  <span>En Android (Chrome):</span>
                </span>
                <p className="text-[#D5BFA8]">
                  1. Toca los <strong>3 puntos</strong> en la esquina superior derecha.
                </p>
                <p className="text-[#D5BFA8]">
                  2. Toca <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.
                </p>
              </div>

              {/* PC / Mac */}
              <div className="p-3 bg-[#180A04] rounded-xl border border-[#D4AF37]/30 space-y-1">
                <span className="font-bold text-[#FDE047] flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-[#FDE047]" />
                  <span>En Computadora (Chrome / Edge):</span>
                </span>
                <p className="text-[#D5BFA8]">
                  Haz clic en el ícono de instalación en la barra de direcciones de tu navegador.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsInstallGuideOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#160803] font-bold text-xs mt-3 cursor-pointer"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. FLOATING WHATSAPP BUTTON (Configured with the exact welcome greeting requested by user) */}
      <a
        href={generalWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-[0_6px_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center gap-2.5 no-underline group"
        aria-label="Contactar por WhatsApp a DULCITO"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs text-white">
          ¡Chatea con Dulcito!
        </span>
      </a>

      {/* 13. FOOTER */}
      <footer className="mt-auto bg-[#100602] border-t border-[#D4AF37]/40 py-10 text-xs text-[#D5BFA8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <BrandLogo size={48} />
              <p className="text-xs text-[#A88C78] mt-3 max-w-sm leading-relaxed">
                Elaboración artesanal de ponche crema tradicional, dulce de leche criollo en paila de cobre, 
                alfajores y bocados que preservan el legado gastronómico más noble de Venezuela.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-[#FDE047]">
                <SpinningStarAnise size={14} speed="slow" glow={false} />
                <span>Envíos seguros en empaque térmico acolchado</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold text-sm text-[#FFF8EE] mb-3">
                Contacto Directo
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FDE047] flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp: +58 424-8830997</span>
                  </a>
                </li>
                <li>
                  <span className="text-[#A88C78]">Teléfono Alterno: 0414-5089082</span>
                </li>
                <li>
                  <span className="text-[#A88C78]">Email: alfredovas60@gmail.com</span>
                </li>
                <li>
                  <span className="text-[#A88C78]">Atención: Lunes a Domingo 8:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-sm text-[#FFF8EE] mb-3">
                Métodos de Pago
              </h4>
              <ul className="space-y-1.5 text-xs text-[#A88C78]">
                <li>• Pago Móvil Mercantil (0105) & BNC (0191)</li>
                <li>• Crixto / Binance Pay (USDT)</li>
                <li>• Airtm</li>
                <li>• Efectivo contra Entrega</li>
                <li>• Zelle / Transferencia</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#241109] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C6D58]">
            <p>© {new Date().getFullYear()} DULCITO. Tradición Familiar Criolla. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Receta Tradicional de Autor</span>
              <span>·</span>
              <span>Venezuela</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
