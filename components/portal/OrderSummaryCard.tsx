import { CreditCard } from "lucide-react";
import { Order } from "@/types/order";

interface OrderSummaryCardProps {
  order: Order;
}

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Resumen del pedido
        </h3>

        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-sm font-medium text-text-secondary">
            Subtotal
          </span>
          <span className="text-sm font-medium text-text-primary">
            S/ {order.subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-sm font-medium text-text-secondary">
            {order.shippingType}
          </span>
          <span className="text-sm font-medium text-text-primary">
            S/ {order.shipping.toFixed(2)}
          </span>
        </div>

        {/* Discount (if any) */}
        {order.discount > 0 && (
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              Descuento {order.discountCode && `(${order.discountCode})`}
            </span>
            <span className="text-sm font-medium text-berry-green">
              -S/ {order.discount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-border-subtle w-full" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-text-primary">
            Total pagado
          </span>
          <span className="text-2xl font-bold text-berry-red">
            S/ {order.total.toFixed(2)}
          </span>
        </div>

        {/* Payment Method */}
        <div className="flex items-center gap-3 bg-bg-muted rounded-md p-3">
          <CreditCard className="w-5 h-5 text-text-secondary" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-text-primary">
              {order.payment.method} •••• {order.payment.last4}
            </span>
            <span className="text-xs font-medium text-text-tertiary">
              Pagado el {order.payment.paidAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
