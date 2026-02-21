"use client";

import Link from "next/link";
import {
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  onCheckout?: () => void;
  onWhatsAppOrder?: () => void;
}

export function OrderSummary({
  subtotal,
  shipping,
  onCheckout,
  onWhatsAppOrder,
}: OrderSummaryProps) {
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Summary Card */}
      <div className="flex flex-col gap-5 lg:gap-6 bg-bg-surface rounded-xl p-6 lg:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <h2 className="text-lg lg:text-xl font-bold text-text-primary">
          <span className="lg:hidden">Resumen</span>
          <span className="hidden lg:inline">Resumen del Pedido</span>
        </h2>

        {/* Summary Lines */}
        <div className="flex flex-col gap-3 lg:gap-4 w-full">
          <div className="flex justify-between w-full">
            <span className="text-sm lg:text-[15px] text-text-secondary">
              Subtotal
            </span>
            <span className="text-sm lg:text-[15px] font-semibold text-text-primary">
              S/ {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-sm lg:text-[15px] text-text-secondary">
              Envío
            </span>
            <span className="text-sm lg:text-[15px] font-semibold text-text-primary">
              {shipping === 0 ? "Gratis" : `S/ ${shipping.toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {shipping > 0 && subtotal > 0 && (
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-1.5 bg-border-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-berry-green rounded-full transition-all"
                style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-tertiary text-center">
              Te faltan <span className="font-semibold text-berry-red">S/ {(100 - subtotal).toFixed(2)}</span> para envío gratis
            </p>
          </div>
        )}
        {shipping === 0 && subtotal > 0 && (
          <p className="text-xs font-medium text-berry-green text-center">
            ¡Envío gratis aplicado!
          </p>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-border-subtle" />

        {/* Total */}
        <div className="flex justify-between items-center w-full">
          <span className="text-base lg:text-lg font-bold text-text-primary">
            Total
          </span>
          <span className="text-[22px] lg:text-2xl font-bold text-berry-red">
            S/ {total.toFixed(2)}
          </span>
        </div>

        {/* Checkout Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="primary"
            size="lg"
            onClick={onCheckout}
            className="w-full h-12 lg:h-[52px] rounded-md text-[15px] lg:text-base"
          >
            <CreditCard className="w-[18px] h-[18px] lg:hidden" />
            <ShoppingBag className="w-5 h-5 hidden lg:block" />
            Proceder al Pago
          </Button>
          <Button
            variant="whatsapp"
            size="lg"
            onClick={onWhatsAppOrder}
            className="w-full h-12 lg:h-[52px] rounded-md text-[15px] lg:text-base"
          >
            <MessageCircle className="w-[18px] h-[18px] lg:w-5 lg:h-5" />
            Pedir por WhatsApp
          </Button>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 lg:gap-2 w-full">
          <ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-text-tertiary" />
          <span className="text-xs lg:text-[13px] text-text-tertiary">
            Pago 100% seguro
          </span>
        </div>
      </div>

      {/* Continue Shopping */}
      <Link
        href="/productos"
        className="flex items-center justify-center gap-1.5 lg:gap-2 w-full py-4 lg:py-0 text-berry-red hover:underline transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm lg:text-[15px] font-medium">
          Continuar Comprando
        </span>
      </Link>
    </div>
  );
}
