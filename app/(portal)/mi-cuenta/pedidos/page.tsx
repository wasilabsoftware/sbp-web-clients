"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { AccountSidebar } from "@/components/portal/AccountSidebar";
import { OrderCard } from "@/components/portal/OrderCard";
import { Order } from "@/types/order";
import { useAuth } from "@/hooks/useAuth";

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#SB-2024-0042",
    status: "shipped",
    statusLabel: "En camino",
    createdAt: "27 de Enero, 2026",
    estimatedDelivery: "30 Enero 2026, 2:00 - 4:00 PM",
    products: [
      {
        id: "p1",
        name: "Fresas Premium x2",
        description: "500g",
        quantity: 2,
        unitPrice: 18.0,
        total: 36.0,
        imageUrl:
          "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80",
      },
      {
        id: "p2",
        name: "Arándanos Fresh x1",
        description: "250g",
        quantity: 1,
        unitPrice: 24.0,
        total: 24.0,
        imageUrl:
          "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&q=80",
      },
    ],
    subtotal: 60.0,
    shipping: 12.7,
    shippingType: "Envío express",
    discount: 0,
    total: 72.7,
    payment: { method: "Visa", last4: "4242", paidAt: "27 Ene 2026" },
    address: {
      street: "Av. Javier Prado Este 4200",
      district: "Santiago de Surco",
      city: "Lima",
      postalCode: "15023",
      fullAddress: "Av. Javier Prado Este 4200, Santiago de Surco, Lima 15023",
    },
    customer: {
      name: "María Castro",
      phone: "+51 987 654 321",
      email: "maria.castro@email.com",
    },
  },
  {
    id: "2",
    orderNumber: "#SB-2024-0038",
    status: "delivered",
    statusLabel: "Entregado",
    createdAt: "20 de Enero, 2026",
    estimatedDelivery: "22 Enero 2026",
    products: [
      {
        id: "p3",
        name: "Aguaymanto x2",
        description: "200g",
        quantity: 2,
        unitPrice: 19.35,
        total: 38.7,
        imageUrl:
          "https://images.unsplash.com/photo-1596591868231-05e908752cc5?w=200&q=80",
      },
    ],
    subtotal: 38.7,
    shipping: 10.0,
    shippingType: "Envío estándar",
    discount: 0,
    total: 48.7,
    payment: { method: "Visa", last4: "4242", paidAt: "20 Ene 2026" },
    address: {
      street: "Av. Javier Prado Este 4200",
      district: "Santiago de Surco",
      city: "Lima",
      postalCode: "15023",
      fullAddress: "Av. Javier Prado Este 4200, Santiago de Surco, Lima 15023",
    },
    customer: {
      name: "María Castro",
      phone: "+51 987 654 321",
      email: "maria.castro@email.com",
    },
  },
  {
    id: "3",
    orderNumber: "#SB-2024-0035",
    status: "processing",
    statusLabel: "Procesando",
    createdAt: "15 de Enero, 2026",
    estimatedDelivery: "18 Enero 2026",
    products: [
      {
        id: "p4",
        name: "Mix Frutas Selectx2",
        description: "1kg",
        quantity: 2,
        unitPrice: 22.9,
        total: 45.8,
        imageUrl:
          "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&q=80",
      },
    ],
    subtotal: 45.8,
    shipping: 10.0,
    shippingType: "Envío estándar",
    discount: 0,
    total: 55.8,
    payment: { method: "Visa", last4: "4242", paidAt: "15 Ene 2026" },
    address: {
      street: "Av. Javier Prado Este 4200",
      district: "Santiago de Surco",
      city: "Lima",
      postalCode: "15023",
      fullAddress: "Av. Javier Prado Este 4200, Santiago de Surco, Lima 15023",
    },
    customer: {
      name: "María Castro",
      phone: "+51 987 654 321",
      email: "maria.castro@email.com",
    },
  },
];

type FilterOption = "all" | "shipped" | "delivered" | "processing";

const filterLabels: Record<FilterOption, string> = {
  all: "Todos",
  shipped: "En camino",
  delivered: "Entregados",
  processing: "Procesando",
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterOption>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filteredOrders =
    filter === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === filter);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="px-5 lg:px-20 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <AccountSidebar user={user} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl lg:text-[28px] font-bold text-text-primary">
                Mis Pedidos
              </h1>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 h-10 px-4 bg-bg-surface border border-border-subtle rounded-md hover:bg-bg-muted transition-colors"
                >
                  <span className="text-sm text-text-primary">
                    {filterLabels[filter]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-text-tertiary" />
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 top-12 bg-bg-surface border border-border-subtle rounded-md shadow-lg z-10 min-w-[150px]">
                    {(Object.keys(filterLabels) as FilterOption[]).map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFilter(option);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-bg-muted transition-colors ${
                            filter === option
                              ? "text-berry-red font-semibold"
                              : "text-text-primary"
                          }`}
                        >
                          {filterLabels[option]}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Orders List */}
            <div className="flex flex-col gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 bg-bg-surface rounded-xl">
                  <p className="text-lg text-text-secondary">
                    No tienes pedidos {filter !== "all" && filterLabels[filter].toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
