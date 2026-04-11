"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { ServerCartItem } from "@/types/cart";

interface CheckoutOrderSummaryProps {
  items: ServerCartItem[];
  subtotal: string;
  deliveryFee: string;
  total: string;
  onContinue: () => void;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  deliveryFee,
  total,
  onContinue,
}: CheckoutOrderSummaryProps) {
  const deliveryFeeNum = parseFloat(deliveryFee);

  return (
    <div className="flex flex-col gap-6">
      {/* Items */}
      <div className="bg-bg-surface rounded-xl p-5 lg:p-6">
        <h3 className="text-base lg:text-lg font-bold text-text-primary mb-4">
          Tu Pedido ({items.length} {items.length === 1 ? "producto" : "productos"})
        </h3>

        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const qty = parseFloat(item.quantity);
            const price = parseFloat(item.unitPrice);
            const lineTotal = qty * price;
            const imageUrl = item.variant.images?.[0] ?? item.product.images?.[0] ?? "";

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 lg:gap-4"
              >
                <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-md overflow-hidden shrink-0 bg-bg-muted">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.variant.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary text-[10px]">
                      Sin img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {item.variant.name}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {qty} x S/ {price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-text-primary shrink-0">
                  S/ {lineTotal.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-bg-surface rounded-xl p-5 lg:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Subtotal</span>
            <span className="text-sm font-semibold text-text-primary">
              S/ {parseFloat(subtotal).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Envío</span>
            <span className="text-sm font-semibold text-text-primary">
              {deliveryFeeNum === 0
                ? "Gratis"
                : `S/ ${deliveryFeeNum.toFixed(2)}`}
            </span>
          </div>
          <div className="w-full h-px bg-border-subtle" />
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-text-primary">Total</span>
            <span className="text-xl font-bold text-berry-red">
              S/ {parseFloat(total).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onContinue}
        className="w-full h-12 lg:h-[52px]"
      >
        Continuar
      </Button>
    </div>
  );
}
