export type ProductCategory = 
  | 'all'
  | 'ponche'
  | 'tequenos'
  | 'dulce-leche'
  | 'chocolates'
  | 'quesillo'
  | 'pan-jamon'
  | 'tradicionales'
  | 'combos';

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'ponche' | 'tequenos' | 'dulce-leche' | 'chocolates' | 'quesillo' | 'pan-jamon' | 'tradicionales' | 'combos';
  categoryLabel: string;
  description: string;
  story: string;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  basePrice: number;
  variants: ProductVariant[];
  ingredients: string[];
  tastingNotes: {
    aroma?: string;
    texture: string;
    finish: string;
    identity?: string;
  };
  servingSuggestion: string;
  alcoholByVolume?: string;
  shelfLife: string;
  storage: string;
  videoUrl?: string;
  videoCaption?: string;
  logoUrl?: string;
  presentationDetails?: string[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  customNote?: string;
}

export interface CustomComboState {
  poncheVariantId: string;
  dulceLecheVariantId: string;
  sweetId1: string;
  sweetId2: string;
  customNote: string;
  recipientName: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: 'pago_movil' | 'crixto' | 'binance' | 'airtm' | 'cash' | 'whatsapp' | string;
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: OrderCustomerInfo;
  status?: 'preparando' | 'en_camino' | 'entregado';
}
