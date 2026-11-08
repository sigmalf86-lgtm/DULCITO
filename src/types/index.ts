export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'ponche' | 'dulces' | 'navidad' | 'cajas';
  description: string;
  badge?: string;
  image: string;
  variants: ProductVariant[];
  ingredients?: string[];
  heritageNote?: string;
  isSpecial?: boolean;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  customNote?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'pago_movil' | 'crixto' | 'binance' | 'airtm' | 'cash' | 'whatsapp' | 'zelle';
  notes?: string;
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  customer: CustomerInfo;
  status: 'preparando' | 'en_camino' | 'entregado';
}

export * from './seasons';
