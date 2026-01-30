"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Headphones,
  Printer,
  Navigation,
} from "lucide-react";
import { OrderStatusCard } from "@/components/portal/OrderStatusCard";
import { OrderProductsTable } from "@/components/portal/OrderProductsTable";
import { OrderSummaryCard } from "@/components/portal/OrderSummaryCard";
import { OrderDeliveryCard } from "@/components/portal/OrderDeliveryCard";
import { Order } from "@/types/order";

// Mock order data - in production this would come from an API
const mockOrder: Order = {
  id: "1",
  orderNumber: "#PED-2024-0847",
  status: "shipped",
  statusLabel: "En camino",
  createdAt: "28 Enero 2026, 10:30 AM",
  estimatedDelivery: "30 Enero 2026, 2:00 - 4:00 PM",
  products: [
    {
      id: "p1",
      name: "Fresas Premium 500g",
      description: "SKU: FRS-500-PRE",
      quantity: 2,
      unitPrice: 18.0,
      total: 36.0,
      imageUrl:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80",
    },
    {
      id: "p2",
      name: "Arándanos Orgánicos 250g",
      description: "SKU: ARN-250-ORG",
      quantity: 1,
      unitPrice: 24.0,
      total: 24.0,
      imageUrl:
        "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&q=80",
    },
    {
      id: "p3",
      name: "Frambuesas Selectas 300g",
      description: "SKU: FRM-300-SEL",
      quantity: 1,
      unitPrice: 28.0,
      total: 28.0,
      imageUrl:
        "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=200&q=80",
    },
  ],
  subtotal: 88.0,
  shipping: 8.0,
  shippingType: "Envío express",
  discount: 10.0,
  discountCode: "BERRIES10",
  total: 86.0,
  payment: {
    method: "Visa",
    last4: "4242",
    paidAt: "28 Ene 2026",
  },
  address: {
    street: "Av. Javier Prado Este 4200",
    district: "Santiago de Surco",
    city: "Lima",
    postalCode: "15023",
    fullAddress:
      "Av. Javier Prado Este 4200, Santiago de Surco, Lima 15023",
  },
  customer: {
    name: "María García López",
    phone: "+51 987 654 321",
    email: "maria@example.com",
  },
};

export default function OrderDetailPage() {
  const router = useRouter();
  const order = mockOrder;

  const handleTrackOrder = () => {
    // Open tracking in new tab or modal
    alert("Rastrear pedido: " + order.orderNumber);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top Bar */}
      <header className="bg-bg-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)] sticky top-0 z-10">
        <div className="flex items-center justify-between h-[72px] px-5 lg:px-[60px]">
          {/* Left: Back + Breadcrumb */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center hover:bg-border-subtle transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                href="/mi-cuenta/pedidos"
                className="text-sm font-medium text-text-tertiary hover:text-berry-red transition-colors"
              >
                Mis Pedidos
              </Link>
              <ChevronRight className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm font-semibold text-text-primary">
                {order.orderNumber}
              </span>
            </nav>
          </div>

          {/* Center: Title (Desktop) */}
          <h1 className="hidden lg:block text-2xl font-bold text-text-primary">
            Detalle del Pedido
          </h1>

          {/* Mobile: Title */}
          <h1 className="lg:hidden text-lg font-bold text-text-primary">
            {order.orderNumber}
          </h1>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 h-11 px-5 bg-bg-muted rounded-md hover:bg-border-subtle transition-colors">
              <Headphones className="w-[18px] h-[18px] text-text-primary" />
              <span className="text-sm font-semibold text-text-primary">
                Soporte
              </span>
            </button>
            <button className="w-11 h-11 bg-bg-muted rounded-md flex items-center justify-center hover:bg-border-subtle transition-colors">
              <Printer className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 lg:px-[60px] py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-6 flex-1">
            <OrderStatusCard order={order} />
            <OrderProductsTable products={order.products} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full lg:w-[400px]">
            <OrderSummaryCard order={order} />
            <OrderDeliveryCard order={order} />

            {/* Track Order Button */}
            <button
              onClick={handleTrackOrder}
              className="flex items-center justify-center gap-2.5 h-[52px] bg-berry-red rounded-md hover:bg-berry-red-dark transition-colors"
            >
              <Navigation className="w-5 h-5 text-text-inverse" />
              <span className="text-[15px] font-semibold text-text-inverse">
                Rastrear pedido en tiempo real
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
