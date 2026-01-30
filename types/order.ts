export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderProduct {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  imageUrl: string;
}

export interface OrderAddress {
  street: string;
  district: string;
  city: string;
  postalCode: string;
  fullAddress: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
}

export interface OrderPayment {
  method: string;
  last4: string;
  paidAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  statusLabel: string;
  createdAt: string;
  estimatedDelivery: string;
  products: OrderProduct[];
  subtotal: number;
  shipping: number;
  shippingType: string;
  discount: number;
  discountCode?: string;
  total: number;
  payment: OrderPayment;
  address: OrderAddress;
  customer: OrderCustomer;
}

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: "Pendiente",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  confirmed: {
    label: "Confirmado",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  processing: {
    label: "Preparando",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  shipped: {
    label: "En camino",
    color: "text-berry-green",
    bgColor: "bg-berry-green-light",
  },
  delivered: {
    label: "Entregado",
    color: "text-berry-green",
    bgColor: "bg-berry-green-light",
  },
  cancelled: {
    label: "Cancelado",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
};
