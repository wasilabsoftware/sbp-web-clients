"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Loader2, Package } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { useAuth, getUserDisplayName, getUserInitials } from "@/hooks/useAuth";
import { getOrders } from "@/lib/services/order.service";
import { ORDER_STATUS_CONFIG } from "@/types/order";
import type { ApiOrderListItem, OrderStatus } from "@/types/order";

type FilterOption = "all" | "pending" | "confirmed" | "preparing" | "in_transit" | "delivered" | "cancelled";

const filterLabels: Record<FilterOption, string> = {
  all: "Todos",
  pending: "Pendientes",
  confirmed: "Confirmados",
  preparing: "Preparando",
  in_transit: "En camino",
  delivered: "Entregados",
  cancelled: "Cancelados",
};

export default function OrdersPage() {
  const { user, token, isLoading: authLoading, initialize } = useAuth();
  const [orders, setOrders] = useState<ApiOrderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterOption>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    if (!token || !user?.customerId) return;

    setIsLoading(true);
    getOrders(token, {
      customerId: user.customerId,
      status: filter === "all" ? undefined : filter,
      limit: 50,
    })
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, [token, user?.customerId, filter]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-berry-red animate-spin" />
      </div>
    );
  }

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <main className="px-5 lg:px-20 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="bg-bg-surface rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-[100px] h-[100px] rounded-full bg-berry-red-light flex items-center justify-center">
                  <span className="text-4xl font-bold text-berry-red">{initials}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl font-bold text-text-primary">{displayName}</span>
                  <span className="text-sm text-text-secondary">{user.email}</span>
                </div>
              </div>
              <nav className="flex flex-col gap-1">
                <Link href="/mi-cuenta" className="flex items-center gap-3 h-12 px-4 rounded-xl text-text-secondary hover:bg-bg-muted transition-colors">
                  <Package className="w-5 h-5" /><span className="text-[15px] font-medium">Mi Perfil</span>
                </Link>
                <Link href="/mi-cuenta/pedidos" className="flex items-center gap-3 h-12 px-4 rounded-xl bg-berry-red-light text-berry-red font-semibold">
                  <Package className="w-5 h-5" /><span className="text-[15px]">Mis Pedidos</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl lg:text-[28px] font-bold text-text-primary">Mis Pedidos</h1>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2 h-10 px-4 bg-bg-surface border border-border-subtle rounded-md hover:bg-bg-muted transition-colors"
                >
                  <span className="text-sm text-text-primary">{filterLabels[filter]}</span>
                  <ChevronDown className="w-4 h-4 text-text-tertiary" />
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 top-12 bg-bg-surface border border-border-subtle rounded-md shadow-lg z-10 min-w-[150px]">
                    {(Object.keys(filterLabels) as FilterOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => { setFilter(option); setShowFilterMenu(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-bg-muted transition-colors ${filter === option ? "text-berry-red font-semibold" : "text-text-primary"}`}
                      >
                        {filterLabels[option]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Orders */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-berry-red animate-spin" />
              </div>
            ) : orders.length > 0 ? (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <OrderListCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-16 bg-bg-surface rounded-xl">
                <Package className="w-12 h-12 text-text-tertiary" />
                <p className="text-lg text-text-secondary">
                  {filter === "all" ? "No tienes pedidos aún" : `No tienes pedidos ${filterLabels[filter].toLowerCase()}`}
                </p>
                <Link href="/tienda" className="text-berry-red font-medium hover:underline">
                  Ir a la tienda
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function OrderListCard({ order }: { order: ApiOrderListItem }) {
  const statusConfig = ORDER_STATUS_CONFIG[order.orderStatus] || ORDER_STATUS_CONFIG.pending;
  const isActive = ["in_transit", "preparing", "confirmed"].includes(order.orderStatus);
  const orderDate = new Date(order.orderDate).toLocaleDateString("es-PE", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="bg-bg-surface rounded-xl p-5 lg:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold text-text-primary">
              Pedido {order.orderNumber}
            </span>
            <span className="text-[13px] text-text-tertiary">{orderDate}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3.5 h-8 rounded-full ${statusConfig.bgColor}`}>
            <div className={`w-2 h-2 rounded-full ${
              ["in_transit", "delivered", "ready_delivery"].includes(order.orderStatus)
                ? "bg-berry-green"
                : order.orderStatus === "cancelled" ? "bg-red-500" : "bg-amber-500"
            }`} />
            <span className={`text-[13px] font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Total:</span>
            <span className="text-lg font-bold text-text-primary">
              S/ {parseFloat(order.totalAmount).toFixed(2)}
            </span>
          </div>
          <Link
            href={`/pedido/${order.id}`}
            className={`flex items-center gap-2 h-10 px-5 rounded-md transition-colors text-sm font-semibold ${
              isActive
                ? "bg-berry-red text-text-inverse hover:bg-berry-red-dark"
                : "border border-border-subtle text-text-primary hover:bg-bg-muted"
            }`}
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
