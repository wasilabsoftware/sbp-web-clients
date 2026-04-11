// --- Order statuses ---

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready_delivery"
  | "in_transit"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

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
  preparing: {
    label: "Preparando",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  ready_delivery: {
    label: "Listo para envío",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  in_transit: {
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

// --- API response types ---

export interface ApiOrderListItem {
  id: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: string;
  deliveryDate: string | null;
  metadata: unknown;
  customer: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
  };
}

export interface ApiOrdersResponse {
  data: ApiOrderListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiOrderItem {
  id: string;
  productName: string;
  variantName: string | null;
  productSku: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  specialInstructions: string | null;
  product: {
    id: string;
    name: string;
    images: string[] | null;
    unitOfMeasure: string;
  };
}

export interface ApiOrderPayment {
  id: string;
  paymentMethod: string;
  amount: string;
  paymentReference: string | null;
  paymentStatus: string;
  transactionDate: string | null;
}

export interface ApiOrderDetail {
  id: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string | null;
  deliveryTimeSlot: string | null;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: string;
  discountAmount: string;
  deliveryFee: string;
  taxAmount: string;
  totalAmount: string;
  deliveryAddress: string;
  deliveryDistrictId: number | null;
  deliveryReference: string | null;
  deliveryPhone: string | null;
  deliveryNotes: string | null;
  orderSource: string;
  salesChannel: string | null;
  createdAt: string;
  metadata: unknown;
  customer: {
    id: string;
    customerCode: string | null;
    fullName: string;
    email: string;
    phone: string;
  };
  district: {
    id: number;
    name: string;
    zone: string;
    deliveryFee: string;
  } | null;
  items: ApiOrderItem[];
  payments: ApiOrderPayment[];
}

export interface ApiOrderTracking {
  orderNumber: string;
  currentStatus: OrderStatus;
  tracking: Array<{
    status: string;
    timestamp: string;
    notes: string | null;
    location: string | null;
  }>;
}

// --- Create order types ---

export interface CreateOrderItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName?: string;
  productSku: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  specialInstructions?: string;
}

export interface CreateOrderPayload {
  customerId: string;
  subtotalAmount: string;
  deliveryFee?: string;
  totalAmount: string;
  taxAmount?: string;
  discountAmount?: string;
  deliveryAddress: string;
  deliveryDistrictId?: number;
  deliveryDate?: string;
  orderSource?: "web" | "whatsapp" | "instagram" | "facebook" | "phone";
  items: CreateOrderItem[];
}

export interface CreateOrderResponse {
  id: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: string;
  subtotal: string;
  taxAmount: string;
  deliveryFee: string;
  deliveryAddress: string;
}
