import { Order, ORDER_STATUS_CONFIG } from "@/types/order";

interface OrderStatusCardProps {
  order: Order;
}

export function OrderStatusCard({ order }: OrderStatusCardProps) {
  const statusConfig = ORDER_STATUS_CONFIG[order.status];

  return (
    <div className="bg-bg-surface rounded-xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-5">
        {/* Header with order number and status */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-text-tertiary">
              Número de pedido
            </span>
            <span className="text-[22px] font-bold text-text-primary">
              {order.orderNumber}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bgColor}`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                order.status === "shipped" || order.status === "delivered"
                  ? "bg-berry-green"
                  : order.status === "cancelled"
                    ? "bg-red-500"
                    : "bg-amber-500"
              }`}
            />
            <span
              className={`text-sm font-semibold ${statusConfig.color}`}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-subtle w-full" />

        {/* Dates row */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-text-tertiary">
              Fecha de pedido
            </span>
            <span className="text-[15px] font-semibold text-text-primary">
              {order.createdAt}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-text-tertiary">
              Entrega estimada
            </span>
            <span className="text-[15px] font-semibold text-berry-green">
              {order.estimatedDelivery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
