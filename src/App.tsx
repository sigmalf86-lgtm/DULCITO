import React, { useState, useEffect, useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import { Product, ProductCategory, CartItem, ProductVariant, PlacedOrder } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { CommercialSpotlight } from './components/CommercialSpotlight';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomBoxBuilder } from './components/CustomBoxBuilder';
import { StorySection } from './components/StorySection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { SpinningStarAnise } from './components/SpinningStarAnise';
import { SeasonalOrnaments, SeasonalSectionDivider } from './components/SeasonalOrnaments';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { SeasonId } from './types/seasons';

const CART_STORAGE_KEY = 'dulcito_cart_v1';
const SEASON_STORAGE_KEY = 'dulcito_season_v1';

export default function App() {
  // Season state (defaults to Navidad, user changeable)
  const [currentSeason, setCurrentSeason] = useState<SeasonId>(() => {
    try {
      const saved = localStorage.getItem(SEASON_STORAGE_KEY);
      return (saved as SeasonId) || 'navidad';
    } catch {
      return 'navidad';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SEASON_STORAGE_KEY, currentSeason);
    } catch {
      // Ignore storage errors
    }
  }, [currentSeason]);

  // Category & search state
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'video' | 'photo'>('video');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Actions
  const handleAddToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const targetVariant = variant || product.variants[0];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.variant.id === targetVariant.id && !it.customNote
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          variant: targetVariant,
          quantity,
        },
      ];
    });

    showToast(`¡Añadido "${product.name}" a la cesta!`);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Producto eliminado de la cesta');
  };

  // Add custom gift box
  const handleAddCustomBox = (
    title: string,
    description: string,
    price: number,
    customNote: string,
    recipientName: string
  ) => {
    const customComboProduct = PRODUCTS.find((p) => p.id === 'combo-nostalgia-dulcito') || PRODUCTS[0];

    const customVariant: ProductVariant = {
      id: `custom-box-${Date.now()}`,
      name: recipientName ? `Para: ${recipientName}` : 'Caja Personalizada',
      size: 'Caja de Madera + Lazo',
      price,
      inStock: true,
    };

    setCartItems((prev) => [
      ...prev,
      {
        product: {
          ...customComboProduct,
          name: title,
          description,
        },
        variant: customVariant,
        quantity: 1,
        customNote,
      },
    ]);

    showToast('¡Caja Nostalgia personalizada añadida!');
    setIsCartOpen(true);
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div
      className="min-h-screen flex flex-col text-[#FFF8EE] relative overflow-x-hidden"
      style={{
        backgroundColor: '#120502',
        backgroundImage: `
          radial-gradient(ellipse 80% 35% at 50% 0%, rgba(212, 175, 55, 0.22) 0%, rgba(140, 85, 25, 0.12) 40%, transparent 70%),
          radial-gradient(circle at 10% 25%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 90% 40%, rgba(212, 175, 55, 0.14) 0%, transparent 55%),
          radial-gradient(circle at 15% 65%, rgba(212, 175, 55, 0.11) 0%, transparent 50%),
          radial-gradient(circle at 85% 85%, rgba(212, 175, 55, 0.13) 0%, transparent 55%),
          linear-gradient(180deg, #140603 0%, #1A0904 15%, #220C06 35%, #2A1008 50%, #220C06 65%, #180803 85%, #100402 100%)
        `,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Seasonal Ornaments throughout the page (swags, corner garlands, hanging baubles, switcher) */}
      <SeasonalOrnaments
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
        isModalOpen={isSeasonModalOpen}
        onOpenModalChange={setIsSeasonModalOpen}
      />

      {/* Toast notification with gold border and spinning star anise */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#361B10] text-[#FAF6F0] px-4 py-3 rounded-2xl shadow-2xl border-2 border-[#D4AF37] flex items-center gap-2.5 text-xs font-bold animate-bounce-subtle">
          <SpinningStarAnise size={18} speed="slow" glow={false} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar with exact logo & spinning star anise */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateCategory={(cat) => {
          setActiveCategory(cat as ProductCategory);
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        currentSeason={currentSeason}
        onOpenSeasonSelector={() => setIsSeasonModalOpen(true)}
      />

      <main className="flex-1 relative z-10">
        {/* Brand Commercial Spotlight Section (Official Video at the very beginning of the app) */}
        <CommercialSpotlight
          onQuickView={(p, tab) => {
            setSelectedProduct(p);
            setModalInitialTab(tab || 'video');
          }}
          onAddToCart={(p, v) => handleAddToCart(p, v)}
          onExploreCatalog={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomBox={() => {
            const el = document.getElementById('caja-regalo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Seasonal Decorative Section Divider */}
        <SeasonalSectionDivider season={currentSeason} />

        {/* Featured Store Catalog Section (Now immediately after the showcase video) */}
        <section id="catalogo" className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Section Header for Ponches & Dulces de Añoranza */}
          <div className="text-center max-w-2xl mx-auto mb-6 pb-4 border-b border-[#D4AF37]/40">
            <div className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-[#FDE047] mb-2">
              <SpinningStarAnise size={16} speed="slow" glow={true} />
              <span>Nuestra Despensa Criolla</span>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span>Lotes Frescos de la Semana</span>
              <SpinningStarAnise size={16} speed="slow" glow={true} />
            </div>

            <div className="flex items-center justify-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#FFF8EE] text-center [text-wrap:balance]">
                Ponches & Dulces de Añoranza
              </h2>
            </div>

            {/* Quick Search & Sort centered below title */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              <div className="relative w-full max-w-xs">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar tequeños, ponche, quesillo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-[#D4AF37]/60 bg-[#241007]/85 text-white placeholder-[#E8C68C] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-sm text-center sm:text-left"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                aria-label="Ordenar productos por"
                className="py-2 px-3 text-xs rounded-xl border-2 border-[#D4AF37]/60 bg-[#241007]/85 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-sm"
              >
                <option value="featured" className="bg-[#241007] text-white">Recomendados</option>
                <option value="price-asc" className="bg-[#241007] text-white">Precio: menor a mayor</option>
                <option value="price-desc" className="bg-[#241007] text-white">Precio: mayor a menor</option>
                <option value="rating" className="bg-[#241007] text-white">Más apreciados</option>
              </select>
            </div>
          </div>

          {/* Interactive Filter Tabs in Signature Brown, White & Gold - 6 Official Products */}
          <div className="flex items-center gap-2.5 p-2 bg-[#241007]/85 backdrop-blur-md rounded-2xl border-2 border-[#D4AF37]/60 overflow-x-auto mb-4 max-w-full shadow-lg">
            {[
              { id: 'ponche', label: 'Ponche Crema' },
              { id: 'tradicionales', label: 'Dulce de Leche' },
              { id: 'chocolates', label: 'Chocolates Árabes' },
              { id: 'quesillo', label: 'Quesillo Tradicional' },
              { id: 'tequenos', label: 'Tequeños de Queso' },
              { id: 'pan-jamon', label: 'Pan de Jamón' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    // Click to filter to this product, or tap again to show all
                    setActiveCategory(isActive ? 'all' : (tab.id as ProductCategory));
                  }}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4A2010] via-[#662C15] to-[#4A2010] border-2 border-[#FDE047] ring-2 ring-[#FDE047]/90 text-white shadow-[0_4px_16px_rgba(212,175,55,0.45)] scale-105'
                      : 'bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/70 text-white shadow-md hover:border-[#FFF8D6] hover:scale-105 active:scale-95'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Product Grid - Spacious layout for video presentations & watermark logos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#1A0A05]/95 rounded-2xl border-2 border-[#D4AF37]/60 p-8 shadow-2xl">
              <p className="font-serif font-bold text-lg text-[#FFF8EE] mb-2">
                No encontramos productos con "{searchQuery}"
              </p>
              <p className="text-xs text-[#E0CCA7] mb-4">
                Prueba buscando por "tequeños", "ponche", "chocolates", "quesillo" o "pan".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#241007] via-[#38180C] to-[#241007] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/80 text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                filteredProducts.length === 1
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : filteredProducts.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p, tab) => {
                    setSelectedProduct(p);
                    setModalInitialTab(tab || (p.videoUrl ? 'video' : 'photo'));
                  }}
                  onAddToCart={(p, v) => handleAddToCart(p, v)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Seasonal Decorative Section Divider */}
        <SeasonalSectionDivider season={currentSeason} />

        {/* Custom Gift Box Builder Section */}
        <CustomBoxBuilder onAddCustomBox={handleAddCustomBox} />

        {/* Heritage Story & Nostalgia Section */}
        <StorySection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat as ProductCategory);
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          initialMediaTab={modalInitialTab}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, variant, qty) => {
            handleAddToCart(product, variant, qty);
          }}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onOrderCompleted={(order) => {
            setIsCheckoutOpen(false);
            setCartItems([]);
            setPlacedOrder(order);
          }}
        />
      )}

      {/* Order Confirmation Receipt Modal */}
      {placedOrder && (
        <OrderConfirmationModal
          order={placedOrder}
          onClose={() => setPlacedOrder(null)}
        />
      )}

      {/* Floating In-App PWA Install Banner */}
      <PWAInstallBanner />
    </div>
  );
}
