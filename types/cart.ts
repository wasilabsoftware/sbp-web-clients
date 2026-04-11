export interface ServerCartInfo {
  id: string;
  sessionId: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface ServerCartVariant {
  id: string;
  sku: string;
  name: string;
  weight: string | null;
  packaging: string | null;
  stockQuantity: number;
  images: string[] | null;
}

export interface ServerCartProduct {
  id: string;
  name: string;
  slug: string;
  basePrice: string;
  salePrice: string | null;
  unitOfMeasure: string;
  images: string[] | null;
}

export interface ServerCartItem {
  id: string;
  quantity: string;
  unitPrice: string;
  specialInstructions: string | null;
  variant: ServerCartVariant;
  product: ServerCartProduct;
}

export interface CartSummary {
  itemCount: number;
  subtotal: string;
  deliveryFee: string;
  total: string;
}

export interface ServerCart {
  cart: ServerCartInfo;
  items: ServerCartItem[];
  summary: CartSummary;
}
