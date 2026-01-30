"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Order, ORDER_STATUS_CONFIG } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const isShipped = order.status === "shipped";

  return (
    <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold text-text-primary">
              Pedido {order.orderNumber}
            </span>
            <span className="text-[13px] text-text-tertiary">
              {order.createdAt}
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 px-3.5 h-8 rounded-full ${statusConfig.bgColor}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                order.status === "shipped" || order.status === "delivered"
                  ? "bg-berry-green"
                  : order.status === "cancelled"
                    ? "bg-red-500"
                    : "bg-amber-500"
              }`}
            />
            <span className={`text-[13px] font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Products Preview */}
        <div className="flex flex-wrap gap-4">
          {order.products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-primary">
                  {product.name}
                </span>
                <span className="text-xs text-text-tertiary">
                  x{product.quantity}
                </span>
              </div>
            </div>
          ))}
          {order.products.length > 3 && (
            <div className="flex items-center">
              <span className="text-sm text-text-tertiary">
                +{order.products.length - 3} más
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Total:</span>
            <span className="text-lg font-bold text-text-primary">
              S/ {order.total.toFixed(2)}
            </span>
          </div>
          <Link
            href={`/pedido/${order.id}`}
            className={`flex items-center gap-2 h-10 px-5 rounded-md transition-colors ${
              isShipped
                ? "bg-berry-red text-text-inverse hover:bg-berry-red-dark"
                : "bg-transparent border border-border-subtle text-text-primary hover:bg-bg-muted"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-semibold">Ver Detalles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
